class HTMLPartarumElement extends HTMLElement {

    root = {
        dom: {},
        app: new Partarum(),
        constructed: false,
        initialized: false,
        initializedSuper: false,
        connected: false,
        connectedCallback: function(callback) {

            if(this.initialized === false){

                this.initialized = true;

                callback();
            }
        }
    };

    constructor(config, name, dom, id) {

        super();

        this.root.constructed = true;

        this.root.dom = dom;

        this.root.config = config;

        this.root.name = name;

        this.root.id = (typeof id === "string") ? id.replace(" ", "_") : "";
    }

    connectedCallback(){

        if(this.root.initializedSuper === false){

            this.id = this.root.id;

            this.setConfig(this.root.config, this.root.name);

            this.root.initializedSuper = true;
        }
    }

    setConfig(config, needle, element = this){

        if(config !== undefined) {

            if ("surface" in config) {

                if (Reflect.has(config.surface, needle)) {

                    if (Reflect.has(config.surface[needle], "style")) {

                        for (let style in config.surface[needle].style) {

                            element.style[style] = config.surface[needle].style[style];
                        }
                    }
                }
            }
        }
    }

    initAddElement(name, element, parent = "shadowBox", config = this.root.config, place = "append"){

        this.root.dom.add(name, element, null);

        this.setConfig(config, name, element);

        this.root.dom.add(parent, element, place);
    }

    add(element, topic){

        this.root.dom.add(topic, element, "append");
    }

    addTopic(parent, topic, elementName){

        let topicArray = (Array.isArray(topic)) ? topic : [topic];

        return new Promise((resolve) => {

            let topicCounter = 0;

            for(let topicName of topicArray){

                this.root.dom.add(topicName, document.createElement(elementName));

                this.root.dom.add(parent, this.root.dom.get(topicName), "append");

                if(topicCounter === topicArray.length){

                    resolve(true);
                }

                topicCounter ++;
            }
        });
    }
}

export {HTMLPartarumElement};