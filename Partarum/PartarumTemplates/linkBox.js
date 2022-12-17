/*
 *           Copyright 2020 © Alexander Bombis. All rights reserved.
 *           Developed by Alexander Bombis.
 *           Email: email@alexander-bombis.de
 *
 *           The following code was created based on the template for the website http://cordes-software.de.
 *           This may also be used in full by the person or business
 *           representing the domain "cordes-software.de"
 *           and also modified for their use.
 */

export default {
    ul: {
        $style: {
            _type: "_attributes",
            _value: {
                class: ""
            }
        },
        $id: {
            _type: "_attributes",
            _value: {
                id: ""
            }
        },
        $links: {
            _type: "_callback",
            _callback: (value) => {

                //console.dir(value);

                if(Array.isArray(value.$links)){

                    let ul = document.getElementById(value.$id);

                    //console.dir(ul);

                    for(let link of value.$links){

                        let li = document.createElement("li");
                        let a  = document.createElement("a");

                        a.setAttribute("href", link.href);

                        let text = document.createTextNode(link.text);

                        a.appendChild(text);
                        li.appendChild(a);
                        ul.appendChild(li);
                    }
                }
            }
        }
    }
}