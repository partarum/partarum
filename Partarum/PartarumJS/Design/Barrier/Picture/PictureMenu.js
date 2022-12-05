class PictureMenu {

    constructor(options) {

        this.getBackground();

    }

    static create(options){

        Partarum.hasBackground = false;

        let box = new PictureMenu(options);

        return box.menu();

    }

    menu(){

        return {
            nav: {
                _attributes: {
                    class: "box-row picture-menu"
                },
                button_shrink: this.shrink(),
                button_enlarge: this.enlarge()
            }
        }
    }

    enlarge(){

        return {
            _attributes: {
                text: "Bild vergrößern"
            },
            i: {
                _attributes: {
                    class: "fa-duotone fa-magnifying-glass-plus"
                }
            }
        }
    }

    shrink(){

        return {
            _attributes: {
                text: "Bild verkleinern"
            },
            i: {
                _attributes: {
                    class: "fa-duotone fa-magnifying-glass-minus"
                }
            }
        }
    }

    getBackground(){

        /*
            background-color || background-image

            html -> body -> main

            types :

               background-color: rgb(0, 0, 0) || rgba(0, 0, 0, 0)

               background-image: linear-gradient(rgba(0,0,0,0), rgb(242, 242, 242), rgb(211, 211, 211))  || linear-gradient(rgb(236, 239, 242), rgb(210, 159, 136), rgb(211, 211, 211))

               background-image: linear-gradient(rgb(236, 239, 242), rgb(210, 159, 136), rgb(242, 5, 5), rgb(211, 211, 211))

            next Step:

                strings filtern:

                        background-color: gibt es eine Zahl größer 0 ?

                        background-image:

            wie definiert sich rgb:

                Rot, Grün, Blau

                0, 0, 0 ist Schwarz
                255, 255, 255 ist Weiß

                255, 0, 0 ist Rot
                0, 255, 0 ist Grün
                0, 0, 255 ist Blau

                binär:

                1111 1111, 0000 0000, 0000 0000
                0000 0000, 1111 1111, 0000 0000
                0000 0000, 0000 0000, 1111 1111

                hex:

                0x00FF, 0x0000, 0x0000
                0x0000, 0x00FF, 0x0000
                0x0000, 0x0000, 0x00FF

                Die Mitte von 255 = 127,5 = rgb(127, 127, 127) === grau !!!

                255 >> 127 >> 63 >> 31 >> 15 >> 7 >> 3 >> 1 >> 0

                1111 1111 >> 0111 1111 >> 0011 1111 >> 0001 1111 >> 0000 1111 >> 0000 0111 >> 0000 0011 >> 0000 0001 >> 0000 0000

                0x00FF >> 0x007F >> 0x003F >> 0x001F >> 0x000F >> 0x0007 >> 0x0003 >> 0x0001 >> 0x0000


                background-image: linear-gradient(181deg, rgb(0,0,0), rgba(127, 0, 0), rgb(255, 0, 0)); von Schwarz zu Rot
}

         */

        const BACKGROUND_TYPES = [
            "background-color",
            "background-image"
        ];

        if(Partarum.hasBackground === false) {

            let body = window.getComputedStyle(document.body);

            let main = window.getComputedStyle(document.getElementsByTagName("main")[0]);

            for (let type of BACKGROUND_TYPES) {

                console.log("body - " + type + ": " + body.getPropertyValue(type));

                console.log("main - " + type + ": " + main.getPropertyValue(type));
            }

            Partarum.hasBackground = true;
        }


    }
}

export {PictureMenu};