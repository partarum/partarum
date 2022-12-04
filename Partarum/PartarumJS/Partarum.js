/*
 *   Copyright 2018- 2022 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
import {HTMLPreload} from "/Partarum/HTML/HTMLPreload";
import {Cache} from "/Partarum/Cache";
import {Workshop} from "/Partarum/Workshop";
import {ClientSetting} from "/Partarum/ClientSetting";
import {Cookie} from "/Partarum/System/Cookie";

class Partarum {

    constructor() {

        this.item = "Was geht ab?";
        this.dom = [];
        this.id = Cache.ImportCache.setCondition();
        this.app = {};
        Partarum.workerCache = {};

        if((!globalThis.Partarum) || (!Window.Partarum)){

            //console.log("start---Partarum--- without window.partarum");

            globalThis.Partarum = Partarum;

            let preload = async ()=>{

                await HTMLPreload.init();
            };

            (!Partarum.preloadStatus) && preload().then(()=>{

                new Workshop();

                Partarum.preloadStatus = true;

                Cookie.init().then((cookieTest)=>{

                    console.dir(cookieTest);
                });
            })
        } else {

            //console.log("start---Partarum--- with window.partarum");
        }
    }

    static void(){
        return "javascript:void(0)";
    }

    static init() {
        if((!globalThis.Partarum) || (!Window.Partarum)){
            globalThis.Partarum = Partarum;
            new Workshop();
        }
    }
        
    addWorkbox(name, file){
        
        Partarum.workerCache[name] = new Partarum.Workbox(file, {name: name});
        
        return Partarum.workerCache[name].getWorker();
    }
        
    static getWorker(name){
        
        return Partarum.workerCache[name].getWorker();
    }

    static counter(){

        Partarum.count ??= 0;
        Partarum.count++;
    }

    childCounter(){

        this.childCount ??= 0;
        this.childCount++;
    }

    static setTheme(i){

        Partarum.themeCache ??= [];
        Partarum.themeCache.push(i);
    }

    static getTheme(){
        return Partarum.themeCache[Partarum.themeCache.length - 1];
    }

    static setStart(){

        Partarum.isStarted ??= 1;
    }

    static stopStart(){

        Partarum.isStoped ??= 1;
    }

    static start(){
        /*
            Hier sämtliche Funktionen ausführen lassen, welche erst nach der Erstellung der Seite ausgeführt werden sollen
         */

        let intervall = setInterval(()=>{

            let id = location.hash.slice(1);

            if(id !== "") {

                if (document.getElementById(id)) {

                    // Hier müssen wir noch die Ancorthematik angreifen !!!! Das sollte auf jeden Fall noch tiefgründiger angegangen werden !!!!

                    let display = Partarum.ViewKit.setSingleDisplay("anchor");
                    display.setScrollableElement("window");

                    Partarum.ViewKit.callDisplay("anchor").setViewport(id, "center");

                    Partarum.ViewKit.setIntoView("anchor", id, "center");

                    clearInterval(intervall);
                }
            } else {
                clearInterval(intervall);
            }
        }, 100);
    }

    set surface(value){

        this.setSurface(value);
    }

    setSurface(value){



        this.surfaceObject = value;
    }

    create(callback){

        // Runden zählen
        Partarum.counter();

        // Prüfen ob ein Callback mitgegeben wurde, welcher zum Schluss ausgeführt wird
        (callback instanceof Function) && Cache.PartarumCache.setCallback(callback);


        return new Promise((resolve, reject) => {

            Partarum.checkPreload().then(()=>{
                // prüfen ob ein Template mitgegeben wurde

                //console.log("start---Station");

                Cache.PartarumCache.isTemplate = ((this.template) ?? true) && Cache.PartarumCache.setTemplates(this.template);

                /*
                       ! um die option surface statt themes erweitern !!!

                       auf Type der Option prüfen und Type abspeichern
                 */



                this.type = (this?.themes) ? "group" : ((this?.theme) ? "single" : null);


                // prüfen ob es sich um ein einfachen Aufbau oder einen Gruppenaufbau handelt

                /*
                        Single: ein Object mit traget | parent und surface

                                {
                                    surface: kann ein Object oder ein import sein
                                    target: ist immer ein HTMLElement
                                }

                        Group: ein Array mit einzelnen Gruppen  oder ein Object mit einzelnen Singles

                        {
                            header: Single
                            main: Single
                            footer Single
                        }

                        [
                            {
                                header: Single - das erste Element ist der Parent für die darauffolgenden Elemente
                                nav: Single - benötigt einen Verweis auf header
                            },
                            {
                                main: Single
                                article: Single
                            },
                            {
                                footer: Single
                                section: Single
                            }
                        ]

                 */

                if (this.type === "single") {

                    let app = new Station(this);
                    let result = this?.config ? app.loadPage(this.config) : console.dir(this);
                    result.then(() => {

                    })
                } else if (this.type === "group") {

                    this.themes.forEach((value, index) => {

                        for (let t in value) {

                            if (value.hasOwnProperty(t)) {

                                this.childCounter();

                                Partarum.setTheme(t);

                                value[t].theme = t;

                                Cache.ImportCache.conditionObject[this.id].push({[t]: value[t]});

                                let app = new Station(value[t], this.id);
                                this.app[t] = app.loadPage(value[t].config);
                            }
                        }
                    })
                }

                resolve(this.app);
            });
        });
    }

    static checkPreload(){

        return new Promise((resolve)=> {

            if(Partarum.preloadStatus === true){

                //console.log("window.Partarum has ViewKit");

                resolve(true);
            } else {

                //console.log("window.Partarum has no ViewKit");

                setTimeout(() => {
                    this.checkPreload().then(()=>{resolve(true)});
                }, 100);
            }
        });
    }
}

