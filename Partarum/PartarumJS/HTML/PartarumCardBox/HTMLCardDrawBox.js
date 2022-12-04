import {Plot} from "/Partarum/Draw/Plot";

/*
        Was ist das - was habe ich mir bei der klasse gedacht?
 */

class HTMLCardDrawBox {

    root = {
        dom: {},
        app: new Partarum()
    };

    plotter = Partarum.Draw.Plotter

    constructor(config, name, dom, id) {

        this.root.dom = dom;

        this.root.config = config;

        this.root.name = name;

        this.root.id = (typeof id === "string") ? id.replace(" ", "_") : "";
    }

    createPlot(board, theme, nodes, clear = false){

        return new Promise((resolve) => {

            let plot = new Plot(board);

            plot.setTheme(theme);

            plot.setNodes(nodes).then(() => {

                resolve(plot);
            });

        });
    }
    // TODO: setLines zu createPlot umbauen
    setLines(canvas, cardTheme, startNode , goalNode, clear = false) {
        
        this.plotter.record(canvas,"setLine", cardTheme, goalNode.id, ()=>{

            let plot = new Plot(canvas);

            console.dir(plot.analyzerID);

            plot.setNodes(startNode, goalNode).then((data)=>{

                let ctx = data.ctx;

                console.dir(data.data.id);

                let board = data.data.board;
                let start = data.data.nodes[0];
                let goal = data.data.nodes[1];

                (clear !== false) && ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.strokeStyle = "#007F85";
                ctx.lineWidth = 3;

                ctx.beginPath();

                ctx.moveTo(start.nodeCTX.centerTop.x, 0);
                ctx.lineTo(goal.nodeCTX.centerTop.x, goal.nodeCTX.centerTop.y);

                ctx.stroke();


            });

        }).then(()=>{

            this.plotter.render("setLine", cardTheme);
        }).catch((error) => {

            console.dir(error);
            console.log("ERROR");
        });
    }
}

export {HTMLCardDrawBox};