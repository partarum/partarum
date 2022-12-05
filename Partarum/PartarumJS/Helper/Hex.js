const HEX_START = 0x00000000000001;

const HEX_END = 0x1FFFFFFFFFFFFF;

const HEX_PERMUT = 87178291200;

class Hex {

    static lastID = HEX_START;

    static getString(hex = 0){

        return "0x" + hex.toString(16).padStart(14, "0");
    }

    static getInt(hex){

        return parseInt(hex, 16);
    }

    static createIndex(global = false, startNumber = (global === false) ? HEX_START : ++Hex.lastID){

        return new HexIndex(startNumber);
    }

}

class HexIndex {

    lastHex = HEX_START;

    constructor(startNumber) {
        this.lastHex = startNumber;
    }

    * nextID(type){

        while(true) {

            this.lastHex++;

            Hex.lastID = this.lastHex;

            yield (type === false) ? this.lastHex : Hex.getString(this.lastHex);
        }
    }

    next(type = false){

        return this.nextID(type).next().value;
    }
}

export {Hex};