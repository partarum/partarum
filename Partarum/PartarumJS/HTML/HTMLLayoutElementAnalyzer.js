import {Hex} from "/Partarum/Helper/Hex";

class HTMLLayoutElementAnalyzer {

    static worker;

    static analyzerID;

    static promiseCache = {};

    static intCache = {};

    id;

    cache = new WeakMap();

    constructor(){

        HTMLLayoutElementAnalyzer.analyzerID ??= Hex.createIndex();

        this.id = HTMLLayoutElementAnalyzer.analyzerID.next(true);
    }

    getID(){
        return this.id;
    }

    init(base, nodes){

        // ! prüfen ob Daten schon vorhanden sind - macht nur Sinn an einem statischen Bild

        HTMLLayoutElementAnalyzer.worker ??= new Worker("/Partarum/PartarumJS/Worker/HTMLWorker/LayoutAnalyzeWorker");

        let baseObject = {
            width: base.offsetWidth ?? base.innerWidth,
            height: base.offsetHeight ?? base.innerHeight,
            top: base.offsetTop ?? 0,
            left: base.offsetLeft ?? 0
        };

        let nodeMap = [];

        for(let node of nodes){

            let nodeObject = {

                width: node.offsetWidth,
                height: node.offsetHeight,
                top: node.offsetTop,
                left: node.offsetLeft
            };

            this.cache.set(nodeObject, node);

            nodeMap.push(nodeObject);
        }


        HTMLLayoutElementAnalyzer.worker.postMessage([baseObject, nodeMap, this.id]);



        // TODO: Die Promise benötigen einen Cache zur Identifizierung, damit resolve() auf jedes Promise ausgeführt wird

        HTMLLayoutElementAnalyzer.intCache[this.id] = {};

        HTMLLayoutElementAnalyzer.promiseCache[this.id] = {};

        HTMLLayoutElementAnalyzer.promiseCache[this.id].promise = new Promise((resolve, reject) => {

            /*
                TODO: Der Worker muss gecacht werden oder statisch laufen

                - damit es nicht zu überschneidungen kommt,
                muss jede Message eine ID passenden zur Herkunft der Aufgabe mitbekommen
             */



            HTMLLayoutElementAnalyzer.worker.onmessage = (data) => {

                HTMLLayoutElementAnalyzer.promiseCache[data.data.id].data = data.data;

                HTMLLayoutElementAnalyzer.intCache[data.data.id].id = setInterval(HTMLLayoutElementAnalyzer.intCache[data.data.id].fn, 200, data);

            };

            HTMLLayoutElementAnalyzer.intCache[this.id].fn = (test) => {

                (this.id === test.data.id) && clearInterval(HTMLLayoutElementAnalyzer.intCache[test.data.id].id);

                resolve(test.data);
            };
        });

        return(HTMLLayoutElementAnalyzer.promiseCache[this.id].promise);
    }
}

export {HTMLLayoutElementAnalyzer};