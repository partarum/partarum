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


class PlotCache extends CacheBase {

    static create(topic, theme){

        console.dir(topic);
        console.dir(theme);

        super.create(topic, theme);

        if(super.init() === false) {

            super.addCacheMethode("CTXCache", ["setCTX", "getCTX", "hasCTX", "removeCTX"]);
            super.addCacheMethode("BoardCache", ["setBoard", "getBoard", "hasBoard", "removeBoard"]);
            super.addCacheMethode("CollectionCache", ["setCollection", "getCollection", "hasCollection", "removeCollection"]);
            super.addCacheMethode("LastDraw", ["setLastDraw", "getLastDraw", "hasLastDraw", "removeLastDraw"]);

            super.init(true);
        }


        return {
            caller: this,
            topic: topic,
            theme: theme,
            add: (key, value, position = null) => {

                PlotCache.add(topic, theme, key, value, position);
            },
            get: (mapName) => {

                let baseObject = {
                    caller: this,
                    topic: topic,
                    theme: theme,
                };

                let reObject;

                switch(mapName) {

                    case "CTXCache":

                        reObject = {
                            add: (...arg) => {

                                return this.setCTX(topic, theme, ...arg);
                            },
                            get: (...arg) => {

                                return this.getCTX(topic, theme, ...arg);
                            },
                            has: () => {

                                return this.hasCTX();
                            },
                            remove: () => {

                                return this.removeCTX();
                            },
                            ...baseObject
                        }
                        break;

                    case "BoardCache":

                        reObject = {
                            add: (...arg) => {

                                return this.setBoard(topic, theme, ...arg);
                            },
                            get: (...arg) => {

                                return this.getBoard(topic, theme, ...arg);
                            },
                            has: () => {

                                return this.hasBoard();
                            },
                            remove: () => {

                                return this.removeBoard();
                            },
                            ...baseObject
                        }
                        break;

                    case "CollectionCache":

                        reObject = {
                            add: (...arg) => {

                                return this.setCollection(topic, theme, ...arg);
                            },
                            get: (...arg) => {

                                return this.getCollection(topic, theme, ...arg);
                            },
                            has: (...arg) => {

                                return this.hasCollection(topic, theme, ...arg);
                            },
                            remove: () => {

                                return this.removeCollection();
                            },
                            ...baseObject
                        }
                        break;

                    case "LastDraw":

                        reObject = {
                            add: (...arg) => {

                                return this.setLastDraw(topic, theme, ...arg);
                            },
                            get: () => {

                                return this.getLastDraw();
                            },
                            has: () => {

                                return this.hasLastDraw();
                            },
                            remove: () => {

                                return this.removeLastDraw();
                            },
                            ...baseObject
                        }
                }

                return reObject;
            },
            create: (topic, theme) => {

                return PlotCache.create(topic, theme);
            },
            getAllOfTheme: (topic, theme) => {

                return this.getAll(topic, theme, "NodeCache");
            },
            has: (key) => {

                return this.hasNode(topic, theme, key);
            }
        }
    }

    add(){

    }

    get(){

    }

    has(){

    }

    remove(){

    }
}

export {PlotCache};