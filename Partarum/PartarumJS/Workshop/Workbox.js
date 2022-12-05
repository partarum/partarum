class Workbox{
    
    constructor(file, config = null){
        this.worker = new Worker(file, config);
    }
    
    getWorker(){
        return this.worker;
    }
}

export {Workbox};