import { render } from "uhtml";
import { define, Component, html, css, store, ref, Ref } from "./index";

const event_promise = (element: HTMLElement, type: string) => new Promise(resolve => {
  element.addEventListener(type, resolve);
})

// Used to avoid custom element names collision as we can't unregister them
// after each test
let tag = "";
beforeEach(() => {
  tag = `el-${gen_id()}`
})

const gen_id = () => Math.random().toString(36).substr(2, 9);

const sleep = (time?: number) => new Promise(resolve => {
  setTimeout(resolve, time)
})

describe('Definitions', () => {
  test('Component extends HTMLElement', () => {
    class MyElement extends Component() { }
    expect(MyElement.prototype instanceof HTMLElement).toBe(true);

    class MyOtherElement extends Component(HTMLInputElement) { }
    expect(MyOtherElement.prototype instanceof HTMLInputElement).toBe(true);
  })

  test('Registers the definition once', () => {
    class MyElement extends Component() { }
    define(tag, MyElement);
    expect(customElements.get(tag).prototype instanceof MyElement).toBe(true);
    // Should not throw an already registered error
    define(tag, MyElement);
  })
})

describe('Callbacks', () => {
  test('Renders content', async () => {
    class MyElement extends Component() {
      render() {
        return html`<h1>Hello world!</h1>`
      };
    }
    define(tag, MyElement);

    const el = document.createElement(tag) as MyElement;
    document.body.appendChild(el);
    await event_promise(el, "rendered");

    const title = el.querySelector("h1");
    expect(title instanceof HTMLHeadingElement).toBe(true);
  })

  test('Fires lifecycle events', async () => {
    class MyElement extends Component() {
      connected() { }
      disconnected() { }
      render() {
        return html`<h1>Hello world!</h1>`
      };
    }

    define(tag, MyElement);

    const el = document.createElement(tag) as MyElement;

    const connected_promise = event_promise(el, "connected");
    const ready_promise = event_promise(el, "ready");
    const updated_promise = event_promise(el, "updated");
    const rendered_promise = event_promise(el, "rendered");
    const disconnected_promise = event_promise(el, "disconnected");

    document.body.appendChild(el);
    await connected_promise;
    await ready_promise;
    await updated_promise;
    await rendered_promise;
    el.remove();
    await disconnected_promise;
  })
})

describe('Stores', () => {
  test('Consecutive store updates trigger a single component update', async () => {
    const State = store({ count: 0 });
    const inc = () => State.update(state => ({ count: state.count + 1 }))

    class MyElement extends Component() {
      state!: typeof State;
      ready() {
        this.state = this.useStore(State);
      }

      update() {
        this.dispatchEvent(new Event("updated by store"));
      }
    }
    define(tag, MyElement);

    const el = document.createElement(tag) as MyElement;
    document.body.appendChild(el);

    let updates_counter = 0;
    el.addEventListener("updated by store", () => updates_counter++);

    inc();
    inc();
    inc();

    // Update isn't fired until next microtask
    expect(updates_counter).toBe(0);

    // Wait until next macrotask
    await sleep();

    // Should only fire once
    expect(updates_counter).toBe(1);

    // Should end stream on disconnect
    el.remove();
    inc();
    expect(updates_counter).toBe(1)
  })
})

test('Uses handleEvent', async () => {
  const called = jest.fn();
  class MyElement extends Component() {
    btn!: Ref<HTMLButtonElement>;
    ready() {
      this.btn = ref();
    }

    render() {
      return html`<button onclick=${this} ref=${this.btn}>Test</button>`
    }

    handle_click = (_event: Event) => {
      called();
    }
  }
  define(tag, MyElement);

  const el = document.createElement(tag) as MyElement;
  document.body.appendChild(el);
  const handleEvent_spy = jest.spyOn(el, "handleEvent");
  const handler_spy = jest.spyOn(el, "handle_click");

  await event_promise(el, "rendered");
  el.btn.current!.click();

  expect(handleEvent_spy).toHaveBeenCalled();
  expect(handler_spy).toHaveBeenCalled();
  expect(called).toHaveBeenCalled();
})

test('Injects styles', async () => {
  class MyElement extends Component() {
    static css = (self: string) => css`
        ${self} {
          color: red;
        }
      `
  }
  define(tag, MyElement);
  define(`builtin-${tag}`, MyElement, { extends: "div" });

  const el = document.createElement(tag);

  document.body.appendChild(el);
  const style = getComputedStyle(el);
  expect(style.color).toBe("red");

  const builtin = document.createElement(tag);
  builtin.setAttribute("is", `builtin-${tag}`);
  document.body.appendChild(builtin);
  const builtin_style = getComputedStyle(el);
  expect(builtin_style.color).toBe("red");
})

test('Loads slots', async () => {
  class MyElement extends Component() {
    default_container = ref();
    slot_container = ref();

    render() {
      return html`
          <div ref=${this.default_container}>
            ${this.slots.default.map(x => x)}
          </div>
          <div ref=${this.slot_container}>
            ${this.slots.slot}
          </div>
        `
    }
  }
  define("slots-el-1", MyElement);

  const el_ref = ref<MyElement>();
  render(document.body, html`
      <slots-el-1 ref=${el_ref}>
        Text content
        <h1 slot="slot">Title</h1>
        <p>Some paragraph</p>
      </slots-el-1>
    `)

  await sleep();

  const el = el_ref.current!;
  expect(el.slots.default.length).toBeGreaterThan(0);
  expect(el.slots.slot instanceof HTMLHeadingElement).toBeTruthy();

  el.slots.default.map(element => {
    expect(el.default_container.current!.contains(element)).toBeTruthy()
  })
  expect(el.slot_container.current!.contains(el.slots.slot)).toBeTruthy();

})

test('Template tag slots', async () => {
  class MyElement extends Component() {
    default_container = ref();
    slot_container = ref();

    render() {
      return html`
        <div ref=${this.default_container}>
          ${this.slots.default.map(x => x)}
        </div>
        <div ref=${this.slot_container}>
          ${this.slots.slot}
        </div>
      `
    }
  }
  define("slots-el-2", MyElement);

  const template = document.createElement("template");
  render(template.content, html`
      Text content
      <h1 slot="slot">Title</h1>
      <p>Some paragraph</p>
    `)

  const el = document.createElement("slots-el-2") as MyElement;
  el.appendChild(template);
  document.body.appendChild(el);

  await sleep();

  expect(el.slots.default.length).toBeGreaterThan(0);
  expect(el.slots.slot instanceof HTMLHeadingElement).toBeTruthy();

  el.slots.default.map(element => {
    expect(el.default_container.current!.contains(element)).toBeTruthy()
  })
  expect(el.slot_container.current!.contains(el.slots.slot)).toBeTruthy();
})
