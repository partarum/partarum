class HTMLCardBoxObject {


    // ! TODO Als Worker gestalten

    /*
        let topic: [
            {
                name: "Webspace",
                cards: [
                    {
                        title: "WebBase"
                    },
                    {
                        title: "WebBusiness"
                    },
                    {
                        title: "WebEnterprise"
                    }
                ],
                display: true

            },
            {
                name: "Server",
                subTopic: [
                    {
                        name: "Ipv4",
                        cards: [
                            {
                                title: "vServer S"
                            }
                        ]
                    },
                    {
                        name: "Ipv6",
                        cards: [

                        ]
                    }
                ]
            },
            {
                name: "Storage",
                card: {
                    title: ""
                }
            }
        ]
     */

    startMenu = new Map();

    topicIDs = Partarum.Helper.Hex.createIndex(true);

    topicBoxes = new Map();

    subBoxes = new Map();

    lastID = 0x00000000000001;

    ready = false;

    config = {};


    constructor(config){

        // ! {surface: , topic: } || [topic]

        this.checkConfig(config).then( () => {

            this.analyseConfig(this.config.topic).then(()=>{
                this.ready = true;
            });
        });
    }

    checkConfig(config){

        return new Promise((resolve) => {

            if(Array.isArray(config)){

                this.config.topic = config;

            } else {

                this.config = config;
            }


            resolve(true);
            //console.dir(this.config);
        })
    }

    async analyseConfig(topic){

        if(topic instanceof Object ){

            if(Array.isArray(topic)){

                for(let topicObject of topic){

                    // name, subTopic,  cards, card

                    this.lastID = this.topicIDs.next(true);

                    this.topicBoxes.set(this.lastID, {});

                    for(let topicKey in topicObject){

                       await this[(topicKey === "name") ? "topicName" : topicKey](topicObject[topicKey]);
                    }
                }
            }
        }
    }


    checkStatus(){

        return new Promise((resolve) =>  {

            let int = setInterval(() => {

                if(this.ready === true){

                    resolve(true);

                    clearInterval(int);
                }

            }, 100);
        });

    }

    topicName(topic){

        return new Promise((resolve)=>{

            this.startMenu.set(this.lastID, topic);

            resolve(true);
        })


        // create Button and TopicBox
    }

    subTopic(cardObject){

        // create SubButton and TopicBox

        return new Promise((resolve) => {

            let convert = Object.entries(cardObject).map((cards)=> {

                return cards[1];
            });

            let subCardBoxObject = new HTMLCardBoxObject(convert); // ! das neue Object fürs Submenu

            subCardBoxObject.checkStatus().then( () => {

                this.subBoxes.set(this.lastID, subCardBoxObject);

                this.topicBoxes.get(this.lastID).subTopic = cardObject;

                resolve(true);
            });

        });

    }

    card(cardObject) {

        return new Promise((resolve) => {

            this.topicBoxes.get(this.lastID).card = cardObject;

            resolve(true);
        })
        // create one card

    }

    cards(cardsObject){

        return new Promise((resolve) => {

            this.topicBoxes.get(this.lastID).cards = cardsObject;

            resolve(true);
        })
        // create more than one

    }

    display(value){

        return new Promise((resolve) => {

            this.topicBoxes.get(this.lastID).display = value;

            resolve(true);
        })

    }
}

export {HTMLCardBoxObject};