class DOMCache {

    static create(){

        DOMCache.startCounter();
        DOMCache.setTemplateProp();
    }

    static startCounter(){

        DOMCache.counter ??= 0;
        DOMCache.roundCounter ??= {};
    }

    static setTemplateProp(item){

        DOMCache.templateProps ??= [];

        if(item !== undefined) {
            DOMCache.templateProps[item.name] = item.value;
        }
    }

    static zeroCounter(){

        DOMCache.zeroCount ??= 0;
        DOMCache.zeroCount++;
    }

    static getTemplateProp(item){
        return DOMCache.templateProps[item];
    }

    static getAllTemplateProps(){
        return DOMCache.templateProps;
    }
}

export {DOMCache};