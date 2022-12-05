/*
 *           Copyright 2020 © Alexander Bombis. All rights reserved.
 *           Developed by Alexander Bombis.
 *           Email: email@alexander-bombis.de
 *
 *           The following code was created based on the template for the website http://cordes-software.de.
 *           This may also be used in full by the person or business
 *           representing the domain "cordes-software.de"
 *           and also modified for their use.
 */

import {ImportList} from "/Partarum/Import";

class Workshop {

    constructor() {

        if((!globalThis.Partarum) || (!Window.Partarum)){
            globalThis.Partarum = Partarum;
        }

        this.setClasses();
        this.loadStyle();
    }

    addToGlobal(a){
        for(let i of a){
            globalThis.Partarum[i] = i;
        }
    }

    setClasses(){
        for(let i in ImportList){
            if(ImportList.hasOwnProperty(i)) {
                globalThis.Partarum[i] = ImportList[i];
            }
        }
    }

    loadStyle(){

        let link = document.createElement("link");

        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", "https://partarum.download/module/css/partarum");

        document.getElementsByTagName("head")[0].appendChild(link);
    }
}

export {Workshop};