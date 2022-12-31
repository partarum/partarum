var tt=Object.defineProperty;var et=(l,t,e)=>t in l?tt(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e;var p=(l,t,e)=>(et(l,typeof t!="symbol"?t+"":t,e),e),ot=(l,t,e)=>{if(!t.has(l))throw TypeError("Cannot "+e)};var V=(l,t,e)=>{if(t.has(l))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(l):t.set(l,e)};var Y=(l,t,e)=>(ot(l,t,"access private method"),e);var m=class extends HTMLElement{root={dom:{},app:new Partarum,constructed:!1,initialized:!1,initializedSuper:!1,connected:!1,connectedCallback:function(t){this.initialized===!1&&(this.initialized=!0,t())}};constructor(t,e,o,r){super(),this.root.constructed=!0,this.root.dom=o,this.root.config=t,this.root.name=e,this.root.id=typeof r=="string"?r.replace(" ","_"):""}connectedCallback(){this.root.initializedSuper===!1&&(this.id=this.root.id,this.setConfig(this.root.config,this.root.name),this.root.initializedSuper=!0)}setConfig(t,e,o=this){if(t!==void 0&&"surface"in t&&Reflect.has(t.surface,e)&&Reflect.has(t.surface[e],"style"))for(let r in t.surface[e].style)o.style[r]=t.surface[e].style[r]}initAddElement(t,e,o="shadowBox",r=this.root.config,a="append"){this.root.dom.add(t,e,null),this.setConfig(r,t,e),this.root.dom.add(o,e,a)}add(t,e){this.root.dom.add(e,t,"append")}addTopic(t,e,o){let r=Array.isArray(e)?e:[e];return new Promise(a=>{let s=0;for(let i of r)this.root.dom.add(i,document.createElement(o)),this.root.dom.add(t,this.root.dom.get(i),"append"),s===r.length&&a(!0),s++})}};var q,Z,b=class extends m{constructor(e,o,r){super(e,o,r);V(this,q);Y(this,q,Z).call(this)}connectedCallback(){super.connectedCallback()}loadStyle(e){return new Promise(o=>{let r=0,a=!1,s=0,i=!1;if(Reflect.has(e,"link")){let c=Array.isArray(e.link)?e.link:[e.link];for(let C of c){let h=document.createElement("link");h.setAttribute("rel","stylesheet"),h.setAttribute("type","text/css"),h.setAttribute("href",C),this.root.dom.add("shadowBox",h.cloneNode(!0),"append"),r++,a=r===c.length}}else a=!0;if(Reflect.has(e,"style")){let c=Array.isArray(e.style)||e.style instanceof NodeList?e.style:[e];for(let C of c)this.root.dom.add("shadowBox",C.cloneNode(!0),"append"),s++,i=s===c.length}else i=!0;function n(){i===!0&&a===!0&&o(!0)}let d=setInterval(n,100)})}};q=new WeakSet,Z=function(){this.partarum=window.Partarum,this.root.dom=this.partarum.Cache.HTMLCache.create("partarum-host",this.root.name),this.root.dom.add("shadowBox",this.attachShadow({mode:"open"}),null);let e=document.createElement("link");e.setAttribute("rel","stylesheet"),e.setAttribute("type","text/css"),e.setAttribute("href","/Partarum/css"),this.root.dom.add("shadowBox",e,"append")},p(b,"cache");customElements.get("partarum-host")===void 0&&customElements.define("partarum-host",b);var O=class extends m{constructor(t,e=null){super(t,"header"),this.id=e||""}addTopic(t){super.addTopic(t,"button")}addMenu(){}addCanvas(){}};customElements.get("partarum-card-box-header")===void 0&&customElements.define("partarum-card-box-header",O);var H=class extends m{constructor(t,e,o){super(t,"menu",o,e)}connectedCallback(){super.connectedCallback()}add(t,e){this.root.dom.add(e,t,"append")}addTopic(t,e,o="button",r,a="start"){return new Promise(s=>{let i=Array.isArray(t)?t:[t],n=0;this.root.dom.get("Listener").add("windowScroll",()=>{this.setClickEvent(this)}),window.addEventListener("scroll",this.root.dom.get("Listener").get("windowScroll"),{once:!0});for(let d of i){let c=document.createElement(o),C="button_"+e;c.setAttribute("id",C),c.classList.add("product-category-button");let h="productCategory_"+e;this.root.dom.get("Loader").add(C,h);let y=document.createElement("h3");y.appendChild(document.createTextNode(d)),c.appendChild(y),this.appendChild(c),this.root.dom.add(C,c),n++}s(!0)})}setClickEvent(t){if(console.dir("click"),t.root.dom.get("Loader").get("Status")===0){let o=t.root.dom.getAllOfTheme("CardBox","Loader"),r=Object.fromEntries(o.entries()),a=0;for(let s in r)if(s!=="Status"){let i=t.root.dom.get(r[s]),n=i.data;n.groupButton=s;let d=t.root.dom.get(s);d.addEventListener("click",c=>{console.dir("clcik"),console.dir(c),t.displayCategory(i)}),a===0&&d.click(),a++}t.root.dom.get("Loader").add("Status",1)}else console.dir("is loaded")}displayCategory(t){console.dir(t);let e=t.topic,o=t.data,r=e.id,a=this.root.dom.get("DisplayCategories").get(r),s=this.root.dom.get("DisplayMenu").get(r),i,n=[];if(a===null){n.push(r);let h=this.root.dom.getAllOfTheme("CardBox","Categories");i=Object.fromEntries(h.entries());let u=i[r],y=u.data;switch(u.type){case"WithSubCategories":n.push(y.subCategories[0]),n.push(s.categoryMenu),n.push(s.categoryCanvas);break;case"SubCategories":n.push(y.category),s=this.root.dom.get("DisplayMenu").get(y.category),n.push(s.categoryMenu),n.push(s.categoryCanvas)}this.root.dom.get("DisplayCategories").add(r,[i,n])}else i=a[0],n=a[1];let d=this.root.dom.get("CardDrawBox"),c=this.root.dom.get(s?.categoryCanvas)??this.root.dom.get("canvas");this.root.dom.get("Listener").get("windowResize")===null&&(this.root.dom.get("Listener").add("windowResize",()=>{let h=this.root.dom.get(s?.categoryMenu)?.offsetWidth??this.root.dom.get("productGroupNav").offsetWidth;c.width=h.toString(),this.root.dom.get("canvas").width=h;for(let u of this.root.dom.getAllOfTheme("CardBox","DisplayCategories").entries())d.plotter.clearBoard(c.id,"canvas"),d.plotter.update("setLine",u[0])}),window.addEventListener("resize",this.root.dom.get("Listener").get("windowResize"),!1));for(let h in i){let u=i[h].topic;n.includes(u.id)===!1?u.classList.length!==0?u.classList.contains("grid")&&u.classList.replace("grid","zero"):u.classList.add("zero"):u.classList.length!==0&&u.classList.contains("zero")&&u.classList.replace("zero","grid")}if(c.classList.replace("zero","inline"),s===null)if("category"in o){let h=this.root.dom.get("DisplayMenu").get(o.category);d.plotter.clearBoard(h.categoryCanvas)}else d.plotter.clearBoard("canvas");else"subCategories"in o?d.plotter.clearBoard(c.id,"canvas"):d.plotter.clearBoard(c.id);if(this.root.dom.get("LastDraw").clear(),console.dir(d.plotter.isCollected("setLine",r)),d.plotter.isCollected("setLine",r))c.width===0&&(c.width=this.root.dom.get(s.categoryMenu).offsetWidth),d.plotter.update("setLine",r);else{let h=t.themes;if(Object.keys(h).length!==0){this.root.dom.get("LastDraw").add(r,"");for(let u in h)d.setLines(c,r,this.root.dom.get(o.groupButton),h[u].theme)}else{this.root.dom.get("LastDraw").add(r);for(let P of o.subCategories){let M=this.root.dom.get(P);d.setLines(this.root.dom.get("canvas"),r,this.root.dom.get(o.groupButton),this.root.dom.get(M.data.groupButton))}let u=this.root.dom.get(o.subCategories[0]);this.root.dom.get("LastDraw").add(o.subCategories[0]);let y=u.themes;for(let P in y){let M=y[P].theme,A=this.root.dom.get(s.categoryCanvas);d.setLines(A,o.subCategories[0],this.root.dom.get(u.data.groupButton),M)}}}}};customElements.get("partarum-card-box-menu")===void 0&&customElements.define("partarum-card-box-menu",H);var j=class extends m{constructor(t,e,o,r){super(t,"section",e,o),this.root.cardBoxObject=r}connectedCallback(){super.connectedCallback(),this.id=this.root.id,this.root.title=this.root.cardBoxObject.title,this.root.topicDOM=this.root.dom.get(this.root.cardBoxObject.parent),this.root.themeDOM=Reflect.get(this.root.topicDOM.themes,this.root.cardBoxObject.id),this.root.mainInfoObject=this.root.cardBoxObject.mainInfo??null,this.root.featureObject=this.root.cardBoxObject.features??null,this.loadElements().then()}async loadElements(){await this.setSlogan(),this.root.mainInfoObject!==null&&(await this.setMainInfo(),await this.setLifetime(this.root.mainInfoObject.lifetime),await this.setPrice(this.root.mainInfoObject.price),await this.setLinkPage(this.root.mainInfoObject.link)),this.root.featureObject!==null&&await this.setFeatures(this.root.featureObject)}setSlogan(){return new Promise(t=>{let e=document.createElement("header"),o=document.createElement("h3");o.appendChild(document.createTextNode(this.root.cardBoxObject.title)),e.appendChild(o),this.appendChild(e),t()})}setMainInfo(){return new Promise(t=>{this.root.themeDOM.mainInfo=document.createElement("section"),this.appendChild(this.root.themeDOM.mainInfo),t()})}setLifetime(t){return new Promise(e=>{let o=document.createElement("section");o.classList.add("box-row","box-center");let r=Array.isArray(t)?t:[t];for(let a in r){let s=document.createElement("p"),i=document.createTextNode(r[a]);s.appendChild(i),o.appendChild(s)}this.root.themeDOM.mainInfo.appendChild(o),e()})}setPrice(t){return new Promise(e=>{let o=document.createElement("section");o.classList.add("partarum-card-theme-price");let r=document.createElement("p");r.appendChild(document.createTextNode(t.amount)),o.appendChild(r);let a=document.createElement("p");a.appendChild(document.createTextNode(t.period)),o.appendChild(a),this.root.themeDOM.mainInfo.appendChild(o),e()})}setLinkPage(t){return new Promise(e=>{let o=document.createElement("section"),r=document.createElement("a");r.setAttribute("href",t.href),r.classList.add("beauty-button-link");let a=document.createTextNode(t.text??"Jetzt Registrieren");if(r.appendChild(a),"icon"in t){let s=document.createElement("i");if("class"in t.icon)for(let i of t.icon.class.split(" "))s.classList.add(i);if("position"in t.icon){let i="before";t.icon.position==="before"?a.before(s):a.after(s),s.classList.add(i==="before"?"icon-left":"icon-right")}}o.appendChild(r),this.root.themeDOM.mainInfo.appendChild(o),e()})}setFeatures(t){return new Promise(e=>{let o=document.createElement("footer");o.classList.add("text-setLeft","partarum-card-theme-features"),this.appendChild(o);for(let r in t){let a=document.createElement("section");a.classList.add("partarum-card-theme-feature-box"),o.appendChild(a),this.setList(t[r],a).then()}e()})}setList(t,e){return new Promise(o=>{let r=document.createElement("header");r.className="box-row center";let a=document.createTextNode(t.title);if(r.appendChild(a),e.appendChild(r),"icon"in t){let d=document.createElement("i");d.className=t.icon.class,"position"in t.icon&&this.setIcon(d,a,t.icon.position,t.icon.class)}let s=document.createElement("section");e.appendChild(s);let i=[],n=t.list;for(let d in n)switch(d){case"icon":let c=document.createElement("i");this.setIcon(c,i.at(-1)??null,n.icon.position,n.icon.class),i.push(c);break;default:d.includes("text")&&(i.push(document.createElement("p")),i.at(-1).appendChild(document.createTextNode(n[d])),s.appendChild(i.at(-1)))}o()})}setIcon(t,e,o,r){if(e!==null)switch(t.className=r??"",o){case"before":e.before(t),t.classList.add("icon-left");break;case"after":e.after(t),t.classList.add("icon-right");break;case"middle":e.after(t),t.classList.add("icon-left","icon-right");break;default:e.before(t),t.classList.add("icon-left");break}}};customElements.get("partarum-card-theme-box")===void 0&&customElements.define("partarum-card-theme-box",j);var E=class extends m{cardKey=1;constructor(t,e,o,r){super(t,"section",e,o),this.root.cardBoxObject=r}connectedCallback(){super.connectedCallback(),this.id=this.root.id;let t="display"in this.root.cardBoxObject&&this.root.cardBoxObject.display===!0?"grid":"zero";this.classList.add(t,"grid-auto-column","product-cards-box-shadow"),this.loadElements().then()}async loadElements(){await this.setThemeBoxes()}setThemeBoxes(){return new Promise(t=>{for(let e in this.root.cardBoxObject)switch(e){case"cards":for(let s in this.root.cardBoxObject.cards){this.root.dom.get("Categories").add(this.id,this.root.dom.get(this.id));let i=this.root.cardBoxObject.cards[s];this.addThemeBox(i,s),this.cardKey++}break;case"card":this.addThemeBox(this.root.cardBoxObject.card),this.cardKey++;break;case"subTopic":let o=this.root.dom.get(this.id);o.type="WithSubCategories",o.data={subCategories:[]},this.root.dom.get("Categories").add(this.id,o);let r=this.root.cardBoxObject.subTopic,a=this.root.dom.get("CardBoxObject");for(let[s,i]of a.subBoxes)for(let[n,d]of i.startMenu){let c="productCategory_"+n;this.root.dom.add(c,{themes:{},topic:new E(this.root.config,this.root.dom,c,r[d]),type:"SubCategories",data:{category:this.id}}),o.data.subCategories.push(c),this.appendChild(this.root.dom.get(c).topic)}}t()})}addThemeBox(t,e=this.cardKey){let o=this.root.dom.get(this.id).themes;t.parent=this.id;let a="productCard_"+t.title.replace(" ","_");t.id=a,o[a]={theme:new j(this.root.config,this.root.dom,a,t)},this.appendChild(o[a].theme)}addCanvas(){return new Promise(t=>{t()})}};customElements.get("partarum-card-topic-box")===void 0&&customElements.define("partarum-card-topic-box",E);var N=class extends m{constructor(t,e,o){super(t,"article",o,e),this.cardBoxObject=this.root.dom.get("CardBoxObject")}connectedCallback(){super.connectedCallback(),this.className="box-row box-center",this.loadElements().then()}async loadElements(){await this.addTopicBox()}addTopicBox(){return new Promise(t=>{for(let[e,o]of this.cardBoxObject.topicBoxes){let r="productCategory_"+e;this.root.dom.add(r,{themes:{},topic:new E(this.root.config,this.root.dom,r,o),type:"Categories",data:{}}),this.appendChild(this.root.dom.get(r).topic)}t()})}};customElements.get("partarum-card-topic-body")===void 0&&customElements.define("partarum-card-topic-body",N);var L=class{startMenu=new Map;topicIDs=Partarum.Helper.Hex.createIndex(!0);topicBoxes=new Map;subBoxes=new Map;lastID=1;ready=!1;config={};constructor(t){this.checkConfig(t).then(()=>{this.analyseConfig(this.config.topic).then(()=>{this.ready=!0})})}checkConfig(t){return new Promise(e=>{Array.isArray(t)?this.config.topic=t:this.config=t,e(!0)})}async analyseConfig(t){if(t instanceof Object&&Array.isArray(t))for(let e of t){this.lastID=this.topicIDs.next(!0),this.topicBoxes.set(this.lastID,{});for(let o in e)await this[o==="name"?"topicName":o](e[o])}}checkStatus(){return new Promise(t=>{let e=setInterval(()=>{this.ready===!0&&(t(!0),clearInterval(e))},100)})}topicName(t){return new Promise(e=>{this.startMenu.set(this.lastID,t),e(!0)})}subTopic(t){return new Promise(e=>{let o=Object.entries(t).map(a=>a[1]),r=new L(o);r.checkStatus().then(()=>{this.subBoxes.set(this.lastID,r),this.topicBoxes.get(this.lastID).subTopic=t,e(!0)})})}card(t){return new Promise(e=>{this.topicBoxes.get(this.lastID).card=t,e(!0)})}cards(t){return new Promise(e=>{this.topicBoxes.get(this.lastID).cards=t,e(!0)})}display(t){return new Promise(e=>{this.topicBoxes.get(this.lastID).display=t,e(!0)})}};var z=class extends m{constructor(t,e,o){super(t,e,o,"partarumCardBoxBody")}connectedCallback(){super.connectedCallback(),this.analyseConfig().then(()=>{this.loadElements().then()})}analyseConfig(){return new Promise((t,e)=>{"topic"in this.root.config&&"surface"in this.root.config?(this.cardBoxObject=new L(this.root.config),this.cardBoxObject.checkStatus().then(()=>{t(!0)}),this.root.dom.add("CardBoxObject",this.cardBoxObject)):e()})}async loadElements(){switch(this.root.config?.theme??"classic"){case"classic":await this.setHeader(),await this.setStartMenu(),await this.setSubMenu(),await this.setTopicBody();break;case"noDraw":await this.setHeader(),await this.setStartMenu(!1),await this.setSubMenu(!1),await this.setTopicBody()}}setHeader(){return new Promise(t=>{this.root.dom.add("CardBoxHeader",new O(this.root.config,"card-box-menu",this.root.dom),null),this.appendChild(this.root.dom.get("CardBoxHeader")),t(!0)})}setStartMenu(t=!0){return new Promise(e=>{let o=this.cardBoxObject.startMenu;this.setMenu("productGroupNav",this.root.config,"productGroupNav").then(()=>{for(let[r,a]of o)this.root.dom.get("productGroupNav").addTopic(a,r,"button",this.root);t===!0&&this.setCanvas("canvas",this.root.dom.get("productGroupNav")).then(()=>{e(!0)})})})}setSubMenu(t=!0){return new Promise(e=>{let o=this.cardBoxObject.subBoxes,r=0,a=this.root.dom.get("DisplayMenu"),s=this.root.dom.get("Categories");for(let[i,n]of this.cardBoxObject.subBoxes){let d="categoryMenu_"+i,c="categoryCanvas_"+i;a.add("productCategory_"+i,{categoryMenu:d,categoryCanvas:c});let C={},h={},u=n.startMenu,y=0;this.setMenu(d,n.config,d).then(()=>{for(let[P,M]of u){let A=this.root.dom.get(d);A.addTopic(M,P,"button",this.root).then(()=>{y++,C.topic=A,r===o.size&&y===u.size&&t===!0&&this.setCanvas(c,this.root.dom.get(d),!1).then(()=>{h.topic=this.root.dom.get(c),s.add(c,h),s.add(d,C),A.classList.add("zero"),e(!0)})})}}),r++}})}setMenu(t,e,o){return new Promise(r=>{this.root.dom.add(t,new H(e,o,this.root.dom),null),this.root.dom.add("CardBoxHeader",this.root.dom.get(t),"append"),r(!0)})}setCanvas(t="canvas",e,o=!0){return new Promise(r=>{Partarum.Draw.Plotter.createBoard(t,{width:e.offsetWidth.toString(),height:"160"}).then(a=>{this.root.dom.add(a.id,a),o===!1&&a.classList.add("zero"),this.root.dom.get("DrawBoard").add(t,a),this.root.dom.add("CardBoxHeader",a,"append"),r()})})}setTopicBody(){return new Promise(t=>{this.root.dom.add("CardTopicBody",new N(this.root.config,"card-topic-body",this.root.dom),null),this.appendChild(this.root.dom.get("CardTopicBody")),t(!0)})}addTopicBox(){return new Promise(t=>{})}};customElements.get("partarum-card-box-body")===void 0&&customElements.define("partarum-card-box-body",z);var Q=class{static getString(t=0){return"0x"+t.toString(16).padStart(14,"0")}static getInt(t){return parseInt(t,16)}static createIndex(t=!1,e=t===!1?1:++Q.lastID){return new J(e)}},x=Q;p(x,"lastID",1);var J=class{lastHex=1;constructor(t){this.lastHex=t}*nextID(t){for(;;)this.lastHex++,x.lastID=this.lastHex,yield t===!1?this.lastHex:x.getString(this.lastHex)}next(t=!1){return this.nextID(t).next().value}};var f=class{id;cache=new WeakMap;constructor(){f.analyzerID??=x.createIndex(),this.id=f.analyzerID.next(!0)}getID(){return this.id}init(t,e){f.worker??=new Worker("/Partarum/PartarumJS/Worker/DrawWorker/AnalyzeWorker");let o={width:t.offsetWidth??t.innerWidth,height:t.offsetHeight??t.innerHeight,top:t.offsetTop??0,left:t.offsetLeft??0},r=[];for(let a of e){let s={width:a.offsetWidth,height:a.offsetHeight,top:a.offsetTop,left:a.offsetLeft};this.cache.set(s,a),r.push(s)}return f.worker.postMessage([o,r,this.id]),f.intCache[this.id]={},f.promiseCache[this.id]={},f.promiseCache[this.id].promise=new Promise((a,s)=>{f.worker.onmessage=i=>{f.promiseCache[i.data.id].data=i.data,console.dir(f.promiseCache),f.intCache[i.data.id].id=setInterval(f.intCache[i.data.id].fn,200,i)},f.intCache[this.id].fn=i=>{this.id===i.data.id&&clearInterval(f.intCache[i.data.id].id),a(i.data)}}),f.promiseCache[this.id].promise}},k=f;p(k,"worker"),p(k,"analyzerID"),p(k,"promiseCache",{}),p(k,"intCache",{});var R=class{theme;board;nodes=new k;analyzerID;lineParams={start:{moveTo:"start"|"center"|"end",plus:null,minus:null},goal:{moveTo:"start"|"center"|"end",plus:null,minus:null}};constructor(t,e=null){this.analyzerID=e??this.nodes.getID(),console.dir(this.analyzerID),this.board=t instanceof HTMLCanvasElement?t:document.createElement("canvas")}setTheme(t){this.theme=t}setNodes(...t){return new Promise((e,o)=>{this.nodes.init(this.board,Array.isArray(t)?t:[t]).then(r=>{console.dir(Partarum.Cache.PlotCache.getCollection("PlotterCache","Plotter","setLine").entries()),e({data:r,ctx:this.board.getContext("2d")})})})}setCanvasTo(t,e="append"|"after"|"before"|"replace"){switch(e){case"append":t.appendChild(this.board);break;case"after":t.after(this.board);break;case"before":t.before(this.board);break;case"replace":t.replaceWith(this.board)}}};var $=class{root={dom:{},app:new Partarum};plotter=Partarum.Draw.Plotter;constructor(t,e,o,r){this.root.dom=o,this.root.config=t,this.root.name=e,this.root.id=typeof r=="string"?r.replace(" ","_"):""}createPlot(t,e,o,r=!1){return new Promise(a=>{let s=new R(t);s.setTheme(e),s.setNodes(o).then(()=>{a(s)})})}setLines(t,e,o,r,a=!1){this.plotter.record(t,"setLine",e,r.id,()=>{let s=new R(t);console.dir(s.analyzerID),s.setNodes(o,r).then(i=>{let n=i.ctx;console.dir(i.data.id);let d=i.data.board,c=i.data.nodes[0],C=i.data.nodes[1];a!==!1&&n.clearRect(0,0,t.width,t.height),n.strokeStyle="#007F85",n.lineWidth=3,n.beginPath(),n.moveTo(c.nodeCTX.centerTop.x,0),n.lineTo(C.nodeCTX.centerTop.x,C.nodeCTX.centerTop.y),n.stroke()})}).then(()=>{this.plotter.render("setLine",e)}).catch(s=>{console.dir(s),console.log("ERROR")})}};var T=class extends b{constructor(t){super(t,"partarum-card-box","partarumCardBox"),this.loadStyle({link:"/Partarum/PartarumCSS/PartarumElements/cardBox.css",style:document.querySelectorAll('style[id*="fa"]')}).then(()=>{}),this.root.dom.add("CardBoxBody",new z(this.root.config,"body",this.root.dom),null),this.root.dom.get("CardBoxBody").classList.add("single-box-center-medium"),this.root.dom.add("shadowBox",this.root.dom.get("CardBoxBody"),"append"),Reflect.has(this.root.config,"parent")?this.root.config.parent.appendChild(this):document.body.appendChild(this),this.root.dom.add("DrawBoard",this.root.dom.create("Canvas","Boards")),this.root.dom.add("CardDrawBox",new $),this.root.dom.add("Categories",this.root.dom.create("CardBox","Categories")),this.root.dom.add("DisplayCategories",this.root.dom.create("CardBox","DisplayCategories")),this.root.dom.add("DisplayMenu",this.root.dom.create("CardBox","DisplayMenu")),this.root.dom.add("Loader",this.root.dom.create("CardBox","Loader")),this.root.dom.add("Listener",this.root.dom.create("CardBox","Listener")),this.root.dom.add("LastDraw",new Set),this.root.dom.get("Loader").add("Status",0)}connectedCallback(){super.connectedCallback()}add(t,e){this.root.dom[e].appendChild(t)}addTopic(t){let e=Array.isArray(t)?t:[t];for(let o of e)this.root.dom.add(o,document.createElement("section"),null),this.root.dom.add("CardBoxBody",this.root.dom.get(o),"append")}};customElements.get("partarum-card-box")===void 0&&customElements.define("partarum-card-box",T);var g=class{id;cache=new WeakMap;constructor(){g.analyzerID??=x.createIndex(),this.id=g.analyzerID.next(!0)}getID(){return this.id}init(t,e){g.worker??=new Worker("/Partarum/PartarumJS/Worker/HTMLWorker/LayoutAnalyzeWorker");let o={width:t.offsetWidth??t.innerWidth,height:t.offsetHeight??t.innerHeight,top:t.offsetTop??0,left:t.offsetLeft??0},r=[];for(let a of e){let s={width:a.offsetWidth,height:a.offsetHeight,top:a.offsetTop,left:a.offsetLeft};this.cache.set(s,a),r.push(s)}return g.worker.postMessage([o,r,this.id]),g.intCache[this.id]={},g.promiseCache[this.id]={},g.promiseCache[this.id].promise=new Promise((a,s)=>{g.worker.onmessage=i=>{g.promiseCache[i.data.id].data=i.data,g.intCache[i.data.id].id=setInterval(g.intCache[i.data.id].fn,200,i)},g.intCache[this.id].fn=i=>{this.id===i.data.id&&clearInterval(g.intCache[i.data.id].id),a(i.data)}}),g.promiseCache[this.id].promise}},w=g;p(w,"worker"),p(w,"analyzerID"),p(w,"promiseCache",{}),p(w,"intCache",{});var F=class extends m{nodes=new w;constructor(t,e,o){super(t,e,o,"partarumNavBarBody")}connectedCallback(){super.connectedCallback(),this.root.connectedCallback(()=>{console.dir("root connectedCallback"),this.id="partarumNavBarBody",this.analyseConfig().then(()=>{Reflect.has(this.root.config,"nav")&&this.loadElements().then()})})}analyseConfig(t){return new Promise(e=>{e()})}async loadElements(){await this.setNav(this.root.config.nav),await this.setDesktop(this.root.config.desktop),await this.setMobile(this.root.config.mobile)}setNav(t){return new Promise(e=>{let o=this.root.config?.type;switch(this.root.dom.add("nav",document.createElement("nav"),null),this.appendChild(this.root.dom.get("nav")),o){case"classic":this.setAnchor(t,this.root.dom.get("nav")).then(()=>e())}})}setMobile(t){return new Promise(e=>{if(console.dir(t),t?.type)switch(t.type){case"Hamburger":let o=new HTMLMenuHamburger({parent:this.root.dom.get("nav"),...t?.mobile});e()}t?.position})}setDesktop(t){return new Promise(e=>{if(t?.type,t?.position||t?.positionX||t?.positionY){let o=t.positionX||t.position.x||{to:"center"},r=t.positionY||t.position.y||{from:0,to:"10vh",height:"10vh"};Partarum.HTML.getSafeElementByQueryString(t.position.to).then(a=>{setTimeout(()=>{this.nodes.init(window,[a]).then(s=>{let i=s.base.height/100;console.dir(i*10),console.dir(s);let n=s.nodes[0].top/2-s.base.height/10/2;this.setAttribute("style",`
                            --animationTop: ${n}px; 
                            --animationHeight: ${t.position?.height||"10vh"}; 
                            animation: simpleNav 2s ease-in-out; 
                            animation-fill-mode: forwards; 
                            display: grid;
                            grid-template-columns: 1fr 0; 
                            color: #F9F9FA;
                            `),e()})},500)})}})}setAnimation(t,e){let o=document.createElement("style");o.textContent=`
            @keyframes simpleNav {
                from {
                    top: 0;
                    height: 0;
                    opacity: 0;                  
                    font-size: 0;
                } 
                to {
                    top: calc(calc(${t}px / 2) - calc(${e}vh / 2));
                    height: ${e}vh;
                    opacity: 1;
                    font-size: 1.6rem;
                }
            }
        `,this.appendChild(o)}setAnchor(t,e){return new Promise(o=>{console.dir("setAnchor");let r=Array.isArray(t)?t:[t],a=0;for(let s of r){let i=document.createElement("a");for(let n in s)switch(n){case"text":i.appendChild(document.createTextNode(s[n]));break;default:i.setAttribute(n,s[n])}e.appendChild(i),a++,a===r.length&&o()}})}};customElements.get("partarum-nav-bar-body")===void 0&&customElements.define("partarum-nav-bar-body",F);var v=class extends b{constructor(t){super(t,"partarum-nav-bar","partarumNavBar"),this.loadStyle({link:"/Partarum/PartarumCSS/PartarumElements/navBar.css",style:document.querySelectorAll('style[id*="fa"]')}).then(()=>{}),this.root.dom.add("NavBarBody",new F(t,"body",this.root.dom),null),this.root.dom.get("NavBarBody").classList.add("single-box-center-large"),this.root.dom.add("shadowBox",this.root.dom.get("NavBarBody"),"append"),Reflect.has(t,"parent")&&t.parent.appendChild(this)}connectedCallback(){super.connectedCallback(),this.id="partarumNavBar"}};customElements.get("partarum-nav-bar")===void 0&&customElements.define("partarum-nav-bar",v);var W=class extends m{constructor(t,e){super(t,e),this.id="partarumBottomBarBody"}};customElements.get("partarum-bottom-bar-body")===void 0&&customElements.define("partarum-bottom-bar-body",W);var S=class extends b{constructor(t){super(t,"partarum-bottom-bar"),this.id="partarumBottomBar",this.loadStyle({link:"/Partarum/PartarumCSS/PartarumElements/bottomBar.css",style:document.querySelectorAll('style[id*="fa"]')}).then(()=>{}),this.root.dom.add("BottomBarBody",new W(t,"body"),null),this.root.dom.add("shadowBox",this.root.dom.get("BottomBarBody"),"append"),Reflect.has(t,"parent")?t.parent.appendChild(this):document.body.appendChild(this),this.addTopic(["leftSide","center","rightSide"])}add(t,e){this.root.dom.add(e,t,"append")}addTopic(t){let e=Array.isArray(t)?t:[t];for(let o of e){let r=document.createElement("section");this.root.dom.add(o,r,null),this.root.dom.add("BottomBarBody",r,"append")}}};customElements.get("partarum-bottom-bar")===void 0&&customElements.define("partarum-bottom-bar",S);var K=class extends m{constructor(t){super(t,"body")}};customElements.get("partarum-cookie-body")===void 0&&customElements.define("partarum-cookie-body",K);var _=class extends m{constructor(t){super(t,"header"),this.className="box box-center-center",this.root.app.themes=[{header:{config:{h1:"Und auch wir benutzen Cookies :)"},parent:this}}],this.root.app.create().then()}};customElements.get("partarum-cookie-header")===void 0&&customElements.define("partarum-cookie-header",_);var X=class extends m{constructor(t){super(t,"main")}};customElements.get("partarum-cookie-main")===void 0&&customElements.define("partarum-cookie-main",X);var G=class extends m{constructor(t,e,o){super(t,"footer"),this.root.dom=o,this.className="media-box-row";let r=window.sessionStorage.getItem("cookies_accepted"),a=!(r===null||r===!1);this.root.app.themes=[{footer:{config:{section_left:{_attributes:{class:"media-box-row"},button_config:{_attributes:{text:"Cookie-Einstellungen"}}},section_right:{_attributes:{class:"media-box-row"},button_essential:{_attributes:{type:"button",id:"cookieDisable",text:"Nicht akzeptieren",addEvent:{type:"click",topic:"CookieBanner",theme:"disableCookie",name:"disableCookie_click",doThat:()=>{t.cookies.disable.doThat(),this.root.dom.get("CookieBanner").classList.toggle("zero")}}}},button_all:{_attributes:{type:"button",id:"cookieActive",text:a===!1?"Alle akzeptieren":"Schlie\xDFen",addEvent:{type:"click",topic:"CookieBanner",theme:"activeCookie",name:"activeCookie_click",targetID:"cookieActive",doThat:s=>{Partarum.System.Cookie.accepted===!1&&this.setCookies(t,"active",s),this.root.dom.get("CookieBanner").classList.toggle("zero")}}}}}},parent:this}}],this.root.app.create().then()}setCookies(t,e,o){Partarum.System.Cookie.init().then(r=>{if(r.status===!0)switch(e){case"active":Partarum.System.Cookie.toAgree(t).then(()=>{this.root.dom.get("shadowBox").getElementById("cookieActive").innerText="Schlie\xDFen"});break;case"disable":}})}};customElements.get("partarum-cookie-footer")===void 0&&customElements.define("partarum-cookie-footer",G);var U=class extends m{constructor(t,e){super(t,"banner"),this.id="PartarumCookieBanner",this.className="single-box-center",this.root.config=t,this.root.dom=e,this.loadBody().then()}async loadBody(){await this.setBody(),await this.setHeader(),await this.setMain(),await this.setFooter()}setBody(){return new Promise(t=>{this.root.dom.add("CookieBody",new K(this.root.config,"body"),null),this.appendChild(this.root.dom.get("CookieBody")),t(!0)})}setHeader(){return new Promise(t=>{this.root.dom.add("CookieHeader",new _(this.root.config,"header"),null),this.root.dom.add("CookieBody",this.root.dom.get("CookieHeader"),"append"),t(!0)})}setMain(){return new Promise(t=>{this.root.dom.add("CookieMain",new X(this.root.config,"main"),null),this.root.dom.add("CookieBody",this.root.dom.get("CookieMain"),"append"),t(!0)})}setFooter(){return new Promise(t=>{this.root.dom.add("CookieFooter",new G(this.root.config,"footer",this.root.dom),null),this.root.dom.add("CookieBody",this.root.dom.get("CookieFooter"),"append"),t(!0)})}};customElements.get("partarum-cookie-banner")===void 0&&customElements.define("partarum-cookie-banner",U);var I=class extends b{constructor(t){Partarum.Log.create("HTMLCookie","construct").add("HTMLCookie","construct","start"),super(t,"partarum-cookie"),this.root.status={cookieBanner:!1,cookiesActivated:!1,cookiesAccepted:!1,cookiesInUse:!1},Partarum.System.Cookie.init().then(o=>{Partarum.Log.add("HTMLCookie","construct","after Cookie.init()");let r=o,a=r.status,s=r.accepted,i=r.inUse;this.root.status.cookiesActivated=a,this.root.status.cookiesAccepted=s,this.root.status.cookiesInUse=i,a===!0&&(Partarum.Log.add("HTMLCookie","construct","activated === true"),this.id="partarumCookie",this.loadStyle({link:"/Partarum/PartarumCSS/PartarumElements/cookieBanner.css",style:document.querySelectorAll('style[id*="fa"]')}).then(()=>{this.root.app.themes=[{header:{config:{i:{_attributes:{id:"partarumCookieIcon",class:"fa-duotone fa-cookie-bite fa-flip fa-3dicon",style:this.closest("#partarumBottomBarBody")!==null?`
                                                position: unset;
                                                bottom: unset;
                                                left: unset;
                                            `:"",addEvent:{type:"click",topic:"CookieBanner",theme:"CookieIcon",name:"CookieIcon_click",targetID:"cookieIcon",bubble:!0,doThat:n=>{console.dir("CookieIcon - clicked"),console.dir(this.root.dom.get("CookieBanner")),this.root.dom.get("CookieBanner").classList.toggle("zero")}}}}},parent:this.root.dom.get("shadowBox")}}],this.root.app.create(()=>{}).then(()=>{this.setCookieBanner(t).then(()=>{s===!0&&Partarum.System.Cookie.toAgree(t,!0)})})}))}).then(()=>{})}async setCookieBanner(t){Partarum.Log.create("HTMLCookie","setCookieBanner").add("HTMLCookie","setCookieBanner","start"),await this.loadCookieElement(t)}loadCookieElement(t){return new Promise(e=>{this.root.dom.add("CookieBanner",new U(t,this.root.dom),null),this.root.status.cookiesAccepted===!0&&this.root.dom.get("CookieBanner").classList.toggle("zero"),this.root.dom.add("shadowBox",this.root.dom.get("CookieBanner"),"append"),e(!0)})}};customElements.get("partarum-cookie")===void 0&&customElements.define("partarum-cookie",I);var D=class extends b{constructor(t){super(t,"partarum-registration-box")}connectedCallback(){super.connectedCallback(),this.loadElements().then()}async loadElements(){let t=this.root.config?.theme??"small",e=this.root.config?.level??4;await this.setHeadline(),await this.setForm()}setHeadline(){return new Promise(t=>{let e=document.createElement("h"+this.root.config.level.toString());e.appendChild(document.createTextNode(this.root.config?.surface?.headline?.text??"Registrierung")),this.initAddElement("headline",e)})}setForm(){return new Promise(t=>{})}};customElements.get("partarum-registration-box")===void 0&&customElements.define("partarum-registration-box",D);var B=class{static createBottomBar(...t){return new S(...t)}static createCardBox(...t){return new T(...t)}static createCookieBanner(...t){return new I(...t)}static createNavBar(...t){return new v(...t)}static createRegistrationBox(...t){return new D(...t)}static confirmLink(t){let{href:e,confirm:o,title:r,options:a}=t;return["href","confirm","title","options"].forEach(s=>Reflect.deleteProperty(t,s)),this.counter++,{href:"javascript:void(0)",title:r||"Link",addEvent:{type:"click",topic:"ConfirmLink",theme:"confirmLink_click",name:"confirmLink_click_"+this.counter,targetID:"confirmLink_"+this.counter,doThat:s=>{Partarum.Validation.confirmLink(o,e,a)}},...t}}static getSafeElementById(t,e=250){return new Promise(o=>{Partarum.HTML.getSafeElement("byID",t,e).then(r=>{o(r)})})}static getSafeElementByQueryString(t,e=250){return new Promise(o=>{Partarum.HTML.getSafeElement("byQuery",t,e).then(r=>{o(r)})})}static getSafeElement(t,e,o=250){return new Promise((r,a)=>{console.dir(e);let s=t==="byID"?document.getElementById(e):document.querySelector(e),i,n=0,d=()=>{s===null&&n<1e3?(s=t==="byID"?document.getElementById(e):document.querySelector(e),s===null?(n++,d()):r(s)):(clearInterval(i),r(s))};s===null?i=setInterval(d,o):r(s)})}};p(B,"BottomBar",S),p(B,"CardBox",T),p(B,"CookieBanner",I),p(B,"NavBar",v),p(B,"RegistrationBox",D),p(B,"counter",0);export{B as HTML,S as HTMLBottomBar,T as HTMLCardBox,I as HTMLCookie,v as HTMLNavBar,D as HTMLRegistrationBox};
//# sourceMappingURL=HTML.js.map
