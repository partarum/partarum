import {HTMLElement} from "/Partarum/HTML/Element";
import {HTMLSeries} from "/Partarum/HTML/Series";
import {HTMLTextNode} from "/Partarum/HTML/TextNode";

class Office {

    constructor() {
        this.body = document.body;
    }

    createElement(propertyObject){
        return new HTMLElement(propertyObject);
    }

    createNode(propertyObject){
        return new HTMLElement(propertyObject);
    }

    static createElement(propertyObject){

        return new HTMLElement(propertyObject);
    }

    static HTMLElement(propertyObject){

        return new HTMLElement(propertyObject);
    }

    static HTMLSeries(propertyObject) {

        return new HTMLSeries(propertyObject);
    }

    static HTMLCollection(propertyObject){

        return new HTMLSeries(propertyObject);
    }

}
export {Office, HTMLElement, HTMLSeries, HTMLTextNode};