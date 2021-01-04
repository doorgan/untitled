function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var umap = function umap(_) {
  return {
    // About: get: _.get.bind(_)
    // It looks like WebKit/Safari didn't optimize bind at all,
    // so that using bind slows it down by 60%.
    // Firefox and Chrome are just fine in both cases,
    // so let's use the approach that works fast everywhere 👍
    get: function get(key) {
      return _.get(key);
    },
    set: function set(key, value) {
      return _.set(key, value), value;
    }
  };
};

var attr = /([^\s\\>"'=]+)\s*=\s*(['"]?)$/;
var empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
var node = /<[a-z][^>]+$/i;
var notNode = />[^<>]*$/;
var selfClosing = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/ig;
var trimEnd = /\s+$/;

var isNode = function isNode(template, i) {
  return 0 < i-- && (node.test(template[i]) || !notNode.test(template[i]) && isNode(template, i));
};

var regular = function regular(original, name, extra) {
  return empty.test(name) ? original : "<".concat(name).concat(extra.replace(trimEnd, ''), "></").concat(name, ">");
};

var instrument = function instrument(template, prefix, svg) {
  var text = [];
  var length = template.length;

  var _loop = function _loop(i) {
    var chunk = template[i - 1];
    text.push(attr.test(chunk) && isNode(template, i) ? chunk.replace(attr, function (_, $1, $2) {
      return "".concat(prefix).concat(i - 1, "=").concat($2 || '"').concat($1).concat($2 ? '' : '"');
    }) : "".concat(chunk, "<!--").concat(prefix).concat(i - 1, "-->"));
  };

  for (var i = 1; i < length; i++) {
    _loop(i);
  }

  text.push(template[length - 1]);
  var output = text.join('').trim();
  return svg ? output : output.replace(selfClosing, regular);
};

var isArray = Array.isArray;
var _ref = [],
    indexOf = _ref.indexOf,
    slice = _ref.slice;
var ELEMENT_NODE = 1;
var nodeType = 111;

var remove = function remove(_ref2) {
  var firstChild = _ref2.firstChild,
      lastChild = _ref2.lastChild;
  var range = document.createRange();
  range.setStartAfter(firstChild);
  range.setEndAfter(lastChild);
  range.deleteContents();
  return firstChild;
};

var diffable = function diffable(node, operation) {
  return node.nodeType === nodeType ? 1 / operation < 0 ? operation ? remove(node) : node.lastChild : operation ? node.valueOf() : node.firstChild : node;
};

var persistent = function persistent(fragment) {
  var childNodes = fragment.childNodes;
  var length = childNodes.length;
  if (length < 2) return length ? childNodes[0] : fragment;
  var nodes = slice.call(childNodes, 0);
  var firstChild = nodes[0];
  var lastChild = nodes[length - 1];
  return {
    ELEMENT_NODE: ELEMENT_NODE,
    nodeType: nodeType,
    firstChild: firstChild,
    lastChild: lastChild,
    valueOf: function valueOf() {
      if (childNodes.length !== length) {
        var i = 0;

        while (i < length) {
          fragment.appendChild(nodes[i++]);
        }
      }

      return fragment;
    }
  };
};
/**
 * ISC License
 *
 * Copyright (c) 2020, Andrea Giammarchi, @WebReflection
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
 * OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */

/**
 * @param {Node} parentNode The container where children live
 * @param {Node[]} a The list of current/live children
 * @param {Node[]} b The list of future children
 * @param {(entry: Node, action: number) => Node} get
 * The callback invoked per each entry related DOM operation.
 * @param {Node} [before] The optional node used as anchor to insert before.
 * @returns {Node[]} The same list of future children.
 */


var udomdiff = function udomdiff(parentNode, a, b, get, before) {
  var bLength = b.length;
  var aEnd = a.length;
  var bEnd = bLength;
  var aStart = 0;
  var bStart = 0;
  var map = null;

  while (aStart < aEnd || bStart < bEnd) {
    // append head, tail, or nodes in between: fast path
    if (aEnd === aStart) {
      // we could be in a situation where the rest of nodes that
      // need to be added are not at the end, and in such case
      // the node to `insertBefore`, if the index is more than 0
      // must be retrieved, otherwise it's gonna be the first item.
      var _node = bEnd < bLength ? bStart ? get(b[bStart - 1], -0).nextSibling : get(b[bEnd - bStart], 0) : before;

      while (bStart < bEnd) {
        parentNode.insertBefore(get(b[bStart++], 1), _node);
      }
    } // remove head or tail: fast path
    else if (bEnd === bStart) {
        while (aStart < aEnd) {
          // remove the node only if it's unknown or not live
          if (!map || !map.has(a[aStart])) parentNode.removeChild(get(a[aStart], -1));
          aStart++;
        }
      } // same node: fast path
      else if (a[aStart] === b[bStart]) {
          aStart++;
          bStart++;
        } // same tail: fast path
        else if (a[aEnd - 1] === b[bEnd - 1]) {
            aEnd--;
            bEnd--;
          } // The once here single last swap "fast path" has been removed in v1.1.0
          // https://github.com/WebReflection/udomdiff/blob/single-final-swap/esm/index.js#L69-L85
          // reverse swap: also fast path
          else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
              // this is a "shrink" operation that could happen in these cases:
              // [1, 2, 3, 4, 5]
              // [1, 4, 3, 2, 5]
              // or asymmetric too
              // [1, 2, 3, 4, 5]
              // [1, 2, 3, 5, 6, 4]
              var _node2 = get(a[--aEnd], -1).nextSibling;
              parentNode.insertBefore(get(b[bStart++], 1), get(a[aStart++], -1).nextSibling);
              parentNode.insertBefore(get(b[--bEnd], 1), _node2); // mark the future index as identical (yeah, it's dirty, but cheap 👍)
              // The main reason to do this, is that when a[aEnd] will be reached,
              // the loop will likely be on the fast path, as identical to b[bEnd].
              // In the best case scenario, the next loop will skip the tail,
              // but in the worst one, this node will be considered as already
              // processed, bailing out pretty quickly from the map index check

              a[aEnd] = b[bEnd];
            } // map based fallback, "slow" path
            else {
                // the map requires an O(bEnd - bStart) operation once
                // to store all future nodes indexes for later purposes.
                // In the worst case scenario, this is a full O(N) cost,
                // and such scenario happens at least when all nodes are different,
                // but also if both first and last items of the lists are different
                if (!map) {
                  map = new Map();
                  var i = bStart;

                  while (i < bEnd) {
                    map.set(b[i], i++);
                  }
                } // if it's a future node, hence it needs some handling


                if (map.has(a[aStart])) {
                  // grab the index of such node, 'cause it might have been processed
                  var _index = map.get(a[aStart]); // if it's not already processed, look on demand for the next LCS


                  if (bStart < _index && _index < bEnd) {
                    var _i = aStart; // counts the amount of nodes that are the same in the future

                    var sequence = 1;

                    while (++_i < aEnd && _i < bEnd && map.get(a[_i]) === _index + sequence) {
                      sequence++;
                    } // effort decision here: if the sequence is longer than replaces
                    // needed to reach such sequence, which would brings again this loop
                    // to the fast path, prepend the difference before a sequence,
                    // and move only the future list index forward, so that aStart
                    // and bStart will be aligned again, hence on the fast path.
                    // An example considering aStart and bStart are both 0:
                    // a: [1, 2, 3, 4]
                    // b: [7, 1, 2, 3, 6]
                    // this would place 7 before 1 and, from that time on, 1, 2, and 3
                    // will be processed at zero cost


                    if (sequence > _index - bStart) {
                      var _node3 = get(a[aStart], 0);

                      while (bStart < _index) {
                        parentNode.insertBefore(get(b[bStart++], 1), _node3);
                      }
                    } // if the effort wasn't good enough, fallback to a replace,
                    // moving both source and target indexes forward, hoping that some
                    // similar node will be found later on, to go back to the fast path
                    else {
                        parentNode.replaceChild(get(b[bStart++], 1), get(a[aStart++], -1));
                      }
                  } // otherwise move the source forward, 'cause there's nothing to do
                  else aStart++;
                } // this node has no meaning in the future list, so it's more than safe
                // to remove it, and check the next live node out instead, meaning
                // that only the live list index should be forwarded
                else parentNode.removeChild(get(a[aStart++], -1));
              }
  }

  return b;
};

