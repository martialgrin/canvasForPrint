"use strict";function e(e,t){return t.forEach((function(t){t&&"string"!=typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(n){if("default"!==n&&!(n in e)){var i=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,i.get?i:{enumerable:!0,get:function(){return t[n]}})}}))})),Object.freeze(e)}var t={},n={get exports(){return t},set exports(e){t=e}};
/*! streamsaver. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
!function(e){var t;t=()=>{const e="object"==typeof window?window:this;e.HTMLElement||console.warn("streamsaver is meant to run on browsers main thread");let t=null,n=!1;const i=e.WebStreamsPolyfill||{},a=e.isSecureContext;let r=/constructor/i.test(e.HTMLElement)||!!e.safari||!!e.WebKitPoint;const o=a||"MozAppearance"in document.documentElement.style?"iframe":"navigate",s={createWriteStream:function(i,d,c){let m={size:null,pathname:null,writableStrategy:void 0,readableStrategy:void 0},p=0,h=null,u=null,g=null;if(Number.isFinite(d)?([c,d]=[d,c],console.warn("[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream"),m.size=c,m.writableStrategy=d):d&&d.highWaterMark?(console.warn("[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream"),m.size=c,m.writableStrategy=d):m=d||{},!r){t||(t=a?l(s.mitm):function(t){const n="width=200,height=100",i=document.createDocumentFragment(),a={frame:e.open(t,"popup",n),loaded:!1,isIframe:!1,isPopup:!0,remove(){a.frame.close()},addEventListener(...e){i.addEventListener(...e)},dispatchEvent(...e){i.dispatchEvent(...e)},removeEventListener(...e){i.removeEventListener(...e)},postMessage(...e){a.frame.postMessage(...e)}},r=t=>{t.source===a.frame&&(a.loaded=!0,e.removeEventListener("message",r),a.dispatchEvent(new Event("load")))};return e.addEventListener("message",r),a}(s.mitm)),u=new MessageChannel,i=encodeURIComponent(i.replace(/\//g,":")).replace(/['()]/g,escape).replace(/\*/g,"%2A");const r={transferringReadable:n,pathname:m.pathname||Math.random().toString().slice(-6)+"/"+i,headers:{"Content-Type":"application/octet-stream; charset=utf-8","Content-Disposition":"attachment; filename*=UTF-8''"+i}};m.size&&(r.headers["Content-Length"]=m.size);const d=[r,"*",[u.port2]];if(n){const e="iframe"===o?void 0:{transform(e,t){if(!(e instanceof Uint8Array))throw new TypeError("Can only write Uint8Arrays");p+=e.length,t.enqueue(e),h&&(location.href=h,h=null)},flush(){h&&(location.href=h)}};g=new s.TransformStream(e,m.writableStrategy,m.readableStrategy);const t=g.readable;u.port1.postMessage({readableStream:t},[t])}u.port1.onmessage=e=>{e.data.download?"navigate"===o?(t.remove(),t=null,p?location.href=e.data.download:h=e.data.download):(t.isPopup&&(t.remove(),t=null,"iframe"===o&&l(s.mitm)),l(e.data.download)):e.data.abort&&(w=[],u.port1.postMessage("abort"),u.port1.onmessage=null,u.port1.close(),u.port2.close(),u=null)},t.loaded?t.postMessage(...d):t.addEventListener("load",(()=>{t.postMessage(...d)}),{once:!0})}let w=[];return!r&&g&&g.writable||new s.WritableStream({write(e){if(!(e instanceof Uint8Array))throw new TypeError("Can only write Uint8Arrays");r?w.push(e):(u.port1.postMessage(e),p+=e.length,h&&(location.href=h,h=null))},close(){if(r){const e=new Blob(w,{type:"application/octet-stream; charset=utf-8"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=i,t.click()}else u.port1.postMessage("end")},abort(){w=[],u.port1.postMessage("abort"),u.port1.onmessage=null,u.port1.close(),u.port2.close(),u=null}},m.writableStrategy)},WritableStream:e.WritableStream||i.WritableStream,supported:!0,version:{full:"2.0.5",major:2,minor:0,dot:5},mitm:"https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0"};function l(e){if(!e)throw new Error("meh");const t=document.createElement("iframe");return t.hidden=!0,t.src=e,t.loaded=!1,t.name="iframe",t.isIframe=!0,t.postMessage=(...e)=>t.contentWindow.postMessage(...e),t.addEventListener("load",(()=>{t.loaded=!0}),{once:!0}),document.body.appendChild(t),t}try{new Response(new ReadableStream),a&&!("serviceWorker"in navigator)&&(r=!0)}catch(e){r=!0}return(e=>{try{e()}catch(e){}})((()=>{const{readable:e}=new TransformStream,t=new MessageChannel;t.port1.postMessage(e,[e]),t.port1.close(),t.port2.close(),n=!0,Object.defineProperty(s,"TransformStream",{configurable:!1,writable:!1,value:TransformStream})})),s},n.exports=t()}();var i=e({__proto__:null,default:t},[t]);const a=[{unit:"mm",multipleToInches:25.4,label:"millimeters"},{unit:"cm",multipleToInches:2.54,label:"centimeters"},{unit:"dm",multipleToInches:.254,label:"decimeters"},{unit:"m",multipleToInches:.0254,label:"meters"},{unit:"in",multipleToInches:1,label:"inches"}],r=()=>{document.body.style.minHeight=window.innerHeight,document.body.style.minWidth=window.innerWidth},o=(e={width:width,height:height,CANVASP:n,container:container,unit:unit,dpi:dpi,ratio:ratio})=>{let t={...e,widthInPixels:0,heightInPixels:0};const n=t.CANVASP,i=()=>{[t.widthInPixels,t.heightInPixels,t.ratio]=(({unit:e,width:t,height:n,dpi:i,ratio:r})=>{let o=1;for(let t in a)if(e==a[t].unit){o=a[t].multipleToInches;break}return[t=t/o*i,n=n/o*i,t/n]})({...t});return((e,t)=>{const n=getComputedStyle(t),i=parseFloat(n.width);let a=parseFloat(n.height);const o=window.innerWidth,s=window.innerHeight;let l,d;return 0==a&&(t.style.height=window.innerHeight+"px",t.style.overflowY="hidden",a=t.offsetHeight),r(),d=Math.min(s,a),l=d*e,l>o&&(l=Math.min(o,i),d=l/e),{width:l,height:d}})(t.ratio,t.container)};return{init:()=>{},setSize:()=>{const e=i();n.width=t.widthInPixels,n.height=t.heightInPixels,n.style.width=e.width+"px",n.style.height=e.height+"px"},getCanvasSize:()=>({width:t.widthInPixels,height:t.heightInPixels})}};var s={p5Mode:!1,elem:document.createElement("canvas"),width:210,height:297,dpi:300,widthInPixels:null,heightInPixels:null,unit:"mm",ratio:null,mode:"picture",recordingFrames:{start:0,end:100,current:0},container:document.body,id:"canvas-for-print",pixelDensity:window.devicePixelRatio,context:"2d"};const l=()=>{const e=document.createElement("div"),t=document.createElement("button"),n=document.createElement("div"),i=document.createElement("button");let a=!1;a&&e.classList.add("hide");const r=()=>{document.body.appendChild(e),e.appendChild(n),e.appendChild(t),e.appendChild(i),t.setAttribute("id","canvaspdflib_gui-display-button"),e.setAttribute("id","canvaspdflib_gui-container"),n.setAttribute("id","canvaspdflib_gui-infos-container"),i.setAttribute("id","canvaspdflib_gui-save-button"),t.innerHTML="<div><p>open</p></div>",i.innerHTML="<p>save</p>",t.addEventListener("click",d),t.addEventListener("mouseenter",o),t.addEventListener("mouseleave",s)},o=()=>{a&&e.classList.add("canvaspdflib_button-is-hover")},s=()=>{if(a){const e=document.getElementsByClassName("canvaspdflib_button-is-hover");if(e.length>0)for(let t in e)"object"==typeof e[t]&&e[t].classList.remove("canvaspdflib_button-is-hover")}},l=e=>{n.innerHTML="<p> "+e.width+" "+e.unit+" × "+e.height+" "+e.unit+"<br/>"+e.dpi+" dpi</p>"},d=()=>{a?(e.classList.remove("hide"),setTimeout((()=>{t.innerHTML="<div><p>close</p></div>"}),250)):(setTimeout((()=>{t.innerHTML="<div><p>open</p></div>"}),250),e.classList.add("hide")),a=!a};return r(),{init:r,update:({...e})=>{l(e)},saveButton:i}};module.exports=e=>{let n={...s,...e};const a=n.elem,r=l(),d=r.saveButton,c=a.getContext(n.context),m=[],p=(e,t)=>{const n=m[e];n&&n.forEach((e=>{e.call(null,t)}))},h=o({width:n.width,height:n.height,unit:n.unit,dpi:n.dpi,ratio:n.ratio,CANVASP:a,container:n.container}),u=async()=>{p("saving",n),await(async()=>{console.log(i),console.log("Enter in save File");const e=document.getElementById("canvas-for-print");return new Promise(((n,i)=>{e.toBlob((e=>{const i=new Blob([e],{type:"image/png"}),a=t.createWriteStream("sample.png",{size:i.size}),r=i.stream();if(window.WritableStream&&r.pipeTo)return r.pipeTo(a).then((()=>{n(),console.log("it's done")}));window.writer=a.getWriter(),r.getReader()}))}))})(),p("saved",n),"sequence"===n.mode&&(p("saveNextFrame",n),n.recordingFrames.current++)},g=()=>{a.id=n.id,n.container.appendChild(a)};return window.onresize=()=>{h.setSize();const{width:e,height:t}=h.getCanvasSize();n.widthInPixels=e,n.heightInPixels=t,r.update({...n})},(()=>{h.setSize();const{width:e,height:t}=h.getCanvasSize();n.widthInPixels=e,n.heightInPixels=t,g(),r.init(),r.update({...n}),d.addEventListener("click",u)})(),{...n,on:(e,t)=>(m[e]||(m[e]=[]),m[e].push(t),()=>{m[e]=m[e].filter((e=>t!==e))}),saveCanvas:()=>{u()},ctx:c}};
//# sourceMappingURL=canvas-for-print.cjs.js.map
