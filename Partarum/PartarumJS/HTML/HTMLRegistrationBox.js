import {HTMLPartarumHost} from "/Partarum/HTML/PartarumHost";

class HTMLRegistrationBox extends HTMLPartarumHost {

    constructor(config) {
        super(config, "partarum-registration-box");

    }

    connectedCallback(){
        super.connectedCallback();

        this.loadElements().then();
    }

   async loadElements(){

       let theme = this.root.config?.theme ?? "small";

       let level = this.root.config?.level ?? 4; // ! max. 6

       await this.setHeadline();

       await this.setForm();
   }

   setHeadline(){

        return new Promise((resolve) => {

            let h = document.createElement("h" + this.root.config.level.toString());

            h.appendChild(document.createTextNode(this.root.config?.surface?.headline?.text ?? "Registrierung"));

            this.initAddElement("headline", h);
        });
   }

   setForm(){

        return new Promise((resolve) => {


        });
   }
}

customElements.define("partarum-registration-box", HTMLRegistrationBox);

export {HTMLRegistrationBox};