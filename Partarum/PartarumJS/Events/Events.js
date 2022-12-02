class Events {

    static handler = {

        keycheck: {
            keyup: (goalID, keyCodeNeedle) => {

                return {
                    doThat: (event) => {
                        if (event.keyCode === keyCodeNeedle) {
                            event.preventDefault();
                            document.getElementById(goalID).click();
                        }
                    }
                }
            }
        },
        validation: {
            click: {
                email: (goalID, options) => {

                    return {
                        doThat: () => {

                            let email = document.getElementById(goalID).value;

                            if (email.length > 4) {

                                if ((email.includes("@")) && (email.includes("."))) {

                                    sessionStorage.setItem("email", email);

                                    let a = document.getElementById("sendTheShit");
                                    a.setAttribute("style", "display: block");

                                    a.click();

                                } else {

                                    let text = "Du musst eine Email - Adresse mit @ und . eingeben!";

                                    let a = document.getElementById("emailValidation");

                                    a.hidden = false;
                                    a.style.backgroundColor = options?.backgroundColor ?? "#E6E6FA";

                                    a.children[0].innerText = text;
                                }
                            } else {

                                let text = "Zu kurz für eine Email - Adresse";

                                let a = document.getElementById("emailValidation");

                                a.hidden = false;
                                a.style.backgroundColor = options?.backgroundColor ?? "#E6E6FA";

                                a.children[0].innerText = text;
                            }
                        }
                    }
                }
            }
        }
    };

    static getBase(topic, type, addition, targetID, goalID, handler){

        return {
            type: type,
            topic: topic,
            theme: topic + "_" + addition,
            name: topic + "_" + addition + "_" + type + "_from_" + targetID + "_to_" + goalID,
            targetID: targetID,
            ...handler
        }
    }

    static keycheck(type, keyName, targetID, goalID) {

        const KEYS = {
            enter: 13
        }

        return Events.getBase("keycheck", type, keyName, targetID, goalID, Events.handler.keycheck[type](goalID, KEYS[keyName]));
    }

    static validation(type, theme, targetID, goalID){

        return Events.getBase("validation", type, theme, targetID, goalID, Events.handler.validation[type][theme](goalID));
    }
}

export {Events};