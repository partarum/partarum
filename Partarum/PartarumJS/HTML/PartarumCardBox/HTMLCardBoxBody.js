import {HTMLPartarumElement} from "/Partarum/HTML/PartarumElement";
import {HTMLCardBoxHeader} from "/Partarum/HTML/CardBoxHeader";
import {HTMLCardBoxMenu} from "/Partarum/HTML/CardBoxMenu";
import {HTMLCardTopicBody} from "/Partarum/HTML/CardTopicBody";
import {HTMLCardBoxObject} from "/Partarum/HTML/CardBoxObject";


customElements.define("partarum-card-box-header", HTMLCardBoxHeader);
customElements.define("partarum-card-box-menu", HTMLCardBoxMenu);
customElements.define("partarum-card-topic-body", HTMLCardTopicBody);

class HTMLCardBoxBody extends HTMLPartarumElement {

    constructor(config, name, dom){

        super(config, name, dom, "partarumCardBoxBody");
    }

    connectedCallback(){

        super.connectedCallback();

        this.analyseConfig().then(()=>{

            //console.table(this.cardBoxObject);

            this.loadElements().then();
        });

    }

    analyseConfig(){

        return new Promise((resolve, reject) => {

            if(("topic" in this.root.config) && ("surface" in this.root.config)){

                this.cardBoxObject = new HTMLCardBoxObject(this.root.config);

                this.cardBoxObject.checkStatus().then(() => {

                    //let surface = this.root.config.surface;

                    resolve(true);
                });

                this.root.dom.add("CardBoxObject", this.cardBoxObject);

            } else {

                reject();
            }

        });
    }

    async loadElements(){

        let theme = this.root.config?.theme ?? "classic";

        switch(theme){

            case "classic": 

                await this.setHeader();
                await this.setStartMenu();
                await this.setSubMenu();
                await this.setTopicBody();

                break;
            case "noDraw":

                await this.setHeader();
                await this.setStartMenu(false);
                await this.setSubMenu(false);
                await this.setTopicBody();

        }

        
    }

    setHeader(){

        return new Promise((resolve)=>{

            this.root.dom.add("CardBoxHeader", new HTMLCardBoxHeader(this.root.config, "card-box-menu", this.root.dom), null);
            this.appendChild(this.root.dom.get("CardBoxHeader"));

            resolve(true);
        });

    }

    setStartMenu(draw = true){

        return new Promise((resolve)=>{

            let ar = this.cardBoxObject.startMenu;

            this.setMenu("productGroupNav", this.root.config, "productGroupNav").then(() => {

                for(let [id, name] of ar){

                    this.root.dom.get("productGroupNav").addTopic(name, id, "button", this.root);
                }

                (draw === true) && this.setCanvas("canvas", this.root.dom.get("productGroupNav")).then(() => {

                    resolve(true);
                });


            });
        });
    }

    setSubMenu(draw = true){

        return new Promise((resolve)=>{

            // ! Hier das Submenu + Canvas setzen !

            let cardSubBoxes = this.cardBoxObject.subBoxes;

            let boxCounter = 0;

            let displayMenu = this.root.dom.get("DisplayMenu");

            let categories = this.root.dom.get("Categories");

            for(let [parentID, subBox] of this.cardBoxObject.subBoxes){

                let menuID = "categoryMenu_" + parentID;

                let canvasID = "categoryCanvas_" + parentID;

                displayMenu.add("productCategory_" + parentID, {
                   "categoryMenu": menuID,
                   "categoryCanvas": canvasID
                });

                let menuObject = {};

                let canvasObject = {};

                let startMenu = subBox.startMenu;

                let menuCounter = 0;

                this.setMenu(menuID, subBox.config, menuID).then(() => {

                    for (let [id, name] of startMenu) {

                        let menu = this.root.dom.get(menuID);

                        menu.addTopic(name, id, "button", this.root).then(() => {

                            menuCounter++;

                            menuObject.topic = menu;

                            if((boxCounter === cardSubBoxes.size) && (menuCounter === startMenu.size)){

                                (draw === true) && this.setCanvas(canvasID, this.root.dom.get(menuID), false).then(() => {

                                    canvasObject.topic = this.root.dom.get(canvasID);

                                    categories.add(canvasID, canvasObject);

                                    categories.add(menuID, menuObject);

                                    menu.classList.add("zero");

                                    resolve(true);

                                });
                            }
                        });
                    }
                });

                boxCounter++;
            }
        });
    }

    setMenu(menuType, config, id){

        return new Promise((resolve) => {

            this.root.dom.add(menuType, new HTMLCardBoxMenu(config, id, this.root.dom), null);

            this.root.dom.add("CardBoxHeader", this.root.dom.get(menuType), "append");

            resolve(true);
        });
    }

    setCanvas(id = "canvas", menu, draw = true){

        return new Promise((resolve) => {

            Partarum.Draw.Plotter.createBoard(id, {width: menu.offsetWidth.toString(), height: "160"}).then((canvas) => {


                this.root.dom.add(canvas.id, canvas);

                (draw === false) && canvas.classList.add("zero");

                this.root.dom.get("DrawBoard").add(id, canvas);

                this.root.dom.add("CardBoxHeader", canvas, "append");

                resolve();
            });
        });
    }

    setTopicBody(){

        return new Promise((resolve) => {

            // create the box for topicboxes

            this.root.dom.add("CardTopicBody", new HTMLCardTopicBody(this.root.config, "card-topic-body", this.root.dom), null);
            this.appendChild(this.root.dom.get("CardTopicBody"));

            resolve(true);
        });
    }

    addTopicBox(){

        return new Promise((resolve) => {


            // create a CardTopicBox
        });

    }
}





export {HTMLCardBoxBody};