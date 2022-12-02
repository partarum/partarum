class HTMLTextNode {

    constructor(node, textItem) {

        this._target = node;
        this._text = textItem;

        this.setText();
    }

    setText(){

        if(typeof(this._text) === "string"){

            if(this._target instanceof HTMLElement) {

                this._target.appendChild(document.createTextNode(this._text));
            }
        } else {
            console.log("Hier folgt eine Array - Funktion");
        }
    }
}

export {HTMLTextNode};