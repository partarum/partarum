
class CacheBase {

    static init(status = false) {

        this.status = status;

        (status === true) && this.update();

        return this.status;
    }

    static update(){

        let topicKeys = this.newcomerTopicSet.values();

        for(let topic of topicKeys) {

            this.topicSet.add(topic);

            let themeKeys = this.newComerThemesMap.keys();

            for(let theme of themeKeys){

                this.themeMap.set(theme, topic);

                for(let mapName of this.themeMapNames){

                    Partarum.Cache.CacheStorage.addThemeMap(this.initiatorID, topic, theme, mapName);
                }
            }
        }

        this.status = false;

        this.newcomerTopicSet.clear();
        this.newComerThemesMap.clear();

    }


    static create(topic, theme){

        this.topicSet ??= new Set();

        this.themeMap ??= new Map();

        this.initiatorID = Partarum.Cache.CacheStorage.setInitiator(this.name);

        this.setTopic(topic);

        return this.setTheme(topic, theme);
    }

    static setTopic(topic){

        this.newcomerTopicSet ??= new Set();

        if(this.hasTopic(topic) === false){

            Partarum.Cache.CacheStorage.setTopic(topic, this.initiatorID);

            this.newcomerTopicSet.add(topic);

        } else {

            (this.topicSet.has(topic)) && this.newcomerTopicSet.add(topic);
        }

        return true;
    }

    static hasTopic(topic){

        return Partarum.Cache.CacheStorage.hasTopic(topic);
    }

    static setTheme(topic = "withoutTopic", theme){

        //console.dir([topic, theme, this.initiatorID]);

        this.newComerThemesMap ??= new Map();

        let res = Partarum.Cache.CacheStorage.setTheme(this.initiatorID, topic, theme);

        (res) && this.newComerThemesMap.set(theme, topic);

        return res;
    }

    static getTheme(topic, theme){

        return this.topicCache[topic].getTheme(theme);
    }

    static addCacheMethode(mapName, methodNamesArray){

        this.themeMapNames ??= [];

        if(!this.themeMapNames.includes(mapName)) {

            this.themeMapNames.push(mapName);
        }


        let methodTypes = ["set", "get", "has", "remove"];

        if(methodNamesArray.length === methodTypes.length) {

            for (let number in methodTypes) {

                let callbackObject = null;

                switch (methodTypes[number]) {

                    case "set":

                        callbackObject = {[methodNamesArray[number]]: (topic, theme, mapKey, mapValue) => {

                                let methodMapName = this[methodNamesArray[number]].mapName;

                                Partarum.Cache.CacheStorage.setToMap(topic, theme, mapKey, mapValue, methodMapName, this.initiatorID);
                            }
                        };

                        callbackObject[methodNamesArray[number]].mapName = mapName;

                        break;
                    case "get":

                        callbackObject = {[methodNamesArray[number]]: (topic, theme, key) => {

                                let methodMapName = this[methodNamesArray[number]].mapName;

                                return Partarum.Cache.CacheStorage.getFromMap(topic, theme, key, methodMapName, this.initiatorID);
                            }
                        };

                        callbackObject[methodNamesArray[number]].mapName = mapName;
                        break;
                    case "has":

                        callbackObject = {[methodNamesArray[number]]: (topic, theme, key) => {

                                let methodMapName = this[methodNamesArray[number]].mapName;

                                return Partarum.Cache.CacheStorage.hasIntoMap(topic, theme, methodMapName, key, this.initiatorID );
                            }
                        };

                        callbackObject[methodNamesArray[number]].mapName = mapName;

                        break;
                    case "remove":

                        // TODO: auf CacheStorage beziehen

                        callbackObject = {[methodNamesArray[number]]: () => {
                                return this.topicCache.removeFromMap();
                            }
                        };
                }

                /*
                const {[methodNamesArray[number]]: funk} = {
                    [methodNamesArray[number]]: (...arg) => {
                        callback(...arg);
                    }
                };

                 */

                const {[methodNamesArray[number]]: funk} = callbackObject;

                this[methodNamesArray[number]] = funk;
            }

            let callGetFomAll = {
               ["getAll"]: (topic, theme, mapName)=>{

                   return Partarum.Cache.CacheStorage.getAllFromMap(topic, theme, mapName, this.initiatorID);
               }
            };

            callGetFomAll["getAll"].mapName = mapName;

            const {["getAll"]: funkAll} = callGetFomAll;

            this["getAll"] = funkAll;
        }
    }
}

export {CacheBase};