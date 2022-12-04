import {Hex} from "/Partarum/Helper/Hex";

class DrawElementAnalyzer {

    static worker;

    static analyzerID;

    static promiseCache = {};

    static intCache = {};

    id;

    cache = new WeakMap();

    constructor(){

        DrawElementAnalyzer.analyzerID ??= Hex.createIndex();

        this.id = DrawElementAnalyzer.analyzerID.next(true);
    }

    getID(){
        return this.id;
    }

    init(board, nodes){

        // ! prüfen ob Daten schon vorhanden sind - macht nur Sinn an einem statischen Bild

        DrawElementAnalyzer.worker ??= new Worker("/Partarum/PartarumJS/Worker/DrawWorker/AnalyzeWorker");

        let boardObject = {
            width: board.offsetWidth ?? board.innerWidth,
            height: board.offsetHeight ?? board.innerHeight,
            top: board.offsetTop ?? 0,
            left: board.offsetLeft ?? 0
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

        DrawElementAnalyzer.worker.postMessage([boardObject, nodeMap, this.id]);

        // TODO: Die Promise benötigen einen Cache zur Identifizierung, damit resolve() auf jedes Promise ausgeführt wird

        DrawElementAnalyzer.intCache[this.id] = {};

        DrawElementAnalyzer.promiseCache[this.id] = {};

        DrawElementAnalyzer.promiseCache[this.id].promise = new Promise((resolve, reject) => {

            /*
                TODO: Der Worker muss gecacht werden oder statisch laufen

                - damit es nicht zu überschneidungen kommt,
                muss jede Message eine ID passenden zur Herkunft der Aufgabe mitbekommen
             */



            DrawElementAnalyzer.worker.onmessage = (data) => {

                DrawElementAnalyzer.promiseCache[data.data.id].data = data.data;

                console.dir(DrawElementAnalyzer.promiseCache);

                DrawElementAnalyzer.intCache[data.data.id].id = setInterval(DrawElementAnalyzer.intCache[data.data.id].fn, 200, data);

            };

            DrawElementAnalyzer.intCache[this.id].fn = (test) => {

                (this.id === test.data.id) && clearInterval(DrawElementAnalyzer.intCache[test.data.id].id);

                resolve(test.data);
            };
        });

        return(DrawElementAnalyzer.promiseCache[this.id].promise);
    }
}

export {DrawElementAnalyzer};