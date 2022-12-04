/*
 *           Copyright 2020 © Alexander Bombis. All rights reserved.
 *           Developed by Alexander Bombis.
 *           Email: email@alexander-bombis.de
 *
 *           The following code was created based on the template for the website http://cordes-software.de.
 *           This may also be used in full by the person or business
 *           representing the domain "cordes-software.de"
 *           and also modified for their use.
 */



class GroupObject {

    constructor(name){

        Partarum.ViewKit.displayCache ??= new Map();

        this.groupName = name;
        this.displays = [];
    }

    addDisplay(d, el){

        this.displays.push(d);
        this[d] = new Display(this.groupName, d, el);

        Partarum.ViewKit.displayCache.set(d, this.groupName);

        return this[d];
    }

    setScrollableElement(el){
        this.scrollableElement = el;
    }

    setFocus(e){
        this.focus = e ?? false;
    }
}

class DisplayGroup extends GroupObject{


    constructor(name) {
        super(name);
    }
}


class Display {

    constructor(g, d, el) {

        this.groupName = g;
        this.displayName = d;
        this.element = el ?? d;
        this.classes = [];
    }

    setClass(className){
        this.classes.push(className);
    }

    setScrollableElement(el){
        this.scrollableElement = el;
    }

    createUrl(id, block){

        let start = "start";

        return `javascript: Partarum.ViewKit.setIntoView("${this.displayName}", "${id}", "${block ?? start}").then((resolve)=>{
            if(resolve === false){
            console.dir("Kein Element vorhanden");
            
            } else {
            console.dir("Element vorhanden und Funktion ausgeführt");
            }
        });`;
    }

    setViewport(id, block){

        this.id = id;

        this.viewportCache ??= new Map();
        this.viewportCache.set(this.id, {
           block: block,
           url:  this.createUrl(id, block)
        });

        return this;
    }

    getURL(){

        let result = this.viewportCache.get(this.id);

        return result.url;
    }
}

class singleDisplay extends Display{
    constructor(name) {
        super(name, name, name);

        delete this.groupName;
    }

    setFocus(e){
        this.focus = e ?? false;
    }
}


class ViewKit {

    static scrollNow(e, b){

        return new Promise((resolve, reject) => {

            e.scrollIntoView({block: ((b === "center") || (b === "start"))  ? "start" : b, behavior: "smooth"});

            resolve(e);
        })
    }

    static scrollBack(el){

        el.scrollBy({left: 0, top: -300, behavior: "smooth"});
    }

    static addfocusCache(el) {
        ViewKit.focusCache ??= [];

        ViewKit.focusCache.push(el);
    }

    static removeFocusCache() {

        let el = ViewKit.focusCache.shift();
        el.classList.remove("focusBorder");
    }

    static setFocusBorder(el){

        (Array.isArray(ViewKit.focusCache)) && ViewKit.removeFocusCache();

        ViewKit.addfocusCache(el)

        el.classList.add("focusBorder");
    }

    static getScrollStopped(){

        return new Promise((resolve, reject) => {});
    }

    static setScrollEvent(el, callback){

        el.addEventListener("scroll", callback, false);
    }

    static scrollCallback(evName, scrollElement, scrollableElement, block){


        // diverse Callbacks für end, start und center etc... erstellen !!!

        return (ev) => {



            scrollableElement.removeEventListener("scroll", Partarum.Cache.EventCache.getEvent(evName), false);

            if(block === "center") {
                if (scrollableElement.scrollTop !== (scrollElement.offsetTop - scrollableElement.offsetTop)) {
                    /*
                    console.log("el.offsetTop: " + scrollElement.offsetTop);
                    console.log("cR.offsetTop: " + scrollableElement.offsetTop);
                    console.log("conditionReader: " + scrollableElement.scrollTop);    // das hier wenn conditionReader sich bewegt
                    console.log("documentElement: " + document.documentElement.scrollTop);
                    console.log("evPhase: " + ev.eventPhase);
                     */

                    if (scrollableElement !== document) {
                        scrollableElement.scrollTo({
                            left: 0,
                            top: (scrollElement.offsetTop - scrollableElement.offsetTop) - 300,
                            behavior: "smooth"
                        });
                    }
                }
            }
        };
    }

