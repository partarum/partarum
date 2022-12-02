class PartarumCache {

    static start(){
        /*
                Jeder Partarum - Prozess muss geprüft werden, ob der vorherige schon fertig ist !!!!
                Ansonsten kommt es zu fehlerhaften DOM - Aufstellungen!!!
         */

        PartarumCache.status ??= 0;

        if(PartarumCache.status !== 1){
            PartarumCache.status = 1;
        }
    }

    static setCallback(c){

        PartarumCache.callback ??= [];
        PartarumCache.callback.push(c);
    }

    static getCallback(){
        return PartarumCache.callback;
    }

    static setRound(){

        if(!PartarumCache.roundCounter){

            PartarumCache.roundCounter = 1;
        } else {

            PartarumCache.roundCounter++;
        }
    }

    static getRound(){

        return PartarumCache.roundCounter;
    }

    static setStatus(num){
        PartarumCache.status = num;

        if(PartarumCache.status === 1){
            while(PartarumCache.status === 1){
                console.log("status = 1");
            }
        }
    }

    static setSurfacePaths(pathObject){
        PartarumCache.surfacePaths = pathObject;
    }


    static setTemplates(obj){
        PartarumCache.templates = obj;
    }

    static getTemplate(temp){
        return PartarumCache.templates[temp];
    }

    static setTemplatePath(templateName, templatePath){


        PartarumCache.templatePaths ??= [];
        PartarumCache.templatePaths[templateName] = templatePath;
    }

    static isTemplate(option){
        PartarumCache.template = option === true;
    }
}

export {PartarumCache};