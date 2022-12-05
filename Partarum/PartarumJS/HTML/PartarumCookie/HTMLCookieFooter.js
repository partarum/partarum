import {HTMLPartarumElement} from "/Partarum/HTML/PartarumElement";

class HTMLCookieFooter extends HTMLPartarumElement {

    constructor(config, name, dom){
        super(config, "footer");

        this.root.dom = dom;

        this.className = "media-box-row";

        let sessionCookieStatus = window.sessionStorage.getItem("cookies_accepted");

        const COOKIES_ACCEPTED = (!((sessionCookieStatus === null) || (sessionCookieStatus === false)));

        this.root.app.themes = [
            {
                footer: {
                    config: {
                        section_left: {
                            _attributes: {
                                class: "media-box-row"
                            },
                            button_config: {
                                _attributes: {
                                    text: "Cookie-Einstellungen"
                                }
                            }
                        },
                        section_right: {
                            _attributes: {
                                class: "media-box-row"
                            },
                            button_essential: {
                                _attributes: {
                                    type: "button",
                                    id: "cookieDisable",
                                    text: "Nicht akzeptieren",
                                    addEvent: {
                                        type: "click",
                                        topic: "CookieBanner",
                                        theme: "disableCookie",
                                        name: "disableCookie_click",
                                        doThat: ()=> {

                                            config.cookies.disable.doThat();

                                            this.root.dom.get("CookieBanner").classList.toggle("zero");
                                        }
                                    }
                                }
                            },
                            button_all: {
                                _attributes: {
                                    type: "button",
                                    id: "cookieActive",
                                    text: (COOKIES_ACCEPTED === false) ? "Alle akzeptieren" : "Schließen",
                                    addEvent: {
                                        type: "click",
                                        topic: "CookieBanner",
                                        theme: "activeCookie",
                                        name: "activeCookie_click",
                                        targetID: "cookieActive",
                                        doThat: (e)=>{

                                            if(Partarum.System.Cookie.accepted === false){

                                                this.setCookies(config, "active", e);

                                            }

                                            this.root.dom.get("CookieBanner").classList.toggle("zero");

                                        }
                                    }
                                }
                            }
                        }
                    },
                    parent: this
                }
            }
        ];

        this.root.app.create().then();
    }

    // ! den Inhalt der Funktion später noch auslagern !!!

    setCookies(config, action, e){

        Partarum.System.Cookie.init().then((cookieTest)=>{

            if(cookieTest.status === true) {

                switch (action) {

                    case "active":

                        Partarum.System.Cookie.toAgree(config).then(()=>{

                            this.root.dom.get("shadowBox").getElementById("cookieActive").innerText = "Schließen";
                        });

                        break;
                    case "disable":

                }
            }
        });
    }
}

export {HTMLCookieFooter};