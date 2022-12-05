class Shapes {

    static setLine(startNode, goalNode, params = {}, debug = false){

        return new Promise((resolve) => {

            // jeder Formeckpunkt === vertex

            


            switch(params.start.moveTo){

                case "start":
                    startPoint = startLeft;
                    break;
                case "center":
                    startPoint = startLeft + startCenter;
                    break;
                case "end":
                    startPoint = startLeft + startWidth;
            }

            switch(params.goal.moveTo){

                case "start":
                    goalPoint = goalLeft;
                    break;
                case "center":
                    goalPoint = goalLeft + goalCenter;
                    break;
                case "end":
                    goalPoint = goalLeft + goalWidth;
            }

            startPoint = (params.start.plus !== undefined) ? (startPoint + params.start.plus) : ((params.start.minus !== undefined) ? (Number(startPoint) - Number(params.start.minus)) : startPoint);

            goalPoint = (params.goal.plus !== undefined) ? (goalPoint + params.goal.plus) : ((params.goal.minus !== undefined) ? (Number(goalPoint) - Number(params.goal.minus)) : goalPoint);

            this.startPoint = startPoint;

            this.goalPoint = goalPoint;

            this.goalPointLeft = goalLeft;

            this.goalPointRight = goalLeft + goalWidth;

            this.goalPointTop = this._canvas.height;


            if(debug === true) {

                this._canvas.style.background = "rgba(127, 255, 212, 0.19)";

                Plot.showPoint(canvasLeft, canvasTop, "red");

                Plot.showPoint(canvasTopRight, canvasTop, "red");

                Plot.showPoint(canvasTopRight, canvasBottomRight, "red");

                Plot.showPoint(canvasLeft, canvasBottomLeft, "red");

                Plot.showPoint(goalPoint + canvasLeft, this.goalPointTop + canvasTop, "pink");

                Plot.showPoint(startLeft + startCenter, canvasTop, "yellow");
            }

            resolve(this._canvas.getContext("2d"));

        });
    }
}

export {Shapes};