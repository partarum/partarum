import {HTMLPartarumElement} from "/Partarum/HTML/PartarumElement";
import {HTMLLayoutElementAnalyzer} from "/Partarum/PartarumJS/HTML/HTMLLayoutElementAnalyzer";
import {DrawElementAnalyzer} from "/Partarum/Draw/DrawElementAnalyzer";

class HTMLNavBarBody extends HTMLPartarumElement {

    nodes = new HTMLLayoutElementAnalyzer()

    constructor(config, name, dom){

        super(config, name, dom, "partarumNavBarBody");
    }

    connectedCallback(){

        super.connectedCallback();

        this.root.connectedCallback(() => {

            console.dir("root connectedCallback");

            this.id = "partarumNavBarBody";

            this.analyseConfig().then(()=>{

                if(Reflect.has(this.root.config, "nav")){

                    this.loadElements().then();
                }
            });
        });
    }

    analyseConfig(config){

        return new Promise((resolve) => {

                /*
                    {
                        mobile: {},
                        desktop: {},
                        nav: []
                    }
                 */
            resolve();
        });
    }

    async loadElements(){

        await this.setNav(this.root.config.nav);
        await this.setDesktop(this.root.config.desktop);
        await this.setMobile(this.root.config.mobile);

    }

    setNav(nav){
        return new Promise((resolve) => {

            let type = this.root.config?.type;

            this.root.dom.add("nav", document.createElement("nav"), null);

            this.appendChild(this.root.dom.get("nav"));

            switch(type){
                // classic = einfaches <nav> mit <a> Elementen und ein mobile Menu
                case "classic":

                    this.setAnchor(nav, this.root.dom.get("nav")).then(() => resolve());
            }
        });
    }

    setMobile(config){

        return new Promise((resolve) => {

            console.dir(config);

            if(config?.type){

                switch(config.type){

                    case "Hamburger":
                            let checkbox = document.createElement("input");

                            checkbox.setAttribute("type", "checkbox");
                            checkbox.setAttribute("id", "hamburgerMenu");
                            checkbox.classList.add("hamburger");

                            this.root.dom.get("nav").before(checkbox);

                            resolve();

                }
            }


            if(config?.position){

            }
        });
    }

    setDesktop(config){

        return new Promise((resolve) => {

            if(config?.type){

            }

            if(config?.position){

                Partarum.HTML.getSafeElementByQueryString(config.position.to).then((element) => {

                    setTimeout(() => {

                        this.nodes.init(window, [element]).then((data) => {

                            console.dir(data);

                            //this.setAnimation(data.nodes[0].top, 10);
                            let animationTop = (data.nodes[0].top / 2) - ((data.base.height / 10) / 2);

                            this.setAttribute("style", `--animationTop: ${animationTop}px; --animationHeight: 10vh; animation: simpleNav 2s ease-in-out; animation-fill-mode: forwards; display: grid; color: #F9F9FA;`);

                            resolve();
                        });

                    },500);

                });
            }
        });
    }

    setAnimation(top, height){
        let style = document.createElement("style");

        style.textContent = `
            @keyframes simpleNav {
                from {
                    top: 0;
                    height: 0;
                    opacity: 0;                  
                    font-size: 0;
                } 
                to {
                    top: calc(calc(${top}px / 2) - calc(${height}vh / 2));
                    height: ${height}vh;
                    opacity: 1;
                    font-size: 1.6rem;
                }
            }
        `;

        this.appendChild(style);
    }

    setAnchor(config, parent){

        return new Promise((resolve) => {

            console.dir("setAnchor");

            let anchorArray = (Array.isArray(config) ? config : [config]);

            let counter = 0;

            for(let anchorConfig of anchorArray){

                let anchor = document.createElement("a");

                for(let attr in anchorConfig){

                    switch(attr){

                        case "text":

                            anchor.appendChild(document.createTextNode(anchorConfig[attr]));
                            break;
                        default:
                            anchor.setAttribute(attr, anchorConfig[attr]);
                    }
                }

                parent.appendChild(anchor);

                counter ++;

                (counter === anchorArray.length) && resolve();
            }
        });
    }
}

customElements.define("partarum-nav-bar-body", HTMLNavBarBody);

export {HTMLNavBarBody};