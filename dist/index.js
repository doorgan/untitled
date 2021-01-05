function e(){return(e=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function t(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var n=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const r=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,o=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,s=/<[a-z][^>]+$/i,i=/>[^<>]*$/,u=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,a=/\s+$/,c=(e,t)=>0<t--&&(s.test(e[t])||!i.test(e[t])&&c(e,t)),l=(e,t,n)=>o.test(t)?e:`<${t}${n.replace(a,"")}></${t}>`,{isArray:d}=Array,{indexOf:f,slice:p}=[],h=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;var v=function(e){var t="fragment",n="template",r="content"in s(n)?function(e){var t=s(n);return t.innerHTML=e,t.content}:function(e){var r=s(t),i=s(n),u=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var a=RegExp.$1;i.innerHTML="<table>"+e+"</table>",u=i.querySelectorAll(a)}else i.innerHTML=e,u=i.childNodes;return o(r,u),r};return function(e,t){return("svg"===t?i:r)(e)};function o(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function s(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function i(e){var n=s(t),r=s("div");return r.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",o(n,r.firstChild.childNodes),n}}(document);const g=({childNodes:e},t)=>e[t],m=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(f.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:y,importNode:b}=document,w=1!=b.length,C=w?(e,t)=>b.call(document,v(e,t),!0):v,E=w?e=>y.call(document,e,129,null,!1):e=>y.call(document,e,129),x=(e,t,n)=>((e,t,n,r,o)=>{const s=n.length;let i=t.length,u=s,a=0,c=0,l=null;for(;a<i||c<u;)if(i===a){const t=u<s?c?r(n[c-1],-0).nextSibling:r(n[u-c],0):o;for(;c<u;)e.insertBefore(r(n[c++],1),t)}else if(u===c)for(;a<i;)l&&l.has(t[a])||e.removeChild(r(t[a],-1)),a++;else if(t[a]===n[c])a++,c++;else if(t[i-1]===n[u-1])i--,u--;else if(t[a]===n[u-1]&&n[c]===t[i-1]){const o=r(t[--i],-1).nextSibling;e.insertBefore(r(n[c++],1),r(t[a++],-1).nextSibling),e.insertBefore(r(n[--u],1),o),t[i]=n[u]}else{if(!l){l=new Map;let e=c;for(;e<u;)l.set(n[e],e++)}if(l.has(t[a])){const o=l.get(t[a]);if(c<o&&o<u){let s=a,d=1;for(;++s<i&&s<u&&l.get(t[s])===o+d;)d++;if(d>o-c){const s=r(t[a],0);for(;c<o;)e.insertBefore(r(n[c++],1),s)}else e.replaceChild(r(n[c++],1),r(t[a++],-1))}else a++}else e.removeChild(r(t[a++],-1))}return n})(e.parentNode,t,n,h,e);function A(e){const{type:t,path:n}=e,r=n.reduceRight(g,this);return"node"===t?(e=>{let t,n,r=[];const o=s=>{switch(typeof s){case"string":case"number":case"boolean":t!==s&&(t=s,n?n.textContent=s:n=document.createTextNode(s),r=x(e,r,[n]));break;case"object":case"undefined":if(null==s){t!=s&&(t=s,r=x(e,r,[]));break}if(d(s)){t=s,0===s.length?r=x(e,r,[]):"object"==typeof s[0]?r=x(e,r,s):o(String(s));break}"ELEMENT_NODE"in s&&t!==s&&(t=s,r=x(e,r,11===s.nodeType?p.call(s.childNodes):[s]))}};return o})(r):"attr"===t?((e,t)=>"ref"===t?(e=>t=>{"function"==typeof t?t(e):t.current=e})(e):"aria"===t?(e=>t=>{for(const n in t){const r="role"===n?n:`aria-${n}`,o=t[n];null==o?e.removeAttribute(r):e.setAttribute(r,o)}})(e):".dataset"===t?(({dataset:e})=>t=>{for(const n in t){const r=t[n];null==r?delete e[n]:e[n]=r}})(e):"."===t.slice(0,1)?((e,t)=>n=>{e[t]=n})(e,t.slice(1)):"on"===t.slice(0,2)?((e,t)=>{let n,r=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(r=r.toLowerCase()),t=>{const o=d(t)?t:[t,!1];n!==o[0]&&(n&&e.removeEventListener(r,n,o[1]),(n=o[0])&&e.addEventListener(r,n,o[1]))}})(e,t):((e,t)=>{let n,r=!0;const o=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?r||(e.removeAttributeNode(o),r=!0):(o.value=t,r&&(e.setAttributeNodeNS(o),r=!1)))}})(e,t))(r,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(r)}const k=n(new WeakMap),N=(e,{type:t,template:n,values:o})=>{const{length:s}=o;O(e,o,s);let{entry:i}=e;i&&i.template===n&&i.type===t||(e.entry=i=((e,t)=>{const{content:n,updates:o}=((e,t)=>{const{content:n,nodes:o}=k.get(t)||k.set(t,((e,t)=>{const n=((e,t,n)=>{const o=[],{length:s}=e;for(let t=1;t<s;t++){const n=e[t-1];o.push(r.test(n)&&c(e,t)?n.replace(r,(e,n,r)=>`isµ${t-1}=${r||'"'}${n}${r?"":'"'}`):`${n}\x3c!--isµ${t-1}--\x3e`)}o.push(e[s-1]);const i=o.join("").trim();return n?i:i.replace(u,l)})(t,0,"svg"===e),o=C(n,e),s=E(o),i=[],a=t.length-1;let d=0,f=`isµ${d}`;for(;d<a;){const e=s.nextNode();if(!e)throw`bad template: ${n}`;if(8===e.nodeType)e.textContent===f&&(i.push({type:"node",path:m(e)}),f="isµ"+ ++d);else{for(;e.hasAttribute(f);)i.push({type:"attr",path:m(e),name:e.getAttribute(f)}),e.removeAttribute(f),f="isµ"+ ++d;/^(?:style|textarea)$/i.test(e.tagName)&&e.textContent.trim()===`\x3c!--${f}--\x3e`&&(e.textContent="",i.push({type:"text",path:m(e)}),f="isµ"+ ++d)}}return{content:o,nodes:i}})(e,t)),s=b.call(document,n,!0);return{content:s,updates:o.map(A,s)}})(e,t);return{type:e,template:t,content:n,updates:o,wire:null}})(t,n));const{content:a,updates:d,wire:f}=i;for(let e=0;e<s;e++)d[e](o[e]);return f||(i.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const r=p.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:r[0],lastChild:r[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(r[t++])}return e}}})(a))},O=({stack:e},t,n)=>{for(let r=0;r<n;r++){const n=t[r];n instanceof M?t[r]=N(e[r]||(e[r]={stack:[],entry:null,wire:null}),n):d(n)?O(e[r]||(e[r]={stack:[],entry:null,wire:null}),n,n.length):e[r]=null}n<e.length&&e.splice(n)};function M(e,t,n){this.type=e,this.template=t,this.values=n}const{create:$,defineProperties:S}=Object,j=e=>{const t=n(new WeakMap);return S((t,...n)=>new M(e,t,n),{for:{value(n,r){const o=t.get(n)||t.set(n,$(null));return o[r]||(o[r]=(t=>(n,...r)=>N(t,{type:e,template:n,values:r}))({stack:[],entry:null,wire:null}))}},node:{value:(t,...n)=>N({stack:[],entry:null,wire:null},{type:e,template:t,values:n}).valueOf()}})},T=n(new WeakMap),L=j("html");j("svg");var _=function(e,t){switch(e){case 0:return function(){return t.apply(this,arguments)};case 1:return function(e){return t.apply(this,arguments)};case 2:return function(e,n){return t.apply(this,arguments)};case 3:return function(e,n,r){return t.apply(this,arguments)};case 4:return function(e,n,r,o){return t.apply(this,arguments)};case 5:return function(e,n,r,o,s){return t.apply(this,arguments)};case 6:return function(e,n,r,o,s,i){return t.apply(this,arguments)};case 7:return function(e,n,r,o,s,i,u){return t.apply(this,arguments)};case 8:return function(e,n,r,o,s,i,u,a){return t.apply(this,arguments)};case 9:return function(e,n,r,o,s,i,u,a,c){return t.apply(this,arguments)};case 10:return function(e,n,r,o,s,i,u,a,c,l){return t.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}},R=function(e){return null!=e&&"object"==typeof e&&!0===e["@@functional/placeholder"]},U=function(e){return function t(n){return 0===arguments.length||R(n)?t:e.apply(this,arguments)}},q=function e(t,n,r){return function(){for(var o=[],s=0,i=t,u=0;u<n.length||s<arguments.length;){var a;u<n.length&&(!R(n[u])||s>=arguments.length)?a=n[u]:(a=arguments[s],s+=1),o[u]=a,R(a)||(i-=1),u+=1}return i<=0?r.apply(this,o):_(i,e(t,o,r))}},W=function(e){return function t(n,r){switch(arguments.length){case 0:return t;case 1:return R(n)?t:U(function(t){return e(n,t)});default:return R(n)&&R(r)?t:R(n)?U(function(t){return e(t,r)}):R(r)?U(function(t){return e(n,t)}):e(n,r)}}}(function(e,t){return 1===e?U(t):_(e,q(e,[],t))});function P(){return!0}var V,H=[],z=[],B=-1,F=!1,D=!1,J={};function G(e,t){var n,r,o,s,i=oe([],P);for(o=[],s=[],n=0;n<t.length;++n)void 0!==t[n]&&(o.push(t[n]),void 0!==t[n].end&&s.push(t[n].end));return(r=oe(o,e)).depsChanged=[],r.fnArgs=r.deps.concat([r,r.depsChanged]),r.end=i,i.listeners.push(r),le(s,i),i.deps=s,se(r),r}function I(e,t){return G(function(t,n){n(e(t.val))},[t])}function K(e){return I(e,this)}function Q(e){return e(this)}function X(e){return Y(e,this)}function Y(e,t){var n=J.stream(1),r=J.on(function(){var e=n()-1;n(e),e<=0&&n.end(!0)});r(t.end);var o=J.stream(),s=J.combine(function(t,s){o.end(!0);var i=e(t());n(n()+1),r(i.end),o=I(s,i)},[t]);return J.endsOn(n.end,s),s}function Z(e,t){return G(function(e,t,n){n(e.val(t.val))},[t,e])}function ee(e){return Z(e,this)}function te(e){return Z(this,e)}function ne(){return"stream("+this.val+")"}function re(){function e(t){return 0===arguments.length?e.val:(ce(t,e),e)}return e.hasVal=!1,e.val=void 0,e.updaters=[],e.listeners=[],e.queued=!1,e.end=void 0,e.ap=ee,e["fantasy-land/map"]=e.map=K,e["fantasy-land/ap"]=te,e["fantasy-land/of"]=e.of=J.stream,e["fantasy-land/chain"]=e.chain=X,e.pipe=Q,e.constructor=J.stream,e.toJSON=function(){return e.val},e.toString=ne,e}function oe(e,t){var n=re();return n.fn=t,n.deps=e,n.depsMet=!1,n.depsChanged=e.length>0?[]:void 0,n.shouldUpdate=!1,le(e,n),n}function se(e){if(!function(e){return e.end&&!0===e.end.val}(e)&&function(e){return!0===e.depsMet||function(e){return e.depsMet=e.deps.every(function(e){return e.hasVal}),e.depsMet}(e)}(e))if(void 0===V){V=e,e.depsChanged&&(e.fnArgs[e.fnArgs.length-1]=e.depsChanged);var t=e.fn.apply(e.fn,e.fnArgs);void 0!==t&&e(t),V=void 0,void 0!==e.depsChanged&&(e.depsChanged=[]),e.shouldUpdate=!1,!1===(F||D)&&ae(),function(e){return e.listeners.some(function(e){return e.shouldUpdate})}(e)&&(D?e.listeners.forEach(function(e){e.shouldUpdate&&ue(se,e)}):e(e.val))}else ue(se,e)}function ie(e){var t,n=e.listeners;if(!1===e.queued){for(e.queued=!0,t=0;t<n.length;++t)ie(n[t]);z[++B]=e}}function ue(e,t){H.push(t),t.updaters.push(e),t.shouldUpdate=!0}function ae(){for(F=!0;H.length>0;){var e=H.shift(),t=e.updaters.shift();t&&e.shouldUpdate&&t(e)}F=!1}function ce(e,t){t.val=e,t.hasVal=!0,void 0===V?(D=!0,function(e){var t,n,r,o=e.listeners;for(t=0;t<o.length;++t)(r=o[t]).end===e?pe(r):(void 0!==r.depsChanged&&r.depsChanged.push(e),r.shouldUpdate=!0,ie(r));for(;B>=0;--B)!0===(n=z[B]).shouldUpdate&&se(n),n.queued=!1}(t),H.length>0&&ae(),D=!1):V===t?function(e,t){var n,r;for(n=0;n<t.length;++n)(r=t[n]).end!==e?(void 0!==r.depsChanged&&r.depsChanged.push(e),r.shouldUpdate=!0):pe(r)}(t,t.listeners):ue(function(t){ce(e,t)},t)}function le(e,t){for(var n=0;n<e.length;++n)e[n].listeners.push(t)}function de(e,t){var n=t.indexOf(e);t[n]=t[t.length-1],t.length--}function fe(e){for(var t=0;t<e.deps.length;++t)de(e,e.deps[t].listeners);e.deps.length=0}function pe(e){void 0!==e.deps&&fe(e),void 0!==e.end&&fe(e.end)}function he(){}J.stream=function(e){var t=oe([],P),n=re();return n.end=t,n.fnArgs=[],t.listeners.push(n),arguments.length>0&&n(e),n},J.stream["fantasy-land/of"]=J.stream.of=J.stream,J.combine=W(2,G),J.isStream=function(e){return!!((t=e)&&t.constructor&&t.call&&t.apply)&&"hasVal"in e;var t},J.immediate=function(e){return!1===e.depsMet&&(e.depsMet=!0,se(e)),e},J.endsOn=function(e,t){return fe(t.end),e.listeners.push(t.end),t.end.deps.push(e),t},J.map=W(2,I),J.chain=W(2,Y),J.ap=W(2,Z),J.on=W(2,function(e,t){return G(function(t){e(t.val)},[t])}),J.scan=W(3,function(e,t,n){var r=G(function(n,r){r(t=e(t,n.val))},[n]);return r.hasVal||r(t),r}),J.merge=W(2,function(e,t){var n=J.immediate(G(function(e,t,n,r){r[0]?n(r[0]()):e.hasVal?n(e.val):t.hasVal&&n(t.val)},[e,t]));return J.endsOn(G(function(){return!0},[e.end,t.end]),n),n}),J.transduce=W(2,function(e,t){return e=e(new he),G(function(t,n){var r=e["@@transducer/step"](void 0,t.val);return r&&!0===r["@@transducer/reduced"]?(n.end(!0),r["@@transducer/value"]):r},[t])}),J.curryN=W,J.fromPromise=function(e){var t=J.stream();return e.then(function(e){t(e),t.end(!0)}),t},J.flattenPromise=function(e){return G(function(e,t){e().then(t)},[e])},he.prototype["@@transducer/init"]=function(){},he.prototype["@@transducer/result"]=function(){},he.prototype["@@transducer/step"]=function(e,t){return t};const ve=Object.assign||((e,t)=>(t&&Object.keys(t).forEach(n=>e[n]=t[n]),e)),ge=(e,t,n)=>{const r=typeof n;if(n&&"object"===r)if(Array.isArray(n))for(const r of n)t=ge(e,t,r);else for(const r of Object.keys(n)){const o=n[r];"function"==typeof o?t[r]=o(t[r],me):void 0===o?e&&!isNaN(r)?t.splice(r,1):delete t[r]:t[r]=null===o||"object"!=typeof o||Array.isArray(o)?o:"object"==typeof t[r]?o===t[r]?o:me(t[r],o):ge(!1,{},o)}else"function"===r&&(t=n(t,me));return t},me=(e,...t)=>{const n=Array.isArray(e);return ge(n,n?e.slice():ve({},e),t)};var ye=J.stream,be=J.scan;const{defineProperties:we,keys:Ce}=Object,Ee=(e,t,n,r,o)=>({configurable:!0,get:()=>r,set(s){(e||s!==r||t&&"object"==typeof s&&s)&&(r=s,n?o.call(this,r):o.call(this))}}),xe=()=>{};var Ae=(({all:e=!1,shallow:t=!0,useState:n=xe,getAttribute:r=((e,t)=>e.getAttribute(t))}={})=>(o,s,i)=>{const u=((e,t,n,r,o,s)=>{const i={},u=o!==xe,a=[n,r,u];for(let n=Ce(e),r=0;r<n.length;r++){const c=t(e,n[r]),l=u?o(c):[c,o];s&&(l[1]=s),i[n[r]]=Ee.apply(null,a.concat(l))}return i})(s,(e,t)=>{let n=e[t],s=typeof n;return o.hasOwnProperty(t)?(n=o[t],delete o[t]):o.hasAttribute(t)&&(n=r(o,t),"number"==s?n=+n:"boolean"==s&&(n=!/^(?:false|0|)$/.test(n))),n},e,t,n,i);return we(o,u)})({dom:!0}),ke=new WeakMap,Ne=new WeakSet,Oe=new Set,Me=new WeakMap,$e=function(){var e=Oe;Oe=new Set,e.forEach(function(e){null==e.update||e.update()})},Se=function(e){Oe.has(e)||(Oe.add(e),1===Oe.size&&je($e))},je=function(e){"function"==typeof queueMicrotask?queueMicrotask(e):new Promise(function(e){return e()}).then(e)},Te=new WeakSet,Le=function t(n){for(var r=[],o={},s=0,i=Array.from(n.childNodes);s<i.length;s++){var u=i[s];if(u instanceof HTMLTemplateElement)return t(u.content);var a=u instanceof Element?u.getAttribute("slot"):null;a?o[a]=u:r.push(u)}return e({default:r},o)},_e=function(e,t){var n=ke.get(e)||[],r=t.map(function(){Ne.has(e)&&Se(e)});return n.push(r),ke.set(e,n),t};exports.Component=function(e){return void 0===e&&(e=HTMLElement),e},exports.css=function(e){for(var t=e[0],n=1,r=arguments.length;n<r;n++)t+=arguments[n]+e[n];return t},exports.define=function(e,n,r){void 0===r&&(r={});var o=function(e){var n,r;function o(){var n;return(n=e.call(this)||this).props&&Reflect.set(t(n),"props",Ae(t(n),n.props,function(){return Se(t(n))})),n}r=e,(n=o).prototype=Object.create(r.prototype),n.prototype.constructor=n,n.__proto__=r;var s=o.prototype;return s.connectedCallback=function(){var e=this;this.connected(),this.dispatchEvent(new CustomEvent("connected")),setTimeout(function(){return e.ready()})},s.connected=function(){e.prototype.connected&&e.prototype.connected.call(this)},s.disconnected=function(){e.prototype.disconnected&&e.prototype.disconnected.call(this)},s.ready=function(){(function(e){if(!Te.has(e)){var t=Le(e);Reflect.set(e,"slots",t),Te.add(e)}})(this),e.prototype.ready&&e.prototype.ready.call(this),Ne.add(this),this.dispatchEvent(new CustomEvent("ready")),Se(this)},s.disconnectedCallback=function(){var e;null==(e=ke.get(this))||e.forEach(function(e){e.end(!0)}),ke.delete(this),Ne.delete(this),this.disconnected(),this.dispatchEvent(new CustomEvent("disconnected"))},s.update=function(){e.prototype.update&&e.prototype.update.call(this),this.dispatchEvent(new CustomEvent("updated")),this.schedule_render()},s.schedule_render=function(){var e=this;Me.has(this)&&cancelAnimationFrame(Me.get(this)),Me.set(this,requestAnimationFrame(function(){Me.delete(e),e.performRender()}))},s.performRender=function(){e.prototype.render&&((e,t)=>{const n="function"==typeof t?t():t,r=T.get(e)||T.set(e,{stack:[],entry:null,wire:null}),o=n instanceof M?N(r,n):n;o!==r.wire&&(r.wire=o,e.textContent="",e.appendChild(o.valueOf()))})(this,e.prototype.render.call(this)),this.dispatchEvent(new CustomEvent("rendered"))},s.handleEvent=function(e){Reflect.get(this,"handle_"+e.type)(e)},s.useStore=function(e){return _e(this,e)},o}(n);if(customElements.get(e)||customElements.define(e,o,r),n.css){var s=document.createElement("style");s.textContent=n.css(r.extends?r.extends+"[is="+e+"]":e),document.head.appendChild(s)}return o},exports.html=L,exports.ref=function(){return{current:null}},exports.store=function(e){var t=ye(),n=be(function(e,t){return me(e,t)},e,t);return Object.assign(n,{update:t})},exports.useStore=_e;
//# sourceMappingURL=index.js.map
