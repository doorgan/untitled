var e=e=>({get:t=>e.get(t),set:(t,n)=>(e.set(t,n),n)});const t=/([^\s\\>"'=]+)\s*=\s*(['"]?)$/,n=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,s=/<[a-z][^>]+$/i,r=/>[^<>]*$/,l=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/>)/gi,o=/\s+$/,a=(e,t)=>0<t--&&(s.test(e[t])||!r.test(e[t])&&a(e,t)),i=(e,t,s)=>n.test(t)?e:`<${t}${s.replace(o,"")}></${t}>`;const{isArray:c}=Array,{indexOf:u,slice:d}=[],h=(e,t)=>111===e.nodeType?1/t<0?t?(({firstChild:e,lastChild:t})=>{const n=document.createRange();return n.setStartAfter(e),n.setEndAfter(t),n.deleteContents(),e})(e):e.lastChild:t?e.valueOf():e.firstChild:e;
/*! (c) Andrea Giammarchi - ISC */
var p=function(e){var t="fragment",n="template",s="content"in l(n)?function(e){var t=l(n);return t.innerHTML=e,t.content}:function(e){var s=l(t),o=l(n),a=null;if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(e)){var i=RegExp.$1;o.innerHTML="<table>"+e+"</table>",a=o.querySelectorAll(i)}else o.innerHTML=e,a=o.childNodes;return r(s,a),s};return function(e,t){return("svg"===t?o:s)(e)};function r(e,t){for(var n=t.length;n--;)e.appendChild(t[0])}function l(n){return n===t?e.createDocumentFragment():e.createElementNS("http://www.w3.org/1999/xhtml",n)}function o(e){var n=l(t),s=l("div");return s.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+e+"</svg>",r(n,s.firstChild.childNodes),n}}(document);const f=({childNodes:e},t)=>e[t],m=e=>{const t=[];let{parentNode:n}=e;for(;n;)t.push(u.call(n.childNodes,e)),n=(e=n).parentNode;return t},{createTreeWalker:g,importNode:v}=document,w=1!=v.length,y=w?(e,t)=>v.call(document,p(e,t),!0):p,E=w?e=>g.call(document,e,129,null,!1):e=>g.call(document,e,129),b=(e,t,n)=>((e,t,n,s,r)=>{const l=n.length;let o=t.length,a=l,i=0,c=0,u=null;for(;i<o||c<a;)if(o===i){const t=a<l?c?s(n[c-1],-0).nextSibling:s(n[a-c],0):r;for(;c<a;)e.insertBefore(s(n[c++],1),t)}else if(a===c)for(;i<o;)u&&u.has(t[i])||e.removeChild(s(t[i],-1)),i++;else if(t[i]===n[c])i++,c++;else if(t[o-1]===n[a-1])o--,a--;else if(t[i]===n[a-1]&&n[c]===t[o-1]){const r=s(t[--o],-1).nextSibling;e.insertBefore(s(n[c++],1),s(t[i++],-1).nextSibling),e.insertBefore(s(n[--a],1),r),t[o]=n[a]}else{if(!u){u=new Map;let e=c;for(;e<a;)u.set(n[e],e++)}if(u.has(t[i])){const r=u.get(t[i]);if(c<r&&r<a){let l=i,d=1;for(;++l<o&&l<a&&u.get(t[l])===r+d;)d++;if(d>r-c){const l=s(t[i],0);for(;c<r;)e.insertBefore(s(n[c++],1),l)}else e.replaceChild(s(n[c++],1),s(t[i++],-1))}else i++}else e.removeChild(s(t[i++],-1))}return n})(e.parentNode,t,n,h,e),C=(e,t)=>"ref"===t?(e=>t=>{"function"==typeof t?t(e):t.current=e})(e):"aria"===t?(e=>t=>{for(const n in t){const s="role"===n?n:`aria-${n}`,r=t[n];null==r?e.removeAttribute(s):e.setAttribute(s,r)}})(e):".dataset"===t?(({dataset:e})=>t=>{for(const n in t){const s=t[n];null==s?delete e[n]:e[n]=s}})(e):"."===t.slice(0,1)?((e,t)=>n=>{e[t]=n})(e,t.slice(1)):"on"===t.slice(0,2)?((e,t)=>{let n,s=t.slice(2);return!(t in e)&&t.toLowerCase()in e&&(s=s.toLowerCase()),t=>{const r=c(t)?t:[t,!1];n!==r[0]&&(n&&e.removeEventListener(s,n,r[1]),(n=r[0])&&e.addEventListener(s,n,r[1]))}})(e,t):((e,t)=>{let n,s=!0;const r=document.createAttributeNS(null,t);return t=>{n!==t&&(n=t,null==n?s||(e.removeAttributeNode(r),s=!0):(r.value=t,s&&(e.setAttributeNodeNS(r),s=!1)))}})(e,t);function x(e){const{type:t,path:n}=e,s=n.reduceRight(f,this);return"node"===t?(e=>{let t,n,s=[];const r=l=>{switch(typeof l){case"string":case"number":case"boolean":t!==l&&(t=l,n?n.textContent=l:n=document.createTextNode(l),s=b(e,s,[n]));break;case"object":case"undefined":if(null==l){t!=l&&(t=l,s=b(e,s,[]));break}if(c(l)){t=l,0===l.length?s=b(e,s,[]):"object"==typeof l[0]?s=b(e,s,l):r(String(l));break}"ELEMENT_NODE"in l&&t!==l&&(t=l,s=b(e,s,11===l.nodeType?d.call(l.childNodes):[l]))}};return r})(s):"attr"===t?C(s,e.name):(e=>{let t;return n=>{t!=n&&(t=n,e.textContent=null==n?"":n)}})(s)}const $=e(new WeakMap),k=(e,n)=>{const s=((e,n,s)=>{const r=[],{length:o}=e;for(let s=1;s<o;s++){const l=e[s-1];r.push(t.test(l)&&a(e,s)?l.replace(t,((e,t,r)=>`${n}${s-1}=${r||'"'}${t}${r?"":'"'}`)):`${l}\x3c!--${n}${s-1}--\x3e`)}r.push(e[o-1]);const c=r.join("").trim();return s?c:c.replace(l,i)})(n,"isµ","svg"===e),r=y(s,e),o=E(r),c=[],u=n.length-1;let d=0,h=`isµ${d}`;for(;d<u;){const e=o.nextNode();if(!e)throw`bad template: ${s}`;if(8===e.nodeType)e.textContent===h&&(c.push({type:"node",path:m(e)}),h="isµ"+ ++d);else{for(;e.hasAttribute(h);)c.push({type:"attr",path:m(e),name:e.getAttribute(h)}),e.removeAttribute(h),h="isµ"+ ++d;/^(?:style|textarea)$/i.test(e.tagName)&&e.textContent.trim()===`\x3c!--${h}--\x3e`&&(e.textContent="",c.push({type:"text",path:m(e)}),h="isµ"+ ++d)}}return{content:r,nodes:c}},N=(e,t)=>{const{content:n,nodes:s}=$.get(t)||$.set(t,k(e,t)),r=v.call(document,n,!0);return{content:r,updates:s.map(x,r)}},M=(e,{type:t,template:n,values:s})=>{const{length:r}=s;S(e,s,r);let{entry:l}=e;l&&l.template===n&&l.type===t||(e.entry=l=((e,t)=>{const{content:n,updates:s}=N(e,t);return{type:e,template:t,content:n,updates:s,wire:null}})(t,n));const{content:o,updates:a,wire:i}=l;for(let e=0;e<r;e++)a[e](s[e]);return i||(l.wire=(e=>{const{childNodes:t}=e,{length:n}=t;if(n<2)return n?t[0]:e;const s=d.call(t,0);return{ELEMENT_NODE:1,nodeType:111,firstChild:s[0],lastChild:s[n-1],valueOf(){if(t.length!==n){let t=0;for(;t<n;)e.appendChild(s[t++])}return e}}})(o))},S=({stack:e},t,n)=>{for(let s=0;s<n;s++){const n=t[s];n instanceof A?t[s]=M(e[s]||(e[s]={stack:[],entry:null,wire:null}),n):c(n)?S(e[s]||(e[s]={stack:[],entry:null,wire:null}),n,n.length):e[s]=null}n<e.length&&e.splice(n)};function A(e,t,n){this.type=e,this.template=t,this.values=n}const{create:T,defineProperties:L}=Object,O=t=>{const n=e(new WeakMap);return L(((e,...n)=>new A(t,e,n)),{for:{value(e,s){const r=n.get(e)||n.set(e,T(null));return r[s]||(r[s]=(e=>(n,...s)=>M(e,{type:t,template:n,values:s}))({stack:[],entry:null,wire:null}))}},node:{value:(e,...n)=>M({stack:[],entry:null,wire:null},{type:t,template:e,values:n}).valueOf()}})},W=e(new WeakMap),R=O("html");O("svg");function H(e){for(var t=e[0],n=1,s=arguments.length;n<s;n++)t+=arguments[n]+e[n];return t}const _=()=>({current:null}),j=new Map,z=(e=HTMLElement)=>{let t=j.get(e);if(t)return t;const n=class extends e{slots;handleEvent(e){Reflect.get(this,`handle_${e.type}`)(e)}useStore(e){return U(this,e)}};return j.set(e,n),n},B=new WeakMap,q=new WeakSet;let D=new Set;const P=new Map,F=(e,t,n={})=>{const s=P.get(t)||class extends t{connectedCallback(){super.connected&&super.connected(),this.dispatchEvent(new CustomEvent("connected")),setTimeout((()=>this.ready()))}ready(){Q(this),super.ready&&super.ready(),q.add(this),this.dispatchEvent(new CustomEvent("ready")),I(this)}disconnectedCallback(){B.get(this)?.forEach((e=>{e.end(!0)})),B.delete(this),q.delete(this),super.disconnected&&super.disconnected(),this.dispatchEvent(new CustomEvent("disconnected"))}update(){super.update&&super.update(),this.render&&((e,t)=>{const n="function"==typeof t?t():t,s=W.get(e)||W.set(e,{stack:[],entry:null,wire:null}),r=n instanceof A?M(s,n):n;r!==s.wire&&(s.wire=r,e.textContent="",e.appendChild(r.valueOf()))})(this,this.render())}handleEvent(e){super.handleEvent?super.handleEvent(e):Reflect.get(this,`handle_${e.type}`)(e)}useStore(e){return U(this,e)}};if(customElements.get(e)||customElements.define(e,s,n),t.css){const s=document.createElement("style"),r=n.extends?`${n.extends}[is=${e}]`:e;s.textContent=t.css(r),document.head.appendChild(s)}return P.set(t,s),s},G=()=>{const e=D;D=new Set,e.forEach((e=>{e.update?.()}))},I=e=>{D.has(e)||(D.add(e),1===D.size&&J(G))},J=e=>{window.queueMicrotask?window.queueMicrotask(e):new Promise((e=>e())).then(e)},K=new WeakSet,Q=e=>{if(!K.has(e)){let t=[],n={};Array.from(e.childNodes).forEach((e=>{const s=e instanceof Element?e.getAttribute("slot"):null;s?n[s]=e:t.push(e)})),Reflect.set(e,"slots",{default:t,...n}),K.add(e)}},U=(e,t)=>{const n=B.get(e)||[],s=t.map((()=>{q.has(e)&&I(e)}));return n.push(s),B.set(e,n),t};export{z as Component,H as css,F as define,R as html,_ as ref,U as useStore};