    static setIntoView(d, e, b){

        return new Promise((resolve, reject) => {

            // console.dir(d); // name des Displays
            // console.dir(e); // id des anzusteuernden Elementes
            // console.dir(b); // block - position

            let el = document.getElementById(e);

            if(el){

                let groupName = (Partarum.ViewKit.displayCache) ? Partarum.ViewKit.displayCache.get(d) : undefined;

                let display = (groupName === undefined) ? Partarum.ViewKit.displays[d] : Partarum.ViewKit.displays[groupName][d];

                let focus = (groupName === undefined) ? Partarum.ViewKit.displays[d].focus : Partarum.ViewKit.displays[groupName].focus;

                let scrollableElement = () =>{

                    if((display?.scrollableElement === false) || (display?.scrollableElement === "window")){

                        return ["window", document];

                    } else {

                        return [display.scrollableElement, document.getElementById(display.scrollableElement)];
                    }
                };

                let evNameAndElement = scrollableElement();

                let ev = {
                    type: "scroll",
                    topic: evNameAndElement[0],
                    theme: "Viewport",
                    name: display.id + "_scrollTo_" + e,
                    targetID: display.displayName,
                    doThat: ViewKit.scrollCallback(evNameAndElement[0], el, evNameAndElement[1], b)
                }

                Partarum.Cache.EventCache.create(ev.topic, ev.theme);

                Partarum.Cache.EventCache.setEvent(ev);

                let getEvCallback = Partarum.Cache.EventCache.getEvent(ev.topic, ev.theme, ev.name);

                if(evNameAndElement[1].offsetHeight !== evNameAndElement[1].scrollHeight) {

                    ViewKit.setScrollEvent(evNameAndElement[1], getEvCallback);
                }

                (ViewKit.displayStatus(el) !== true) && ViewKit.changeDisplay(groupName, d);

                ViewKit.scrollNow(el, b).then((e) => {

                    (focus === true) && ViewKit.setFocusBorder(e);
                });

                resolve(true);
            } else {

                resolve(false);
            }
        })
    }

    static setDisplayGroup(name){

        Partarum.ViewKit.displays ??= {};

        Partarum.ViewKit.displays[name] = new DisplayGroup(name);

        return Partarum.ViewKit.displays[name];
    }

    static setSingleDisplay(name){

        Partarum.ViewKit.displays ??= {};

        Partarum.ViewKit.displays[name] = new singleDisplay(name);

        return Partarum.ViewKit.displays[name];
    }

    static setDisplay(display){
        return new singleDisplay(display);
    }

    static callDisplay(display) {

        let displayGroup = Partarum.ViewKit.displays;

        let getGroup = (displayGroup[display]) ? Partarum.ViewKit.displays[display] : Partarum.ViewKit.displayCache.get(display);

        if(typeof getGroup !== "object") {
            return displayGroup[getGroup][display];
        } else {
            return displayGroup[display];
        }
    }

    static displayStatus(el){

        return ([
            el.clientLeft,
            el.clientHeight,
            el.clientTop,
            el.clientWidth
        ].every((key) => key === 0) !== true);
    }

    static replaceClass(el, oldClass, newClass){
        el.classList.remove(oldClass);
        el.classList.add(newClass);
    }


    static changeDisplay(dg, d){

        let displayGroup = Partarum.ViewKit.displays[dg];
        let displays = displayGroup.displays;

        let counter = 0;
        let elGroup = [];
        let classGroup = [];

        for(let displayName of displays){

            counter++;
            classGroup.push(displayGroup[displayName].classes);
            elGroup.push(document.getElementById(displayGroup[displayName].element));
        }

        for(let i = 0; i<counter; i++){

            for(let j = 0; j<counter; j++){

                elGroup[i].classList.toggle(classGroup[j]);
            }
        }
    }
}
export {ViewKit};