class Station {

    constructor(arg, id) {

        this.arg = arg;
        this.id = id;
        Cache.ImportCache.create(id);
    }

    loadPage(filePath) {
        /*
                Noch auf die Möglichkeit des statischen Importes abändern !!!!


           ! Javascript Objekte auch direkt übergeben können  - Abänderung 12.10.2021 -- !!!!
         */
        async function load(arg, id) {

            // holen des Moduls Config - Datei

            if(typeof(filePath) === "string") {

                return await import(filePath)
                    .then((data) => {

                        // WorkingCache.setTreat("Station_loadPage().async_load().then() --- id: " + id);

                        return {
                            [arg.theme]: {
                                id: id,
                                theme: arg.theme,
                                themeData: arg,
                                type: "import",
                                module: data
                            }
                        };
                    }).catch((error) => {
                        console.dir(error);
                    });

            } else if(typeof(filePath) === "object"){

                return {
                    [arg.theme]: {
                        id: id,
                        theme: arg.theme,
                        themeData: arg,
                        type: "direct",
                        module: filePath
                    }
                }
            }
        }

        return load(this.arg, this.id).then((data) => {

            let nowImportCacheLength = Object.keys(Cache.ImportCache.modulArray).length;
            let nowImportCacheIDCounter = Cache.ImportCache.idCounter;

            let theme = Object.keys(data)[0];

            let id = data[theme].id;

            Cache.ImportCache.setID(id);

            Cache.ImportCache.modulArray[id] ??= {};

            Cache.ImportCache.modulArray[id][theme] = data[theme];

            if(Object.keys(Cache.ImportCache.modulArray[id]).length === Cache.ImportCache.conditionObject[id].length){

                Cache.ImportCache.conditionObject[id].forEach((value, index, array) => {

                    for(let conditionTheme in value) {

                        if (value.hasOwnProperty(conditionTheme)) {

                            /*
                                ! importData === der export aus einer JS - Datei
                             */

                            let im = Cache.ImportCache.modulArray[id][conditionTheme];

                            let importData;

                            if(im.hasOwnProperty("type")){

                                if(im.type === "import"){

                                    importData = im.module.default;

                                } else if(im.type === "direct"){

                                    importData = im.module;
                                }
                            } else {

                                importData = Cache.ImportCache.modulArray[id][conditionTheme].module.default;
                            }

                            let content = new WebApp(conditionTheme, importData, value[conditionTheme].config);
                            content.setPage(value[conditionTheme]);
                        }
                    }
                })
            }

            if((nowImportCacheLength !== 0) && (nowImportCacheLength === nowImportCacheIDCounter - 1)) {

                /*
                        Hier ist richtig Schluss !!!!!
                 */

                if(Partarum.isStarted !== 1) {

                    if(Partarum.isStoped !== 1) {
                        Partarum.start();
                        Partarum.setStart();
                        Partarum.stopStart();
                        Partarum.isStarted = null;
                    }

                    Station.setCallback();
                }

            } else {

                /*
                    ! Hier die callbacks ausführen, welche in der Haupt - JS festgelegt wurden !!!
                 */

                Cache.PartarumCache.setRound();

                if(Cache.PartarumCache.getRound() === Cache.ImportCache.conditionObject["round_0"].length){

                    /*
                        ! muss noch gegengewertet werden bezüglich der _import Aufrufe
                     */

                    Station.setCallback();
                }
            }

            return data;

        }).catch((error) => {

            console.dir(error);
        });
    }

