/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

import {Partarum} from  "/PartarumJS";
import surface from "/Partarum/PartarumWorkspace/Surface/Import";

let app = new Partarum();




app.themes = [
    {
        header: {
            config: surface.landingPage.header.container,
            parent: document.getElementById("workspaceHeader")
        }
    },
    {
        aside: {
            config: surface.landingPage.aside.container,
            parent: document.getElementById("workspaceAside")
        }
    },
    {
        landingPage: {
            config: surface.landingPage.main.container,
            parent: document.getElementById("workspace")
        }
    }
];
app.create(()=>{


    console.dir("callback");

    let worker = app.addWorkbox("test", "Partarum/PartarumWorkspace/TestWorker");

    console.dir(worker);

    worker.name = "WebSocket";

    worker.postMessage("Hallo");

    worker.onMessage = (m) => {

        console.dir(m);
    }

}).then((dom) => {

    /*
    globalThis.zoomPoint = 1;

    let test = Partarum.getWorker("test");
    
    test.postMessage("anderer Scope");

     */

});
