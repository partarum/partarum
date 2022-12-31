/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

function setTrueResponse(data){

    let responseBox = document.createElement("div");
    responseBox.id = "response_Box";

    let responseHeader = document.createElement("header");
    let responseBody = document.createElement("section");
    let responseFooter = document.createElement("footer");

    let responseHeading = document.createElement("h1");

    let headingText = document.createTextNode("Anfrage erfolgreich ausgeführt.");

    responseHeading.appendChild(headingText);

    responseHeader.appendChild(responseHeading);

    let p1 = document.createElement("p");
    let p1Text = document.createTextNode(`Hallo ${data.name},`);
    p1.appendChild(p1Text);

    let p2 = document.createElement("p");
    let p2Text = document.createTextNode("wir bestätigen dir hiermit den Eingang deiner Anfrage.");
    p2.appendChild(p2Text);

    let p3 = document.createElement("p");
    let p3Text = document.createTextNode("Unser Support wird sich dem Annehmen und zeitnah – per Email – mit dir in Kontakt treten.");
    p3.appendChild(p3Text);

    responseBody.append(p1, p2, p3);


    let responseButton = document.createElement("button");
    responseButton.type = "button";
    responseButton.addEventListener("click", () => {
        document.getElementById("contactForm").reset();
        document.getElementById("response_Box").remove();
        document.body.style.position = "unset";
    }, false);

    let buttonText = document.createTextNode("Ansicht schließen");
    responseButton.appendChild(buttonText);

    responseBox.append(responseHeader, responseBody, responseFooter);

    responseFooter.appendChild(responseButton);

    document.body.appendChild(responseBox);

    document.body.style.position = "fixed";

}

export {setTrueResponse};