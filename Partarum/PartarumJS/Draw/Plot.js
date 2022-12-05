import {DrawElementAnalyzer} from "/Partarum/Draw/DrawElementAnalyzer";
   // ! TODO-me Plot abändern !
/*
        board:
            id = canvasElement

        collection:

            - für jedes funktionale Thema  ein key => Map -> canvasID => Map ->

            Beispiel:
                        collection.set("setLine", new Map());
                        collection.get("setLine").set("boards", new Map())
                        collection.get("setLine").get("boards").set(startPoint, canvasID)
                        collection.get("setLine").set("endpoints", new Map())
                        collection.get("setLine").get("endpoints").set(startPoint, [..endPoints])

                        Was jetzt? Was ist wichtig und was benötigen wir?

                            Für jede ID ( der Startpunkt ) wird ein spezielles Schema gespeichert - als die Zielpunkte der Linie

        ctx: WeakMap

            - canvasElement = canvasCTX
 */

class Plot {

    theme;

    board;

    nodes = new DrawElementAnalyzer(); // das Board kann mit init() analysiert werden

    analyzerID;

    lineParams = {
        start: {
            moveTo: "start" | "center" | "end",
            plus: null,
            minus: null
        },
        goal: {
            moveTo: "start" | "center" | "end",
            plus: null,
            minus: null
        }
    };

    constructor(board, id = null) {

        /*
            TODO: checken ob es für die Konstellation schon einen Eintrag gibt
             - sofern mitgegeben, denn die eigentlichen Nodes kommen erst noch
         */

        this.analyzerID = id ?? this.nodes.getID();

        console.dir(this.analyzerID);

        this.board = (board instanceof HTMLCanvasElement) ? board : document.createElement("canvas");
    }

    /*
    ! später noch auf SVG ausweiten
       let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

       svg.setAttribute('viewBox','0 0 200 200');
       svg.setAttribute('width',pCards.offsetWidth.toString());
       svg.setAttribute('height','160');

       pCards.appendChild(svg);

        */


    setTheme(theme){

        this.theme = theme;
    }

    // das Board analysieren und die wichtigsten Eckpunkte für CTX bereitstellen - das was bis jetzt this.setLines() macht
    setNodes(...nodes){

        return new Promise((resolve, reject) => {

            this.nodes.init(this.board, (Array.isArray(nodes)) ? nodes : [nodes]).then((data) => {

                console.dir(Partarum.Cache.PlotCache.getCollection("PlotterCache", "Plotter", "setLine").entries());

                resolve({data: data, ctx: this.board.getContext("2d")});
            });


        });
    }

    setCanvasTo(element, position = "append" | "after" | "before" | "replace"){

        switch(position){

            case "append":
                element.appendChild(this.board);
                break;
            case "after":
                element.after(this.board);
                break;
            case "before":
                element.before(this.board);
                break;
            case "replace":
                element.replaceWith(this.board);

        }
    }
}

export {Plot};
