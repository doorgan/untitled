# untitled custom elements library
A simple custom elements helper based on [uhtml](https://github.com/WebReflection/uce)
and the [meiosis pattern](https://meiosis.js.org/).

## Getting untitled
Get the package from NPM
`npm install --save @dorgandash/untitled`

Or import it as an ES module
`imrpot { define } from "https://unpkg.com/@dorgandash/untitled?module"`

## Usage
You can see a [Live demo](https://codepen.io/dorgan/pen/LYReEmO?editors=1010) at codepen.io.

```js
import { define, html, store, css } from "https://unpkg.com/@dorgandash/untitled?module";

const Counter = store({count: 0});

// Function patch
const inc = () => Counter.update(state => {
  state.count++;
  return state;
});

// Object patch
const reset = () => Counter.update({count: 0})

define("my-counter", class extends HTMLElement {
  ready() {
    // Subscribes to the store. Every store update will trigger
    // a component update
    this.useStore(Counter);
  }
  
  render() {
    return html`
      <button onclick=${reset}>Reset</button>
      <span class="count">${Counter().count}</span>
      <button onclick=${inc}>+</button>
    `
  }

  /**
   * Styles will be added to the document once per definition
   * The `css` template literal tag is optional, but may help
   * tooling to highlight or minify the contents.
   */
  static css(tag) {
    return css`
      ${tag} > .count {
        color: red;
      }
    `
  }
})
```

## Lifecycle callbacks
The standard custom element callbacks have their quirks, so untitled
provides a different set of callbacks:

- `connected`: same as `connectedCallback`, is invoked each time the
  custom element is appended into a document-connected
  element. This will happen each time the node is moved, and may happen
  before the element's contents have been fully parsed.

- `disconnected`: Invoked each time the custom element is disconnected
  from the document's DOM.

- `ready`: Invoked *after* the component is connected and guarantees the
  element's contents hev been fully parsed. At this point `refs` and
  `this.slots` should work properly.
  Essentially, this avoid the need to manually delay child fetching with
  `setTimeout` or similar hacks. `ready` is invoked in the next macrotask
  after `connected`.

- `update`: Invoked every time a store is updated or an attribute changes.

- `render`: Invoked right after a component update. The returned value will be
  used to render the component's contents.
  
## Templating
Templating is done via
[uhtml](https://github.com/WebReflection/uhtml), there are
no secret not added ingredients to it, so I recommend to read
it's docs.

## Stores
untitled provides a simple store pattern based on ideas from the meiosis
pattern, but stripped down so you can decide how to design the store's API.

The exported `store` function creates a reactive stream of states. If you're
not familiarized with reactive streams, you can start by reading the Streams
chapter of the
[meiosis pattern tutorial](https://meiosis.js.org/tutorial/03-streams.html)

The `update` method is used to update the store. It accepts either an object
to be merged with the store's state, or a function that returns the new state
for the store. We refer to them as *patches*.

You can subscribe to store updates with it's `map` method:
```js
const State = store({count: 0});

// Get the current state
console.log(State()) // {count: 0}

// Create a new stream that logs the state on each update
const logger = State.map(state => console.log(state.count));

State.update({count: 15});
// 15
State.update(state => {
  return {count: state.count + 1}
})
// 16

// Stop listening for store updates
logger.end(true)
```

This could be used in an element like so:
```js
const State = store({count: 0});

define("my-comp", class extends HTMLElement{
  ready() {
    this.updater = State.map(() => this.update());
  }
  
  disconnected() {
    this.updater.end(true);
  }
  
  render() {
    return html`<span>${State().count}</span>`
  }
})
```

However, manually subscribing and unsubscribing from the store
is such a common pattern that it get's tedious to do it manually.
Moreover, consecutive store updates will trigger an update for
each one of them, which can get expensive.
untitled provides a `.useStore`(showcased in the Usage section)
method that automatically manages subscription, ubsubscription,
and batches consecutive store updates so a single element
update is guaranteed to be run in the next event loop microtask.

## Slots
untitled doesn't use shadow DOM, I don't think it's benefits are
worth it's downsides, so untitled has it's own mechanism for slots.
You can read more about why using shadow DOM may not be a good idea
[in this article](https://webreflection.medium.com/any-holy-grail-for-web-components-c3d4973f3f3f)
by the author of `uhtml`.

Once the element's child have been parsed by the browser and
right before the `ready` callback, untitled will load all
slots in the element's `slot` property.

Consider the following markup:
 ```html
 <my-element>
   Hello world!
   <button slot="action">Press me!</button>
   <p>I'm a paragraph!</p>
 </my-element>
 ```
 The element's `this.slots` will look like this:
 ```js
 {
   default: [
     #text "Hello world!"
     <p>I'm a paragraph!</p>
   ],
   action: <button slot="action">Press me!</button>
 }
 ```
 
 ## Refs
 DOM References work the same way React refs work, so you
 can read the [React docs](https://reactjs.org/docs/refs-and-the-dom.html)
 on the subject to understand how it work. The only difference is that
 references are created with the exported `ref` function.
 
 ## Typescript caveats
 If you're using typescript and try to extend a builtin constructor
 like `HTMLElement`, you will notice that typescript will complain
 about things like `this.useStore` not being present in the HTMLElement
 interface. To avoid this, untitled provides a `Component` function that
 tricks typescript into thinking the properties and methods added to
 your definition when calling `define` are indeed present in your own
 definition.
 By default, `Component()` will be typed as HTMLElement. If you're
 trying to extend a constructor like `HTMLInputElement`, you can pass
 that constructor like `Component(HTMLInputElement)` and it will extend
 that type instead.
 
 So instead of defining your element like this:
 ```js
 define("my-input", class extends HTMLInputElement {})
 ```
 
 You would define it as follows:
 ```js
 define("my-input", class extends Component(HTMLInputElement) {})
 ```
 
## License
ISC License

Copyright (c) 2020, @doorgan

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.