var aria = function aria(node) {
  return function (values) {
    for (var key in values) {
      var name = key === 'role' ? key : "aria-".concat(key);
      var value = values[key];
      if (value == null) node.removeAttribute(name);else node.setAttribute(name, value);
    }
  };
};

var attribute = function attribute(node, name) {
  var oldValue,
      orphan = true;
  var attributeNode = document.createAttributeNS(null, name);
  return function (newValue) {
    if (oldValue !== newValue) {
      oldValue = newValue;

      if (oldValue == null) {
        if (!orphan) {
          node.removeAttributeNode(attributeNode);
          orphan = true;
        }
      } else {
        attributeNode.value = newValue;

        if (orphan) {
          node.setAttributeNodeNS(attributeNode);
          orphan = false;
        }
      }
    }
  };
};

var data = function data(_ref3) {
  var dataset = _ref3.dataset;
  return function (values) {
    for (var key in values) {
      var value = values[key];
      if (value == null) delete dataset[key];else dataset[key] = value;
    }
  };
};

var event = function event(node, name) {
  var oldValue,
      type = name.slice(2);
  if (!(name in node) && name.toLowerCase() in node) type = type.toLowerCase();
  return function (newValue) {
    var info = isArray(newValue) ? newValue : [newValue, false];

    if (oldValue !== info[0]) {
      if (oldValue) node.removeEventListener(type, oldValue, info[1]);
      if (oldValue = info[0]) node.addEventListener(type, oldValue, info[1]);
    }
  };
};

var ref = function ref(node) {
  return function (value) {
    if (typeof value === 'function') value(node);else value.current = node;
  };
};

var setter = function setter(node, key) {
  return function (value) {
    node[key] = value;
  };
};

var text = function text(node) {
  var oldValue;
  return function (newValue) {
    if (oldValue != newValue) {
      oldValue = newValue;
      node.textContent = newValue == null ? '' : newValue;
    }
  };
};
/*! (c) Andrea Giammarchi - ISC */


var createContent = function (document) {
  var FRAGMENT = 'fragment';
  var TEMPLATE = 'template';
  var HAS_CONTENT = ('content' in create(TEMPLATE));
  var createHTML = HAS_CONTENT ? function (html) {
    var template = create(TEMPLATE);
    template.innerHTML = html;
    return template.content;
  } : function (html) {
    var content = create(FRAGMENT);
    var template = create(TEMPLATE);
    var childNodes = null;

    if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
      var selector = RegExp.$1;
      template.innerHTML = '<table>' + html + '</table>';
      childNodes = template.querySelectorAll(selector);
    } else {
      template.innerHTML = html;
      childNodes = template.childNodes;
    }

    append(content, childNodes);
    return content;
  };
  return function createContent(markup, type) {
    return (type === 'svg' ? createSVG : createHTML)(markup);
  };

  function append(root, childNodes) {
    var length = childNodes.length;

    while (length--) {
      root.appendChild(childNodes[0]);
    }
  }

  function create(element) {
    return element === FRAGMENT ? document.createDocumentFragment() : document.createElementNS('http://www.w3.org/1999/xhtml', element);
  } // it could use createElementNS when hasNode is there
  // but this fallback is equally fast and easier to maintain
  // it is also battle tested already in all IE


  function createSVG(svg) {
    var content = create(FRAGMENT);
    var template = create('div');
    template.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>';
    append(content, template.firstChild.childNodes);
    return content;
  }
}(document); // from a generic path, retrieves the exact targeted node


var reducePath = function reducePath(_ref4, i) {
  var childNodes = _ref4.childNodes;
  return childNodes[i];
}; // from a fragment container, create an array of indexes
// related to its child nodes, so that it's possible
// to retrieve later on exact node via reducePath


var createPath = function createPath(node) {
  var path = [];
  var _node4 = node,
      parentNode = _node4.parentNode;

  while (parentNode) {
    path.push(indexOf.call(parentNode.childNodes, node));
    node = parentNode;
    parentNode = node.parentNode;
  }

  return path;
};

var _document = document,
    createTreeWalker = _document.createTreeWalker,
    importNode = _document.importNode; // this "hack" tells the library if the browser is IE11 or old Edge

var isImportNodeLengthWrong = importNode.length != 1; // IE11 and old Edge discard empty nodes when cloning, potentially
// resulting in broken paths to find updates. The workaround here
// is to import once, upfront, the fragment that will be cloned
// later on, so that paths are retrieved from one already parsed,
// hence without missing child nodes once re-cloned.

var createFragment = isImportNodeLengthWrong ? function (text, type) {
  return importNode.call(document, createContent(text, type), true);
} : createContent; // IE11 and old Edge have a different createTreeWalker signature that
// has been deprecated in other browsers. This export is needed only
// to guarantee the TreeWalker doesn't show warnings and, ultimately, works

var createWalker = isImportNodeLengthWrong ? function (fragment) {
  return createTreeWalker.call(document, fragment, 1 | 128, null, false);
} : function (fragment) {
  return createTreeWalker.call(document, fragment, 1 | 128);
}; // this helper avoid code bloat around handleAnything() callback

var diff = function diff(comment, oldNodes, newNodes) {
  return udomdiff(comment.parentNode, // TODO: there is a possible edge case where a node has been
  //       removed manually, or it was a keyed one, attached
  //       to a shared reference between renders.
  //       In this case udomdiff might fail at removing such node
  //       as its parent won't be the expected one.
  //       The best way to avoid this issue is to filter oldNodes
  //       in search of those not live, or not in the current parent
  //       anymore, but this would require both a change to uwire,
  //       exposing a parentNode from the firstChild, as example,
  //       but also a filter per each diff that should exclude nodes
  //       that are not in there, penalizing performance quite a lot.
  //       As this has been also a potential issue with domdiff,
  //       and both lighterhtml and hyperHTML might fail with this
  //       very specific edge case, I might as well document this possible
  //       "diffing shenanigan" and call it a day.
  oldNodes, newNodes, diffable, comment);
}; // if an interpolation represents a comment, the whole
// diffing will be related to such comment.
// This helper is in charge of understanding how the new
// content for such interpolation/hole should be updated


var handleAnything = function handleAnything(comment) {
  var oldValue,
      text,
      nodes = [];

  var anyContent = function anyContent(newValue) {
    switch (_typeof(newValue)) {
      // primitives are handled as text content
      case 'string':
      case 'number':
      case 'boolean':
        if (oldValue !== newValue) {
          oldValue = newValue;
          if (text) text.textContent = newValue;else text = document.createTextNode(newValue);
          nodes = diff(comment, nodes, [text]);
        }

        break;
      // null, and undefined are used to cleanup previous content

      case 'object':
      case 'undefined':
        if (newValue == null) {
          if (oldValue != newValue) {
            oldValue = newValue;
            nodes = diff(comment, nodes, []);
          }

          break;
        } // arrays and nodes have a special treatment


        if (isArray(newValue)) {
          oldValue = newValue; // arrays can be used to cleanup, if empty

          if (newValue.length === 0) nodes = diff(comment, nodes, []); // or diffed, if these contains nodes or "wires"
          else if (_typeof(newValue[0]) === 'object') nodes = diff(comment, nodes, newValue); // in all other cases the content is stringified as is
            else anyContent(String(newValue));
          break;
        } // if the new value is a DOM node, or a wire, and it's
        // different from the one already live, then it's diffed.
        // if the node is a fragment, it's appended once via its childNodes
        // There is no `else` here, meaning if the content
        // is not expected one, nothing happens, as easy as that.


        if ('ELEMENT_NODE' in newValue && oldValue !== newValue) {
          oldValue = newValue;
          nodes = diff(comment, nodes, newValue.nodeType === 11 ? slice.call(newValue.childNodes) : [newValue]);
        }

    }
  };

  return anyContent;
}; // attributes can be:
//  * ref=${...}      for hooks and other purposes
//  * aria=${...}     for aria attributes
//  * .dataset=${...} for dataset related attributes
//  * .setter=${...}  for Custom Elements setters or nodes with setters
//                    such as buttons, details, options, select, etc
//  * onevent=${...}  to automatically handle event listeners
//  * generic=${...}  to handle an attribute just like an attribute


