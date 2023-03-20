!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).CanvasForPrint=t()}(this,(function(){"use strict";var e={};
/*! streamsaver. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
!function(e){var t;t=()=>{const e="object"==typeof window?window:this;e.HTMLElement||console.warn("streamsaver is meant to run on browsers main thread");let t=null,n=!1;const a=e.WebStreamsPolyfill||{},r=e.isSecureContext;let i=/constructor/i.test(e.HTMLElement)||!!e.safari||!!e.WebKitPoint;const s=r||"MozAppearance"in document.documentElement.style?"iframe":"navigate",o={createWriteStream:function(a,l,c){let m={size:null,pathname:null,writableStrategy:void 0,readableStrategy:void 0},u=0,p=null,h=null,g=null;if(Number.isFinite(l)?([c,l]=[l,c],console.warn("[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream"),m.size=c,m.writableStrategy=l):l&&l.highWaterMark?(console.warn("[StreamSaver] Deprecated pass an object as 2nd argument when creating a write stream"),m.size=c,m.writableStrategy=l):m=l||{},!i){t||(t=r?d(o.mitm):function(t){const n="width=200,height=100",a=document.createDocumentFragment(),r={frame:e.open(t,"popup",n),loaded:!1,isIframe:!1,isPopup:!0,remove(){r.frame.close()},addEventListener(...e){a.addEventListener(...e)},dispatchEvent(...e){a.dispatchEvent(...e)},removeEventListener(...e){a.removeEventListener(...e)},postMessage(...e){r.frame.postMessage(...e)}},i=t=>{t.source===r.frame&&(r.loaded=!0,e.removeEventListener("message",i),r.dispatchEvent(new Event("load")))};return e.addEventListener("message",i),r}(o.mitm)),h=new MessageChannel,a=encodeURIComponent(a.replace(/\//g,":")).replace(/['()]/g,escape).replace(/\*/g,"%2A");const i={transferringReadable:n,pathname:m.pathname||Math.random().toString().slice(-6)+"/"+a,headers:{"Content-Type":"application/octet-stream; charset=utf-8","Content-Disposition":"attachment; filename*=UTF-8''"+a}};m.size&&(i.headers["Content-Length"]=m.size);const l=[i,"*",[h.port2]];if(n){const e="iframe"===s?void 0:{transform(e,t){if(!(e instanceof Uint8Array))throw new TypeError("Can only write Uint8Arrays");u+=e.length,t.enqueue(e),p&&(location.href=p,p=null)},flush(){p&&(location.href=p)}};g=new o.TransformStream(e,m.writableStrategy,m.readableStrategy);const t=g.readable;h.port1.postMessage({readableStream:t},[t])}h.port1.onmessage=e=>{e.data.download?"navigate"===s?(t.remove(),t=null,u?location.href=e.data.download:p=e.data.download):(t.isPopup&&(t.remove(),t=null,"iframe"===s&&d(o.mitm)),d(e.data.download)):e.data.abort&&(v=[],h.port1.postMessage("abort"),h.port1.onmessage=null,h.port1.close(),h.port2.close(),h=null)},t.loaded?t.postMessage(...l):t.addEventListener("load",(()=>{t.postMessage(...l)}),{once:!0})}let v=[];return!i&&g&&g.writable||new o.WritableStream({write(e){if(!(e instanceof Uint8Array))throw new TypeError("Can only write Uint8Arrays");i?v.push(e):(h.port1.postMessage(e),u+=e.length,p&&(location.href=p,p=null))},close(){if(i){const e=new Blob(v,{type:"application/octet-stream; charset=utf-8"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=a,t.click()}else h.port1.postMessage("end")},abort(){v=[],h.port1.postMessage("abort"),h.port1.onmessage=null,h.port1.close(),h.port2.close(),h=null}},m.writableStrategy)},WritableStream:e.WritableStream||a.WritableStream,supported:!0,version:{full:"2.0.5",major:2,minor:0,dot:5},mitm:"https://jimmywarting.github.io/StreamSaver.js/mitm.html?version=2.0.0"};function d(e){if(!e)throw new Error("meh");const t=document.createElement("iframe");return t.hidden=!0,t.src=e,t.loaded=!1,t.name="iframe",t.isIframe=!0,t.postMessage=(...e)=>t.contentWindow.postMessage(...e),t.addEventListener("load",(()=>{t.loaded=!0}),{once:!0}),document.body.appendChild(t),t}try{new Response(new ReadableStream),r&&!("serviceWorker"in navigator)&&(i=!0)}catch(e){i=!0}return(e=>{try{e()}catch(e){}})((()=>{const{readable:e}=new TransformStream,t=new MessageChannel;t.port1.postMessage(e,[e]),t.port1.close(),t.port2.close(),n=!0,Object.defineProperty(o,"TransformStream",{configurable:!1,writable:!1,value:TransformStream})})),o},e.exports=t()}({get exports(){return e},set exports(t){e=t}});const t=async(t,n)=>{const a=n;return new Promise(((n,r)=>{a.toBlob((a=>{const r=new Blob([a],{type:"image/png"}),i=e.createWriteStream(t+".png",{size:r.size}),s=r.stream();if(window.WritableStream&&s.pipeTo)return s.pipeTo(i).then((()=>{n()}));window.writer=i.getWriter();const o=s.getReader(),d=()=>o.read().then((e=>e.done?writer.close():writer.write(e.value).then(d)));d()}))}))},n=({settings:e})=>{let n=e.fileName,a=e.recordingFrames.current;const r=e.recordingFrames.start,i=e.recordingFrames.end;return{pictureMode:async()=>(await t(n,e.elem),{state:"saved"}),sequenceMode:async()=>{const s=n+"-"+a;if(a<r){return{state:await(async()=>new Promise(((e,t)=>{setTimeout((()=>{a+=1,e("goToNextFrame")}),1e3/60)})))(),currentFrame:a}}if(a>=r&&a<=i){return{state:await(async()=>(await t(s,e.elem),new Promise(((t,n)=>{setTimeout((()=>{a>=i?(a=0,t("saved")):(a++,t("saveNextFrame"))}),e.timeoutBetweenSavingFrames)}))))(),currentFrame:a}}},setFileName:e=>{n=e}}},a=[{unit:"mm",multipleToInches:25.4,label:"millimeters"},{unit:"cm",multipleToInches:2.54,label:"centimeters"},{unit:"dm",multipleToInches:.254,label:"decimeters"},{unit:"m",multipleToInches:.0254,label:"meters"},{unit:"in",multipleToInches:1,label:"inches"}],r=e=>{let t={...e,widthInPixels:0,heightInPixels:0};const n=t.elem;let r;const i=()=>{[t.widthInPixels,t.heightInPixels,t.ratio]=(({unit:e,width:t,height:n,ppi:r,ratio:i})=>{let s=1;for(let t in a)if(e==a[t].unit){s=a[t].multipleToInches;break}return[t=t/s*r,n=n/s*r,t/n]})({...t});return((e,t)=>{const n=getComputedStyle(t),a=parseFloat(n.width);let r=parseFloat(n.height)-Number(n.paddingBottom.match("[0-9.]*"))-Number(n.paddingTop.match("[0-9.]*"));const i=window.innerWidth,s=window.innerHeight;let o,d;return r=s-Number(n.paddingBottom.match("[0-9.]*"))-Number(n.paddingTop.match("[0-9.]*")),t.style.height="100%",t.style.overflowY="hidden",d=Math.min(s,r),o=d*e,o>i&&(o=Math.min(i,a),d=o/e),{width:o,height:d}})(t.ratio,t.container)};return{setSize:()=>{r=i(),n.width=t.widthInPixels,n.height=t.heightInPixels,n.style.width=r.width+"px",n.style.height=r.height+"px"},getCanvasSize:()=>({width:t.widthInPixels,height:t.heightInPixels}),getCanvasStyleSize:()=>(r=i(),{width:r.width,height:r.height})}};var i={p5Mode:!1,elem:document.createElement("canvas"),width:210,height:297,ppi:300,widthInPixels:null,heightInPixels:null,unit:"mm",ratio:null,mode:"picture",recordingFrames:{start:0,end:100,current:0},container:document.body,id:"canvas-for-print",pixelDensity:window.devicePixelRatio,context:"2d",timeoutBetweenSavingFrames:100,fileName:"test"};const s=({settings:e})=>{const t=document.createElement("div"),n=(({startFrame:e,endFrame:t,mode:n})=>{const a=document.createElement("button");a.classList.add("canvas-for-print_gui-inner-container"),a.setAttribute("id","canvas-for-print_gui-save");let r=0;const i="<div id='canvas-for-print_gui-is-downloading'><div class='spinner'><div class='bounce1'></div><div class='bounce2'></div><div class='bounce3'></div></div>",s="<p> <span id='canvas-for-print_current-frame'>"+r+"</span> / "+(t-e+1)+"</p>";return{isDownloaded:()=>(r=0,a.style.backgroundColor="#000","<svg width='0.9rem' height='0.9rem' viewBox='0 0 224 224' fill='none'><path fill-rule='evenodd' clip-rule='evenodd' d='M67.2 5.6V61.6C67.2 64.69 69.71 67.2 72.8 67.2H151.2C154.29 67.2 156.8 64.69 156.8 61.6V5.6C156.8 2.51 159.31 0 162.4 0H172.24C176.69 0 180.97 1.77 184.12 4.92L219.08 39.88C222.23 43.03 224 47.31 224 51.76V207.2C224 216.48 216.48 224 207.2 224H16.8C7.52 224 0 216.48 0 207.2V16.8C0 7.52 7.52 0 16.8 0H61.6C64.69 0 67.2 2.51 67.2 5.6ZM117.6 0H128.8C131.89 0 134.4 2.51 134.4 5.6V39.2C134.4 42.29 131.9 44.8 128.8 44.8H117.6C114.51 44.8 112 42.29 112 39.2V5.6C112 2.51 114.51 0 117.6 0ZM22.4 95.2V196C22.4 199.09 24.91 201.6 28 201.6H196C199.09 201.6 201.6 199.09 201.6 196V95.2C201.6 92.11 199.09 89.6 196 89.6H28C24.91 89.6 22.4 92.1 22.4 95.2Z' fill='white'/></svg>"),isDownloading:()=>(a.style.backgroundColor="#00f","sequence"===n?i+s+"<button id='canvas-for-print_gui-abort'>abort</button>":i),updateNumFrame:e=>{if("sequence"===n){r++;const e=document.getElementById("canvas-for-print_current-frame");void 0!==e&&(e.innerText=r)}},saveButton:a,finished:()=>(a.style.backgroundColor="#0f0","<span>finished</span>")}})({startFrame:e.recordingFrames.start,endFrame:e.recordingFrames.end,mode:e.mode}),a=n.saveButton,r=(({settings:e,container:t})=>{const n=[],a=({val:e,id:a})=>{const r=document.createElement("div");r.classList.add("canvas-for-print_gui-inner-container"),r.classList.add("canvas-for-print_hide"),r.innerHTML="<p>"+e+"</p>",t.appendChild(r),n.push(r)};return{infos:t=>{e={...t,...e},a({id:"size",val:e.width+" "+e.unit+" × "+e.height+" "+e.unit}),a({id:"ppi",val:e.ppi+" ppi"}),a({id:"mode",val:e.mode+" mode"}),"sequence"===e.mode&&a({id:"recordingFrames",val:"frames "+e.recordingFrames.start+" to "+e.recordingFrames.end})},pictureOrSequence:e=>{document.createElement("button")},sequenceSettings:()=>{document.createElement("input"),document.createElement("input")},settingsButton:()=>{let e=!1;const a=document.createElement("button");a.classList.add("canvas-for-print_gui-inner-container"),t.appendChild(a),a.innerHTML="<p>settings</p>";const r=()=>{for(let t in n)e?n[t].classList.add("canvas-for-print_hide"):n[t].classList.remove("canvas-for-print_hide");e=!e};a.addEventListener("click",r)}}})({container:t,settings:e}),i=e=>{a.addEventListener("click",e)};return{init:e=>{i(e),document.body.appendChild(t),r.settingsButton(),r.infos(),t.appendChild(a),a.innerHTML=n.isDownloaded(),t.setAttribute("id","canvas-for-print_gui-container")},update:({state:e,currentFrame:t,...r})=>{switch(e){case"startSaving":a.innerHTML=n.isDownloading();break;case"goToNextFrame":break;case"saveNextFrame":n.updateNumFrame();break;case"saved":n.updateNumFrame(),setTimeout((()=>{a.innerHTML=n.finished()}),500),setTimeout((()=>{a.innerHTML=n.isDownloaded()}),2e3)}},saveButton:a}};return e=>{let t={...i,...e};t.elem=document.createElement("canvas");let a=t.elem;const o=s({settings:t}),d=n({settings:t}),l=a.getContext(t.context),c=[];let m=!1;const u=r(t),p=(e,t)=>{const n=c[e];n&&n.forEach((e=>{e.call(null,t)}))},h=async()=>{m||(p("startSaving"),o.update({state:"startSaving",...t}),m=!0),"sequence"===t.mode?await d.sequenceMode().then((e=>{switch(o.update({state:e.state,currentFrame:e.currentFrame,...t}),e.state){case"goToNextFrame":case"saveNextFrame":p("frameSaved"),requestAnimationFrame(h);break;case"saved":p("saved"),m=!1}})):await d.pictureMode().then((e=>{o.update({state:e.state,...t}),p("saved"),m=!1}))};return window.onresize=()=>{u.setSize();const{width:e,height:n}=u.getCanvasSize();t.widthInPixels=e,t.heightInPixels=n,p("resize",t)},(()=>{u.setSize();const{width:e,height:n}=u.getCanvasSize();t.widthInPixels=e,t.heightInPixels=n,o.init(h),o.update({...t})})(),{...t,on:(e,t)=>(c[e]||(c[e]=[]),c[e].push(t),()=>{c[e]=c[e].filter((e=>t!==e))}),getStyleSize:()=>u.getCanvasStyleSize(),create:()=>{a.id=t.id,t.container.appendChild(a)},saveCanvas:h,ctx:l,setCanvas:e=>{const n=e.elt||e;t.elem=n,a=n},setFileName:e=>{d.setFileName(e)}}}}));
//# sourceMappingURL=canvas-for-print.umd.js.map
