import { render, html } from "uhtml";
import css from "plain-tag";
import type { Store, Stream } from "./state";
import { store } from "./state";

export interface Ref<T extends HTMLElement> {
  current: T | null
}

/**
 * Creates a reference to be used in templates.
 * If an element has a `ref=${my_ref}` attribute in a template, the
 * `my_ref.current` will be set to that element once it's rendered.
 */
const ref = <T extends HTMLElement>(): Ref<T> => ({ current: null });

type Slots = { default: Node[] } & { [key: string]: Node }

type CustomHandlers = Record<
  `handle_${keyof HTMLElementEventMap}`,
  EventListener
>;

interface Definition extends HTMLElement, Partial<CustomHandlers> {
  /**
   * Invoked each time the custom element is appended into a document-connected
   * element. This will happen each time the node is moved, and may happen
   * before the element's contents have been fully parsed.
   */
  connected?(): void;

  /**
   * Invoked each time the custom element is disconnected from the document's
   * DOM.
   */
  disconnected?(): void;

  /**
   * Invoked *after* the component is connected and guarantees the element's
   * contents hev been fully parsed. At this point `refs` and `this.slots`
   * should work properly.
   */
  ready?(): void;

  /**
   * Invoked every time a store is updated or an attribute changes.
   */
  update?(): any;

  /**
   * Invoked right after a component update. The returned value will be
   * used to render the component's contents.
   */
  render?(): ReturnType<typeof html>;

  handleEvent(event: Event): void;

  /**
   * Subscribes to a store.
   * Store updates will trigger a component update. If multiple consecutive
   * store updates happen, a single component update is guaranteed to be run
   * in the next microtask.
   */
  useStore<T>(store: Store<T>): Store<T>;

  /**
   * Holds a map of slots found in the element's dom once it's ready.
   *
   * Consider the following markup:
   * ```html
   * <my-element>
   *   Hello world!
   *   <button slot="action">Press me!</button>
   *   <p>I'm a paragraph!</p>
   * </my-element>
   * ```
   * The element's `this.slots` will look like this:
   * ```js
   * {
   *   default: [
   *     #text "Hello world!"
   *     <p>I'm a paragraph!</p>
   *   ],
   *   action: <button slot="action">Press me!</button>
   * }
   * ```
   */
  readonly slots: Slots;
};

interface DefinitionConstructor {
  new(...params: any[]): Definition;
  css?(tag: string): string;
}

const extended_constructors = new Map<CustomElementConstructor, DefinitionConstructor>();

/**
 * Tricks typescript so it doesn't complain if you use methods that are added
 * while defining the component.
 *
 * @param superclass The base class to extend, defaults to `HTMLElement`
 */
const Component = <T extends CustomElementConstructor>(superclass: T): DefinitionConstructor => {
  if (!superclass) superclass = HTMLElement as T;
  return superclass as unknown as DefinitionConstructor;
}

const active_streams = new WeakMap<object, Stream<any>[]>();
const ready_elements = new WeakSet();
let updates_schedule = new Set<Definition>();

const constructors = new Map<DefinitionConstructor, DefinitionConstructor>();

/**
 * Defines a custom element component. I will create the definition only once,
 * so subsequent attempts to define an already defined element will result in a
 * noop.
 *
 * @param tag The custom element tag
 * @param definition The custom element definition
 * @param opts
 */
const define = (tag: string, definition: DefinitionConstructor, opts: ElementDefinitionOptions = {}): DefinitionConstructor => {

  const Class = constructors.get(definition) || class extends definition {
    connectedCallback() {
      if (super.connected) super.connected();

      this.dispatchEvent(new CustomEvent("connected"));

      setTimeout(() => this.ready());
    }

    ready() {
      load_slots(this);

      if (super.ready) {
        super.ready();
      }

      ready_elements.add(this)

      this.dispatchEvent(new CustomEvent("ready"));

      schedule_update(this);
    }

    disconnectedCallback() {
      active_streams.get(this)?.forEach(stream => {
        stream.end(true);
      });

      active_streams.delete(this);
      ready_elements.delete(this);

      if (super.disconnected) {
        super.disconnected();
      }

      this.dispatchEvent(new CustomEvent("disconnected"));
    }

    update() {
      if (super.update)
        super.update();
      if (this.render) render(this, this.render());
    }

    handleEvent(event: Event) {
      if (!super.handleEvent)
        Reflect.get(this, `handle_${event.type}`)(event);
      else
        super.handleEvent(event);
    }

    useStore<T>(store: Store<T>): Store<T> {
      return useStore(this, store);
    }
  };

  if (!customElements.get(tag)) customElements.define(tag, Class, opts)

  if (definition.css) {
    const style = document.createElement("style");
    const selector = opts.extends ? `${opts.extends}[is=${tag}]` : tag;
    style.textContent = definition.css(selector);
    document.head.appendChild(style);
  }

  constructors.set(definition, Class);

  return Class;
}

const run_schedule = () => {
  const previous = updates_schedule;
  updates_schedule = new Set();
  previous.forEach(element => {
    element.update?.();
  });
}

const schedule_update = (element: Definition) => {
  if (!updates_schedule.has(element)) {
    updates_schedule.add(element);

    if (updates_schedule.size === 1) {
      wait(run_schedule);
    }
  }
}

const wait = (callback: Function) => {
  (window.queueMicrotask)
    ? window.queueMicrotask(callback as VoidFunction)
    : new Promise<void>(r => r()).then(callback as VoidFunction);
}

/**
 * Holds the elements that have already loaded their slots.
 * The connected callback runs when the node is first discovered and also when
 * it's moved, so we shouhld only load slots the first time. This also avoids
 * the `Failed to execute 'insertBefore' on 'Node': The node before which the
 * new node is to be inserted is not a child of this node` error thrown by uhtml
 * when we reload slots after moving the element and trying to rerender
 * afterwards. I'm not sure if this is a uhtml bug or my own stupidity.
 */
const ready_slots = new WeakSet();
const load_slots = (element: Definition) => {
  // Find slots
  if (!ready_slots.has(element)) {
    let default_slots: Node[] = [];
    let slots: Record<string, Node> = {};
    Array.from(element.childNodes).forEach(el => {
      const slotName = (el instanceof Element) ? el.getAttribute('slot') : null;

      if (slotName) {
        slots[slotName] = el
      } else {
        default_slots.push(el);
      }
    });
    Reflect.set(element, "slots", { default: default_slots, ...slots });
    ready_slots.add(element);
  }
}

/**
 * Subscribe to changes in the store state and triggers a component update.
 * Subscriptions are cleaned up when the component is disconnected.
 */
const useStore = <T>(element: Definition, store: Store<T>): Store<T> => {
  const streams = active_streams.get(element) || [];
  const updater = store.map(() => {
    // Only update the component once it's ready, otherwise we will trigger an
    // update if we're subscribing in a connected or ready callback.
    if (ready_elements.has(element)) schedule_update(element);
  });
  streams.push(updater);
  active_streams.set(element, streams);

  return store;
}

export { Component, define, css, html, ref, store, useStore };