var handleAttribute = function handleAttribute(node, name
/*, svg*/
) {
  if (name === 'ref') return ref(node);
  if (name === 'aria') return aria(node);
  if (name === '.dataset') return data(node);
  if (name.slice(0, 1) === '.') return setter(node, name.slice(1));
  if (name.slice(0, 2) === 'on') return event(node, name);
  return attribute(node, name
  /*, svg*/
  );
}; // each mapped update carries the update type and its path
// the type is either node, attribute, or text, while
// the path is how to retrieve the related node to update.
// In the attribute case, the attribute name is also carried along.


function handlers(options) {
  var type = options.type,
      path = options.path;
  var node = path.reduceRight(reducePath, this);
  return type === 'node' ? handleAnything(node) : type === 'attr' ? handleAttribute(node, options.name
  /*, options.svg*/
  ) : text(node);
} // the prefix is used to identify either comments, attributes, or nodes
// that contain the related unique id. In the attribute cases
// isµX="attribute-name" will be used to map current X update to that
// attribute name, while comments will be like <!--isµX-->, to map
// the update to that specific comment node, hence its parent.
// style and textarea will have <!--isµX--> text content, and are handled
// directly through text-only updates.


var prefix = 'isµ'; // Template Literals are unique per scope and static, meaning a template
// should be parsed once, and once only, as it will always represent the same
// content, within the exact same amount of updates each time.
// This cache relates each template to its unique content and updates.

var cache = umap(new WeakMap());

var createCache = function createCache() {
  return {
    stack: [],
    // each template gets a stack for each interpolation "hole"
    entry: null,
    // each entry contains details, such as:
    //  * the template that is representing
    //  * the type of node it represents (html or svg)
    //  * the content fragment with all nodes
    //  * the list of updates per each node (template holes)
    //  * the "wired" node or fragment that will get updates
    // if the template or type are different from the previous one
    // the entry gets re-created each time
    wire: null // each rendered node represent some wired content and
    // this reference to the latest one. If different, the node
    // will be cleaned up and the new "wire" will be appended

  };
}; // the entry stored in the rendered node cache, and per each "hole"


var createEntry = function createEntry(type, template) {
  var _mapUpdates = mapUpdates(type, template),
      content = _mapUpdates.content,
      updates = _mapUpdates.updates;

  return {
    type: type,
    template: template,
    content: content,
    updates: updates,
    wire: null
  };
}; // a template is instrumented to be able to retrieve where updates are needed.
// Each unique template becomes a fragment, cloned once per each other
// operation based on the same template, i.e. data => html`<p>${data}</p>`


var mapTemplate = function mapTemplate(type, template) {
  var text = instrument(template, prefix, type === 'svg');
  var content = createFragment(text, type); // once instrumented and reproduced as fragment, it's crawled
  // to find out where each update is in the fragment tree

  var tw = createWalker(content);
  var nodes = [];
  var length = template.length - 1;
  var i = 0; // updates are searched via unique names, linearly increased across the tree
  // <div isµ0="attr" isµ1="other"><!--isµ2--><style><!--isµ3--</style></div>

  var search = "".concat(prefix).concat(i);

  while (i < length) {
    var _node5 = tw.nextNode(); // if not all updates are bound but there's nothing else to crawl
    // it means that there is something wrong with the template.


    if (!_node5) throw "bad template: ".concat(text); // if the current node is a comment, and it contains isµX
    // it means the update should take care of any content

    if (_node5.nodeType === 8) {
      // The only comments to be considered are those
      // which content is exactly the same as the searched one.
      if (_node5.textContent === search) {
        nodes.push({
          type: 'node',
          path: createPath(_node5)
        });
        search = "".concat(prefix).concat(++i);
      }
    } else {
      // if the node is not a comment, loop through all its attributes
      // named isµX and relate attribute updates to this node and the
      // attribute name, retrieved through node.getAttribute("isµX")
      // the isµX attribute will be removed as irrelevant for the layout
      // let svg = -1;
      while (_node5.hasAttribute(search)) {
        nodes.push({
          type: 'attr',
          path: createPath(_node5),
          name: _node5.getAttribute(search) //svg: svg < 0 ? (svg = ('ownerSVGElement' in node ? 1 : 0)) : svg

        });

        _node5.removeAttribute(search);

        search = "".concat(prefix).concat(++i);
      } // if the node was a style or a textarea one, check its content
      // and if it is <!--isµX--> then update tex-only this node


      if (/^(?:style|textarea)$/i.test(_node5.tagName) && _node5.textContent.trim() === "<!--".concat(search, "-->")) {
        _node5.textContent = '';
        nodes.push({
          type: 'text',
          path: createPath(_node5)
        });
        search = "".concat(prefix).concat(++i);
      }
    }
  } // once all nodes to update, or their attributes, are known, the content
  // will be cloned in the future to represent the template, and all updates
  // related to such content retrieved right away without needing to re-crawl
  // the exact same template, and its content, more than once.


  return {
    content: content,
    nodes: nodes
  };
}; // if a template is unknown, perform the previous mapping, otherwise grab
// its details such as the fragment with all nodes, and updates info.


var mapUpdates = function mapUpdates(type, template) {
  var _ref5 = cache.get(template) || cache.set(template, mapTemplate(type, template)),
      content = _ref5.content,
      nodes = _ref5.nodes; // clone deeply the fragment


  var fragment = importNode.call(document, content, true); // and relate an update handler per each node that needs one

  var updates = nodes.map(handlers, fragment); // return the fragment and all updates to use within its nodes

  return {
    content: fragment,
    updates: updates
  };
}; // as html and svg can be nested calls, but no parent node is known
// until rendered somewhere, the unroll operation is needed to
// discover what to do with each interpolation, which will result
// into an update operation.


var unroll = function unroll(info, _ref6) {
  var type = _ref6.type,
      template = _ref6.template,
      values = _ref6.values;
  var length = values.length; // interpolations can contain holes and arrays, so these need
  // to be recursively discovered

  unrollValues(info, values, length);
  var entry = info.entry; // if the cache entry is either null or different from the template
  // and the type this unroll should resolve, create a new entry
  // assigning a new content fragment and the list of updates.

  if (!entry || entry.template !== template || entry.type !== type) info.entry = entry = createEntry(type, template);
  var _entry = entry,
      content = _entry.content,
      updates = _entry.updates,
      wire = _entry.wire; // even if the fragment and its nodes is not live yet,
  // it is already possible to update via interpolations values.

  for (var i = 0; i < length; i++) {
    updates[i](values[i]);
  } // if the entry was new, or representing a different template or type,
  // create a new persistent entity to use during diffing.
  // This is simply a DOM node, when the template has a single container,
  // as in `<p></p>`, or a "wire" in `<p></p><p></p>` and similar cases.


  return wire || (entry.wire = persistent(content));
}; // the stack retains, per each interpolation value, the cache
// related to each interpolation value, or null, if the render
// was conditional and the value is not special (Array or Hole)


