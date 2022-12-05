
class Enlarge {

    constructor(mediaBoxID, boxID, ev, type){

        this.mediaBox = document.getElementById(mediaBoxID);
        this.boxID = boxID;
        this.box = document.getElementById(boxID);
        this.event = ev;
        this.type = type;

        let init = async () => {

            let one, two, three, four, five = false;

            switch(this.type) {

                case "mouseover":
                    one = await this.firstStep();
                    two = (one === true) ? await this.secondStep() : false;
                    three = (two === true) ? await this.thirdStep() : false;
                    four = (three === true) ? await this.fourthStep() : false;
                    five = (four === true) ? await this.fifthStep() : false;
                    break;
                case "click":
                    two = await this.secondStep();
                    three = (two === true) ? await this.thirdStep() : false;
            }
        }

        init().then();
    }

    firstStep(){

        return new Promise(resolve => {

            let themeIds = Partarum.Cache.EventCache.getThemeIDs("MediaBoxPicture", "MediaBoxPicture_mouseover");

            for(let ar of themeIds){

                let picture = document.getElementById(ar[1]);

                picture.removeEventListener("mouseover", Partarum.Cache.EventCache.getEvent("MediaBoxPicture", "MediaBoxPicture_mouseover", ar[0]));
            }

            resolve(true);
        });
    }

    //clearBox
    secondStep(ev){

        return new Promise(resolve => {


            let start = ()=> {

                return new Promise(resolve => {

                    for (let pic of this.mediaBox.children) {

                        (pic.id !== this.boxID) && (() => {
                            pic.classList.add("news-box-zeroBox");
                        })();

                        this.box.scrollIntoView({block: "start", behavior: "smooth"});
                    }

                    resolve();
                });

            }

            start().then(()=>{

                for(let pic of this.mediaBox.children){

                    (pic.id !== this.boxID) && pic.classList.add("news-box-zero");

                    this.box.scrollIntoView({block: "start", behavior: "smooth"});
                }

                resolve(true);
            });
        });
    }

    setButtonBox(){

        let buttonBoxId = "ButtonBox_" + this.box.id;

        this.buttonBox = document.getElementById(buttonBoxId);

        if(!this.buttonBox) {
            let newBox = new Partarum();

            newBox.themes = [
                {
                    buttonBox: {
                        config: {
                            footer: {
                                _attributes: {
                                    class: "box-row box-center-center",
                                    style: "margin:auto; font-size: 3em; color: darkred;",
                                    id: "ButtonBox_" + this.box.id,
                                },
                                i: {
                                    _attributes: {
                                        class: "fa-duotone fa-circle-xmark",
                                        id: "ButtonBox_" + this.box.id + "_close",
                                        addEvent: {
                                            type: "click",
                                            topic: "MediaBoxPicture",
                                            theme: "MediaBoxPicture_ButtonBox_click",
                                            name: "MediaBoxPicture_ButtonBox_" + this.box.id + "_click",
                                            targetID: "MediaBoxPicture_ButtonBox_" + this.box.id,
                                            doThat: () => {
                                                let box = document.getElementById("ButtonBox_" + this.box.id);

                                                box.classList.remove("box-row");
                                                box.classList.add("zero");

                                                this.box.classList.remove("news-box-open");

                                                for (let pic of this.mediaBox.children) {

                                                    pic.classList.remove("news-box-zero");
                                                    pic.classList.remove("news-box-zeroBox");
                                                    pic.classList.remove("news-box-open");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        parent: this.box
                    }
                }
            ];

            newBox.create().then();
        }
    }

    // make Box bigger
    thirdStep(){

        return new Promise(resolve => {

            localStorage.setItem("boxFocus", "1");

            this.box.classList.remove("news-box-zero");
            this.box.classList.remove("news-box-zeroBox");
            this.box.classList.add("news-box-open");

            this.box.style.position = "relative";

            this.box.scrollIntoView();

            //this.setButtonBox();

            resolve(true);
        });
    }

    // set mouseout
    fourthStep(){

        return new Promise((resolve, reject) => {

            let eventName = this.box.id + "_mouseout";

            Partarum.Cache.EventCache.create("MediaBoxPicture", "MediaBoxPicture_mouseout");

            Partarum.Cache.EventCache.setEvent({
                topic: "MediaBoxPicture",
                theme: "MediaBoxPicture_mouseout",
                name: eventName,
                targetID: this.box.id,
                bubbles: true,
                doThat: (ev)=>{

                    console.log("mouseout - soll: " + this.box.id + " - ist: " + ev.target.id);

                    if(ev.target.parentElement.id === "mediaBox") {

                        this.mediaBox.style.flexDirection = "row";

                        this.box.classList.remove("news-box-open");


                        this.whileCounter ??= 0;

                        this.whileCounter++;

                        console.dir(this.whileCounter);

                        if (this.buttonBox) {
                            this.buttonBox.remove("box-row");
                            this.buttonBox.classList.add("zero");
                        }

                        for (let pic of this.mediaBox.children) {

                            pic.classList.remove("news-box-zero");
                            pic.classList.remove("news-box-zeroBox");
                            pic.classList.remove("news-box-open");
                        }

                        let themeIds = Partarum.Cache.EventCache.getThemeIDs("MediaBoxPicture", "MediaBoxPicture_mouseout");

                        for (let ar of themeIds) {

                            this.box.removeEventListener("mouseout", Partarum.Cache.EventCache.getEvent("MediaBoxPicture", "MediaBoxPicture_mouseout", ar[0]), false);
                        }

                    } else {

                    }
                }
            });



            setTimeout(()=>{

               // console.dir(this.buttonBox);

                this.box.addEventListener("mouseout", Partarum.Cache.EventCache.getEvent("MediaBoxPicture", "MediaBoxPicture_mouseout", eventName), false);
                resolve(true);
                }, 500);

        });
    }

    // set mouseover
    fifthStep(){

        return new Promise(resolve => {

            setTimeout(()=> {
                let themeIds = Partarum.Cache.EventCache.getThemeIDs("MediaBoxPicture", "MediaBoxPicture_mouseover");

                for (let ar of themeIds) {

                    let picture = document.getElementById(ar[1]);

                    picture.addEventListener("mouseover", Partarum.Cache.EventCache.getEvent("MediaBoxPicture", "MediaBoxPicture_mouseover", ar[0]), {once: true});
                }

                resolve(true);
            }, 500);
        });
    }

    clickOn(){

    }

    clickOff(){

    }

    mouseoverOn(){

    }

    mouseoverOff(){

    }

    mouseoutOn(){

    }

    mouseoutOff(){

    }

}

/*
        ab 1050px mousover und mouseout - Events +
        unter 1050px click events
 */


class MediaBoxEvent {

   static enlarge(ev, boxID, type){

       console.dir(type);

       let event = new Enlarge("mediaBox", boxID, ev, type);

    }
}

export {MediaBoxEvent};