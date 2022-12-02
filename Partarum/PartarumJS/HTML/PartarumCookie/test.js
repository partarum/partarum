const shadow = document.getElementsByTagName("partarum-cookie")[0].shadowRoot;

const styles = document.querySelectorAll('style[id*="fa"]');

/*
styles.push(document.getElementById("fa-v4-font-face"));
styles.push(document.getElementById("fa-v5-font-face"));
styles.push(document.getElementById("fa-v4-shims"));
styles.push(document.getElementById("fa-main"));
*/

for(let style of styles) {
    shadow.appendChild(style.cloneNode(true));
}

const i = document.createElement("i");
i.classList.add("fa-duotone", "fa-blinds", "fa-3x");
i.style.position = "fixed";
i.style.bottom = "2rem";
i.style.left = "2rem";
//i.style.fontSize = "3rem";

shadow.appendChild(i);

/*
shadow.host.classList.add("fa-duotone", "fa-blinds");
shadow.host.style.position = "fixed";
shadow.host.style.bottom = "2rem";
shadow.host.style.left = "2rem";
shadow.host.style.fontSize = "3rem";
*/
console.dir(shadow);

