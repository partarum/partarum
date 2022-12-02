class Counter {

    constructor(theme){

        this.theme = Symbol(theme);

        Partarum.Cache.CounterCache.setTheme(this.theme);
    }
}

export {Counter};