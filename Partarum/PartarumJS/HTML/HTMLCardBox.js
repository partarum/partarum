import {HTMLPartarumHost} from "/Partarum/HTML/PartarumHost";
import {HTMLCardBoxBody} from "/Partarum/HTML/CardBoxBody";
import {HTMLCardDrawBox} from "/Partarum/HTML/CardDrawBox";


customElements.define("partarum-card-box-body", HTMLCardBoxBody);

class HTMLCardBox extends HTMLPartarumHost {

    constructor(config) {

        super(config, "partarum-card-box", "partarumCardBox");

        this.loadStyle({

            link: "/Partarum/PartarumCSS/PartarumElements/cardBox.css",
            style: document.querySelectorAll('style[id*="fa"]')

        }).then(() => {

        });

        this.root.dom.add("CardBoxBody", new HTMLCardBoxBody(this.root.config, "body", this.root.dom), null);

        this.root.dom.get("CardBoxBody").classList.add("single-box-center-medium");

        this.root.dom.add("shadowBox", this.root.dom.get("CardBoxBody"), "append");

        if (Reflect.has(this.root.config, "parent")) {

            this.root.config.parent.appendChild(this);
        } else {

            document.body.appendChild(this);
        }

        this.root.dom.add("DrawBoard", this.root.dom.create("Canvas", "Boards"));

        this.root.dom.add("CardDrawBox", new HTMLCardDrawBox);

        this.root.dom.add("Categories", this.root.dom.create("CardBox", "Categories"));

        this.root.dom.add("DisplayCategories", this.root.dom.create("CardBox", "DisplayCategories"));

        this.root.dom.add("DisplayMenu", this.root.dom.create("CardBox", "DisplayMenu"));

        this.root.dom.add("Loader", this.root.dom.create("CardBox", "Loader"));

        this.root.dom.add("Listener", this.root.dom.create("CardBox", "Listener"));

        this.root.dom.add("LastDraw", new Set());

        this.root.dom.get("Loader").add("Status", 0);


    }

    connectedCallback(){
        super.connectedCallback();
    }


    /*
        ! für CardBox abändern
     */

    add(element, topic){

        this.root.dom[topic].appendChild(element);
    }

    addTopic(topic){

        let topicArray = (Array.isArray(topic)) ? topic : [topic];

        for(let topicName of topicArray){

            this.root.dom.add(topicName, document.createElement("section"), null);

            this.root.dom.add("CardBoxBody", this.root.dom.get(topicName), "append");
        }
    }
}

customElements.define("partarum-card-box", HTMLCardBox);

export {HTMLCardBox};