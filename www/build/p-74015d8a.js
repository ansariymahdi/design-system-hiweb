let e,t,n=!1;const l="undefined"!=typeof window?window:{},o=l.document||{head:{}},s={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},c=e=>Promise.resolve(e),r=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),i=new WeakMap,a=e=>"sc-"+e.o,u={},f=e=>"object"==(e=typeof e)||"function"===e,p=(e,t,...n)=>{let l=null,o=!1,s=!1,c=[];const r=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?r(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof e&&!f(l))&&(l+=""),o&&s?c[c.length-1].i+=l:c.push(o?y(null,l):l),s=o)};if(r(n),t){const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}if("function"==typeof e)return e(null===t?{}:t,c,m);const i=y(e,null);return i.u=t,c.length>0&&(i.p=c),i},y=(e,t)=>({t:0,m:e,i:t,$:null,p:null,u:null}),d={},m={forEach:(e,t)=>e.map($).forEach(t),map:(e,t)=>e.map($).map(t).map(h)},$=e=>({vattrs:e.u,vchildren:e.p,vkey:e.h,vname:e.v,vtag:e.m,vtext:e.i}),h=e=>{if("function"==typeof e.vtag){const t=Object.assign({},e.vattrs);return e.vkey&&(t.key=e.vkey),e.vname&&(t.name=e.vname),p(e.vtag,t,...e.vchildren||[])}const t=y(e.vtag,e.vtext);return t.u=e.vattrs,t.p=e.vchildren,t.h=e.vkey,t.v=e.vname,t},b=(e,t,n,o,c,r)=>{if(n!==o){let i=B(e,t),a=t.toLowerCase();if("class"===t){const t=e.classList,l=v(n),s=v(o);t.remove(...l.filter((e=>e&&!s.includes(e)))),t.add(...s.filter((e=>e&&!l.includes(e))))}else if("style"===t){for(const t in n)o&&null!=o[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in o)n&&o[t]===n[t]||(t.includes("-")?e.style.setProperty(t,o[t]):e.style[t]=o[t])}else if(i||"o"!==t[0]||"n"!==t[1]){const l=f(o);if((i||l&&null!==o)&&!c)try{if(e.tagName.includes("-"))e[t]=o;else{let l=null==o?"":o;"list"===t?i=!1:null!=n&&e[t]==l||(e[t]=l)}}catch(e){}null==o||!1===o?!1===o&&""!==e.getAttribute(t)||e.removeAttribute(t):(!i||4&r||c)&&!l&&e.setAttribute(t,o=!0===o?"":o)}else t="-"===t[2]?t.slice(3):B(l,a)?a.slice(2):a[2]+t.slice(3),n&&s.rel(e,t,n,!1),o&&s.ael(e,t,o,!1)}},w=/\s/,v=e=>e?e.split(w):[],S=(e,t,n,l)=>{const o=11===t.$.nodeType&&t.$.host?t.$.host:t.$,s=e&&e.u||u,c=t.u||u;for(l in s)l in c||b(o,l,s[l],void 0,n,t.t);for(l in c)b(o,l,s[l],c[l],n,t.t)},g=(t,n,l)=>{let s,c,r=n.p[l],i=0;if(null!==r.i)s=r.$=o.createTextNode(r.i);else if(s=r.$=o.createElement(r.m),S(null,r,!1),null!=e&&s["s-si"]!==e&&s.classList.add(s["s-si"]=e),r.p)for(i=0;i<r.p.length;++i)c=g(t,r,i),c&&s.appendChild(c);return s},j=(e,n,l,o,s,c)=>{let r,i=e;for(i.shadowRoot&&i.tagName===t&&(i=i.shadowRoot);s<=c;++s)o[s]&&(r=g(null,l,s),r&&(o[s].$=r,i.insertBefore(r,n)))},M=(e,t,n,l)=>{for(;t<=n;++t)(l=e[t])&&l.$.remove()},O=(e,t)=>e.m===t.m,k=(e,t)=>{const n=t.$=e.$,l=e.p,o=t.p,s=t.i;null===s?("slot"===t.m||S(e,t,!1),null!==l&&null!==o?((e,t,n,l)=>{let o,s=0,c=0,r=t.length-1,i=t[0],a=t[r],u=l.length-1,f=l[0],p=l[u];for(;s<=r&&c<=u;)null==i?i=t[++s]:null==a?a=t[--r]:null==f?f=l[++c]:null==p?p=l[--u]:O(i,f)?(k(i,f),i=t[++s],f=l[++c]):O(a,p)?(k(a,p),a=t[--r],p=l[--u]):O(i,p)?(k(i,p),e.insertBefore(i.$,a.$.nextSibling),i=t[++s],p=l[--u]):O(a,f)?(k(a,f),e.insertBefore(a.$,i.$),a=t[--r],f=l[++c]):(o=g(t&&t[c],n,c),f=l[++c],o&&i.$.parentNode.insertBefore(o,i.$));s>r?j(e,null==l[u+1]?null:l[u+1].$,n,l,c,u):c>u&&M(t,s,r)})(n,l,t,o):null!==o?(null!==e.i&&(n.textContent=""),j(n,null,t,o,0,o.length-1)):null!==l&&M(l,0,l.length-1)):e.i!==s&&(n.data=s)},C=(e,t,n)=>{const l=(e=>V(e).S)(e);return{emit:e=>P(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},P=(e,t,n)=>{const l=s.ce(t,n);return e.dispatchEvent(l),l},x=(e,t)=>{t&&!e.g&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.g=t)))},E=(e,t)=>{if(e.t|=16,!(4&e.t))return x(e,e.j),ne((()=>L(e,t)));e.t|=512},L=(e,t)=>{const n=e.M;let l;return l=F(n,t?"componentWillLoad":"componentWillUpdate"),R(l,(()=>W(e,n,t)))},W=async(e,t,n)=>{const l=e.S,s=l["s-rc"];n&&(e=>{const t=e.O,n=e.S,l=t.t,s=((e,t)=>{let n=a(t),l=K.get(n);if(e=11===e.nodeType?e:o,l)if("string"==typeof l){let t,s=i.get(e=e.head||e);s||i.set(e,s=new Set),s.has(n)||(t=o.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),s&&s.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=s,n.classList.add(s+"-h"))})(e);T(e,t),s&&(s.map((e=>e())),l["s-rc"]=void 0);{const t=l["s-p"],n=()=>U(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},T=(n,l)=>{try{l=l.render(),n.t&=-17,n.t|=2,((n,l)=>{const o=n.S,s=n.k||y(null,null),c=(e=>e&&e.m===d)(l)?l:p(null,null,l);t=o.tagName,c.m=null,c.t|=4,n.k=c,c.$=s.$=o.shadowRoot||o,e=o["s-sc"],k(s,c)})(n,l)}catch(e){G(e,n.S)}return null},U=e=>{const t=e.S,n=e.M,l=e.j;64&e.t||(e.t|=64,q(t),F(n,"componentDidLoad"),e.C(t),l||A()),e.P(t),e.g&&(e.g(),e.g=void 0),512&e.t&&te((()=>E(e,!1))),e.t&=-517},A=()=>{q(o.documentElement),te((()=>P(l,"appload",{detail:{namespace:"design-system-hiweb"}})))},F=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){G(e)}},R=(e,t)=>e&&e.then?e.then(t):t(),q=e=>e.classList.add("hydrated"),D=(e,t,n)=>{if(t.L){e.watchers&&(t.W=e.watchers);const l=Object.entries(t.L),o=e.prototype;if(l.map((([e,[l]])=>{31&l||2&n&&32&l?Object.defineProperty(o,e,{get(){return((e,t)=>V(this).T.get(t))(0,e)},set(n){((e,t,n,l)=>{const o=V(e),s=o.S,c=o.T.get(t),r=o.t,i=o.M;if(n=((e,t)=>null==e||f(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,l.L[t][0]),!(8&r&&void 0!==c||n===c)&&(o.T.set(t,n),i)){if(l.W&&128&r){const e=l.W[t];e&&e.map((e=>{try{i[e](n,c,t)}catch(e){G(e,s)}}))}2==(18&r)&&E(o,!1)}})(this,e,n,t)},configurable:!0,enumerable:!0}):1&n&&64&l&&Object.defineProperty(o,e,{value(...t){const n=V(this);return n.U.then((()=>n.M[e](...t)))}})})),1&n){const t=new Map;o.attributeChangedCallback=function(e,n,l){s.jmp((()=>{const n=t.get(e);this[n]=(null!==l||"boolean"!=typeof this[n])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,n])=>{const l=n[1]||e;return t.set(l,e),l}))}}return e},H=(e,t={})=>{const n=[],c=t.exclude||[],i=l.customElements,u=o.head,f=u.querySelector("meta[charset]"),p=o.createElement("style"),y=[];let d,m=!0;Object.assign(s,t),s.l=new URL(t.resourcesUrl||"./",o.baseURI).href,e.map((e=>e[1].map((t=>{const l={t:t[0],o:t[1],L:t[2],A:t[3]};l.L=t[2],l.W={};const o=l.o,u=class extends HTMLElement{constructor(e){super(e),z(e=this,l),1&l.t&&e.attachShadow({mode:"open"})}connectedCallback(){d&&(clearTimeout(d),d=null),m?y.push(this):s.jmp((()=>(e=>{if(0==(1&s.t)){const t=V(e),n=t.O,l=()=>{};if(!(1&t.t)){t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){x(t,t.j=n);break}}n.L&&Object.entries(n.L).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,o)=>{if(0==(32&t.t)){{if(t.t|=32,(o=J(n)).then){const e=()=>{};o=await o,e()}o.isProxied||(n.W=o.watchers,D(o,n,2),o.isProxied=!0);const e=()=>{};t.t|=8;try{new o(t)}catch(e){G(e)}t.t&=-9,t.t|=128,e()}if(o.style){let e=o.style;const t=a(n);if(!K.has(t)){const l=()=>{};((e,t,n)=>{let l=K.get(e);r&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,K.set(e,l)})(t,e,!!(1&n.t)),l()}}}const s=t.j,c=()=>E(t,!0);s&&s["s-rc"]?s["s-rc"].push(c):c()})(0,t,n)}l()}})(this)))}disconnectedCallback(){s.jmp((()=>{}))}componentOnReady(){return V(this).F}};l.R=e[0],c.includes(o)||i.get(o)||(n.push(o),i.define(o,D(u,l,1)))})))),p.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",p.setAttribute("data-styles",""),u.insertBefore(p,f?f.nextSibling:u.firstChild),m=!1,y.length?y.map((e=>e.connectedCallback())):s.jmp((()=>d=setTimeout(A,30)))},N=new WeakMap,V=e=>N.get(e),_=(e,t)=>N.set(t.M=e,t),z=(e,t)=>{const n={t:0,S:e,O:t,T:new Map};return n.U=new Promise((e=>n.P=e)),n.F=new Promise((e=>n.C=e)),e["s-p"]=[],e["s-rc"]=[],N.set(e,n)},B=(e,t)=>t in e,G=(e,t)=>(0,console.error)(e,t),I=new Map,J=e=>{const t=e.o.replace(/-/g,"_"),n=e.R,l=I.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(I.set(n,e),e[t])),G)},K=new Map,Q=[],X=[],Y=(e,t)=>l=>{e.push(l),n||(n=!0,t&&4&s.t?te(ee):s.raf(ee))},Z=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){G(e)}e.length=0},ee=()=>{Z(Q),Z(X),(n=Q.length>0)&&s.raf(ee)},te=e=>c().then(e),ne=Y(X,!0);export{H as b,C as c,p as h,c as p,_ as r}