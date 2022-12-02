class ValidObject {

    testObject;

    isValid(props, needle){
        return props.every((prop)=> {return ((this[prop] !== needle) && (this[prop] !== undefined))});
    }

    merge(ob){

        for(let prop in ob){
            if(ob.hasOwnProperty(prop)) {
                this[prop] = ob[prop];
            }
        }
    }
}

export {ValidObject};