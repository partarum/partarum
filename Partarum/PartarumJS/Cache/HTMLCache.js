import {CacheBase} from "/Partarum/Cache/CacheBase";

/*
    Beispiel:

            topic: partarum-host
            theme: partarum-card-box
            key: shadowRoot
            value: root.dom.shadowRoot

            topic: partarum-host
            theme: partarum-card-box
            key: startMenu
            value:

 */


class HTMLCache extends CacheBase {

    static create(topic, theme){

        super.create(topic, theme);

        if(super.init() === false) {

            super.addCacheMethode("NodeCache", ["setNode", "getNode", "hasNode", "removeNode"]);

            super.init(true);
        }

        return {
            caller: this,
            topic: topic,
            theme: theme,
            add: (key, value, position = null) => {

                Partarum.Cache.HTMLCache.add(topic, theme, key, value, position);
            },
            get: (key, promise = false) => {

                return (promise === false) ? this.getNode(topic, theme, key) : new Promise((resolve) => {

                    let res = this.getNode(topic, theme, key);

                    let val = setInterval(() => {

                        if(res !== null){

                            resolve(res);

                            clearInterval(val);
                        } else {

                            //console.dir(res);
                        }
                    }, 200);
                });
            },
            create: (topic, theme) => {

                return HTMLCache.create(topic, theme);
            },
            getAllOfTheme: (topic, theme) => {

                return this.getAll(topic, theme, "NodeCache");
            },
            has: (key) => {

                return this.hasNode(topic, theme, key);
            }
        }
    }

    static add(topic, theme, key, value, position = null){

        // ! appendChild, after, before, null

        if(this.hasNode(topic, theme, key)){

            let node = this.getNode(topic, theme, key);

            if((typeof node !== "number" ) && (typeof node !== "string")){

                switch(position){

                    case "append":

                        node.appendChild(value);

                        break;
                    case "after":

                        break;
                    case "before":
                }
            } else {

                this.setNode(topic, theme, key, value);
            }

        } else {

            this.setNode(topic, theme, key, value);
        }
    }
}

export {HTMLCache};