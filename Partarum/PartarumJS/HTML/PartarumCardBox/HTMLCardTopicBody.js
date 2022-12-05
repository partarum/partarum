import {HTMLPartarumElement} from "/Partarum/PartarumJS/HTML/HTMLPartarumElement";
import {HTMLCardTopicBox} from "/Partarum/PartarumJS/HTML/PartarumCardBox/HTMLCardTopicBox.js";

customElements.define("partarum-card-topic-box", HTMLCardTopicBox);

class HTMLCardTopicBody extends HTMLPartarumElement {

    constructor(config, id, dom){
        super(config, "article", dom, id);

        this.cardBoxObject = this.root.dom.get("CardBoxObject");
    }

    connectedCallback() {
        super.connectedCallback();

        this.className = "box-row box-center";

        this.loadElements().then();
    }

    async loadElements(){

        await this.addTopicBox();
    }

    addTopicBox(){

        return new Promise((resolve) => {

            for(let [key, value] of this.cardBoxObject.topicBoxes){

                let id = "productCategory_" + key;

                this.root.dom.add(id, {
                    themes: {},
                    topic: new HTMLCardTopicBox(this.root.config, this.root.dom, id, value),
                    type: "Categories",
                    data: {}
                });

                this.appendChild(this.root.dom.get(id).topic);
            }

            resolve();
        });
    }
}

export {HTMLCardTopicBody};