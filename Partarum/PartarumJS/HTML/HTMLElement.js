/*
 *          Copyright 2020 © Alexander Bombis. All rights reserved.
 *          Developed by Alexander Bombis.
 *          Email: email@alexander-bombis.de
 *
 *          The following code was created based on the template for the website http://cordes-software.de.
 *          This may also be used in full by the person or business
 *          representing the domain "cordes-software.de"
 *          and also modified for their use.
 */

import {HTMLTextNode} from "/Partarum/HTML/TextNode";

class HTMLElement {

    constructor(po) {

        if(po instanceof Element) {

            this._element = po;

        } else {

            this._constructProps = [
                "tagName", "element",
                "target", "parent", "before",
                "text", "className", "event"
            ];

            this._tagName = (po.tagName || po.element) ?? false;
            this._target = (po.target || po.parent) ?? false;
            this._before = po.before ?? false;

            this._text = po.text ?? false;
            this._className = po.className ?? false;
            this._event = po.event ?? false;

            this.filterAttributes(po);
        }
    }

    filterAttributes(po){

        let props = Object.keys(po);

        let attributes = props.filter((value) => {
            if(this._constructProps.includes(value) !== true){
                return value;
            }
        });

        this._attributes = new Map();

        if(attributes.length > 0) {

            for (let prop of attributes) {
                this._attributes.set(prop, po[prop]);
            }
        } else {
            this._attributes = false;
        }
    }

    create(){
        this.createElement();
        this.setElement();

        ((this._text !== false) &&
            ((typeof(this._text) === "string") || (this._text instanceof Array))
        ) && this.setText();

        (this._className !== false) && this.setPropertyClass();

        (this._attributes !== false) && this.setAttribute();

        (this._event !== false) && this.setEvent();

        return this._element;
    }

    destroy(){
        this._element.remove();
    }

    createElement(){
        this._element = document.createElement(this._tagName);
    }

    setElement(){

        if(this._before === false){
            this._target.appendChild(this._element);
        } else {
            this._target.insertBefore(this._element, this._before);
        }

    }

    getElement(){

        return this._element;
    }

    setAttribute(){

        for(let [key, value] of this._attributes){
            this._element.setAttribute(key, value);
        }
    }

    setText(){

        if(this._text !== false){

           new HTMLTextNode(this._element, this._text);

        } else {
            console.log("Kein Text übergeben.");
        }
    }

    /*
        String && Array
     */
    setPropertyClass(){

        if(this._className !== false){

            if(this._className instanceof Array){

                this._element.classList.add(...this._className);

            } else if (typeof(this._className) === "string"){

                this._element.className = this._className;
            }
        }
    }

    setEvent(){

    }
}
export {HTMLElement};