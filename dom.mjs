import { JSDOM } from "jsdom";

const { window } = new JSDOM('<!doctype HTML><html><body></body></html>')
console.log(window.customElements)
global.window = window;
global.customElements = window.customElements;
global.document = window.document;
global.navigator = window.navigator;
