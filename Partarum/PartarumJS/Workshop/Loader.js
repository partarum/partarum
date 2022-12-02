/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

class Loader {

    static fetchFile(file, type){
        return new Promise((resolve, reject) => {

            fetch(file).then((response) => {

                /*
                        arrayBuffer()
                        blob()
                        json()
                        text()
                        formData()
                 */

                switch (type) {

                    case "array":
                        return response.arrayBuffer();
                    case "blob":
                        return response.blob();
                    case "json":
                        return response.json();
                    case "text":
                        return response.text();
                    case "form":
                        return response.formData();
                    default:
                        return false;
                }
            }).then((data) => {
                resolve(data);
            }).catch((error)=>{
                reject(error);
            })
        });
    }

    static fetchJSONPost(url, data){

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data)
            }).then((response)=>{
                return response.json();
            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    // benötigt das Elternelement
    static fetchImage(file, id){

        return new Promise((resolve, reject) => {
            fetch(file).then((response) => {
                return response.blob()
            }).then( (blob)=> {

                let pic = URL.createObjectURL(blob);
                let node = document.getElementById(id);

                node.src = pic;

                console.dir(node);
                console.dir(pic);
                //document.getElementById(id).src = URL.createObjectURL(blob);
            })
        })
    }
}
export {Loader};