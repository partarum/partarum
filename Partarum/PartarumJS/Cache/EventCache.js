/*
 *           Copyright 2020 © Alexander Bombis. All rights reserved.
 *           Developed by Alexander Bombis.
 *           Email: email@alexander-bombis.de
 *
 *           The following code was created based on the template for the website http://cordes-software.de.
 *           This may also be used in full by the person or business
 *           representing the domain "cordes-software.de"
 *           and also modified for their use.
 */
import {CacheBase} from "/Partarum/Cache/CacheBase";

class EventCache extends CacheBase {

    /*
        Partarum {
            EventCache: {
                topicCache: {
                    MediaBoxPicture: {
                        themeCache: {
                            MediaBoxPicture_mouseover: {
                                handlerCache: {

                                },
                                targetIdArray: []
                            },
                            MediaBoxPicture_mouseout: {
                                handlerCache: {

                                },
                                targetIdArray: []
                            }
                        }
                    }
                }
            }
        }
     */

    // https://mm.tt/map/2222516190?t=Yrl4HE0lqN

    static create(topicName, theme){

        super.create(topicName, theme);

        if(super.init() === false) {

            super.addCacheMethode("handlerCache", ["setHandler", "getHandler", "hasHandler", "removeHandler"]);

            super.addCacheMethode("targetIDCache", ["setTargetID", "getTargetID", "hasTargetID", "removeTargetID"]);

            super.init(true);
        }
    }

    static setEvent(name, callback){

        if(name instanceof Object) {

            let eventName = name.name ?? name.eventName;

            const {[eventName]: funk} = {
                [eventName]: (ev) => {
                    name.doThat(ev);
                }
            };

            let topic = name.topic;

            let theme = name.theme;

            this.setHandler(topic, theme, eventName, funk);

            this.setTargetID(topic, theme, eventName, name.targetID);

        } else {

            const {[name]: funk} = {
                [name]: (ev) => {
                    callback(ev);
                }
            };

            //this.setHandler("withoutTopic", theme, eventName, funk);
        }
    }

    static getEvent(topic, theme, eventName){

        return EventCache.getHandler(topic, theme, eventName);
    }

    static getID(name, topic){

        return EventCache.topicCache[topic].getTargetID(name);
    }

    static getThemeIDs(topic, theme){

        return EventCache.topicCache.getAllFromMap(topic, theme, "targetIDCache");
    }

    static removeEvent(name){

        delete EventCache.topicCache[topic]?.[name];
    }
}

export {EventCache};