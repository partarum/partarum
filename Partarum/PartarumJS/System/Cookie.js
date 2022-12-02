class Cookie {

    static status = false;

    static inUse = false;

    static accepted = false;

    static Storage = new Map();

    static isInitialized = false;


    static init(statusInUse = false){

        Partarum.Log.create("Cookie", "init"); 

        Partarum.Log.add("Cookie", "init",  "start");

        if(this.isInitialized === false) {

            this.isInitialized = true;

            Partarum.Log.add("Cookie", "init", {initialized: false});

            return new Promise((async resolve => {

                Partarum.Log.add("Cookie", "init", "Promise");

                this.inUse = statusInUse;

                if (this.inUse === false) {

                    Partarum.Log.add("Cookie", "init", {inUse: false});

                    await this.check();
                    await this.getUserCookies();
                }

                await this.isAccepted().then(() => {

                    Partarum.Log.add("Cookie", "init", "after isAccepted()");

                    resolve({
                        inUse: this.inUse,
                        status: this.status,
                        accepted: this.accepted,
                        initialized: this.isInitialized
                    });
                });


            }));

        } else {

            Partarum.Log.add("Cookie", "init", {initialized: true});

            return Promise.resolve({
                inUse: this.inUse,
                status: this.status,
                accepted: this.accepted,
                log: this.Log,
                errorTest: new Error("testLog")
            });
        }
    }

    // ! zum Promis ausbauen !!!
    static toAgree(config, reload = false){

        Partarum.Log.create("Cookie", "toAgree");

        Partarum.Log.add("Cookie", "toAgree",  "start");

        return new Promise((resolve) => {

            Partarum.Log.add("Cookie", "toAgree", "Promise");

            if(this.status === true) {

                this.accepted = true;

                window.sessionStorage.setItem("cookies_accepted", "true");

                ((config) => {

                    let cookie = document.cookie;

                    return new Promise((resolve) => {

                        config.cookies.active.doThat();

                        resolve(cookie);
                    });

                })(config).then((cookieBefore) => {

                    if (cookieBefore === document.cookie) {

                        let intID = setInterval(isCookie, 100);

                        let counter = 0;

                        function isCookie() {

                            counter++;

                            if (document.cookie === cookieBefore) {

                                console.log(document.cookie);

                                ((counter === 200) || (reload === true)) && clearInterval(intID);

                                resolve(false);

                            } else {

                                console.log(document.cookie);
                                clearInterval(intID);

                                resolve(true);
                            }
                        }
                    }
                });
            }
        });
    }

    static toDisagree(){

        if(this.status === true) {

            this.accepted = false;

            window.sessionStorage.setItem("cookies_accepted", "false");
        }
    }

    static isAccepted() {

        Partarum.Log.create("Cookie", "isAccepted");

        return new Promise((resolve)=>{

            Partarum.Log.add("Cookie", "isAccepted", "Promise");

            let acceptedStatus = window.sessionStorage.getItem("cookies_accepted");

            if((acceptedStatus !== null) && (acceptedStatus === "true")){

                this.accepted = true;

                resolve(true);

            } else {


            }

            resolve(false);
        });

    }

    static add(){

    }

    static has(){

    }
    static get(){


    }

    static remove(){

    }

    static updateUserCookies(){


    }

    static getUserCookies(){

        Partarum.Log.create("Cookie", "getUserCookies");

        return new Promise((resolve) => {

            Partarum.Log.add("Cookie", "getUserCookies", "Promise");

            Partarum.Cache.SimpleCache.create("Cookies", "userCookies");

            let cookieArray = document.cookie.split(";");

            cookieArray.forEach((item) => {

                let cookie = item.split("=");

                if(cookie.length > 1) {

                    let cookieName = cookie[0].trim();

                    let cookieValue = cookie[1];

                    this.Storage.set(cookieName, cookieValue);

                    Partarum.Cache.SimpleCache.setItem("Cookies", "userCookies", cookieName, cookieValue);

                    this.inUse = true;
                }
            });

            Partarum.Cache.SimpleCache.setItemToTimeline("Cookies", "userCookies", performance.now().toString(), document.cookie);

            resolve(true);
        });
    }

    static check(){

        Partarum.Log.create("Cookie", "check");

        return new Promise((resolve) => {

            Partarum.Log.add("Cookie", "check", "Promise");

            this.status = (navigator.cookieEnabled === true) ?
                true : (
                    (navigator.cookieEnabled === false) ?
                        false : "hidden"
                );

            (this.status === true) && window.sessionStorage.setItem("cookies_activated", this.status.toString());

            resolve(this.status);
        });
    }
}

export {Cookie};