var unrollValues = function unrollValues(_ref7, values, length) {
  var stack = _ref7.stack;

  for (var i = 0; i < length; i++) {
    var hole = values[i]; // each Hole gets unrolled and re-assigned as value
    // so that domdiff will deal with a node/wire, not with a hole

    if (hole instanceof Hole) values[i] = unroll(stack[i] || (stack[i] = createCache()), hole); // arrays are recursively resolved so that each entry will contain
    // also a DOM node or a wire, hence it can be diffed if/when needed
    else if (isArray(hole)) unrollValues(stack[i] || (stack[i] = createCache()), hole, hole.length); // if the value is nothing special, the stack doesn't need to retain data
      // this is useful also to cleanup previously retained data, if the value
      // was a Hole, or an Array, but not anymore, i.e.:
      // const update = content => html`<div>${content}</div>`;
      // update(listOfItems); update(null); update(html`hole`)
      else stack[i] = null;
  }

  if (length < stack.length) stack.splice(length);
};
/**
 * Holds all details wrappers needed to render the content further on.
 * @constructor
 * @param {string} type The hole type, either `html` or `svg`.
 * @param {string[]} template The template literals used to the define the content.
 * @param {Array} values Zero, one, or more interpolated values to render.
 */


function Hole(type, template, values) {
  this.type = type;
  this.template = template;
  this.values = values;
}

var create = Object.create,
    defineProperties = Object.defineProperties; // both `html` and `svg` template literal tags are polluted
// with a `for(ref[, id])` and a `node` tag too

var tag = function tag(type) {
  // both `html` and `svg` tags have their own cache
  var keyed = umap(new WeakMap()); // keyed operations always re-use the same cache and unroll
  // the template and its interpolations right away

  var fixed = function fixed(cache) {
    return function (template) {
      for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
      }

      return unroll(cache, {
        type: type,
        template: template,
        values: values
      });
    };
  };

  return defineProperties( // non keyed operations are recognized as instance of Hole
  // during the "unroll", recursively resolved and updated
  function (template) {
    for (var _len2 = arguments.length, values = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      values[_key2 - 1] = arguments[_key2];
    }

    return new Hole(type, template, values);
  }, {
    "for": {
      // keyed operations need a reference object, usually the parent node
      // which is showing keyed results, and optionally a unique id per each
      // related node, handy with JSON results and mutable list of objects
      // that usually carry a unique identifier
      value: function value(ref, id) {
        var memo = keyed.get(ref) || keyed.set(ref, create(null));
        return memo[id] || (memo[id] = fixed(createCache()));
      }
    },
    node: {
      // it is possible to create one-off content out of the box via node tag
      // this might return the single created node, or a fragment with all
      // nodes present at the root level and, of course, their child nodes
      value: function value(template) {
        for (var _len3 = arguments.length, values = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          values[_key3 - 1] = arguments[_key3];
        }

        return unroll(createCache(), {
          type: type,
          template: template,
          values: values
        }).valueOf();
      }
    }
  });
}; // each rendered node gets its own cache


var cache$1 = umap(new WeakMap()); // rendering means understanding what `html` or `svg` tags returned
// and it relates a specific node to its own unique cache.
// Each time the content to render changes, the node is cleaned up
// and the new new content is appended, and if such content is a Hole
// then it's "unrolled" to resolve all its inner nodes.

var render = function render(where, what) {
  var hole = typeof what === 'function' ? what() : what;
  var info = cache$1.get(where) || cache$1.set(where, createCache());
  var wire = hole instanceof Hole ? unroll(info, hole) : hole;

  if (wire !== info.wire) {
    info.wire = wire;
    where.textContent = ''; // valueOf() simply returns the node itself, but in case it was a "wire"
    // it will eventually re-append all nodes to its fragment so that such
    // fragment can be re-appended many times in a meaningful way
    // (wires are basically persistent fragments facades with special behavior)

    where.appendChild(wire.valueOf());
  }

  return where;
};

var html = tag('html');
var svg = tag('svg');

function index(t) {
  for (var s = t[0], i = 1, l = arguments.length; i < l; i++) {
    s += arguments[i] + t[i];
  }

  return s;
}

function _arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function () {
        return fn.apply(this, arguments);
      };

    case 1:
      return function (a0) {
        return fn.apply(this, arguments);
      };

    case 2:
      return function (a0, a1) {
        return fn.apply(this, arguments);
      };

    case 3:
      return function (a0, a1, a2) {
        return fn.apply(this, arguments);
      };

    case 4:
      return function (a0, a1, a2, a3) {
        return fn.apply(this, arguments);
      };

    case 5:
      return function (a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments);
      };

    case 6:
      return function (a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments);
      };

    case 7:
      return function (a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments);
      };

    case 8:
      return function (a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments);
      };

    case 9:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments);
      };

    case 10:
      return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments);
      };

    default:
      throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
  }
}

var _arity_1 = _arity;

function _isPlaceholder(a) {
  return a != null && _typeof(a) === 'object' && a['@@functional/placeholder'] === true;
}

