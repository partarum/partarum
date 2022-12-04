import {HTMLPartarumElement} from "/Partarum/HTML/PartarumElement";

class HTMLCardBoxHeader extends HTMLPartarumElement {

    constructor(config, id = null){
        super(config, "header");

        this.id = id || "";

        //this.className = "box-row box-center";
    }

    /*
        ! Hier die jeweiligen Menus und Canvas erstellen
     */

    addTopic(topic) {

        super.addTopic(topic, "button");
    }

    addMenu(){

    }

    addCanvas(){
        
    }
}

export {HTMLCardBoxHeader};