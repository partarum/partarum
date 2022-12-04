class MediaBoxPicture {

    static STYLE_ORIGINAL = 2;

    static STYLE_MOVIE = 4;

    static HEADLINE_OVER_IMAGE = 8;

    static HEADLINE_UNDER_IMAGE = 16;

    static configCache = {};

    static counter = 1;

    constructor(config, barrier = false){

        /*
               figure: height: fit-content || 100%
                    height: 100% = like quader box
                    fit-content = original picture

               aspect-ratio: 16/9 || unset
                16:9 = with whitespace over and under the picture
                unset
         */

        this.headline = config.headline || MediaBoxPicture.HEADLINE_UNDER_IMAGE; // under || over
        this.picture = config.picture || MediaBoxPicture.STYLE_ORIGINAL; //  // original || movie
        this.barrier = barrier;

        this.events = config.events || null;

        if(this.events) {
            this.enlarge = this.events.enlarge || null;
        }
    }

    headlineTemplate() {

        return {
            h2: {
                $headline: {
                    _type: "text"
                }
            }
        }
    }

    imageTemplate(){

        return {
            img: {
                $picture: {
                    src: {
                        _type: "_attributes",
                        _value: {
                            src: ""
                        }
                    },
                    alt: {
                        _type: "_attributes",
                        _value: {
                            alt: ""
                        }
                    },
                    id: {
                        _type: "_attributes",
                        _value: {
                            id: ""
                        }
                    }
                },
                _attributes: {}
            }
        }
    }

    figcaptionText(){
        return {
            p: {
                $description: {
                    _type: "text"
                }
            }
        }
    }

    figcaptionTemplate(){

        let figcaptionBody = {};

        if(this.headline === MediaBoxPicture.HEADLINE_UNDER_IMAGE){
            Reflect.set(figcaptionBody, "h2", this.headlineTemplate().h2);
        }

        Reflect.set(figcaptionBody, "p", this.figcaptionText().p);

        return {
            figcaption: figcaptionBody
        }
    }

    figureBody(){
        let body = {};

        if(this.headline === MediaBoxPicture.HEADLINE_OVER_IMAGE){
            Reflect.set(body, "h2", this.headlineTemplate().h2);
        }

        Reflect.set(body, "img", this.imageTemplate().img);
        Reflect.set(body, "figcaption", this.figcaptionTemplate().figcaption);

        return body;
    }

    template(){

        let figure = {
            figure: {
                ...this.figureBody()
            },
            PartarumIntern: {
                template: "MediaBoxPicture"
            }
        };

        /*
            enlarge - kann mouseover, oder click sein - Thema "Barrierefreiheit"
         */

        if(this.events) {

            figure.PartarumIntern.events ??= {};

            for(let event in this.events) {

                Reflect.set(figure.PartarumIntern.events, event, this.events[event]);
            }
        }

       return figure;
    }

    static create(config){
        let picbox = new MediaBoxPicture(config);

        return picbox.template();
    }

    static init(config){

        let id = "mediaBox_" + MediaBoxPicture.counter;

        Reflect.set(MediaBoxPicture.configCache, id, {
            config: config
        });

        return {
            PartarumTemplate: {
                templateName: MediaBoxPicture,
                id: id
            }
        };
    }
}

export {MediaBoxPicture};