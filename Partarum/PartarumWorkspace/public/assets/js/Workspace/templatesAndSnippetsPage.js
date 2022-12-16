/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

import {Partarum} from  "/Partarum";
import surface from "/surface/import";

let app = new Partarum();
app.themes = [
    {
        header: {
            config: surface.partarumPage.header.container,
            parent: document.getElementById("header")
        }
    },
    {
        landingPage: {
            config: surface.partarumPage.main.container,
            parent: document.getElementById("content")
        }
    },
    {
        footer: {
            config: surface.landingPage.footer.container,
            parent: document.getElementById("footer")
        }
    }
];
app.create(()=>{
    // Hier kann ein Callback mitgegeben werden!
});