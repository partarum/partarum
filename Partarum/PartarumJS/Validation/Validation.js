
class Validation {

    static confirmLink(text, link, options){

        let optionString = Object.entries(options).map(x=>x.join("=")).join(",");

        window.confirm(text) && window.open(link, "_blank", optionString);
    }
}

export {Validation};