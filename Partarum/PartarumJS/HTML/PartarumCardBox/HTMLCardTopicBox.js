import {HTMLPartarumElement} from "/Partarum/PartarumJS/HTML/HTMLPartarumElement";
import {HTMLCardThemeBox} from "/Partarum/PartarumJS/HTML/PartarumCardBox/HTMLCardThemeBox";

customElements.define("partarum-card-theme-box", HTMLCardThemeBox);

class HTMLCardTopicBox extends HTMLPartarumElement {

    cardKey = 1;

    constructor(config, dom, id, cardBoxObject){
        super(config, "section", dom, id);

        this.root.cardBoxObject = cardBoxObject;
    }

    connectedCallback(){

        super.connectedCallback();

        this.id = this.root.id;

        let display = (("display" in this.root.cardBoxObject) && (this.root.cardBoxObject.display === true)) ? "grid" : "zero";

        this.classList.add(display, "grid-auto-column", "product-cards-box-shadow");

        this.loadElements().then();
    }

    async loadElements(){

        await this.setThemeBoxes();
    }

    setThemeBoxes(){

        return new Promise((resolve) => {

            for(let key in this.root.cardBoxObject){

                switch(key){

                    case "cards":

                        for(let cardKey in this.root.cardBoxObject.cards){

                            this.root.dom.get("Categories").add(this.id, this.root.dom.get(this.id));

                            let card = this.root.cardBoxObject.cards[cardKey];

                            this.addThemeBox(card, cardKey);

                            this.cardKey++;
                        }

                        break;
                    case "card":

                        this.addThemeBox(this.root.cardBoxObject.card);

                        this.cardKey++;

                        break;
                    case "subTopic":

                        // ! Menubuttons und Canvas noch mit hinzufügen

                        let withSubCategory = this.root.dom.get(this.id);

                        withSubCategory.type = "WithSubCategories";

                        withSubCategory.data = {
                            subCategories: []
                        };

                        this.root.dom.get("Categories").add(this.id, withSubCategory);

                        let subBox = this.root.cardBoxObject.subTopic;

                        let cbo = this.root.dom.get("CardBoxObject");

                        for(let [key, value] of cbo.subBoxes){

                            for(let [subKey, subValue] of value.startMenu){

                                let id = "productCategory_" + subKey;

                                this.root.dom.add( id, {
                                    themes: {},
                                    topic: new HTMLCardTopicBox(this.root.config, this.root.dom, id, subBox[subValue]),
                                    type: "SubCategories",
                                    data: {
                                        category: this.id
                                    }
                                });

                                withSubCategory.data.subCategories.push(id);

                                this.appendChild(this.root.dom.get(id).topic);
                            }
                        }
                }
            }

            resolve();
        });
    }

    addThemeBox(card, cardKey = this.cardKey){

        let cacheObject = this.root.dom.get(this.id).themes;

        card.parent = this.id;

        let title = card.title;

        let id = "productCard_" + title.replace(" ", "_") ?? cardKey + "_of_" + this.id;

        card.id = id;

        cacheObject[id] = {

            theme: new HTMLCardThemeBox(this.root.config, this.root.dom, id, card)
        };

        this.appendChild(cacheObject[id].theme);
    }

    addCanvas(){

        return new Promise((resolve) => {

            resolve();
        });
    }
}

export {HTMLCardTopicBox};