class ImportCache {

    static create(id){

        ImportCache.modulArray ??= {};
    }

    static setID(id){
        ImportCache.id = id;
    }

    static setModule(data){
        ImportCache.module = data;
    }

    static setCondition(){

        ImportCache.conditionObject ??= {};

        ImportCache.idCounter ??= 0;

        let id = "round_" + ImportCache.idCounter++;

        ImportCache.conditionObject[id] = [];

        return id;
    }
}

export {ImportCache};