import {CacheBase} from "/Partarum/Cache/CacheBase";

class WorkingCache extends CacheBase {

    static create(topic, theme){

        super.create(topic, theme);

        /*
        if(super.init() === false) {

            super.addCacheMethode("LogCache", ["setLog", "getLog", "hasLog", "removeLog"]);

            super.init(true);
        }

         */
    }

    static setStationLoadPageLoadCounter(){

        WorkingCache.loadCounter ??= 0;
        WorkingCache.loadCounter++;
    }
}

export {WorkingCache};