    static setCallback(){

        let c = Cache.PartarumCache.getCallback();

        if(c !== undefined) {
            for (let i = 0; i < c.length; i++) {

                let call = c[i] ?? (()=>{});
                call();
            }

            Cache.PartarumCache.callback = [];
        }
    }
}

class WebApp {

    constructor(page, data, filePath) {

        this._surface = data;

        this._cache = [data];

        this.filePath = filePath;

        this._clientSettings = new ClientSetting();
    }

    setPage(arg){

        //console.dir(arg);

        let box = null;

        if(arg?.container) {
            box = document.createElement(arg.container);
            box.setAttribute("id", arg.theme);

            arg.parent.appendChild(box);
        }

        for (let module of this._cache) {

            if (module instanceof Promise) {

                module[0].then(data => {

                    Cache.PartarumCache.setSurfacePaths(this._surface.surface);

                    return new Content(data.default, box ?? arg.parent, this.filePath);
                });
            } else {

                new Content(module, box ?? arg.parent, this.filePath );
            }
        }
    }
}

class Content {

    constructor(surface, arg, filePath) {

        if(arg !== null) {

            if(arg instanceof HTMLElement) {
                this.dom = arg;
            } else {

                if(arg instanceof ShadowRoot){
                    this.dom = arg;
                } else {
                    this.after = arg?.after;
                }
            }



            this.surface = surface;
            this.surfacePaths = Cache.PartarumCache.surfacePaths;
            this.filePath = filePath;
            this.templateKeys = [
                "_attributes",
                "_import"
            ];

            Cache.DOMCache.create();

            this.create()
        }
    }

