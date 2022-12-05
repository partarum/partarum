/*
 *          Copyright 2020 � Alexander Bombis. All rights reserved.
 *          Developed by Alexander Bombis.
 *          Email: email@alexander-bombis.de
 *
 *          The following code was created based on the template for the website http://cordes-software.de.
 *          This may also be used in full by the person or business
 *          representing the domain "cordes-software.de"
 *          and also modified for their use.
 */

class ClientSetting{

    constructor() {

        /*
            set properties
         */
        this._dateObject = new Date();
        this._cookiesEnable = false;
        this._cookies = new Map();
        this._resultWindow = new Map();
        this._windowKeys = Object.getOwnPropertyNames(window);
        this._searchWindowArray = [
            "localStorage",
            "sessionStorage"
        ];

        /*
            call methods
         */
        this.checkStorage();
        this.checkCookies();
        this.getUserCookies();
    }

    /*
        methods
     */

    visitingDate() {
        return this._dateObject.toLocaleString();
    }

    checkStorage() {

        for (let j = 0; j < this._searchWindowArray.length; j++) {
            let parameterWindow = this._searchWindowArray[j];
            this._resultWindow.set(parameterWindow,this._windowKeys.some(keys => parameterWindow === keys));
        }

        if(this._resultWindow.size === 0){

            this._resultWindow.set("localStorage", !!localStorage);
            this._resultWindow.set("sessionStorage", !!sessionStorage);

        }

        this._localStorage = this._resultWindow.get("localStorage") ?? false;
        this._sessionStorage = this._resultWindow.get("sessionStorage") ?? false;
    }

    checkCookies() {

        this._cookiesEnable = (navigator.cookieEnabled === true) ?
            true : (
                (navigator.cookieEnabled === false) ?
                false : "hidden"
            );
    }

    setCookie(item) {

        let cookName = Object.keys(item.nameValue);
        let cookValue = item.nameValue;
        let runTime = item.time;
        let cookieTime = (runTime.min) ? 1000 * 60 * runTime.min : false;

        let date = new Date();

        let runningTime = (cookieTime !== false) ? (date.getTime() + cookieTime) : (date.getTime() + 3600000);

        date.setTime(runningTime);

        for (let value of cookName ) {
            document.cookie = value + "=" + cookValue[value] + "; expires=" + date.toGMTString();
        }
    }

    isCookie(cookieName){

        if (document.cookie.split(';').some((item) => item.trim().startsWith(cookieName + '='))) {
            console.log('The cookie {cookieName} exists')
            return true;
        }
    }

    getUserCookies() {

        (this.cookiesEnable) && (() => {
            let cookieArray = document.cookie.split(";");
            cookieArray.forEach((item) => {
                let cookie = item.split("=");
                this._cookies.set(cookie[0], cookie[1]);
            })
        })();
    }


    getCookie(cookieName){

        return this._cookies.get(cookieName) ?? false;
    }

    get resultWindow(){

        return this._resultWindow;
    }

    get localStorage(){

        return this._localStorage ?? false;
    }

    get sessionStorage(){

        return this._sessionStorage ?? false;
    }

    get cookiesEnable(){

        return this._cookiesEnable;
    }
}

export {ClientSetting};