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

import {Hex} from "/Partarum/Helper/Hex";
import {Counter} from "/Partarum/Helper/Counter";

class Helper {

    static Hex = Hex;

    static Counter = Counter;

    static getGermanDateString(date, withTime = false){

        let startDate = new Date(this.getValidDateString(date));

        const options = (withTime === false) ? {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        } : {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        };

        let utc = new Date(startDate.toUTCString());

        return utc.toLocaleDateString('de-DE', options);
    }

    static getDateFromUTC(date){

        let startDate = new Date(this.getValidDateString(date));

        const options = {
            day: "numeric",
            month: "numeric",
            year: "numeric"
        }

        return new Date(startDate.toUTCString()).toLocaleDateString("de-DE", options);
    }

    static getValidDateString(date){
        return date.replace(/ /g,"T")
    }

    static getCurrentHour(){
        return new Date().getHours();
    }

    static betweenRanges (needle, min, max) {

        return ((needle > min) && (needle < max));
    }

    static safeFunction(){

    }
}

export {Helper};