/*
 *          Copyright 2020 � Alexander Bombis. All rights reserved.
 *          Developed by Alexander Bombis.
 *          Email: email@alexander-bombis.de
 *
 *          The following code was created based on the template for the website http://cordes-software.de.
 *          This may also be used in full by the person or business
 *          representing the domain "cordes-software.de"
 *          and also modified for their use.
 */

import {HTMLElement} from "/Partarum/HTML/Element";
import {HTMLTextNode} from "/Partarum/HTML/TextNode";

class HTMLSeries extends HTMLElement {

    constructor(po) {

        let superPo = {
            element: po.element || po.tagName,
            target: po.target || po.parent,
            before: po.before || false
        }

        super(superPo);

        this._po = po;
        this._quantity = po.quantity;
        this._text = po.text;
        this._className = po.className ?? false;
        this._event = po.event;
    }

    create(){
        this._elementArray = [];

        for(let i = 0; i < this._quantity; i++){

            let element = super.create();

            this._elementArray.push(element);
        }

        this.setSeriesText();

        (!(this._className instanceof Array) &&
            (typeof (this._className) !== "string")) && this.setSeriesPropertyClass();

        this.setSeriesAttribute();

        return this._elementArray;
    }

    setSeriesText() {

        /*
            po.text muss ein Object sein !!!
         */

        for(let key in this._text){

            if(this._text.hasOwnProperty(key)) {

                new HTMLTextNode(this._elementArray[key], this._text[key]);
            }
        }
    }

    /*
        string & Array & Object
     */
    setSeriesPropertyClass() {

        if(this._className !== false) {
            for (let key in this._className) {

                if (this._className.hasOwnProperty(key)) {

                    if(key === "all") {

                        if (this._className.all instanceof Array) {

                            this._elementArray.forEach((el) => {
                                el.classList.add(...this._className[key]);
                            });
                        } else if (typeof (this._className.all) === "string") {

                            this._elementArray.forEach((el) => {
                                el.className = el.className + " " + this._className[key];
                            });
                        }
                    } else {

                        if (this._className[key] instanceof Array) {

                            this._elementArray[key].classList.add(...this._className[key]);

                        } else if (typeof (this._className[key]) === "string") {

                            this._elementArray[key].className = this._elementArray[key].className + " " + this._className[key];
                        }
                    }
                }
            }
        }
    }

    setEvent() {
        super.setEvent();
    }

    setSeriesAttribute() {

        this.filterAttributes(this._po);

        for(let [key, value] of this._attributes){

            if(key !== "quantity") {

                if(typeof(value) === "string" ) {
                    this._elementArray.forEach((el) => {
                        el.setAttribute(key, value);
                    });
                } else {

                    let val = Object.keys(value);

                    for(let elKey in val){

                        this._elementArray[elKey].setAttribute(key, value[elKey]);
                    }
                }
            }
        }
    }

}

export {HTMLSeries};