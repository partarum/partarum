import {HTMLPartarumElement} from "/Partarum/PartarumJS/HTML/HTMLPartarumElement";

class HTMLCardBoxMenu extends HTMLPartarumElement {

    constructor(config, id, dom){
        super(config, "menu", dom, id);
    }

    connectedCallback(){

        super.connectedCallback();
    }


    add(element, topic){

        this.root.dom.add(topic, element, "append");
    }

    addTopic(topic, id, elementName = "button", cardBoxObject, position = "start") {

        //console.dir(topic);

        return new Promise((resolve) => {

            let topicArray = (Array.isArray(topic)) ? topic : [topic];

            let topicCounter = 0;

            this.root.dom.get("Listener").add("windowScroll", ()=>{this.setClickEvent(this);});

            window.addEventListener("scroll", this.root.dom.get("Listener").get("windowScroll"), {once: true});

            for(let topicName of topicArray){

                let topicNode = document.createElement(elementName);

                let buttonID = "button_" + id;

                topicNode.setAttribute("id", buttonID);

                topicNode.classList.add("product-category-button");

                let idNew = "productCategory_" + id;

                let loader = this.root.dom.get("Loader");

                loader.add(buttonID, idNew);

                let h3 = document.createElement("h3");

                h3.appendChild(document.createTextNode(topicName));

                topicNode.appendChild(h3);

                this.appendChild(topicNode);

                this.root.dom.add(buttonID, topicNode);

                topicCounter++;
            }

            resolve(true);
        });
    }

    setClickEvent(that){

        console.dir("click");

        let loadStatus = that.root.dom.get("Loader").get("Status");

        if(loadStatus === 0){

            let loadCache = that.root.dom.getAllOfTheme("CardBox", "Loader");

            let loadObject = Object.fromEntries(loadCache.entries());

            let loadCounter = 0;

            //console.dir(loadObject);

            for(let loadKey in loadObject){

                if(loadKey !== "Status"){

                    let groupBox = that.root.dom.get(loadObject[loadKey]);

                    //console.dir(loadKey);
                    //console.dir(groupBox);

                    let data = groupBox.data;

                    data.groupButton = loadKey;

                    let buttonNode = that.root.dom.get(loadKey);

                    buttonNode.addEventListener("click",(ev) => {

                        console.dir("clcik");

                        console.dir(ev);

                        that.displayCategory(groupBox);

                    });

                    (loadCounter === 0) && buttonNode.click();

                    loadCounter++;
                }
            }

            that.root.dom.get("Loader").add("Status", 1);

        } else {

            console.dir("is loaded");
        }
    }


