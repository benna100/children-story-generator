(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();function A(){}function te(e){return e()}function X(){return Object.create(null)}function j(e){e.forEach(te)}function ce(e){return typeof e=="function"}function ne(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}let K;function J(e,t){return K||(K=document.createElement("a")),K.href=t,e===K.href}function ue(e){return Object.keys(e).length===0}function m(e,t){e.appendChild(t)}function x(e,t,r){e.insertBefore(t,r||null)}function b(e){e.parentNode.removeChild(e)}function h(e){return document.createElement(e)}function q(e){return document.createTextNode(e)}function v(){return q(" ")}function fe(){return q("")}function z(e,t,r,n){return e.addEventListener(t,r,n),()=>e.removeEventListener(t,r,n)}function c(e,t,r){r==null?e.removeAttribute(t):e.getAttribute(t)!==r&&e.setAttribute(t,r)}function pe(e){return Array.from(e.childNodes)}function de(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function P(e,t){e.value=t==null?"":t}function S(e,t,r,n){r===null?e.style.removeProperty(t):e.style.setProperty(t,r,n?"important":"")}let G;function N(e){G=e}const C=[],Q=[],B=[],W=[],me=Promise.resolve();let H=!1;function he(){H||(H=!0,me.then(re))}function M(e){B.push(e)}const R=new Set;let T=0;function re(){const e=G;do{for(;T<C.length;){const t=C[T];T++,N(t),ge(t.$$)}for(N(null),C.length=0,T=0;Q.length;)Q.pop()();for(let t=0;t<B.length;t+=1){const r=B[t];R.has(r)||(R.add(r),r())}B.length=0}while(C.length);for(;W.length;)W.pop()();H=!1,R.clear(),N(e)}function ge(e){if(e.fragment!==null){e.update(),j(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(M)}}const F=new Set;let _e;function oe(e,t){e&&e.i&&(F.delete(e),e.i(t))}function ye(e,t,r,n){if(e&&e.o){if(F.has(e))return;F.add(e),_e.c.push(()=>{F.delete(e),n&&(r&&e.d(1),n())}),e.o(t)}else n&&n()}function be(e){e&&e.c()}function ie(e,t,r,n){const{fragment:o,on_mount:s,on_destroy:l,after_update:u}=e.$$;o&&o.m(t,r),n||M(()=>{const p=s.map(te).filter(ce);l?l.push(...p):j(p),e.$$.on_mount=[]}),u.forEach(M)}function se(e,t){const r=e.$$;r.fragment!==null&&(j(r.on_destroy),r.fragment&&r.fragment.d(t),r.on_destroy=r.fragment=null,r.ctx=[])}function we(e,t){e.$$.dirty[0]===-1&&(C.push(e),he(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function le(e,t,r,n,o,s,l,u=[-1]){const p=G;N(e);const i=e.$$={fragment:null,ctx:null,props:s,update:A,not_equal:o,bound:X(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(p?p.$$.context:[])),callbacks:X(),dirty:u,skip_bound:!1,root:t.target||p.$$.root};l&&l(i.root);let f=!1;if(i.ctx=r?r(e,t.props||{},(_,I,...E)=>{const d=E.length?E[0]:I;return i.ctx&&o(i.ctx[_],i.ctx[_]=d)&&(!i.skip_bound&&i.bound[_]&&i.bound[_](d),f&&we(e,_)),I}):[],i.update(),f=!0,j(i.before_update),i.fragment=n?n(i.ctx):!1,t.target){if(t.hydrate){const _=pe(t.target);i.fragment&&i.fragment.l(_),_.forEach(b)}else i.fragment&&i.fragment.c();t.intro&&oe(e.$$.fragment),ie(e,t.target,t.anchor,t.customElement),re()}N(p)}class ae{$destroy(){se(this,1),this.$destroy=A}$on(t,r){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(r),()=>{const o=n.indexOf(r);o!==-1&&n.splice(o,1)}}$set(t){this.$$set&&!ue(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}async function Z({prompt:e,fake:t}){if(t)return"Ingeborg m\xF8der en delfin der kan spille guitar. Delfinen spiller en melodi, og Ingeborg synes, at det er den smukkeste musik, hun nogensinde har h\xF8rt. Hun sp\xF8rger delfinen, om den kan l\xE6re hende at spille guitar. Delfinen svarer, at det kan den godt. S\xE5 Ingeborg og delfinen begynder at spille guitar sammen. Og Ingeborg synes, at det er s\xE5 sjovt, at hun aldrig vil stoppe igen.";const r=sessionStorage.getItem("OPENAI_KEY")?sessionStorage.getItem("OPENAI_KEY"):window.prompt("Enter your OpenAI api key");sessionStorage.setItem("OPENAI_KEY",r);const o=await(await fetch("https://api.openai.com/v1/completions",{headers:{"content-type":"application/json",Authorization:`Bearer ${r}`},method:"post",body:JSON.stringify({model:"text-davinci-002",prompt:e,temperature:0,max_tokens:e.length*4})})).json();return console.log(o),o.choices[0].text&&o.choices[0].text.trim()}async function xe({prompt:e,prefix:t="",suffix:r="",fake:n}){return new Promise((o,s)=>{if(n)return o("https://daisyui.com/tailwind-css-component-card-1.jpg");const l=sessionStorage.getItem("STADIFF_KEY")||window.prompt("Enter your Stable Diffusion api key");sessionStorage.setItem("STADIFF_KEY",l);const u=new URLSearchParams;u.append("prompt",e),u.append("steps","50"),u.append("height","512"),u.append("guidance","7.5"),u.append("sampler","k_lms"),u.append("width","512"),fetch("https://dezgo.p.rapidapi.com/text2image",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded","X-RapidAPI-Key":l,"X-RapidAPI-Host":"dezgo.p.rapidapi.com"},body:u}).then(i=>i.blob()).then(i=>{const f=URL.createObjectURL(i);console.log("got a new url",f),o(f)}).catch(i=>{console.error(i),s(i)})})}function ke(e){let t;return{c(){t=h("button"),t.innerHTML='<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Vent venligst...',c(t,"class","btn btn-info")},m(r,n){x(r,t,n)},p:A,d(r){r&&b(t)}}}function ve(e){let t,r,n;return{c(){t=h("button"),t.textContent="Generer din historie",c(t,"class","btn btn-primary")},m(o,s){x(o,t,s),r||(n=z(t,"click",e[6]),r=!0)},p:A,d(o){o&&b(t),r=!1,n()}}}function ee(e){let t,r,n,o,s,l,u,p;return{c(){t=h("div"),t.textContent="Din historie:",r=v(),n=h("div"),o=h("img"),l=v(),u=h("p"),p=q(e[5]),c(t,"class","divider mb-10"),J(o.src,s=e[4])||c(o,"src",s),c(o,"width","300"),c(o,"height","300"),c(o,"class","float-right ml-2"),c(u,"class","text-3xl p-2"),S(u,"line-height","2.5rem"),S(u,"font-size","1.6rem"),S(u,"white-space","break-spaces"),c(n,"class","pb-8 w-1/2"),S(n,"margin","0 auto"),S(n,"overflow","auto"),S(n,"min-height","400px")},m(i,f){x(i,t,f),x(i,r,f),x(i,n,f),m(n,o),m(n,l),m(n,u),m(u,p)},p(i,f){f&16&&!J(o.src,s=i[4])&&c(o,"src",s),f&32&&de(p,i[5])},d(i){i&&b(t),i&&b(r),i&&b(n)}}}function $e(e){let t,r,n,o,s,l,u,p,i,f,_,I,E,d,L,O,$,w,U;function V(a,y){return a[3]?ke:ve}let D=V(e),k=D(e),g=e[4]&&ee(e);return{c(){t=h("h1"),t.textContent="Generer din egen b\xF8rnebog \u{1F4D6}",r=v(),n=h("div"),o=h("p"),o.textContent="Generer en historie om",s=v(),l=h("input"),u=v(),p=h("p"),p.textContent="Barnets alder er",i=v(),f=h("input"),_=v(),I=h("p"),I.textContent="Den skal handle om",E=v(),d=h("textarea"),L=v(),k.c(),O=v(),g&&g.c(),$=fe(),c(t,"class","text-4xl pt-10 pb-10 text-center p-2"),c(o,"class",""),c(l,"class","h-8 input text-secondary-content mb-6 font-bold bg-secondary"),c(l,"type","text"),c(l,"placeholder","fx. en pige der hedder..."),c(f,"class","input w-24 font-bold text-secondary-content font-bold mb-6 bg-secondary"),c(f,"type","text"),c(f,"placeholder","fx. 5"),c(d,"class","textarea block bg-secondary h-36 mb-10"),c(d,"name",""),c(d,"id",""),c(d,"cols","30"),c(d,"rows","10"),c(d,"placeholder","fx. m\xF8der en drage med en sjov hat p\xE5"),c(n,"class","p-6 text-2xl w-1/2"),S(n,"margin","0 auto")},m(a,y){x(a,t,y),x(a,r,y),x(a,n,y),m(n,o),m(n,s),m(n,l),P(l,e[0]),m(n,u),m(n,p),m(n,i),m(n,f),P(f,e[1]),m(n,_),m(n,I),m(n,E),m(n,d),P(d,e[2]),m(n,L),k.m(n,null),x(a,O,y),g&&g.m(a,y),x(a,$,y),w||(U=[z(l,"input",e[7]),z(f,"input",e[8]),z(d,"input",e[9])],w=!0)},p(a,[y]){y&1&&l.value!==a[0]&&P(l,a[0]),y&2&&f.value!==a[1]&&P(f,a[1]),y&4&&P(d,a[2]),D===(D=V(a))&&k?k.p(a,y):(k.d(1),k=D(a),k&&(k.c(),k.m(n,null))),a[4]?g?g.p(a,y):(g=ee(a),g.c(),g.m($.parentNode,$)):g&&(g.d(1),g=null)},i:A,o:A,d(a){a&&b(t),a&&b(r),a&&b(n),k.d(),a&&b(O),g&&g.d(a),a&&b($),w=!1,j(U)}}}const Y=!1;function Ie(e,t,r){let n="Ingeborg",o=4,s="m\xF8der en delfin der kan spille guitar",l=!1,u="",p="";const i=async()=>{r(3,l=!0);const E=`Det f\xF8lgende er en historie til en ${o} \xE5rig barn, barnet hedder ${n} som ${s}. 
`;console.log("original prompt: ",E);const d=await Z({prompt:E,fake:Y}).catch(w=>{alert(w)});r(5,p=d.replaceAll(". ",`.

`)),console.log("story: ",p);const L=`${d} 
One line summary: `,O=await Z({prompt:L,fake:Y}).catch(w=>{alert(w)});console.log("Summary: ",O);const $=`${O} Children's Book Illustration, taylor barron, basia tran`.replace(n,"a child");console.log($),console.log("Image prompt: ",$),xe({prompt:$,fake:Y}).then(w=>{r(4,u=w),r(3,l=!1)}).catch(w=>{alert(w)})};function f(){n=this.value,r(0,n)}function _(){o=this.value,r(1,o)}function I(){s=this.value,r(2,s)}return[n,o,s,l,u,p,i,f,_,I]}class Ee extends ae{constructor(t){super(),le(this,t,Ie,$e,ne,{})}}function Se(e){let t,r,n;return r=new Ee({}),{c(){t=h("main"),be(r.$$.fragment),c(t,"data-theme","retro"),S(t,"min-height","100vh")},m(o,s){x(o,t,s),ie(r,t,null),n=!0},p:A,i(o){n||(oe(r.$$.fragment,o),n=!0)},o(o){ye(r.$$.fragment,o),n=!1},d(o){o&&b(t),se(r)}}}class Ae extends ae{constructor(t){super(),le(this,t,null,Se,ne,{})}}new Ae({target:document.getElementById("app")});