import {HTMLPartarumElement} from "/Partarum/PartarumJS/HTML/HTMLPartarumElement";

class HTMLCardThemeBox extends HTMLPartarumElement {

    constructor(config, dom, id, cardBoxObject){
        super(config, "section", dom, id);

        this.root.cardBoxObject = cardBoxObject;
    }

    connectedCallback(){

        super.connectedCallback();

        this.id = this.root.id;

        this.root.title = this.root.cardBoxObject.title;

        this.root.topicDOM = this.root.dom.get(this.root.cardBoxObject.parent);

        this.root.themeDOM = Reflect.get(this.root.topicDOM.themes, this.root.cardBoxObject.id);

        this.root.mainInfoObject = this.root.cardBoxObject.mainInfo ?? null;

        this.root.featureObject = this.root.cardBoxObject.features ?? null;

        this.loadElements().then();
    }

    async loadElements(){

        await this.setSlogan();

        if(this.root.mainInfoObject !== null) {

            await this.setMainInfo();
            await this.setLifetime(this.root.mainInfoObject.lifetime);
            await this.setPrice(this.root.mainInfoObject.price);
            await this.setLinkPage(this.root.mainInfoObject.link);
        }

        if(this.root.featureObject !== null){

            await this.setFeatures(this.root.featureObject);
        }

    }

    setSlogan(){

        return new Promise((resolve)=>{

            let sloganBox = document.createElement("header");

            let sloganText = document.createElement("h3");

            sloganText.appendChild(document.createTextNode(this.root.cardBoxObject.title));

            sloganBox.appendChild(sloganText);

            this.appendChild(sloganBox);

            resolve();
        });


    }

    setMainInfo(){

        return new Promise((resolve)=>{

            this.root.themeDOM.mainInfo = document.createElement("section");
            this.appendChild(this.root.themeDOM.mainInfo);

            resolve();
        });
    }

    setLifetime(lifetimeText){

        return new Promise((resolve)=>{

            let lifetime = document.createElement("section");
            lifetime.classList.add("box-row", "box-center");

            let lifetimeArray = (Array.isArray(lifetimeText)) ? lifetimeText : [lifetimeText];

            for(let key in lifetimeArray){

                let p = document.createElement("p");

                let text = document.createTextNode(lifetimeArray[key]);

                p.appendChild(text);

                lifetime.appendChild(p);
            }

            this.root.themeDOM.mainInfo.appendChild(lifetime);

            resolve();
        })
    }

    setPrice(priceObject){

        return new Promise((resolve)=>{

            let price = document.createElement("section");

            price.classList.add("partarum-card-theme-price");

            let amount = document.createElement("p");

            amount.appendChild(document.createTextNode(priceObject.amount));

            price.appendChild(amount);

            let period = document.createElement("p");

            period.appendChild(document.createTextNode(priceObject.period));

            price.appendChild(period);

            this.root.themeDOM.mainInfo.appendChild(price);

            resolve();
        })
    }

    setLinkPage(linkObject){

        return new Promise((resolve)=>{

            let linkPage = document.createElement("section");

            let link = document.createElement("a");

            link.setAttribute("href", linkObject.href);

            link.classList.add("beauty-button-link");

            let textNode = document.createTextNode(linkObject.text ?? "Jetzt Registrieren");

            link.appendChild(textNode);

            if("icon" in linkObject){

                let icon = document.createElement("i");

                if("class" in linkObject.icon){

                    for(let classItem of linkObject.icon.class.split(" ")){

                        icon.classList.add(classItem);
                    }
                }

                if("position" in linkObject.icon){

                    let position = "before";

                    if(linkObject.icon.position === "before"){

                        textNode.before(icon);

                    } else {

                        textNode.after(icon);
                    }

                    icon.classList.add((position === "before") ? "icon-left" : "icon-right");
                }
            }

            linkPage.appendChild(link);

            this.root.themeDOM.mainInfo.appendChild(linkPage);

            resolve();
        })
    }

    setFeatures(featuresObject){

        return new Promise((resolve)=>{

            let features = document.createElement("footer");

            features.classList.add("text-setLeft", "partarum-card-theme-features");
            
            this.appendChild(features);

            for(let feature in featuresObject){

                let featureBox = document.createElement("section");

                featureBox.classList.add("partarum-card-theme-feature-box");

                features.appendChild(featureBox);

                this.setList(featuresObject[feature], featureBox).then();
            }

            resolve();
        });
    }

    setList(feature, featureBox){

        return new Promise((resolve) => {

            let header = document.createElement("header");

            header.className = "box-row center";

            let headerText = document.createTextNode(feature.title);

            header.appendChild(headerText);

            featureBox.appendChild(header);

            if("icon" in feature){

                let icon = document.createElement("i");
                
                icon.className = feature.icon.class;

                if("position" in feature.icon){

                    this.setIcon(icon, headerText, feature.icon.position, feature.icon.class);
                }
            }

            let section = document.createElement("section");

            featureBox.appendChild(section);

            let lastElement = [];

            let list = feature.list;

            for(let key in list){

                switch(key){

                    case "icon":

                        let icon = document.createElement("i");

                        this.setIcon(icon, lastElement.at(-1) ?? null, list.icon.position, list.icon.class);

                        lastElement.push(icon);

                        break;

                    default:

                        if(key.includes("text")){

                            lastElement.push(document.createElement("p"));

                            lastElement.at(-1).appendChild(document.createTextNode(list[key]));

                            section.appendChild(lastElement.at(-1));
                        }


                }
            }

            resolve();
        });
    }

    setIcon(iconNode, textNode, position, className){

        if(textNode !== null) {

            iconNode.className = className ?? "";

            switch(position){

                case "before":

                    textNode.before(iconNode);

                    iconNode.classList.add("icon-left");

                    break;

                case "after":

                    textNode.after(iconNode);

                    iconNode.classList.add("icon-right");

                    break;

                case "middle":

                    textNode.after(iconNode);

                    iconNode.classList.add("icon-left", "icon-right");

                    break;

                default:

                    textNode.before(iconNode);

                    iconNode.classList.add("icon-left");

                    break;
            }
        }
    }

}

export {HTMLCardThemeBox};