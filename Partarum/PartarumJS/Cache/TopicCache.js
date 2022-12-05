// topicMap = map
// themeMap = map

class TopicCache {

    constructor() {

        this.addTopic("withoutTopic");

    }

    addTopic(topic){

        //console.dir(topic);

        this[topic] ??= new TopicObject(topic);
        this[topic].themeCache  ??= new ThemeCache();
    }

    hasTopic(topic){
        return this.hasOwnProperty(topic);
    }

    getTopic(){

    }

    removeTopic(){

    }

    addTheme(topic = "withoutTopic", theme){

        //console.dir(topic);
        //console.dir(this);
        //console.dir(this[topic]);

        if(!(theme in this[topic].themeCache)){

            this[topic].themeCache[theme] = new ThemeObject();

            return true;
        }

        return false;
    }

    getTheme(topic, theme){

        return this[topic].getTheme(theme);
    }

    hasTheme(){

    }

    removeTheme(){

    }


    addTopicMethode(topic, theme, mapName, methodeNameArray){


    }

    setToMap(topic, theme, key, value, mapName){    // Cookie, init,

        let map = this[topic].themeCache[theme][mapName];

        map.set(key, value);

        return this.hasIntoMap(topic, theme, mapName, key);
    }

    getFromMap(topic, theme, key, mapName){

        return (this.hasIntoMap(topic, theme, mapName, key)) ? this[topic].themeCache[theme][mapName].get(key) : null;
    }

    getAllFromMap(topic, theme, mapName){

        return this[topic].themeCache[theme][mapName];
    }

    hasIntoMap(topic,theme, mapName, key){

        return this[topic].themeCache[theme][mapName].has(key);
    }

    removeFromMap(name, key){

        return this.themeCache[name].delete(key);
    }
}

class ThemeCache {

    addTheme(theme){

    }

    getTheme(theme){

        return this[theme].entries();
    }

    getThemeMap(){

    }
}

class ThemeMap extends Map{

}

class ThemeObject {

    setMethod(methodName, callback){

        this[methodName] = callback;
    }

    addThemeMap(mapName){

        let mapArray = (Array.isArray(mapName)) ? mapName : [mapName];

        for(let name of mapArray) {

            this[name] = new Map();
        }
    }
}

class TopicObject {

    constructor(name){
        this.topicName = name;
    }

    addTheme(theme){

        this.themeCache ??= new ThemeCache();

        //if(Reflect.has(this.themeCache))

        this.themeCache.addTheme(theme);
    }

    getTheme(theme){

        return this.themeCache.getTheme(theme);
    }

    hasMap(){

    }

    removeMap(){

    }


}

export {TopicCache};