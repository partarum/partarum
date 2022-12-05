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

// Snippets !!!!

class HTMLSnippets {

    static linkListElement(li){
        return HTMLSnippets.linkList(li);
    }

    static linkList(linkObject){

        /*
                Ein Array mit Objekten, oder 1 Objekt !!!
         */
        let linkList = (Array.isArray(linkObject)) ? [] : {};

        if(Array.isArray(linkObject)){

            for(let link of linkObject){

                let li = {
                    a: {
                        _attributes: {}
                    }
                };

                for(let attr in link){
                    if(link.hasOwnProperty(attr)){
                        li.a._attributes[attr] = link[attr];
                    }
                }

                linkList.push(li);
            }
        } else {

            linkList.a = {
                    _attributes: {}
                };

            for(let attr in linkObject){
                if(linkObject.hasOwnProperty(attr)){
                    linkList.a._attributes[attr] = linkObject[attr];
                }
            }
        }
        return linkList;
    }

    static link(linkObject){
        // nur ein anchor Tag !!
    }
}
export {HTMLSnippets};