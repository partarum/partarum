import {PreloadCache} from "/Partarum/Cache/PreloadCache";

class HTMLPreload {

    constructor() {

        // als Promise gestalten !!!

        this.head = document.getElementsByTagName("head")[0];

        this.preloadClasses = PreloadCache.classes;



        /*
            <link rel="preload" crossorigin="anonymous" href="https://partarum.de/module/js/Plot" as="script">

            <script type="module" crossorigin="anonymous" src="https://partarum.de/module/js/Plot" ></script>
         */
    }

    setLinks(){

        for(let classes of Object.keys(this.preloadClasses)){

            //console.dir(classes);

            let link = document.createElement("link");
            link.setAttribute("rel", "modulepreload");
            link.setAttribute("href", this.preloadClasses[classes]);

            this.head.appendChild(link);
        }
    }

    static init(){

        return new Promise(resolve =>{

            let preload = new HTMLPreload();

            preload.setLinks();

            resolve(true);

        });
    }
}

export {HTMLPreload};