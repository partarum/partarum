class Plotter {

    static root;

    static isInitialized = false;

    static createBoard(id, attr = {width: window.offsetWidth, height: window.offsetHeight}, type = "node"){

        return new Promise((resolve) => {

            if(this.isInitialized === false){

                let plotterCache = Partarum.Cache.PlotCache.create("PlotterCache", "Plotter");

                this.root = {

                    cache: plotterCache,

                    ctx: plotterCache.get("CTXCache"),

                    board: plotterCache.get("BoardCache"),

                    collection: plotterCache.get("CollectionCache"),

                    lastDraw: plotterCache.get("LastDraw")


                };

                this.isInitialized = true;
            }

            let board = document.createElement("canvas");

            board.setAttribute("id", id);

            board.setAttribute("width", attr.width);

            board.setAttribute("height", attr.height);


            this.root.board.add(id, board);

            this.root.ctx.add(this.root.board.get(id), new Map());

            this.root.ctx.get(this.root.board.get(id)).set("ctx", this.root.board.get(id).getContext("2d"));

            this.root.ctx.get(this.root.board.get(id)).set("id", id);

            resolve((type === "node") ? this.root.board.get(id) : this.root.ctx.get(this.root.board.get(id)).get("ctx"));

            resolve();
        });
    }


    static clearBoard(...idArray){

        for(let id of idArray){

            //console.dir(this.root.ctx.get(this.root.board.get(id)).get("ctx"));

            this.root.ctx.get(this.root.board.get(id)).get("ctx").clearRect(0, 0, this.root.board.get(id).width, this.root.board.get(id).height);
        }
    }

    static showPoint(left, top, color){

        let pointElement = document.createElement("div");

        pointElement.style.position = "absolute";

        pointElement.style.height = "5px";

        pointElement.style.width = "5px";

        pointElement.style.borderRadius = "50%";

        pointElement.style.background = color;

        pointElement.style.left = left + "px";

        pointElement.style.top = top + "px";

        document.body.appendChild(pointElement);
    }

    static render(name, group){

        for(let child of Object.keys(this.root.collection.get(name)[group])){

            //console.dir([name, group, child, this.root.collection.get(name)]);

            this.root.collection.get(name)[group][child]();
        }
    }

    static record2(plot){

        return new Promise((resolve)=> {

            
        });
    }

    // canvas, themeType, themeName === startPoint, goalPoint, callback
    static record(canvas, name, group, child, callback){

        return new Promise((resolve) => {

            let theme;

            if(this.root.collection.has(name) === false) {

                this.root.collection.add(name, new Map());

                theme = this.root.collection.get(name);

                theme.set("boards", new Map());

                theme.get("boards").set(this.root.ctx.get(canvas).get("id"), canvas);

                theme.set("endpoints", new Map());

            } else {

                theme = this.root.collection.get(name);
            }

            console.dir(group);

            if(this.root.collection.get(name).hasOwnProperty(group) === false){

                this.root.collection.get(name)[group] = {}; // ! Fatal - ist eigentlich eine Map !!!
            }

            console.dir(this.root.collection.get(name));

            this.root.collection.get(name)[group][child] = callback;

            this.root.lastDraw.add("name", name);
            this.root.lastDraw.add("group", group);

            resolve(true);
        });
    }

    static update(paramName = undefined, paramGroup = undefined){

        this.render(paramName || this.root.lastDraw.get("name"), paramGroup || this.root.lastDraw.get("group"));
    }

    static isCollected(name, group){

        return ((this.root.collection.has(name)) && (this.root.collection.get(name).hasOwnProperty(group)));
    }


}

export {Plotter};