var _isPlaceholder_1 = _isPlaceholder;
/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder_1(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

var _curry1_1 = _curry1;
/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return _isPlaceholder_1(a) ? f2 : _curry1_1(function (_b) {
          return fn(a, _b);
        });

      default:
        return _isPlaceholder_1(a) && _isPlaceholder_1(b) ? f2 : _isPlaceholder_1(a) ? _curry1_1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder_1(b) ? _curry1_1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

var _curry2_1 = _curry2;
/**
 * Internal curryN function.
 *
 * @private
 * @category Function
 * @param {Number} length The arity of the curried function.
 * @param {Array} received An array of arguments received thus far.
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */

function _curryN(length, received, fn) {
  return function () {
    var combined = [];
    var argsIdx = 0;
    var left = length;
    var combinedIdx = 0;

    while (combinedIdx < received.length || argsIdx < arguments.length) {
      var result;

      if (combinedIdx < received.length && (!_isPlaceholder_1(received[combinedIdx]) || argsIdx >= arguments.length)) {
        result = received[combinedIdx];
      } else {
        result = arguments[argsIdx];
        argsIdx += 1;
      }

      combined[combinedIdx] = result;

      if (!_isPlaceholder_1(result)) {
        left -= 1;
      }

      combinedIdx += 1;
    }

    return left <= 0 ? fn.apply(this, combined) : _arity_1(left, _curryN(length, combined, fn));
  };
}

var _curryN_1 = _curryN;
/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. The curried function has two unusual capabilities. First, its
 * arguments needn't be provided one at a time. If `g` is `R.curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * Secondly, the special placeholder value [`R.__`](#__) may be used to specify
 * "gaps", allowing partial application of any combination of arguments,
 * regardless of their positions. If `g` is as above and `_` is [`R.__`](#__),
 * the following are equivalent:
 *
 *   - `g(1, 2, 3)`
 *   - `g(_, 2, 3)(1)`
 *   - `g(_, _, 3)(1)(2)`
 *   - `g(_, _, 3)(1, 2)`
 *   - `g(_, 2)(1)(3)`
 *   - `g(_, 2)(1, 3)`
 *   - `g(_, 2)(_, 3)(1)`
 *
 * @func
 * @memberOf R
 * @since v0.5.0
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} length The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var sumArgs = (...args) => R.sum(args);
 *
 *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */

var curryN = /*#__PURE__*/_curry2_1(function curryN(length, fn) {
  if (length === 1) {
    return _curry1_1(fn);
  }

  return _arity_1(length, _curryN_1(length, [], fn));
});

var curryN_1 = curryN; // Utility

function isFunction(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
}

function trueFn() {
  return true;
} // Globals


var toUpdate = [];
var inStream;
var order = [];
var orderNextIdx = -1;
var flushingUpdateQueue = false;
var flushingStreamValue = false;

function flushing() {
  return flushingUpdateQueue || flushingStreamValue;
}
/** @namespace */


var flyd = {}; // /////////////////////////// API ///////////////////////////////// //

/**
 * Creates a new stream
 *
 * __Signature__: `a -> Stream a`
 *
 * @name flyd.stream
 * @param {*} initialValue - (Optional) the initial value of the stream
 * @return {stream} the stream
 *
 * @example
 * var n = flyd.stream(1); // Stream with initial value `1`
 * var s = flyd.stream(); // Stream with no initial value
 */

flyd.stream = function (initialValue) {
  var endStream = createDependentStream([], trueFn);
  var s = createStream();
  s.end = endStream;
  s.fnArgs = [];
  endStream.listeners.push(s);
  if (arguments.length > 0) s(initialValue);
  return s;
}; // fantasy-land Applicative


flyd.stream['fantasy-land/of'] = flyd.stream.of = flyd.stream;
/**
 * Create a new dependent stream
 *
 * __Signature__: `(...Stream * -> Stream b -> b) -> [Stream *] -> Stream b`
 *
 * @name flyd.combine
 * @param {Function} fn - the function used to combine the streams
 * @param {Array<stream>} dependencies - the streams that this one depends on
 * @return {stream} the dependent stream
 *
 * @example
 * var n1 = flyd.stream(0);
 * var n2 = flyd.stream(0);
 * var max = flyd.combine(function(n1, n2, self, changed) {
 *   return n1() > n2() ? n1() : n2();
 * }, [n1, n2]);
 */

flyd.combine = curryN_1(2, combine);

function combine(fn, streams) {
  var i, s, deps, depEndStreams;
  var endStream = createDependentStream([], trueFn);
  deps = [];
  depEndStreams = [];

  for (i = 0; i < streams.length; ++i) {
    if (streams[i] !== undefined) {
      deps.push(streams[i]);
      if (streams[i].end !== undefined) depEndStreams.push(streams[i].end);
    }
  }

  s = createDependentStream(deps, fn);
  s.depsChanged = [];
  s.fnArgs = s.deps.concat([s, s.depsChanged]);
  s.end = endStream;
  endStream.listeners.push(s);
  addListeners(depEndStreams, endStream);
  endStream.deps = depEndStreams;
  updateStream(s);
  return s;
}
/**
 * Returns `true` if the supplied argument is a Flyd stream and `false` otherwise.
 *
 * __Signature__: `* -> Boolean`
 *
 * @name flyd.isStream
 * @param {*} value - the value to test
 * @return {Boolean} `true` if is a Flyd streamn, `false` otherwise
 *
 * @example
 * var s = flyd.stream(1);
 * var n = 1;
 * flyd.isStream(s); //=> true
 * flyd.isStream(n); //=> false
 */


flyd.isStream = function (stream) {
  return isFunction(stream) && 'hasVal' in stream;
};
/**
 * Invokes the body (the function to calculate the value) of a dependent stream
 *
 * By default the body of a dependent stream is only called when all the streams
 * upon which it depends has a value. `immediate` can circumvent this behaviour.
 * It immediately invokes the body of a dependent stream.
 *
 * __Signature__: `Stream a -> Stream a`
 *
 * @name flyd.immediate
 * @param {stream} stream - the dependent stream
 * @return {stream} the same stream
 *
 * @example
 * var s = flyd.stream();
 * var hasItems = flyd.immediate(flyd.combine(function(s) {
 *   return s() !== undefined && s().length > 0;
 * }, [s]);
 * console.log(hasItems()); // logs `false`. Had `immediate` not been
 *                          // used `hasItems()` would've returned `undefined`
 * s([1]);
 * console.log(hasItems()); // logs `true`.
 * s([]);
 * console.log(hasItems()); // logs `false`.
 */


flyd.immediate = function (s) {
  if (s.depsMet === false) {
    s.depsMet = true;
    updateStream(s);
  }

  return s;
};
/**
 * Changes which `endsStream` should trigger the ending of `s`.
 *
 * __Signature__: `Stream a -> Stream b -> Stream b`
 *
 * @name flyd.endsOn
 * @param {stream} endStream - the stream to trigger the ending
 * @param {stream} stream - the stream to be ended by the endStream
 * @param {stream} the stream modified to be ended by endStream
 *
 * @example
 * var n = flyd.stream(1);
 * var killer = flyd.stream();
 * // `double` ends when `n` ends or when `killer` emits any value
 * var double = flyd.endsOn(flyd.merge(n.end, killer), flyd.combine(function(n) {
 *   return 2 * n();
 * }, [n]);
*/


flyd.endsOn = function (endS, s) {
  detachDeps(s.end);
  endS.listeners.push(s.end);
  s.end.deps.push(endS);
  return s;
};
/**
 * Map a stream
 *
 * Returns a new stream consisting of every value from `s` passed through
 * `fn`. I.e. `map` creates a new stream that listens to `s` and
 * applies `fn` to every new value.
 * __Signature__: `(a -> result) -> Stream a -> Stream result`
 *
 * @name flyd.map
 * @param {Function} fn - the function that produces the elements of the new stream
 * @param {stream} stream - the stream to map
 * @return {stream} a new stream with the mapped values
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = flyd.map(function(n) { return n*n; }, numbers);
 */
// Library functions use self callback to accept (null, undefined) update triggers.


function map(f, s) {
  return combine(function (s, self) {
    self(f(s.val));
  }, [s]);
}

flyd.map = curryN_1(2, map);
/**
 * Chain a stream
 *
 * also known as flatMap
 *
 * Where `fn` returns a stream this function will flatten the resulting streams.
 * Every time `fn` is called the context of the returned stream will "switch" to that stream.
 *
 * __Signature__: `(a -> Stream b) -> Stream a -> Stream b`
 *
 * @name flyd.chain
 * @param {Function} fn - the function that produces the streams to be flattened
 * @param {stream} stream - the stream to map
 * @return {stream} a new stream with the mapped values
 *
 * @example
 * var filter = flyd.stream('who');
 * var items = flyd.chain(function(filter){
 *   return flyd.stream(findUsers(filter));
 * }, filter);
 */

flyd.chain = curryN_1(2, chain);
/**
 * Apply a stream
 *
 * Applies the value in `s2` to the function in `s1`.
 *
 * __Signature__: `Stream (a -> b) -> Stream a -> Stream b`
 *
 * @name flyd.ap
 * @param {stream} s1 - The value to be applied
 * @param {stream} s2 - The function expecting the value
 * @return {stream} a new stream with the mapped values
 *
 * @example
 * var add = stream(a => b => a + b)
 * var n1 = stream(1)
 * var n2 = stream(2)
 *
 * var added = flyd.ap(n2, flyd.ap(n1, add)) // stream(3)
 * // can also be written using pipe
 * var added_pipe = add
 *   .pipe(ap(n1))
 *   .pipe(ap(n2));
 * added_pipe() // 3
 */

flyd.ap = curryN_1(2, ap);
/**
 * Listen to stream events
 *
 * Similar to `map` except that the returned stream is empty. Use `on` for doing
 * side effects in reaction to stream changes. Use the returned stream only if you
 * need to manually end it.
 *
 * __Signature__: `(a -> result) -> Stream a -> Stream undefined`
 *
 * @name flyd.on
 * @param {Function} cb - the callback
 * @param {stream} stream - the stream
 * @return {stream} an empty stream (can be ended)
 */

flyd.on = curryN_1(2, function (f, s) {
  return combine(function (s) {
    f(s.val);
  }, [s]);
});
/**
 * Creates a new stream with the results of calling the function on every incoming
 * stream with and accumulator and the incoming value.
 *
 * __Signature__: `(a -> b -> a) -> a -> Stream b -> Stream a`
 *
 * @name flyd.scan
 * @param {Function} fn - the function to call
 * @param {*} val - the initial value of the accumulator
 * @param {stream} stream - the stream source
 * @return {stream} the new stream
 *
 * @example
 * var numbers = flyd.stream();
 * var sum = flyd.scan(function(sum, n) { return sum+n; }, 0, numbers);
 * numbers(2)(3)(5);
 * sum(); // 10
 */

flyd.scan = curryN_1(3, function (f, acc, s) {
  var ns = combine(function (s, self) {
    self(acc = f(acc, s.val));
  }, [s]);
  if (!ns.hasVal) ns(acc);
  return ns;
});
/**
 * Creates a new stream down which all values from both `stream1` and `stream2`
 * will be sent.
 *
 * __Signature__: `Stream a -> Stream a -> Stream a`
 *
 * @name flyd.merge
 * @param {stream} source1 - one stream to be merged
 * @param {stream} source2 - the other stream to be merged
 * @return {stream} a stream with the values from both sources
 *
 * @example
 * var btn1Clicks = flyd.stream();
 * button1Elm.addEventListener(btn1Clicks);
 * var btn2Clicks = flyd.stream();
 * button2Elm.addEventListener(btn2Clicks);
 * var allClicks = flyd.merge(btn1Clicks, btn2Clicks);
 */

flyd.merge = curryN_1(2, function (s1, s2) {
  var s = flyd.immediate(combine(function (s1, s2, self, changed) {
    if (changed[0]) {
      self(changed[0]());
    } else if (s1.hasVal) {
      self(s1.val);
    } else if (s2.hasVal) {
      self(s2.val);
    }
  }, [s1, s2]));
  flyd.endsOn(combine(function () {
    return true;
  }, [s1.end, s2.end]), s);
  return s;
});
/**
 * Creates a new stream resulting from applying `transducer` to `stream`.
 *
 * __Signature__: `Transducer -> Stream a -> Stream b`
 *
 * @name flyd.transduce
 * @param {Transducer} xform - the transducer transformation
 * @param {stream} source - the stream source
 * @return {stream} the new stream
 *
 * @example
 * var t = require('transducers.js');
 *
 * var results = [];
 * var s1 = flyd.stream();
 * var tx = t.compose(t.map(function(x) { return x * 2; }), t.dedupe());
 * var s2 = flyd.transduce(tx, s1);
 * flyd.combine(function(s2) { results.push(s2()); }, [s2]);
 * s1(1)(1)(2)(3)(3)(3)(4);
 * results; // => [2, 4, 6, 8]
 */

flyd.transduce = curryN_1(2, function (xform, source) {
  xform = xform(new StreamTransformer());
  return combine(function (source, self) {
    var res = xform['@@transducer/step'](undefined, source.val);

    if (res && res['@@transducer/reduced'] === true) {
      self.end(true);
      return res['@@transducer/value'];
    } else {
      return res;
    }
  }, [source]);
});
/**
 * Returns `fn` curried to `n`. Use this function to curry functions exposed by
 * modules for Flyd.
 *
 * @name flyd.curryN
 * @function
 * @param {Integer} arity - the function arity
 * @param {Function} fn - the function to curry
 * @return {Function} the curried function
 *
 * @example
 * function add(x, y) { return x + y; };
 * var a = flyd.curryN(2, add);
 * a(2)(4) // => 6
 */

flyd.curryN = curryN_1;
/**
 * Returns a new stream identical to the original except every
 * value will be passed through `f`.
 *
 * _Note:_ This function is included in order to support the fantasy land
 * specification.
 *
 * __Signature__: Called bound to `Stream a`: `(a -> b) -> Stream b`
 *
 * @name stream.map
 * @param {Function} function - the function to apply
 * @return {stream} a new stream with the values mapped
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = numbers.map(function(n) { return n*n; });
 */

function boundMap(f) {
  return map(f, this);
}
/**
 * Returns the result of applying function `fn` to this stream
 *
 * __Signature__: Called bound to `Stream a`: `(a -> Stream b) -> Stream b`
 *
 * @name stream.pipe
 * @param {Function} fn - the function to apply
 * @return {stream} A new stream
 *
 * @example
 * var numbers = flyd.stream(0);
 * var squaredNumbers = numbers.pipe(flyd.map(function(n){ return n*n; }));
 */


function operator_pipe(f) {
  return f(this);
}

function boundChain(f) {
  return chain(f, this);
}

function chain(f, s) {
  // Internal state to end flat map stream
  var flatEnd = flyd.stream(1);
  var internalEnded = flyd.on(function () {
    var alive = flatEnd() - 1;
    flatEnd(alive);

    if (alive <= 0) {
      flatEnd.end(true);
    }
  });
  internalEnded(s.end);
  var last = flyd.stream();
  var flatStream = flyd.combine(function (s, own) {
    last.end(true); // Our fn stream makes streams

    var newS = f(s());
    flatEnd(flatEnd() + 1);
    internalEnded(newS.end); // Update self on call -- newS is never handed out so deps don't matter

    last = map(own, newS);
  }, [s]);
  flyd.endsOn(flatEnd.end, flatStream);
  return flatStream;
}

flyd.fromPromise = function fromPromise(p) {
  var s = flyd.stream();
  p.then(function (val) {
    s(val);
    s.end(true);
  });
  return s;
};

flyd.flattenPromise = function flattenPromise(s) {
  return combine(function (s, self) {
    s().then(self);
  }, [s]);
};
/**
 * Returns a new stream which is the result of applying the
 * functions from `this` stream to the values in `stream` parameter.
 *
 * `this` stream must be a stream of functions.
 *
 * _Note:_ This function is included in order to support the fantasy land
 * specification.
 *
 * __Signature__: Called bound to `Stream (a -> b)`: `a -> Stream b`
 *
 * @name stream.ap
 * @param {stream} stream - the values stream
 * @return {stream} a new stream with the functions applied to values
 *
 * @example
 * var add = flyd.curryN(2, function(x, y) { return x + y; });
 * var numbers1 = flyd.stream();
 * var numbers2 = flyd.stream();
 * var addToNumbers1 = flyd.map(add, numbers1);
 * var added = addToNumbers1.ap(numbers2);
 */


function ap(s2, s1) {
  return combine(function (s1, s2, self) {
    self(s1.val(s2.val));
  }, [s1, s2]);
}

function boundAp(s2) {
  return ap(s2, this);
}
/**
 * @private
 */


function fantasy_land_ap(s1) {
  return ap(this, s1);
}
/**
 * Get a human readable view of a stream
 * @name stream.toString
 * @return {String} the stream string representation
 */


function streamToString() {
  return 'stream(' + this.val + ')';
}
/**
 * @name stream.end
 * @memberof stream
 * A stream that emits `true` when the stream ends. If `true` is pushed down the
 * stream the parent stream ends.
 */

/**
 * @name stream.of
 * @function
 * @memberof stream
 * Returns a new stream with `value` as its initial value. It is identical to
 * calling `flyd.stream` with one argument.
 *
 * __Signature__: Called bound to `Stream (a)`: `b -> Stream b`
 *
 * @param {*} value - the initial value
 * @return {stream} the new stream
 *
 * @example
 * var n = flyd.stream(1);
 * var m = n.of(1);
 */
// /////////////////////////// PRIVATE ///////////////////////////////// //

/**
 * @private
 * Create a stream with no dependencies and no value
 * @return {Function} a flyd stream
 */


function createStream() {
  function s(n) {
    if (arguments.length === 0) return s.val;
    updateStreamValue(n, s);
    return s;
  }

  s.hasVal = false;
  s.val = undefined;
  s.updaters = [];
  s.listeners = [];
  s.queued = false;
  s.end = undefined; // fantasy-land compatibility

  s.ap = boundAp;
  s['fantasy-land/map'] = s.map = boundMap;
  s['fantasy-land/ap'] = fantasy_land_ap;
  s['fantasy-land/of'] = s.of = flyd.stream;
  s['fantasy-land/chain'] = s.chain = boundChain;
  s.pipe = operator_pipe; // According to the fantasy-land Applicative specification
  // Given a value f, one can access its type representative via the constructor property:
  // `f.constructor.of`

  s.constructor = flyd.stream;

  s.toJSON = function () {
    return s.val;
  };

  s.toString = streamToString;
  return s;
}
/**
 * @private
 * Create a dependent stream
 * @param {Array<stream>} dependencies - an array of the streams
 * @param {Function} fn - the function used to calculate the new stream value
 * from the dependencies
 * @return {stream} the created stream
 */


function createDependentStream(deps, fn) {
  var s = createStream();
  s.fn = fn;
  s.deps = deps;
  s.depsMet = false;
  s.depsChanged = deps.length > 0 ? [] : undefined;
  s.shouldUpdate = false;
  addListeners(deps, s);
  return s;
}
/**
 * @private
 * Check if all the dependencies have values
 * @param {stream} stream - the stream to check depencencies from
 * @return {Boolean} `true` if all dependencies have vales, `false` otherwise
 */


function initialDependenciesMet(stream) {
  stream.depsMet = stream.deps.every(function (s) {
    return s.hasVal;
  });
  return stream.depsMet;
}

function dependenciesAreMet(stream) {
  return stream.depsMet === true || initialDependenciesMet(stream);
}

function isEnded(stream) {
  return stream.end && stream.end.val === true;
}

function listenersNeedUpdating(s) {
  return s.listeners.some(function (s) {
    return s.shouldUpdate;
  });
}
/**
 * @private
 * Update a dependent stream using its dependencies in an atomic way
 * @param {stream} stream - the stream to update
 */


function updateStream(s) {
  if (isEnded(s) || !dependenciesAreMet(s)) return;

  if (inStream !== undefined) {
    updateLaterUsing(updateStream, s);
    return;
  }

  inStream = s;
  if (s.depsChanged) s.fnArgs[s.fnArgs.length - 1] = s.depsChanged;
  var returnVal = s.fn.apply(s.fn, s.fnArgs);

  if (returnVal !== undefined) {
    s(returnVal);
  }

  inStream = undefined;
  if (s.depsChanged !== undefined) s.depsChanged = [];
  s.shouldUpdate = false;
  if (flushing() === false) flushUpdate();

  if (listenersNeedUpdating(s)) {
    if (!flushingStreamValue) s(s.val);else {
      s.listeners.forEach(function (listener) {
        if (listener.shouldUpdate) updateLaterUsing(updateStream, listener);
      });
    }
  }
}
/**
 * @private
 * Update the dependencies of a stream
 * @param {stream} stream
 */


function updateListeners(s) {
  var i, o, list;
  var listeners = s.listeners;

  for (i = 0; i < listeners.length; ++i) {
    list = listeners[i];

    if (list.end === s) {
      endStream(list);
    } else {
      if (list.depsChanged !== undefined) list.depsChanged.push(s);
      list.shouldUpdate = true;
      findDeps(list);
    }
  }

  for (; orderNextIdx >= 0; --orderNextIdx) {
    o = order[orderNextIdx];
    if (o.shouldUpdate === true) updateStream(o);
    o.queued = false;
  }
}
/**
 * @private
 * Add stream dependencies to the global `order` queue.
 * @param {stream} stream
 * @see updateDeps
 */


function findDeps(s) {
  var i;
  var listeners = s.listeners;

  if (s.queued === false) {
    s.queued = true;

    for (i = 0; i < listeners.length; ++i) {
      findDeps(listeners[i]);
    }

    order[++orderNextIdx] = s;
  }
}

function updateLaterUsing(updater, stream) {
  toUpdate.push(stream);
  stream.updaters.push(updater);
  stream.shouldUpdate = true;
}
/**
 * @private
 */


function flushUpdate() {
  flushingUpdateQueue = true;

  while (toUpdate.length > 0) {
    var stream = toUpdate.shift();
    var nextUpdateFn = stream.updaters.shift();
    if (nextUpdateFn && stream.shouldUpdate) nextUpdateFn(stream);
  }

  flushingUpdateQueue = false;
}
/**
 * @private
 * Push down a value into a stream
 * @param {stream} stream
 * @param {*} value
 */


function updateStreamValue(n, s) {
  s.val = n;
  s.hasVal = true;

  if (inStream === undefined) {
    flushingStreamValue = true;
    updateListeners(s);
    if (toUpdate.length > 0) flushUpdate();
    flushingStreamValue = false;
  } else if (inStream === s) {
    markListeners(s, s.listeners);
  } else {
    updateLaterUsing(function (s) {
      updateStreamValue(n, s);
    }, s);
  }
}
/**
 * @private
 */


function markListeners(s, lists) {
  var i, list;

  for (i = 0; i < lists.length; ++i) {
    list = lists[i];

    if (list.end !== s) {
      if (list.depsChanged !== undefined) {
        list.depsChanged.push(s);
      }

      list.shouldUpdate = true;
    } else {
      endStream(list);
    }
  }
}
/**
 * @private
 * Add dependencies to a stream
 * @param {Array<stream>} dependencies
 * @param {stream} stream
 */


function addListeners(deps, s) {
  for (var i = 0; i < deps.length; ++i) {
    deps[i].listeners.push(s);
  }
}
/**
 * @private
 * Removes an stream from a dependency array
 * @param {stream} stream
 * @param {Array<stream>} dependencies
 */


function removeListener(s, listeners) {
  var idx = listeners.indexOf(s);
  listeners[idx] = listeners[listeners.length - 1];
  listeners.length--;
}
/**
 * @private
 * Detach a stream from its dependencies
 * @param {stream} stream
 */


function detachDeps(s) {
  for (var i = 0; i < s.deps.length; ++i) {
    removeListener(s, s.deps[i].listeners);
  }

  s.deps.length = 0;
}
/**
 * @private
 * Ends a stream
 */


function endStream(s) {
  if (s.deps !== undefined) detachDeps(s);
  if (s.end !== undefined) detachDeps(s.end);
}
/**
 * @private
 */

/**
 * @private
 * transducer stream transformer
 */


function StreamTransformer() {}

StreamTransformer.prototype['@@transducer/init'] = function () {};

StreamTransformer.prototype['@@transducer/result'] = function () {};

StreamTransformer.prototype['@@transducer/step'] = function (s, v) {
  return v;
};

var lib = flyd;

var e = Object.assign || function (e, t) {
  return t && Object.keys(t).forEach(function (o) {
    return e[o] = t[o];
  }), e;
},
    t = function t(e, r, s) {
  var c = _typeof(s);

  if (s && "object" === c) {
    if (Array.isArray(s)) {
      var _iterator = _createForOfIteratorHelper(s),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _o = _step.value;
          r = t(e, r, _o);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else for (var _i2 = 0, _Object$keys = Object.keys(s); _i2 < _Object$keys.length; _i2++) {
      var _c = _Object$keys[_i2];
      var f = s[_c];
      "function" == typeof f ? r[_c] = f(r[_c], o) : void 0 === f ? e && !isNaN(_c) ? r.splice(_c, 1) : delete r[_c] : null === f || "object" != _typeof(f) || Array.isArray(f) ? r[_c] = f : "object" == _typeof(r[_c]) ? r[_c] = f === r[_c] ? f : o(r[_c], f) : r[_c] = t(!1, {}, f);
    }
  } else "function" === c && (r = s(r, o));
  return r;
},
    o = function o(_o2) {
  var s = Array.isArray(_o2);

  for (var _len4 = arguments.length, r = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    r[_key4 - 1] = arguments[_key4];
  }

  return t(s, s ? _o2.slice() : e({}, _o2), r);
};

var stream = lib.stream,
    scan = lib.scan;

var store = function store(initial) {
  var update = stream();
  var states = scan(function (state, patch) {
    return o(state, patch);
  }, initial, update);
  return Object.assign(states, {
    update: update
  });
};

var defineProperties$1 = Object.defineProperties,
    keys = Object.keys;

var accessor = function accessor(all, shallow, hook, value, update) {
  return {
    configurable: true,
    get: function get() {
      return value;
    },
    set: function set(_) {
      if (all || _ !== value || shallow && _typeof(_) === 'object' && _) {
        value = _;
        if (hook) update.call(this, value);else update.call(this);
      }
    }
  };
};

var loop = function loop(props, get, all, shallow, useState, update) {
  var desc = {};
  var hook = useState !== noop;
  var args = [all, shallow, hook];

  for (var ke = keys(props), y = 0; y < ke.length; y++) {
    var value = get(props, ke[y]);
    var extras = hook ? useState(value) : [value, useState];
    if (update) extras[1] = update;
    desc[ke[y]] = accessor.apply(null, args.concat(extras));
  }

  return desc;
};

var noop = function noop() {};

var DOMHandler = function DOMHandler() {
  var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref8$all = _ref8.all,
      all = _ref8$all === void 0 ? false : _ref8$all,
      _ref8$shallow = _ref8.shallow,
      shallow = _ref8$shallow === void 0 ? true : _ref8$shallow,
      _ref8$useState = _ref8.useState,
      useState = _ref8$useState === void 0 ? noop : _ref8$useState,
      _ref8$getAttribute = _ref8.getAttribute,
      getAttribute = _ref8$getAttribute === void 0 ? function (element, key) {
    return element.getAttribute(key);
  } : _ref8$getAttribute;

  return function (element, props, update) {
    var value = function value(props, key) {
      var result = props[key],
          type = _typeof(result);

      if (element.hasOwnProperty(key)) {
        result = element[key];
        delete element[key];
      } else if (element.hasAttribute(key)) {
        result = getAttribute(element, key);
        if (type == 'number') result = +result;else if (type == 'boolean') result = !/^(?:false|0|)$/.test(result);
      }

      return result;
    };

    var desc = loop(props, value, all, shallow, useState, update);
    return defineProperties$1(element, desc);
  };
};

var reactive = DOMHandler({
  dom: true
});
/**
 * Creates a reference to be used in templates.
 * If an element has a `ref=${my_ref}` attribute in a template, the
 * `my_ref.current` will be set to that element once it's rendered.
 */

var ref$1 = function ref$1() {
  return {
    current: null
  };
};
/**
 * Tricks typescript so it doesn't complain if you use methods that are added
 * while defining the component.
 *
 * @param superclass The base class to extend, defaults to `HTMLElement`
 */


var Component = function Component() {
  var superclass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : HTMLElement;
  return superclass;
};

var active_streams = new WeakMap();
var ready_elements = new WeakSet();
var updates_schedule = new Set();
/**
 * Defines a custom element component. I will create the definition only once,
 * so subsequent attempts to define an already defined element will result in a
 * noop.
 *
 * @param tag The custom element tag
 * @param definition The custom element definition
 * @param opts
 */

var define = function define(tag, definition) {
  var _temp;

  var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var Class = (_temp = /*#__PURE__*/function (_definition) {
    _inherits(Class, _definition);

    var _super = _createSuper(Class);

    function Class() {
      var _this;

      _classCallCheck(this, Class);

      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "scheduled_render", void 0);

      return _this;
    }

    _createClass(Class, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this2 = this;

        this.connected();
        this.dispatchEvent(new CustomEvent("connected"));
        setTimeout(function () {
          return _this2.ready();
        });
      }
    }, {
      key: "connected",
      value: function connected() {
        if (_get(_getPrototypeOf(Class.prototype), "connected", this)) _get(_getPrototypeOf(Class.prototype), "connected", this).call(this);
      }
    }, {
      key: "disconnected",
      value: function disconnected() {
        if (_get(_getPrototypeOf(Class.prototype), "disconnected", this)) {
          _get(_getPrototypeOf(Class.prototype), "disconnected", this).call(this);
        }
      }
    }, {
      key: "ready",
      value: function ready() {
        var _this3 = this;

        load_slots(this); // @ts-ignore

        if (definition.props) reactive(this, definition.props, function () {
          return schedule_update(_this3);
        });

        if (_get(_getPrototypeOf(Class.prototype), "ready", this)) {
          _get(_getPrototypeOf(Class.prototype), "ready", this).call(this);
        }

        ready_elements.add(this);
        this.dispatchEvent(new CustomEvent("ready"));
        schedule_update(this);
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        var _active_streams$get;

        (_active_streams$get = active_streams.get(this)) === null || _active_streams$get === void 0 ? void 0 : _active_streams$get.forEach(function (stream) {
          stream.end(true);
        });
        active_streams["delete"](this);
        ready_elements["delete"](this);
        this.disconnected();
        this.dispatchEvent(new CustomEvent("disconnected"));
      }
    }, {
      key: "update",
      value: function update() {
        if (_get(_getPrototypeOf(Class.prototype), "update", this)) _get(_getPrototypeOf(Class.prototype), "update", this).call(this);
        this.dispatchEvent(new CustomEvent("updated"));
        this.schedule_render();
      }
    }, {
      key: "schedule_render",
      value: function schedule_render() {
        var _this4 = this;

        if (this.scheduled_render) cancelAnimationFrame(this.scheduled_render);
        this.scheduled_render = requestAnimationFrame(function () {
          _this4.scheduled_render = undefined;

          _this4.performRender();
        });
      }
    }, {
      key: "performRender",
      value: function performRender() {
        if (_get(_getPrototypeOf(Class.prototype), "render", this)) {
          render(this, _get(_getPrototypeOf(Class.prototype), "render", this).call(this));
        }

        this.dispatchEvent(new CustomEvent("rendered"));
      }
    }, {
      key: "handleEvent",
      value: function handleEvent(event) {
        /* istanbul ignore next */
        Reflect.get(this, "handle_".concat(event.type))(event);
      }
    }, {
      key: "useStore",
      value: function useStore(store) {
        return _useStore(this, store);
      }
    }]);

    return Class;
  }(definition), _temp);
  if (!customElements.get(tag)) customElements.define(tag, Class, opts);

  if (definition.css) {
    var style = document.createElement("style");
    var selector = opts["extends"] ? "".concat(opts["extends"], "[is=").concat(tag, "]") : tag;
    style.textContent = definition.css(selector);
    document.head.appendChild(style);
  }

  return Class;
};

