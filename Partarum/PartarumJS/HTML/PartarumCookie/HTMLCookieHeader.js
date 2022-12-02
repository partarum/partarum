import {HTMLPartarumElement} from "/Partarum/HTML/PartarumElement";

class HTMLCookieHeader extends HTMLPartarumElement {

    constructor(config){
        super(config, "header");

        this.className = "box box-center-center";

        this.root.app.themes = [
            {
                header: {
                    config: {
                        h1: "Und auch wir benutzen Cookies :)"
                    },
                    parent: this
                }
            }
        ]

        this.root.app.create().then();
    }
}



export {HTMLCookieHeader};