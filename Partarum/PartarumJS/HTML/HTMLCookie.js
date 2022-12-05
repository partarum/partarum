import {HTMLPartarumHost} from "/Partarum/HTML/PartarumHost";
import {HTMLCookieBanner} from "/Partarum/HTML/CookieBanner";

customElements.define("partarum-cookie-banner", HTMLCookieBanner);

class HTMLCookie extends HTMLPartarumHost{

    constructor(config){

        const LOG = Partarum.Log.create("HTMLCookie", "construct");

        LOG.add("HTMLCookie", "construct", "start");


        super(config, "partarum-cookie");

        this.root.status = {
            cookieBanner: false,
            cookiesActivated: false,
            cookiesAccepted: false,
            cookiesInUse: false
        }

        Partarum.System.Cookie.init().then((result)=>{

            Partarum.Log.add("HTMLCookie", "construct", "after Cookie.init()");

            const COOKIE_TEST = result;

            const COOKIE_STATUS_ACTIVATED = COOKIE_TEST.status;

            const COOKIE_STATUS_ACCEPTED = COOKIE_TEST.accepted;

            const COOKIE_STATUS_INUSE = COOKIE_TEST.inUse;

            this.root.status.cookiesActivated = COOKIE_STATUS_ACTIVATED;

            this.root.status.cookiesAccepted = COOKIE_STATUS_ACCEPTED;

            this.root.status.cookiesInUse = COOKIE_STATUS_INUSE;

            if(COOKIE_STATUS_ACTIVATED === true) {

                Partarum.Log.add("HTMLCookie", "construct", "activated === true");

                this.id = "partarumCookie";

                this.loadStyle({

                    link: "/Partarum/PartarumCSS/PartarumElements/cookieBanner.css",
                    style: document.querySelectorAll('style[id*="fa"]')

                }).then(() => {

                    this.root.app.themes = [
                        {
                            header: {
                                config: {
                                    i: {
                                        _attributes: {
                                            id: "partarumCookieIcon",
                                            class: "fa-duotone fa-cookie-bite fa-flip fa-3dicon",
                                            style: (this.closest("#partarumBottomBarBody") !== null) ? `
                                                position: unset;
                                                bottom: unset;
                                                left: unset;
                                            ` : "",
                                            addEvent: {
                                                type: "click",
                                                topic: "CookieBanner",
                                                theme: "CookieIcon",
                                                name: "CookieIcon_click",
                                                targetID: "cookieIcon",
                                                bubble: true,
                                                doThat: (ev) => {

                                                    console.dir("CookieIcon - clicked");

                                                    console.dir(this.root.dom.get("CookieBanner"));

                                                    this.root.dom.get("CookieBanner").classList.toggle("zero");

                                                }
                                            }
                                        }
                                    }
                                },
                                parent: this.root.dom.get("shadowBox")
                            }
                        }
                    ];

                    this.root.app.create(() => {

                    }).then(() => {

                        this.setCookieBanner(config).then(() => {

                            (COOKIE_STATUS_ACCEPTED === true) && Partarum.System.Cookie.toAgree(config, true);

                        });
                    });

                });
            }
        }).then(()=>{

        });
    }

    async setCookieBanner(config){

        const LOG = Partarum.Log.create("HTMLCookie", "setCookieBanner");

        LOG.add("HTMLCookie", "setCookieBanner", "start");

        await this.loadCookieElement(config);
    }

    loadCookieElement(config){

        return new Promise((resolve)=>{

            this.root.dom.add("CookieBanner", new HTMLCookieBanner(config, this.root.dom), null);

            if(this.root.status.cookiesAccepted === true) {

                this.root.dom.get("CookieBanner").classList.toggle("zero");
            }

            this.root.dom.add("shadowBox", this.root.dom.get("CookieBanner"), "append");

            resolve(true);
        });

    }
}

customElements.define("partarum-cookie", HTMLCookie);

export {HTMLCookie};