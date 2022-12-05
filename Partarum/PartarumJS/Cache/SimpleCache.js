import {CacheBase} from "/Partarum/Cache/CacheBase";

class SimpleCache extends CacheBase {

    static create(topic, theme){

        super.create(topic, theme);

        if(super.init() === false) {

            super.addCacheMethode("ItemCache", ["setItem", "getItem", "hasItem", "removeItem"]);

            super.addCacheMethode("Timeline", ["setItemToTimeline", "getItemFromTimeline", "hasItemFromTimeline", "removeItemFromTimeline"]);

            super.init(true);
        }
    }

}

export {SimpleCache};