import {Partarum} from  "/PartarumJS";
import surface from "/surface/import";

let app = new Partarum();
app.themes = [
    {
        header: {
            config: surface.landingPage.header.container,
            parent: document.getElementById("header")
        }
    },
    {
        landingPage: {
            config: surface.landingPage.main.container,
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
app.create().then();