import {HTMLPartarumElement} from "/Partarum/HTML/PartarumElement";

class HTMLPartarumHost extends HTMLPartarumElement{

    constructor(config, name, id){
        super(config, name, id);

        this.#base();
    }

    static cache;

    connectedCallback(){
        super.connectedCallback();
    }

    #base() {

        this.partarum = window.Partarum;

        this.root.dom = this.partarum.Cache.HTMLCache.create("partarum-host", this.root.name);

        this.root.dom.add("shadowBox", this.attachShadow({mode: "open"}), null);

        let partarumCSS = document.createElement("link");
        partarumCSS.setAttribute("rel", "stylesheet");
        partarumCSS.setAttribute("type", "text/css");
        partarumCSS.setAttribute("href", "/Partarum/css");

        this.root.dom.add("shadowBox", partarumCSS, "append");
    }

    loadStyle(config){

        return new Promise((resolve) => {

            let linkCounter = 0;

            let linkStatus = false;

            let styleCounter = 0;

            let styleStatus = false;

            if(Reflect.has(config, "link")){

                let linkArray = Array.isArray(config.link) ? config.link : [config.link];

                for(let link of linkArray) {

                    let linkElement = document.createElement("link");
                    linkElement.setAttribute("rel", "stylesheet");
                    linkElement.setAttribute("type", "text/css");
                    linkElement.setAttribute("href", link);

                    this.root.dom.add("shadowBox", linkElement.cloneNode(true), "append");

                    linkCounter++;

                    linkStatus = (linkCounter === linkArray.length);
                }

            } else {

                linkStatus = true;
            }

            if(Reflect.has(config, "style")){

                let styleList = (Array.isArray(config.style)) ? config.style : ((config.style instanceof NodeList) ? config.style : [config]);

                for(let style of styleList) {

                    this.root.dom.add("shadowBox", style.cloneNode(true), "append")

                    styleCounter++;

                    styleStatus = (styleCounter === styleList.length);
                }
            } else {

                styleStatus = true;
            }

            function checkStatus(){

                if((styleStatus === true) && (linkStatus === true)) {
                    resolve(true);
                }
            }

            let inID = setInterval(checkStatus, 100);

        });
    }
}

customElements.define("partarum-host", HTMLPartarumHost);

export {HTMLPartarumHost};