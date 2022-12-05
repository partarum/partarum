import {HTMLPartarumHost} from "/Partarum/HTML/PartarumHost";
import {HTMLBottomBarBody} from "/Partarum/HTML/BottomBarBody";

customElements.define("partarum-bottom-bar-body", HTMLBottomBarBody);

class HTMLBottomBar extends HTMLPartarumHost {

    constructor(config){

        super(config, "partarum-bottom-bar");

        this.id = "partarumBottomBar";

        this.loadStyle({

            link: "/Partarum/PartarumCSS/PartarumElements/bottomBar.css",
            style: document.querySelectorAll('style[id*="fa"]')

        }).then(()=>{

        });

        this.root.dom.add("BottomBarBody", new HTMLBottomBarBody(config, "body"), null);

        this.root.dom.add("shadowBox", this.root.dom.get("BottomBarBody"), "append");

        if(Reflect.has(config, "parent")){

            config.parent.appendChild(this);
        } else {

            document.body.appendChild(this);
        }

        this.addTopic(["leftSide", "center", "rightSide"]);

    }

    add(element, topic){

        this.root.dom.add(topic, element, "append");
    }

    addTopic(topic){

        let topicArray = (Array.isArray(topic)) ? topic : [topic];

        for(let topicName of topicArray){

            let topicNode = document.createElement("section");

            this.root.dom.add(topicName, topicNode, null);

            this.root.dom.add("BottomBarBody", topicNode, "append");
        }
    }
}

customElements.define("partarum-bottom-bar", HTMLBottomBar);

export {HTMLBottomBar};