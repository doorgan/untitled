import { html } from "uhtml";
import css from "plain-tag";
import type { Store, Stream, Patch } from "./state";
import { store } from "./state";
interface Ref<T extends HTMLElement> {
    current: T | null;
}
declare type Slots = {
    default: Node[];
} & {
    [key: string]: Node;
};
declare type CustomHandlers = Record<`handle_${keyof HTMLElementEventMap}`, EventListener>;
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
export interface Definition extends HTMLElement, Partial<CustomHandlers>, DefinitionCallbacks {
}
export interface DefinitionConstructor {
    new (...params: any[]): Definition;
    css?(tag: string): string;
}
export interface AugmentedDefinition extends HTMLElement, Partial<CustomHandlers>, Required<DefinitionCallbacks> {
    performRender: () => void;
}
export interface AugmentedDefinitionConstructor extends DefinitionConstructor {
    new (...params: any[]): AugmentedDefinition;
}
/**
 * Creates a reference to be used in templates.
 * If an element has a `ref=${my_ref}` attribute in a template, the
 * `my_ref.current` will be set to that element once it's rendered.
 */
declare const ref: <T extends HTMLElement>() => Ref<T>;
/**
 * Tricks typescript so it doesn't complain if you use methods that are added
 * while defining the component.
 *
 * @param superclass The base class to extend, defaults to `HTMLElement`
 */
declare const Component: <T extends CustomElementConstructor>(superclass?: T) => DefinitionConstructor;
/**
 * Defines a custom element component. I will create the definition only once,
 * so subsequent attempts to define an already defined element will result in a
 * noop.
 *
 * @param tag The custom element tag
 * @param definition The custom element definition
 * @param opts
 */
declare const define: (tag: string, definition: DefinitionConstructor, opts?: ElementDefinitionOptions) => AugmentedDefinitionConstructor;
/**
 * Subscribe to changes in the store state and triggers a component update.
 * Subscriptions are cleaned up when the component is disconnected.
 */
declare const useStore: <T>(element: Definition, store: Store<T>) => Store<T>;
export { Component, define, css, html, ref, store, useStore };
export type { Patch, Ref, Store, Stream };
