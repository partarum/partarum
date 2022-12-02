import {Hex} from "/Partarum/Helper/Hex";
import {TopicCache} from "/Partarum/Cache/TopicCache";

class CacheStorage extends WeakMap {

    topicIDCache = new Map();

    initiatorIDCache = new Map();

    idInitiatorCache = new Map();

    initiatorIDs = Hex.createIndex();

    cacheObjects = {};

    hex = Hex.createIndex();

    constructor(){

        super();
    }

    setInitiator(name){

        //console.dir(name);

        if(!this.initiatorIDCache.has(name)){

            const ID = this.initiatorIDs.next(true);

            this.initiatorIDCache.set(name, ID);

            this.idInitiatorCache.set(ID, name);

            if(!(name in this.cacheObjects)){
                this.cacheObjects[name] = new TopicCache();
            }

            super.set(this.cacheObjects[name], this.initiatorIDCache.get(name));

        }

        return this.initiatorIDCache.get(name);
    }

    setTopic(topic, ID){

        //console.dir(topic);

        const NAME = this.idInitiatorCache.get(ID);

        this.cacheObjects[NAME].addTopic(topic);

        this.topicIDCache.set(ID, topic);

        return this.cacheObjects[NAME];
    }

    hasTopic(topic){

        return ((this.initiatorIDCache.has(topic)) || (this.idInitiatorCache.has(topic)));
    }

    getTopic(topic){

        return this.cacheObjects[topic];
    }

    setTheme(ID, topic, theme){

        //console.dir([ID, topic, theme]);

        const INITIATOR_NAME = this.idInitiatorCache.get(ID);

        return this.cacheObjects[INITIATOR_NAME].addTheme(topic, theme);
    }


    setToMap(topic, theme, mapKey, mapValue, methodMapName, ID){

        const INITIATOR_NAME = this.idInitiatorCache.get(ID);

        this.cacheObjects[INITIATOR_NAME].setToMap(topic, theme, mapKey, mapValue, methodMapName);
    }

    getFromMap(topic, theme, key, methodMapName, ID){

        const INITIATOR_NAME = this.idInitiatorCache.get(ID);

        return this.cacheObjects[INITIATOR_NAME].getFromMap(topic, theme, key, methodMapName)
    }

    hasIntoMap(topic, theme, methodMapName, key, ID){

        const INITIATOR_NAME = this.idInitiatorCache.get(ID);

        return this.cacheObjects[INITIATOR_NAME].hasIntoMap(topic, theme, methodMapName, key);
    }

    getAllFromMap(topic, theme, methodMapName, ID){

        const INITIATOR_NAME = this.idInitiatorCache.get(ID);

        return this.cacheObjects[INITIATOR_NAME].getAllFromMap(topic, theme, methodMapName)
    }

    addThemeMap(ID, topic, theme, mapName){

        const INITIATOR_NAME = this.idInitiatorCache.get(ID);

        this.cacheObjects[INITIATOR_NAME][topic].themeCache[theme].addThemeMap(mapName);
    }

    get(map){

        return super.get(map);
    
    }

    has(map){
        return super.has(map);
    }
}

export {CacheStorage};