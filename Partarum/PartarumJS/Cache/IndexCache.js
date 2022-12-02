class IndexCache extends Map{

    constructor(topic){

        super();

        this.topic = topic;
        this.index = Partarum.Helper.Hex.createIndex();
    }

    set(value = true){

        let index = this.index.next();

        const ID = Partarum.Helper.Hex.getString(index);

        super.set(ID, value);

        return ID;
    }

    get(id){

        return this[id] ?? null;
    }

}

export {IndexCache};