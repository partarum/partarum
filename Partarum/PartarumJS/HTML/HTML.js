
class HTML {

    static counter = 0;

    static confirmLink(config) {
       
        const {href,confirm,title,options} = config;

        ["href", "confirm", "title", "options"].forEach((key)=>Reflect.deleteProperty(config, key));

        this.counter++;

        return {
            href: "javascript:void(0)",
            title: title || "Link",
            addEvent: {
                type: "click",
                topic: "ConfirmLink",
                theme: "confirmLink_click",
                name: "confirmLink_click_" + this.counter,
                targetID: "confirmLink_" + this.counter,
                doThat: (ev) => {

                    Partarum.Validation.confirmLink(confirm, href, options);
                }
            },
            ...config
        };
    }

    static getSafeElementById(id, timeout = 250){

        return new Promise((resolve) => {

            Partarum.HTML.getSafeElement("byID", id, timeout).then((element) => {

                resolve(element);
            });
        });
    }

    static getSafeElementByQueryString(queryString, timeout = 250) {

        return new Promise((resolve) => {

            Partarum.HTML.getSafeElement("byQuery", queryString, timeout).then((element) => {

                resolve(element);
            });
        });
    }

    static getSafeElement(type, needle, timeout = 250) {

        return new Promise((resolve, reject) => {

            console.dir(needle);

            let element = (type === "byID") ? document.getElementById(needle) : document.querySelector(needle);

            let intID;

            let counter = 0;

            let funcBreak = () => {

                if((element === null) && (counter < 1000)){

                    element = (type === "byID") ? document.getElementById(needle) : document.querySelector(needle);

                    if(element === null){

                        counter++;

                        funcBreak();

                    } else {

                        resolve(element);
                    }

                } else {

                    clearInterval(intID);
                    resolve(element);
                }
            };

            if(element === null){

                intID = setInterval(funcBreak, timeout);

            } else {

                resolve(element);
            }
        })
    }
}



export {HTML};