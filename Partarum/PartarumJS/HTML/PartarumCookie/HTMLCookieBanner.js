import {HTMLPartarumElement} from "/Partarum/HTML/PartarumElement";
import {HTMLCookieBody} from "/Partarum/HTML/CookieBody";
import {HTMLCookieHeader} from "/Partarum/HTML/CookieHeader";
import {HTMLCookieMain} from "/Partarum/HTML/CookieMain";
import {HTMLCookieFooter} from "/Partarum/HTML/CookieFooter";


customElements.define("partarum-cookie-body", HTMLCookieBody);
customElements.define("partarum-cookie-header", HTMLCookieHeader);
customElements.define("partarum-cookie-main", HTMLCookieMain);
customElements.define("partarum-cookie-footer", HTMLCookieFooter);

class HTMLCookieBanner extends HTMLPartarumElement {

    constructor(config, dom){
        super(config, "banner");

        this.id = "PartarumCookieBanner";

        this.className = "single-box-center";

        this.root.config = config;

        this.root.dom = dom;

        this.loadBody().then();
    }

    async loadBody(){

        await this.setBody();
        await this.setHeader();
        await this.setMain();
        await this.setFooter();
    }

    setBody(){

        return new Promise((resolve)=>{

            this.root.dom.add("CookieBody", new HTMLCookieBody(this.root.config, "body"), null);
            this.appendChild(this.root.dom.get("CookieBody"));

            resolve(true);
        });

    }

    setHeader(){

        return new Promise((resolve)=>{

            this.root.dom.add("CookieHeader", new HTMLCookieHeader(this.root.config, "header"), null);
            this.root.dom.add("CookieBody", this.root.dom.get("CookieHeader"), "append");

            resolve(true);
        });

    }

    setMain(){

        return new Promise((resolve)=>{

            this.root.dom.add("CookieMain", new HTMLCookieMain(this.root.config, "main"), null);
            this.root.dom.add("CookieBody", this.root.dom.get("CookieMain"), "append");

            resolve(true);
        });

    }

    setFooter(){

        return new Promise((resolve)=>{

            this.root.dom.add("CookieFooter", new HTMLCookieFooter(this.root.config, "footer", this.root.dom), null);
            this.root.dom.add("CookieBody", this.root.dom.get("CookieFooter"), "append");

            resolve(true);
        });

    }
}

export {HTMLCookieBanner};