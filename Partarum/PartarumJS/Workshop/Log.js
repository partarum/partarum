import {CacheBase} from "/Partarum/Cache/CacheBase";

const HEX_START = 0x000000;

const HEX_ADD = 0x000001;

class Log extends CacheBase {

    static timeline = {};

    static lastHex = 0x000001;


    static create(topic, theme){

        super.create(topic, theme);

        if(super.init() === false) {

            super.addCacheMethode("LogCache", ["setLog", "getLog", "hasLog", "removeLog"]);

            super.init(true);
        }

        return {
            caller: this,
            topic: topic,
            theme: theme,
            add: (value)=>{

                console.dir("call Log over Object.add()");

                this.add(topic, theme, value);
            }
        };
    }

    static add(topic, theme, value){

        const MOMENT = performance.now().toString();

        let key = "0x" + this.lastHex.toString(16).padStart(6, "0");

        this.timeline[key] = {
            time: MOMENT,
            topic: topic,
            theme: theme,
            message: value
        };

        this.setLog(topic, theme, MOMENT, value);

        let num = this.lastHex + 0x000001;

        let next = "0x" + num.toString(16).padStart(6, "0");

        this.lastHex = parseInt(next, 16);
    }

    static view(){

        console.table(this.timeline);
    }
}

export {Log};