var run_schedule = function run_schedule() {
  var previous = updates_schedule;
  updates_schedule = new Set();
  previous.forEach(function (element) {
    var _element$update;

    (_element$update = element.update) === null || _element$update === void 0 ? void 0 : _element$update.call(element);
  });
};

var schedule_update = function schedule_update(element) {
  /* instanbul ignore else */
  if (!updates_schedule.has(element)) {
    updates_schedule.add(element);
    /* instanbul ignore else */

    if (updates_schedule.size === 1) {
      wait(run_schedule);
    }
  }
};

var wait = function wait(callback) {
  window.queueMicrotask ? window.queueMicrotask(callback) : new Promise(function (r) {
    return r();
  }).then(callback);
};
/**
 * Holds the elements that have already loaded their slots.
 * The connected callback runs when the node is first discovered and also when
 * it's moved, so we shouhld only load slots the first time. This also avoids
 * the `Failed to execute 'insertBefore' on 'Node': The node before which the
 * new node is to be inserted is not a child of this node` error thrown by uhtml
 * when we reload slots after moving the element and trying to rerender
 * afterwards. I'm not sure if this is a uhtml bug or my own stupidity.
 */


var ready_slots = new WeakSet();

var load_slots = function load_slots(element) {
  // Find slots
  if (!ready_slots.has(element)) {
    var slots = get_slots_in(element);
    Reflect.set(element, "slots", slots);
    ready_slots.add(element);
  }
};

var get_slots_in = function get_slots_in(element) {
  var default_slots = [];
  var slots = {};

  for (var _i3 = 0, _Array$from = Array.from(element.childNodes); _i3 < _Array$from.length; _i3++) {
    var el = _Array$from[_i3];
    if (el instanceof HTMLTemplateElement) return get_slots_in(el.content);
    var slotName = el instanceof Element ? el.getAttribute('slot') : null;

    if (slotName) {
      slots[slotName] = el;
    } else {
      default_slots.push(el);
    }
  }

  return _objectSpread({
    "default": default_slots
  }, slots);
};
/**
 * Subscribe to changes in the store state and triggers a component update.
 * Subscriptions are cleaned up when the component is disconnected.
 */


var _useStore = function _useStore(element, store) {
  var streams = active_streams.get(element) || [];
  var updater = store.map(function () {
    // Only update the component once it's ready, otherwise we will trigger an
    // update if we're subscribing in a connected or ready callback.
    if (ready_elements.has(element)) schedule_update(element);
  });
  streams.push(updater);
  active_streams.set(element, streams);
  return store;
};

export { Component, index as css, define, html, ref$1 as ref, store, _useStore as useStore };
//# sourceMappingURL=index.js.map
