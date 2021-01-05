import { render, html } from "uhtml";
import css from "plain-tag";
import type { Store, Stream, Patch } from "./state";
import { store } from "./state";
// @ts-ignore
import DOMHandler from "reactive-props/esm/dom.js";

const observe = DOMHandler({ dom: true });

interface Ref<T extends HTMLElement> {
  current: T | null
}

type Slots = { default: Node[] } & { [key: string]: Node }

type CustomHandlers = Record<
  `handle_${keyof HTMLElementEventMap}`,
  EventListener
>;

interface DefinitionCallbacks {
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

  performRender(): void;

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

  readonly props: Record<string, any>;
}

export interface Definition extends HTMLElement, Partial<CustomHandlers>, DefinitionCallbacks { };

export interface DefinitionConstructor {
  new(...params: any[]): Definition;
  css?(tag: string): string;
}

export interface AugmentedDefinition extends HTMLElement, Partial<CustomHandlers>, Required<DefinitionCallbacks> {
  performRender: () => void;
}

export interface AugmentedDefinitionConstructor extends DefinitionConstructor {
  new(...params: any[]): AugmentedDefinition;
}

/**
 * Creates a reference to be used in templates.
 * If an element has a `ref=${my_ref}` attribute in a template, the
 * `my_ref.current` will be set to that element once it's rendered.
 */
const ref = <T extends HTMLElement>(): Ref<T> => ({ current: null });

/**
 * Tricks typescript so it doesn't complain if you use methods that are added
 * while defining the component.
 *
 * @param superclass The base class to extend, defaults to `HTMLElement`
 */
const Component = <T extends CustomElementConstructor>(superclass: T = HTMLElement as T): DefinitionConstructor => {
  return superclass as unknown as DefinitionConstructor;
}

const active_streams = new WeakMap<object, Stream<any>[]>();
const ready_elements = new WeakSet();
let updates_schedule = new Set<Definition>();
let scheduled_renders = new WeakMap();

/**
 * Defines a custom element component. I will create the definition only once,
 * so subsequent attempts to define an already defined element will result in a
 * noop.
 *
 * @param tag The custom element tag
 * @param definition The custom element definition
 * @param opts
 */
const define = (tag: string, definition: DefinitionConstructor, opts: ElementDefinitionOptions = {}): AugmentedDefinitionConstructor => {

  const Class = class extends definition {

    constructor() {
      super();
      if (this.props) {
        Reflect.set(this, "props", observe(this, this.props, () => schedule_update(this)))
      }
    }

    connectedCallback() {
      this.connected();

      this.dispatchEvent(new CustomEvent("connected"));

      setTimeout(() => this.ready());
    }

    connected() {
      if (super.connected) super.connected();
    }

    disconnected() {
      if (super.disconnected) {
        super.disconnected();
      }
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

      this.disconnected();

      this.dispatchEvent(new CustomEvent("disconnected"));
    }

    update() {
      if (super.update)
        super.update();

      this.dispatchEvent(new CustomEvent("updated"));

      this.schedule_render();
    }

    private schedule_render() {
      if (scheduled_renders.has(this))
        cancelAnimationFrame(scheduled_renders.get!(this));

      scheduled_renders.set(this,
        requestAnimationFrame(() => {
          scheduled_renders.delete(this);
          this.performRender();
        })
      )
    }

    performRender() {
      if (super.render) {
        render(this, super.render());
      }

      this.dispatchEvent(new CustomEvent("rendered"));
    }

    handleEvent(event: Event) {
      /* istanbul ignore next */
      Reflect.get(this, `handle_${event.type}`)(event);
    }

    useStore<T>(store: Store<T>): Store<T> {
      return useStore(this, store);
    }
  } as AugmentedDefinitionConstructor;

  if (!customElements.get(tag)) customElements.define(tag, Class, opts)

  if (definition.css) {
    const style = document.createElement("style");
    const selector = opts.extends ? `${opts.extends}[is=${tag}]` : tag;
    style.textContent = definition.css(selector);
    document.head.appendChild(style);
  }

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
  (typeof queueMicrotask === 'function')
    ? queueMicrotask(callback as VoidFunction)
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
    const slots = get_slots_in(element);
    Reflect.set(element, "slots", slots);
    ready_slots.add(element);
  }
}

const get_slots_in = (element: Node): Slots => {
  let default_slots: Node[] = [];
  let slots: Record<string, Node> = {};
  for (let el of Array.from(element.childNodes)) {
    if (el instanceof HTMLTemplateElement) return get_slots_in(el.content);

    const slotName = (el instanceof Element) ? el.getAttribute('slot') : null;

    if (slotName) {
      slots[slotName] = el
    } else {
      default_slots.push(el);
    }
  };

  return { default: default_slots, ...slots } as Slots;
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
export type { Patch, Ref, Store, Stream };
