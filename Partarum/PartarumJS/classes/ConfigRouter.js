/*
 *          Copyright 2020 © Alexander Bombis. All rights reserved.
 *          Developed by Alexander Bombis.
 *          Email: email@alexander-bombis.de
 *
 *          The following code was created based on the template for the website http://cordes-software.de.
 *          This may also be used in full by the person or business
 *          representing the domain "cordes-software.de"
 *          and also modified for their use.
 */

class ConfigRouter {



    constructor(page = false) {

        let pages = {
            testPage: "loadTestPage",
            index: "loadMainPage"
        }

        this.index = {};
        this._modules = [];


        if(pages?.[page]) {
            let functionName = pages[page];
            let rout = new ConfigRouter();

            rout[functionName]();
            return rout;
        } else {
            if(page !== false) {
                let rout = new ConfigRouter();

                rout["loadFile"](page);
                return rout;
            }
        }
    }

    loadMainPage(){

        let files = {
         ClientSetting:   "./ClientSetting.js"
        };

        this.index = this.fileLoader(files);
    }

    loadFile(path){

        let files = {
            //Module: "../../../" + path
            Module: path
        }

        let result = this.import(files);

        this.Module = this._modules[0];
    }

    get modules(){

        return this._modules;
    }

    import(files){

        for(let name in files){

            if(files.hasOwnProperty(name)) {

                this.fileLoader(files[name]);
            }
        }

    }

    fileLoader(path){

        console.log(path);

        return  new Promise((resolve, reject) => {

                let module = import(path);

            resolve(true);

                this._modules.push(module);
        })
    }
}
export {ConfigRouter};