    displayCategory(catBox) {

        // catBox ist das aktuelle Node, was vom Event mitgegeben wird

        console.dir(catBox);

        const topic = catBox.topic;

        const data = catBox.data;

        const catID  = topic.id;

        let cacheBox = this.root.dom.get("DisplayCategories").get(catID);

        let displayMenu = this.root.dom.get("DisplayMenu").get(catID);

        let nodeObject;

        let idArray = [];

        if(cacheBox === null) {

            idArray.push(catID);

            let categories = this.root.dom.getAllOfTheme("CardBox", "Categories");

            nodeObject = Object.fromEntries(categories.entries());

            let aktNode = nodeObject[catID];

            let aktNodeData = aktNode.data;

            let aktNodeType = aktNode.type;

            switch (aktNodeType) {

                case "WithSubCategories":

                    idArray.push(aktNodeData.subCategories[0]);

                    idArray.push(displayMenu.categoryMenu);

                    idArray.push(displayMenu.categoryCanvas);

                    break;
                case "SubCategories":

                    idArray.push(aktNodeData.category);

                    displayMenu = this.root.dom.get("DisplayMenu").get(aktNodeData.category);

                    idArray.push(displayMenu.categoryMenu);

                    idArray.push(displayMenu.categoryCanvas);
            }

            this.root.dom.get("DisplayCategories").add(catID, [nodeObject, idArray]);

        } else {

            nodeObject = cacheBox[0];

            idArray = cacheBox[1];
        }

        // ! canvas auf width testen !!

        //console.dir(this.root.dom);

        let cardDrawBox = this.root.dom.get("CardDrawBox");

        let canvas = this.root.dom.get(displayMenu?.categoryCanvas) ?? this.root.dom.get("canvas");

        let getList = this.root.dom.get("Listener").get("windowResize");

        //console.dir(getList);

        if(getList === null){

            this.root.dom.get("Listener").add("windowResize", ()=>{

                // ! 

                let width = this.root.dom.get(displayMenu?.categoryMenu)?.offsetWidth ?? this.root.dom.get("productGroupNav").offsetWidth;

                canvas.width = width.toString();

                this.root.dom.get("canvas").width = width;

                //console.dir(this.root.dom.getAllOfTheme("CardBox", "DisplayCategories"));

                for(let upCat of this.root.dom.getAllOfTheme("CardBox", "DisplayCategories").entries()){

                    cardDrawBox.plotter.clearBoard(canvas.id, "canvas");

                    cardDrawBox.plotter.update("setLine", upCat[0]);
                }


            });

            window.addEventListener("resize", this.root.dom.get("Listener").get("windowResize"), false);
        }

        for(let groupObject in nodeObject){

            let group = nodeObject[groupObject].topic;

            if(idArray.includes(group.id) === false){

                if(group.classList.length !== 0){

                    if(group.classList.contains("grid")){

                        group.classList.replace("grid", "zero");
                    }
                } else {

                    group.classList.add("zero");
                }

            } else {

                if (group.classList.length !== 0) {

                    if (group.classList.contains("zero")) {

                        group.classList.replace("zero", "grid");
                    }
                }
            }
        }

        canvas.classList.replace("zero", "inline");

        

        if(displayMenu === null){

            if("category" in data){

                let catCan = this.root.dom.get("DisplayMenu").get(data.category);

                cardDrawBox.plotter.clearBoard(catCan.categoryCanvas);

            } else {

                //console.dir(cardDrawBox);

                cardDrawBox.plotter.clearBoard("canvas");
            }
        } else {

            if("subCategories" in data){

                cardDrawBox.plotter.clearBoard(canvas.id, "canvas");
            } else {

                cardDrawBox.plotter.clearBoard(canvas.id);
            }
        }

        this.root.dom.get("LastDraw").clear();

        console.dir(cardDrawBox.plotter.isCollected("setLine", catID));

        if (cardDrawBox.plotter.isCollected("setLine", catID)) {

            /*
            let styleObject = cardDrawBox.plotter.elementStyleCache[data.groupButton];


            for (let attr in styleObject) {
                groupButton.style[attr] = styleObject[attr];
            }


             */


            if(canvas.width === 0){
               
                canvas.width = this.root.dom.get(displayMenu.categoryMenu).offsetWidth;
            }

            cardDrawBox.plotter.update("setLine", catID);

        } else {

            let childBox = catBox.themes;

            if(Object.keys(childBox).length !== 0){

                this.root.dom.get("LastDraw").add(catID, "");

                for (let child in childBox) {

                    //console.dir(child);

                    // canvas as node, groupName, groupButton | startNode as Node, groupChild | goalNode as Node

                    // TODO: zu setNodes umbauen

                    cardDrawBox.setLines(canvas, catID, this.root.dom.get(data.groupButton), childBox[child].theme);
                }

            } else {

                // Button to Button line !!!

                this.root.dom.get("LastDraw").add(catID);

                for(let sub of data.subCategories){

                    let subObject = this.root.dom.get(sub);

                    // ! canvas stimmt noch nicht - muss in dem Fall das vom Elternelement sein - ist jetzt erstmal auf #canvas gesetzt

                    // ! das Display muss noch zu den erlaubten gestzt werden, damit es bleibt, wenn zwischen den Subs geschalten wird !

                    cardDrawBox.setLines(this.root.dom.get("canvas"), catID, this.root.dom.get(data.groupButton), this.root.dom.get(subObject.data.groupButton));

                }

                let firstChild = this.root.dom.get(data.subCategories[0]);

                this.root.dom.get("LastDraw").add(data.subCategories[0]);

                let subThemes = firstChild.themes;

                for(let subThemeCard in subThemes){

                    let themeNode = subThemes[subThemeCard].theme;

                    let subCanvas = this.root.dom.get(displayMenu.categoryCanvas);

                    cardDrawBox.setLines(subCanvas, data.subCategories[0], this.root.dom.get(firstChild.data.groupButton), themeNode);
                }
            }
        }
    }
}

export {HTMLCardBoxMenu};