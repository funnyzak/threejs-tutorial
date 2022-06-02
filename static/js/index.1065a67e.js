(function(e){function t(t){for(var o,a,c=t[0],s=t[1],l=t[2],u=0,h=[];u<c.length;u++)a=c[u],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&h.push(r[a][0]),r[a]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(e[o]=s[o]);d&&d(t);while(h.length)h.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,c=1;c<n.length;c++){var s=n[c];0!==r[s]&&(o=!1)}o&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},r={index:0},i=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var d=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("9582")},"0613":function(e,t,n){"use strict";var o={namespaced:!0,state:{status:"production",device:"desktop"},mutations:{TOGGLE_DEVICE:function(e,t){e.device=t}},actions:{toggleDevice:function(e,t){var n=e.commit;n("TOGGLE_DEVICE",t)}}},r=o,i={device:function(e){return e.app.device},status:function(e){return e.app.status}},a=i,c={},s={},l=n("5502");t["a"]=Object(l["a"])({state:{},mutations:s,actions:c,getters:a,modules:{app:r}})},"570b":function(e,t,n){"use strict";n("9558")},9558:function(e,t,n){},9582:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("7a23");function r(e,t){var n=Object(o["z"])("router-view");return Object(o["r"])(),Object(o["d"])(n)}var i=n("6b0d"),a=n.n(i);const c={},s=a()(c,[["render",r]]);var l=s,d=n("6c02"),u=(n("b0c0"),{class:"home"});function h(e,t,n,r,i,a){var c=Object(o["z"])("router-link");return Object(o["r"])(),Object(o["e"])("div",u,[Object(o["h"])(Object(o["B"])(r.page.title)+" ",1),Object(o["f"])("ul",null,[(Object(o["r"])(!0),Object(o["e"])(o["a"],null,Object(o["y"])(e.$router.getRoutes(),(function(e){return Object(o["r"])(),Object(o["e"])("li",{key:e.name},[Object(o["i"])(c,{to:{name:e.name}},{default:Object(o["E"])((function(){return[Object(o["h"])(Object(o["B"])(e.name),1)]})),_:2},1032,["to"])])})),128))])])}var f={setup:function(){var e=Object(o["w"])({title:"ThreeJS Toturial"});return{page:e}},data:function(){return{}},computed:{}};const v=a()(f,[["render",h]]);var m=v;function p(e,t){var n=Object(o["z"])("router-view");return Object(o["r"])(),Object(o["d"])(n)}const b={},w=a()(b,[["render",p]]);var g=w,j={id:"container",style:{width:"100vw",height:"100vh"}};function M(e,t,n,r,i,a){return Object(o["r"])(),Object(o["e"])("canvas",j)}var O=n("5a89"),y={data:function(){return{canvas:null,renderer:null,camera:null}},computed:{},mounted:function(){this.rendererCanvas(),window.onresize=this.onWindowResize},unmounted:function(){window.onresize=null},methods:{onWindowResize:function(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(window.devicePixelRatio)},rendererCanvas:function(){var e=this,t=window.document.querySelector("#container"),n=new O["K"]({canvas:t,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});n.setSize(window.innerWidth,window.innerHeight),n.setPixelRatio(window.devicePixelRatio),this.canvas=t,this.renderer=n;var o=new O["E"];this.camera=new O["y"](70,window.innerWidth/window.innerHeight,.01,10),this.camera.position.z=1;var r=new O["c"](.2,.2,.2),i=new O["w"],a=new O["v"](r,i);o.add(a),this.renderer.setAnimationLoop((function(t){a.rotation.x=t/2e3,a.rotation.y=t/1e3,e.renderer.render(o,e.camera)}))}}};const z=a()(y,[["render",M]]);var x=z,S=function(e){return Object(o["v"])("data-v-0b314998"),e=e(),Object(o["s"])(),e},P={class:"button-container"},E=S((function(){return Object(o["f"])("div",{class:"footer"},[Object(o["h"])(" Model by "),Object(o["f"])("a",{href:"https://sketchfab.com/3d-models/motorcycle-custom-bike-jawa-low-poly-13771fe558604aedae09b5157029e790",target:"_blank"},"Kreems")],-1)})),C={id:"container",ref:"container",style:{width:"100vw",height:"100vh","background-color":"#222"}};function L(e,t,n,r,i,a){return Object(o["r"])(),Object(o["e"])("div",null,[Object(o["f"])("div",P,[Object(o["f"])("button",{onClick:t[0]||(t[0]=function(){return a.meshToggle&&a.meshToggle.apply(a,arguments)})},Object(o["B"])(e.meshExpand?"复原模型":"分体扩散"),1)]),E,Object(o["f"])("canvas",C,null,512)])}var T,k=n("4721"),R=n("4086"),W=n("e642"),_=n("22b5"),H={name:"motorcycle",res:{obj:"model/motorcycle/motorcycle.obj",mtl:"model/motorcycle/motorcycle.mtl"}},J={data:function(){return{container:null,canvas:null,renderer:null,camera:null,controls:null,activeModel:null,activeModelMaterials:null,actvieModelSize:{boxSize:null,boxCenter:null,boxSizeLength:null}}},computed:{},mounted:function(){window.onresize=this.onWindowResize,this.container=this.$refs.container,this.rendererCanvas(),this.loadModel(H)},unmounted:function(){window.onresize=null},methods:{objMove:function(e,t,n){console.log("obj move",e,t,n),new _.Tween({x:t.x,y:t.y,z:t.z}).to({x:n.x,y:n.y,z:n.z},500).easing(_.Easing.Quadratic.Out).onUpdate((function(t){e.position.set(t.x,t.y,t.z)})).start()},meshToggle:function(){this.meshExpand=!this.meshExpand,this.meshExpand?this.dismantling():this.recovery()},dismantling:function(){var e=this;this.activeModel.traverse((function(t){t.isMesh&&e.objMove(t,t.fromPosition,t.toPosition)})),console.log("dismantling done.")},recovery:function(){var e=this;this.activeModel.traverse((function(t){t.isMesh&&e.objMove(t,t.toPosition,t.fromPosition)})),console.log("recovery done.")},onWindowResize:function(){this.camera.aspect=this.container.offsetWidt/this.container.offsetHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.container.offsetWidth,this.container.offsetHeight)},rendererCanvas:function(){var e=window.document.querySelector("#container"),t=new O["K"]({canvas:e,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});t.setSize(this.container.offsetWidth,this.container.offsetHeight),t.setPixelRatio(window.devicePixelRatio),this.canvas=e,this.renderer=t,T=new O["E"]},setCamera:function(){var e=new O["y"](45,this.container.offsetWidth/this.container.offsetHeight,.1,1e3);e.position.set(0,10,20),this.frameArea(1.2*this.actvieModelSize.boxSizeLength,this.actvieModelSize.boxSizeLength,this.actvieModelSize.boxCenter,e),this.camera=e,this.setLight(),this.setControls(),this.renderer.render(T,this.camera)},setLight:function(){var e=new O["a"](16777215,.4);T.add(e);var t=new O["z"](16777215,.4);this.camera.add(t),T.add(this.camera)},setControls:function(){var e=this,t=new k["a"](this.camera,this.renderer.domElement);t.update(),this.controls=t;var n=function t(){_.update(),window.requestAnimationFrame(t),e.controls.update(),e.renderer.render(T,e.camera)};n()},frameArea:function(e,t,n,o){var r=.6*e,i=O["u"].degToRad(.5*o.fov),a=r/Math.tan(i),c=(new O["J"]).subVectors(o.position,n).multiply(new O["J"](1,0,1)).normalize();o.position.copy(c.multiplyScalar(a).add(n)),o.near=t/1e3,o.far=1e3*t,o.updateProjectionMatrix(),o.lookAt(n)},loadModel:function(e){var t=this,n=this.loadMtlManager(),o=this.loadModelManager(),r=new R["a"](n);r.load(e.res.mtl,(function(n){n.preload(),console.log("model materials:",n),t.activeModelMaterials=n,new W["a"](o).setMaterials(n).load(e.res.obj,t.loadModelSuccess,t.loadModelProcess,t.loadModelError)}))},loadMtlManager:function(){var e=new O["r"];return e.onStart=function(e,t,n){console.log("Loading Mtl started")},e.onLoad=function(){console.log("Loading Mtl complete")},e.onProgress=function(e,t,n){var o=t/n*100;console.log("Mtl loading percent：",o)},e.onError=function(e){console.error("Mtl Load Error.",e)},e},loadModelManager:function(){var e=new O["r"];return e.onStart=function(e,t,n){console.log("Loading Model started")},e.onLoad=function(){console.log("Loading Model complete")},e.onProgress=function(e,t,n){var o=t/n*100;console.log("Model load percent：",o)},e.onError=function(e){console.error("Model load error:",e)},e},loadModelSuccess:function(e){console.log("model node",e);var t=new O["d"](e,16776960);T.add(t),T.add(e);var n=1.2,o=(new O["b"]).setFromObject(e),r=o.getSize(new O["J"]),i=r.length(),a=o.getCenter(new O["J"]);this.actvieModelSize.boxSize=r,this.actvieModelSize.boxCenter=a,this.actvieModelSize.boxSizeLength=i,e.name="mainModel",this.activeModel=e,e.traverse((function(e){if(e instanceof O["v"]){e.castShadow=!0,e.receiveShadow=!0;var t=(new O["b"]).setFromObject(e),o=t.getCenter(new O["J"]);e.fromPosition=e.position.clone();var r=new O["m"](a,o),i=new O["J"];r.delta(i),e.toPosition=e.fromPosition.clone().addScaledVector(i,n)}})),this.setCamera()},loadModelProcess:function(e){if(e.lengthComputable){var t=e.loaded/e.total*100;console.log("".concat(Math.round(t,2),"% downloaded"))}},loadModelError:function(e){console.error("load model error.",e)}}};n("570b");const D=a()(J,[["render",L],["__scopeId","data-v-0b314998"]]);var A=D,B=[{path:"/",name:"Home",component:m},{path:"/tutorial",name:"Tutoria",component:g,redirect:"/tutorial/hello",children:[{path:"hello",name:"TutorialHello",component:x},{path:"dismantling",name:"TutorialDismantling",component:A}]}],G=Object(d["a"])({history:Object(d["b"])(),routes:B}),V=G,q=n("0613");Object(o["c"])(l).use(q["a"]).use(V).mount("#app")}});