    create(){

        let stopRound = null;

        if((typeof(this.surface) !== "string") && (!Array.isArray(this.surface))) {

            for (let main in this.surface) {

                Cache.DOMCache.counter ++;

                if (this.surface.hasOwnProperty(main)) {

                    /*
                        ein Property von this.surface

                            - meißtens ein Object mit Angaben wie _attributes oder ein neues Element
                            - wenn Array, dann:
                                    - weil es eine Anreihung von Text ist, oder
                                    - weil es eine Anreihung von Objecten ( also neuen Elementen ist )

                     */
                    let surface = this.surface[main];

                    let node = null;

                    /*
                        $ ist die Angabe für ein Templateproperty
                     */

                    if (main.charAt(0) !== "$") {

                        /*
                            prüfen ob HTMLElement - TagName  oder systeminterne Variable ( wie _attributes || _import )
                         */
                        let tagName = main.split("_")[0];

                        /*
                               wenn surface ein Object mit Attributen ist:
                         */
                        if((tagName === "") && (main === "_attributes")) {

                            //console.dir(surface);

                            Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "attribute";

                            for (let attr in surface){

                                //console.dir(attr);
                                //console.dir(this.dom);

                                if(surface.hasOwnProperty(attr)) {

                                    if(attr.charAt(0) !== "$") {

                                        if (attr === "text") {

                                            // auf Promise prüfen !!!!


                                            if(surface[attr] instanceof Promise){

                                                surface[attr].then((data)=>{

                                                    this.dom.appendChild(document.createTextNode(data));
                                                });
                                            } else {
                                                this.dom.appendChild(document.createTextNode(surface[attr]));
                                            }

                                        } else if (attr === "innerHTML") {

                                            this.dom.innerHTML = surface[attr];

                                        } else {

                                            if(attr === "addEvent"){

                                                if(Partarum.hasOwnProperty("Cache")) {

                                                    //! für mehrere Events ausbauen

                                                    let eventArray = (Array.isArray(surface[attr])) ? surface[attr] : [surface[attr]];

                                                    for(let event of eventArray) {

                                                        //console.dir(event);

                                                        if (event.name) {

                                                            if (event.topic) {

                                                                Partarum.Cache.EventCache.create(event.topic, event.theme);

                                                                Partarum.Cache.EventCache.setEvent(event);
                                                            } else {

                                                                Partarum.Cache.EventCache.setEvent(event);
                                                            }
                                                        } else {

                                                        }

                                                        let eventCallback = Partarum.Cache.EventCache.getEvent(event.topic, event.theme, event.name) ?? event["doThat"];

                                                        if (event.bubbles) {

                                                            //console.dir("useCapture");

                                                            this.dom.addEventListener(event.type, eventCallback, true);
                                                        } else {

                                                            //console.dir(event);

                                                            this.dom.addEventListener(event.type, eventCallback, false);
                                                        }

                                                    }
                                                }
                                            } else if(attr === "addDOMEvent") {

                                                surface[attr]["doThat"]();
                                                //document.addEventListener(surface[attr].type, surface[attr]["doThat"]);
                                            } else {
                                                this.dom.setAttribute(attr, surface[attr]);
                                            }
                                        }
                                    }
                                }
                            }

                            stopRound = true;

                        } else if ((tagName === "") && (main === "_import")) {


                            /*
                                auf Array prüfen und wenn true, dann für jedes Element ein Import !!! Also array iterieren !!!!
                             */

                            if(typeof surface !== "object") {

                                Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "import";

                                // surface ist eine URL !!!

                                let app = new Partarum();
                                app.themes = [
                                    {
                                        [surface]: {
                                            config: surface,
                                            parent: this.dom
                                        }
                                    }
                                ];
                                app.create();
                            } else {

                                /*
                                    element: {
                                            _import: {
                                                template: {
                                                    name: "",                   <- Name des Templates
                                                    surface: {                  <- Templateobject || kann auch direkt hinzugefügt werden
                                                    }
                                                    valueFile: {                <- Value fürs Template, aber als Object!!!
                                                    }
                                                }
                                            }
                                        }

                                 */


                                if((!surface.template) && (Array.isArray(surface))){

                                    // Hier das _import - Array organisieren !!!! Also eine Schleife und für jedes ein new Content() !!!!

                                    for(let p of surface){

                                        let is = new Content(p, this.dom, this.filePath);
                                    }

                                } else if(surface.template){

                                    if(typeof surface.template === "object"){

                                        let valueFile = surface.template.valueFile;

                                        Cache.PartarumCache.isTemplate = true;

                                        Cache.PartarumCache.setTemplates(valueFile);

                                        // template, valuePath, parentNode

                                        let t = new Template(surface.template.name, surface.template.surface, valueFile, this.dom );

                                    } else if (typeof surface.template === "string") {

                                        if (Cache.PartarumCache.getTemplate(surface.template)) {

                                            Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "templateStart";
                                            Template.start = true;
                                            Template.startNumber = Cache.DOMCache.counter;

                                            let t = new Template(surface.template, Cache.PartarumCache.templatePaths[surface.template], Cache.PartarumCache.templates[surface.template], this.dom);

                                            /*
                                                Hier endet das Script fürs Template - der Rest wird von der class Template gemacht !!!
                                             */
                                        }
                                    }

                                    Cache.PartarumCache.isTemplate = false;

                                } else {

                                    // Hier kommt jetzt z.B der fetch - import von Textdatein

                                    for(let attr in surface){
                                        if(surface.hasOwnProperty(attr)){

                                            if(attr === "text"){

                                                fetch(surface[attr])
                                                    .then(function(response) {
                                                        if (!response.ok) {
                                                            throw new Error("HTTP error, status = " + response.status);
                                                        }

                                                        return response.text();
                                                    }).then((text)=>{

                                                        let textNode = document.createTextNode(text);
                                                        this.dom.appendChild(textNode);

                                                    }).catch((error)=>{

                                                        console.dir(error);
                                                })
                                            }
                                        }
                                    }
                                }
                            }

                            stopRound = true;

                        } else if ((tagName === "") && (main === "_partarum")){

                            // Partarum - Custom - Elemente

                            console.dir(surface);

                            this.dom.appendChild(surface);

                            /*
                                    Hier die Partarum - Bibliotheken auswerten!!!
                             */

                        } else {

                            /*
                                wenn surface keine systeminterne Variable ist, sondern ein HTMLElement
                             */

                            let count = 1;

                            let mainIsArray = false;

                            /*
                                prüfen auf Array

                                    - kann eine Anreihung von Strings sein, oder
                                    - eine Anreihung von Objecten mit neuen Elementangaben
                             */
                            if (Array.isArray(surface)) {

                                count = surface.length;

                                mainIsArray = true;
                            }

                            for (let i = 0; i < count; i++) {

                                let hasText = false;

                                if ((mainIsArray === true) || (typeof surface === "string")) {

                                    hasText = (typeof  surface === "string") ? surface : ((typeof  surface[i] === "string") ? surface[i] : false);

                                } else if (typeof surface === "object") {

                                    hasText = false;

                                    for (let t in surface) {

                                        if(surface.hasOwnProperty(t)) {

                                            if(Cache.DOMCache.templateProps[t]) {

                                                Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "reference";

                                                let content = new Content(Cache.DOMCache.templateProps[t] ?? surface, this.dom, this.filePath);
                                            }
                                        }
                                    }
                                }

                                if(tagName !== "") {

                                    Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "node";

                                    node = document.createElement(tagName);

                                    (hasText !== false) && node.appendChild(document.createTextNode(hasText));

                                    //console.dir(node);
                                    //console.dir(this.dom);

                                    (this.after) ? this.after.after(node) : this.dom.appendChild(node);

                                    let s = (Object.keys(surface)) && (mainIsArray !== true) ? surface : ((mainIsArray === true) ? surface[i] : null);

                                    let c = new Content(s, node, this.filePath);
                                }

                                stopRound = null;
                            }
                        }
                    } else {

                        let value = Template.valueCache?.[main];

                        if(value !== undefined){

                            let templateReference = this.surface[main];

                            if(typeof value === "string"){

                                let type = templateReference["_type"];

                                let valueReference = templateReference["_value"];

                                if(type === "_attributes"){

                                    for(let attrKey in valueReference){

                                        if(valueReference.hasOwnProperty(attrKey)) {

                                            if(attrKey.startsWith("data_")){

                                                attrKey = attrKey.replace('_', '-');
                                            }

                                            this.dom.setAttribute(attrKey, Template.valueCache[main]);
                                        }
                                    }
                                } else if(type === "text"){

                                    this.dom.appendChild(document.createTextNode(value));

                                } else if(type === "_callback"){

                                   let call = "back";

                                   console.log(call);
                                }
                            } else if (typeof value === "object"){

                                if(Array.isArray(value)){

                                    /*
                                            HTMLCollection kommt hier noch hinzu !!!!
                                     */

                                    // Textblöcke, Listen etc....

                                    // text muss noch auf inline HTML geprüft werden - überall wo Text ist - im gesamten Script

                                    let type = templateReference["_type"];

                                    if(type === "_callback"){

                                        let f = templateReference["_callback"];

                                        f(Template.valueCache);

                                    } else {

                                        let nodeCounter = value.length;

                                        for (let i = 0; i < nodeCounter; i++) {

                                            let part = value[i];

                                            let nextNode = document.createElement(this.dom.nodeName);

                                            let hasChild = [];

                                            if (type === "HTMLCollection") {

                                                for (let valuePart in part) {

                                                    if (part.hasOwnProperty(valuePart)) {

                                                        if (valuePart === "_attributes") {

                                                            for (let attrKey in part[valuePart]) {

                                                                if (part[valuePart].hasOwnProperty(attrKey)) {

                                                                    if (attrKey === "text") {

                                                                        let textNode = document.createTextNode(part[valuePart][attrKey]);

                                                                        (i === 0) ? this.dom.appendChild(textNode) : nextNode.appendChild(textNode);

                                                                    } else {

                                                                        attrKey = (attrKey.startsWith("data_")) ? attrKey.replace('_', '-') : attrKey;

                                                                        (i === 0) ? this.dom.setAttribute(attrKey, part[valuePart][attrKey]) : nextNode.setAttribute(attrKey, part[valuePart][attrKey]);
                                                                    }
                                                                }
                                                            }
                                                        } else {

                                                            // wenn der Key keine Systemvariable ist, sondern den Namen des nächsten Elementes darstellt

                                                            /*
                                                                neuer Child - Content !!!!

                                                                valuePart ist das Element!!!! - also der Name vom Element !!!!
                                                             */


                                                            // muss abgeändert werden - weil wenn es mehr als ein Child gibt, wird jedes davor überschrieben, deshalb in ein Array einfügen !!!

                                                            let nextSurface = {
                                                                [valuePart]: part[valuePart]
                                                            }

                                                            hasChild.push(nextSurface);

                                                            // es benötigt eine Bedingung, welches Node jetzt gemeint ist ( nextNode || this.dom )

                                                            // let content muss nach appendChild losgeschickt werden


                                                        }

                                                    }
                                                }

                                                if (i !== 0) {

                                                    this.dom.parentElement.appendChild(nextNode);
                                                } else {

                                                    nextNode = null;
                                                }

                                                if (hasChild.length > 0) {

                                                    for (let child of hasChild) {

                                                        let content = new Content(child, nextNode ?? this.dom, this.filePath);
                                                    }
                                                }

                                            } else if (type === "_callback") {


                                            } else {
                                                this.dom.parentElement.appendChild(document.createElement(this.dom.nodeName)).innerHTML = part;
                                            }
                                        }

                                    }
                                } else {

                                    for(let groupKey in templateReference){

                                        if(templateReference.hasOwnProperty(groupKey)) {

                                            let type = templateReference[groupKey]?.["_type"];

                                            let valueReference = templateReference[groupKey]?.["_value"];

                                            if (type === "text") {

                                                let text = Template.valueCache[main]?.[groupKey];

                                                this.dom.appendChild(document.createTextNode(text));

                                            } else if(type === "_attributes"){

                                                let value = Template.valueCache[main]?.[groupKey];

                                                for(let attrKey in valueReference){

                                                    if(valueReference.hasOwnProperty(attrKey)) {

                                                        attrKey = (attrKey.startsWith("data_")) ? attrKey.replace('_', '-') : attrKey;

                                                        this.dom.setAttribute(attrKey, value);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {

                            (Cache.DOMCache.templateProps?.[main]) ? Cache.DOMCache.zeroCounter() : Cache.DOMCache.setTemplateProp({
                                name: main,
                                value: surface
                            });

                            let content = stopRound ?? new Content(surface, node ?? this.dom, this.filePath);
                        }
                    }
                }
            }
        } else {

            /*
                    ul: {           // this.dom.parentElement
                        li: [       // this.dom
                            {
                                    // das eigentliche neue Childelement
                            },
                            {
                                    // das nächste childElement von this.dom.parentElement
                            }
                        ]
                    }
             */

            // hier jetzt die flexiblen auswerten


        }
    }
}

class Template {

    constructor(templateName, templateSurface, valuePath, parentNode) {

        Template.setStaticTemplateProperties();

        this.templateName = templateName;
        this.templateSurface = templateSurface;
        this.pathsObject = {
            templateSurface: templateSurface,
            valuePath: valuePath
        };

        this.loadDOM(templateName, this.pathsObject, parentNode);
    }

    loadDOM(templateName, pathsObject, parentNode) {

        if(pathsObject.valuePath instanceof Object) {
            Template.templateScript[templateName] = pathsObject.templateSurface;
            Template.templateValue[templateName] = pathsObject.valuePath;
            Template.valueCache = pathsObject.valuePath;

            Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "templateAsync";

            let templateNode = new Content(Template.templateScript[templateName], parentNode, "");

        } else {

            async function load() {

                for (let path in pathsObject) {

                    if (pathsObject.hasOwnProperty(path)) {

                        if (path === "valuePath") {

                            await import("/" + pathsObject[path])
                                .then((data) => {

                                    Template.templateScript[templateName] = pathsObject.templateSurface;
                                    Template.templateValue[templateName] = data.default;
                                    Template.valueCache = data.default;

                                })
                                .catch((error) => {
                                    console.dir(error);
                                });
                        }
                    }
                }

                Cache.DOMCache.roundCounter[Cache.DOMCache.counter] = "templateAsync";

                let templateNode = new Content(Template.templateScript[templateName], parentNode, "");
            }

            load().then(() => {
                return true;
            }).catch((error) => {
                console.dir(error);
            });
        }
    }


    static start(){
        if(Template.startNumber === undefined) {
            Template.startNumber = 0;
        }
    }

    static setStaticTemplateProperties(){

        if(Template.templateScript === undefined) {
            Template.templateScript = {};
        }

        if(Template.templateValue === undefined) {
            Template.templateValue = {};
        }

        if(Template.valueCache === undefined){
            Template.valueCache = {};
        }

        if(Template.templateCounter === undefined){
            Template.templateCounter = {};
        }
    }

    static getTemplateScripts(name){

        return Template.templateScript[name];
    }
}

//export {Partarum, WorkingCache, PartarumCache, EventCache, Office, Workshop};
export {Partarum, Cache, Workshop}