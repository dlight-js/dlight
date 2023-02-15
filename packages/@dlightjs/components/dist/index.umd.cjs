(function(h,d){typeof exports=="object"&&typeof module<"u"?d(exports,require("@dlightjs/dlight")):typeof define=="function"&&define.amd?define(["exports","@dlightjs/dlight"],d):(h=typeof globalThis<"u"?globalThis:h||self,d(h.component={},h._$))})(this,function(h,d){"use strict";var F=Object.defineProperty;var H=(h,d,u)=>d in h?F(h,d,{enumerable:!0,configurable:!0,writable:!0,value:u}):h[d]=u;var n=(h,d,u)=>(H(h,typeof d!="symbol"?d+"":d,u),u);function u(s){const a=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(s){for(const e in s)if(e!=="default"){const t=Object.getOwnPropertyDescriptor(s,e);Object.defineProperty(a,e,t.get?t:{enumerable:!0,get:()=>s[e]})}}return a.default=s,Object.freeze(a)}const l=u(d);class T extends d.View{constructor(){super(...arguments);n(this,"_$tag","Spacer")}Body(){return[new l.HtmlNode("div")]}}function m(s){if(![d.DLNodeType.HTML,d.DLNodeType.Text].includes(s._$nodeType)){if(s._$tag==="Spacer")return!0;for(let a of s._$nodes??[])if(m(a))return!0}return!1}class U extends d.View{constructor(){super(...arguments);n(this,"_$derivedPairs",{margin:["alignment"]});n(this,"_$deps",{spacing:new Map,alignment:new Map,width:new Map,height:new Map,margin:new Map});n(this,"_$tag","HStack");n(this,"_$$spacing","_$prop");n(this,"spacing",10);n(this,"_$$alignment","_$prop");n(this,"alignment","top");n(this,"_$$width","_$prop");n(this,"width","100%");n(this,"_$$height","_$prop");n(this,"height","max-content");n(this,"margin",()=>function(){switch(this.alignment){case"top":return"0 0 auto 0";case"bottom":return"auto 0 0 0";case"center":return"auto 0";default:return""}}.call(this))}Body(){const e=new l.HtmlNode("div");return e._$addProp("_height",()=>this.height,this,["height"]),e._$addProp("_width",()=>this.width,this,["width"]),e._$addProp("_columnGap",()=>`${this.spacing}px`,this,["spacing"]),e._$addProp("_display","flex"),e._$addProp("_flexDirection","row"),e._$addNodes((()=>{const t=new l.ForNode;return t._$addNodess(Array.from(this._$children).map(r=>(()=>{const o=new l.IfNode;return o._$addCond(()=>m(r),()=>{const i=new l.ExpressionNode(r);return i._$addProp("_flexGrow",1),[i]}),o._$addCond(()=>!0,()=>{const i=new l.ExpressionNode(r);return i._$addProp("_flexShrink",0),i._$addProp("_margin",()=>this.margin,this,["margin"],!0),[i]}),[o]})())),[t]})()),[e]}}class A extends d.View{constructor(){super(...arguments);n(this,"_$derivedPairs",{margin:["alignment"]});n(this,"_$deps",{spacing:new Map,alignment:new Map,width:new Map,height:new Map,margin:new Map});n(this,"_$tag","VStack");n(this,"_$$spacing","_$prop");n(this,"spacing",10);n(this,"_$$alignment","_$prop");n(this,"alignment","leading");n(this,"_$$width","_$prop");n(this,"width","max-content");n(this,"_$$height","_$prop");n(this,"height","100%");n(this,"margin",()=>function(){switch(this.alignment){case"leading":return"0 auto 0 0";case"tailing":return"0 0 0 auto";case"center":return"0 auto";default:return""}}.call(this))}Body(){const e=new l.HtmlNode("div");return e._$addProp("_height",()=>this.height,this,["height"]),e._$addProp("_width",()=>this.width,this,["width"]),e._$addProp("_columnGap",()=>`${this.spacing}px`,this,["spacing"]),e._$addProp("_display","flex"),e._$addProp("_flexDirection","column"),e._$addNodes((()=>{const t=new l.ForNode;return t._$addNodess(Array.from(this._$children).map(r=>(()=>{const o=new l.IfNode;return o._$addCond(()=>m(r),()=>{const i=new l.ExpressionNode(r);return i._$addProp("_flexGrow",1),[i]}),o._$addCond(()=>!0,()=>{const i=new l.ExpressionNode(r);return i._$addProp("_flexShrink",0),i._$addProp("_margin",()=>this.margin,this,["margin"],!0),[i]}),[o]})())),[t]})()),[e]}}class b extends d.View{constructor(){super(...arguments);n(this,"_$deps",{hAlignment:new Map,vAlignment:new Map,width:new Map,height:new Map});n(this,"_$tag","ZStack");n(this,"_$$hAlignment","_$prop");n(this,"hAlignment","center");n(this,"_$$vAlignment","_$prop");n(this,"vAlignment","center");n(this,"_$$width","_$prop");n(this,"width","max-content");n(this,"_$$height","_$prop");n(this,"height","max-content")}Body(){const e=new l.HtmlNode("div");return e._$addProp("_height",()=>this.height,this,["height"]),e._$addProp("_width",()=>this.width,this,["width"]),e._$addProp("_display","grid"),e._$addProp("_alignItems",()=>({top:"flex-start",center:"center",bottom:"flex-end"})[this.vAlignment],this,["vAlignment"]),e._$addProp("_justifyItems",()=>({leading:"left",center:"center",tailing:"right"})[this.hAlignment],this,["hAlignment"]),e._$addNodes((()=>{const t=new l.ForNode;return t._$addNodess(Array.from(this._$children).map(r=>(()=>{const o=new l.ExpressionNode(r);return o._$addProp("_position","relative"),o._$addProp("_gridArea","1 / 1/ 1 / 1"),[o]})())),[t]})()),[e]}}function N(){return location.hash.slice(2)}function x(){return location.pathname.slice(1)}function S(s,a){let e;if(s[0]==="/")e=s;else{s[0]!=="."&&(s="./"+s);const t=s.split("/"),r=a.split("/").filter(i=>i);let o=0;for(let i of t){if(![".",".."].includes(i))break;i===".."&&(r.length===0&&console.warn(`no ../ in ${s}`),r.pop()),o++}e="/"+[...r,...t.slice(o)].join("/")}return e}class E{constructor(){n(this,"mode","hash");n(this,"baseUrl","")}hashTo(a){window.location.href="#"+S(a,this.baseUrl)}historyTo(a){window.history.pushState({},"",S(a,this.baseUrl))}to(a){if(this.mode==="hash"){this.hashTo(a);return}this.historyTo(a)}}class L extends d.View{constructor(){super(...arguments);n(this,"_$deps",{_$content:new Map});n(this,"_$tag","Route");n(this,"_$$_$content","_$prop");n(this,"_$content"," none")}Body(){return[new l.ExpressionNode(this._$children)]}}const v=history.pushState;let $=[];class C extends d.View{constructor(){super(...arguments);n(this,"_$derivedPairs",{currUrl:["mode"],showedRoute:["currUrl"]});n(this,"_$deps",{mode:new Map,navigator:new Map,currUrl:new Map,showedRoute:new Map});n(this,"_$tag","RouterSpace");n(this,"_$$mode","_$prop");n(this,"mode","history");n(this,"_$$navigator");n(this,"_$$currUrl",()=>this.mode==="hash"?N():x());n(this,"baseUrl","");n(this,"prevPathCondition","");n(this,"prevRoutes",[]);n(this,"showedRoute",()=>function(){const e=this.prevPathCondition;this.prevPathCondition="";const t=this.currUrl.replace(new RegExp(`^${this.baseUrl}`),"");let r=[];for(let o of this._$childrenFunc){const i=o();if(i._$tag!=="Route"){r.push(i);continue}let p=i._$content,c=!1;if(typeof i._$content=="string"){p=p.replace(/^(\.\/)+/,"");const _=p==="."&&t==="",f=(t+"/").startsWith(p+"/");c=_||f||p===" none"}else p instanceof RegExp&&(c=p.test(t));if(c){if(p===e)return this.prevPathCondition=e,this.prevRoutes;r.push(i),this.prevPathCondition=p;break}}return this.prevRoutes=r,r}.call(this));n(this,"historyChangeListen",()=>{this.currUrl=x()});n(this,"hashChangeListen",()=>{this.currUrl=N()})}get navigator(){return this._$$navigator}set navigator(e){this._$$navigator!==e&&(this._$$navigator=e,this._$runDeps("navigator"))}get currUrl(){return this._$$currUrl}set currUrl(e){this._$$currUrl!==e&&(this._$$currUrl=e,this._$runDeps("currUrl"))}didMount(){if(this.mode==="hash"){addEventListener("load",this.hashChangeListen),addEventListener("hashchange",this.hashChangeListen);return}addEventListener("load",this.historyChangeListen),addEventListener("popstate",this.historyChangeListen),$.push(this.historyChangeListen),history.pushState=new Proxy(v,{apply:(e,t,r)=>{const o=e.apply(t,r);for(let i of $)i();return o}})}willUnmount(){if(this.mode==="hash"){removeEventListener("load",this.hashChangeListen),removeEventListener("hashchange",this.hashChangeListen);return}removeEventListener("load",this.historyChangeListen),removeEventListener("popstate",this.historyChangeListen),$=$.filter(e=>e!==this.historyChangeListen),$.length>0?history.pushState=new Proxy(v,{apply:(e,t,r)=>{const o=e.apply(t,r);for(let i of $)i();return o}}):history.pushState=v}AfterConstruct(){let e=this._$parentNode;for(;e;)e._$tag==="Route"&&(this.baseUrl=e._$content+"/"+this.baseUrl),e=e._$parentNode}Preset(){const e=new E;e.mode=this.mode,e.baseUrl=this.baseUrl,this.navigator=e}Body(){const e=new l.EnvNode;return e._$addNodes((()=>[new l.ExpressionNode(()=>this.showedRoute,this,["showedRoute"])])()),e._$addProp("RouteParam",()=>({path:this.currUrl,navigator:this.navigator}),this,["currUrl","navigator"],!1),[e]}}class D extends d.View{constructor(){super(...arguments);n(this,"_$deps",{duration:new Map,easing:new Map,delay:new Map,appearWith:new Map,disappearWith:new Map,movable:new Map});n(this,"_$tag","Transition");n(this,"_$duration",.5);n(this,"_$easing","ease-in-out");n(this,"_$delay",0);n(this,"_$$duration","_$prop");n(this,"duration",this._$duration);n(this,"_$$easing","_$prop");n(this,"easing",this._$easing);n(this,"_$$delay","_$prop");n(this,"delay",this._$delay);n(this,"_duration",e=>this.parseProp(e,"duration"));n(this,"_easing",e=>this.parseProp(e,"easing"));n(this,"_delay",e=>this.parseProp(e,"delay"));n(this,"firstRender",!0);n(this,"transition",(e,t)=>`all ${this._duration(e)[t]}s ${this._easing(e)[t]} ${this._delay(e)[t]}s`);n(this,"_$$appearWith","_$prop");n(this,"appearWith",{opacity:0});n(this,"_$$disappearWith","_$prop");n(this,"disappearWith",{opacity:0});n(this,"_$$movable","_$prop");n(this,"movable",!0);n(this,"prevElInfos",new Map);n(this,"removeStore");n(this,"lastDisappear",!1);n(this,"removeStores")}parseProp(e,t){let r={};const o=this["_$"+t],i=this[t];typeof i=="object"?(r.appear=i.appear??o,r.firstAppear=i.firstAppear??r.appear,r.disappear=i.disappear??o,r.lastDisappear=i.lastDisappear??r.disappear,r.move=i.move??o):(r.firstAppear=i,r.appear=i,r.disappear=i,r.lastDisappear=i,r.move=i);const p=c=>typeof c=="function"?c(e):c;return r.appear=p(r.appear)??o,r.firstAppear=p(r.firstAppear)??r.appear,r.disappear=p(r.disappear)??o,r.lastDisappear=p(r.lastDisappear)??r.disappear,r.move=p(r.move)??o,r}resolveDisappear(e){const{el:t,parentNode:r,rect:o,idx:i}=e;t.style.position="absolute",t.style.transition=this.lastDisappear?this.transition(t,"lastDisappear"):this.transition(t,"disappear"),t.style.margin="",t.style.transform="",w(t,p=>{p.style.margin="",p.style.transform=""}),t.style.top=`${o.top}px`,t.style.left=`${o.left}px`,r.childNodes.length>=i?r.appendChild(t):r.insertBefore(t,r.childNodes[i]),requestAnimationFrame(()=>{const p=()=>{t.removeEventListener("transitionend",p),t.remove()};t.addEventListener("transitionend",p),R(t,this.disappearWith)})}willUnmount(){this.lastDisappear=!0;const e=this._$el;this.removeStores=[];for(let t of e)this.removeStores.push(M(t))}didUnmount(){for(let e of this.removeStores)this.resolveDisappear(e)}Body(){const e=new l.ExpressionNode(this._$children);return e._$onUpdateNodes(()=>{for(let[t,r]of this.prevElInfos.entries())if(this.movable){t.style.transform="";const o={rect:t.getBoundingClientRect(),stopTrigger:r.stopTrigger};if(this.prevElInfos.set(t,o),o.stopTrigger)continue;r.stopTrigger=!0;const i=r.rect.x-o.rect.x,p=r.rect.y-o.rect.y;k(t,this._duration(t).move,this._easing(t).move,this._delay(t).move,i,p,o)}}),e._$addProp("didAppear",t=>{if(t.style.transition=this.firstRender?this.transition(t,"firstAppear"):this.transition(t,"appear"),w(t,i=>{i.style.transition=this.firstRender?this.transition(i,"firstAppear"):this.transition(i,"appear")}),requestAnimationFrame(()=>{this.prevElInfos.set(t,{rect:t.getBoundingClientRect(),stopTrigger:!0})}),!this.appearWith)return;const r=t.style.cssText;R(t,this.appearWith);const o=this.firstRender;requestAnimationFrame(()=>{t.setAttribute("style",r);const i=()=>{const p=this.prevElInfos.get(t);p.rect=t.getBoundingClientRect(),p.stopTrigger=!1,t.removeEventListener("transitionend",i)};t.addEventListener("transitionend",i),this.firstRender&&(this.firstRender=!1),setTimeout(()=>{this.prevElInfos.get(t).stopTrigger=!1},this._duration(t).appear*1e3),o&&requestAnimationFrame(()=>{t.style.transition=this.transition(t,"appear")})})}),e._$addProp("willDisappear",t=>{this.lastDisappear||(this.removeStore=M(t),this.prevElInfos.delete(t))}),e._$addProp("didDisappear",()=>{this.lastDisappear||this.resolveDisappear(this.removeStore)}),[e]}}function M(s){var a;return{el:s.cloneNode(!0),parentNode:s.parentNode,rect:{top:s.offsetTop,left:s.offsetLeft},idx:Array.from(((a=s.parentNode)==null?void 0:a.childNodes)??[]).indexOf(s)}}function w(s,a){s.nodeType!==Node.TEXT_NODE&&(a(s),s.childNodes.forEach(e=>w(e,a)))}function R(s,a){typeof a=="function"&&(a=a(s));const e=s.style.cssText;if(typeof a=="string")s.setAttribute("style",e+a);else for(let[t,r]of Object.entries(a))s.style[t]=r}function k(s,a,e,t,r,o,i){let p,c,_=!1;const f=`all ${a}s ${e} ${t}s`;function y(g){p===void 0&&(p=g,s.style.transition=f+", transform 0s");const I=g-p;if(c!==g){const P=Math.max(I/(a*1e3)-t,0),j=P*r,B=P*o;P>=1?(s.style.transform="",_=!0):s.style.transform=`translate(${r-j}px, ${o-B}px)`,i.rect=s.getBoundingClientRect()}c=g,!_&&!i.stopTrigger?requestAnimationFrame(y):s.style.transition=f}requestAnimationFrame(y)}h.HStack=U,h.Navigator=E,h.Route=L,h.RouterSpace=C,h.Spacer=T,h.Transition=D,h.VStack=A,h.ZStack=b,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})});
