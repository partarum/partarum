import {MediaBoxEvent} from "/Partarum/Events/MediaBoxEvent";
import {PictureMenu} from "/Partarum/Design/Barrier/Picture/PictureMenu";

class MediaBox {

    constructor(config) {

        console.dir(config);

        this.boxConfig = config.boxConfig || null;

        if(this.boxConfig.template.PartarumTemplate) {

            // config.boxValues sind TemplateValues !!!!

            let template = this.boxConfig.template.PartarumTemplate;

            this.id = template.id;

            this.templateClass = template.templateName;

            this.cc = this.templateClass.configCache[this.id];

            this.PartarumTemplate = true;
        }

        this.boxValues = config.boxValues;

        this.Event = new MediaBoxEvent();

        this.filterObject();
    }

    filterObject(){

        if(this.boxConfig) {

            this.templateName = (this.PartarumTemplate) ? this.templateClass.name : this.boxConfig.templateName;

            this.boxEvents = this.boxConfig.events || null;

            this.barrier = this.boxConfig.barrier || false;
        }

    }

    mainTemplate(){

        return {
            _attributes: {
                class: "main-article media-box media-box-medium",
                id: "mediaBox"
            }
        }
    }

    createValueUser(){

    }

    createValueTemplate(){

    }

    createValue(){


        // nach ValueType unterscheiden !!!

        if(this.PartarumTemplate){

            this.createValueTemplate();

        } else {

            this.createValueUser();
        }


        this.surfaceValue = this.mainTemplate();

        let counter = 1;

        if(this.boxValues) {

            for (let box of Object.keys(this.boxValues)) {

                let sectionID = "mediaBox_box_" + counter;

                let sectionTagName = "section_" + counter;

                if (this.PartarumTemplate) {

                    Reflect.set(this.cc, sectionID, this.templateClass.create(this.cc.config));

                    let partarumIntern = this.cc[sectionID].PartarumIntern;

                    if (this.templateName === "MediaBoxPicture") {

                        let pictureID = "mediaBox_picture_" + counter;

                        Reflect.defineProperty(this.boxValues[box].$picture, "id", {value: pictureID});

                        if (partarumIntern.events) {

                            this.cc[sectionID].figure.img._attributes.addEvent = [];

                            for (let eventName in partarumIntern.events) {

                                let eventObject = {
                                    topic: "MediaBoxPicture",
                                    targetID: pictureID
                                };

                                switch (eventName) {

                                    case "enlarge":

                                        let eventType = (partarumIntern.events[eventName] === "barrier") ? "click" : "mouseover";

                                        eventObject.type = eventType;
                                        eventObject.theme = "MediaBoxPicture_" + eventType;
                                        eventObject.name = pictureID + "_" + eventType;
                                        eventObject.doThat = (ev) => {
                                            MediaBoxEvent.enlarge(ev, sectionID, eventType);
                                        }
                                }

                                console.dir(eventObject);

                                this.cc[sectionID].figure.img._attributes.addEvent.push(eventObject);
                            }
                        }


                        Reflect.deleteProperty(this.cc[sectionID], "PartarumIntern");
                    }

                    let val = {
                        _attributes: {
                            class: (this.barrier === true) ? "picture-box-barrier" : "picture-box", // picture-box-barrier
                            id: sectionID
                        }
                    };

                    if(this.barrier === true){

                        let pictureMenu = PictureMenu.create();

                        Reflect.set(val, "nav", pictureMenu.nav);
                    }

                    let importObject = {
                        template: {
                            name: sectionID,
                            surface: this.cc[sectionID],
                            valueFile: this.boxValues[box]
                        }
                    }

                    Reflect.set(val, "_import", importObject);

                    Reflect.set(this.surfaceValue, sectionTagName, val);

                    counter++;
                }
            }
        }

        return this.surfaceValue;
    }

    static create(config){

        const mediaBox = new MediaBox(config);

        return mediaBox.createValue();
    }

    static init(){
        // zur Initialisierung bzgl des Caches!!! Wie in MediaBoxPicture!!!
    }

    static typePicture(){

    }
}

export {MediaBox};