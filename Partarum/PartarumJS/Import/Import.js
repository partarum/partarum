/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

import {Log} from "/Partarum/Workshop/Log";
import {Validation} from "/Partarum/Validation";
import {ValidObject} from "/Partarum/Validation/ValidObject";
import {Helper} from "/Partarum/Workshop/Helper";
import {ViewKit} from "/Partarum/Workshop/ViewKit";
import {Loader} from "/Partarum/Workshop/Loader";
import {Workbox} from "/Partarum/Workshop/Workbox";
import {Cache} from "/Partarum/Cache";
import {HTML} from "/Partarum/HTML";
import {Design} from "/Partarum/Design";
import {Counter} from "/Partarum/Helper/Counter";
import {System} from "/Partarum/System";
import {Draw} from "/Partarum/Draw";
import {Events} from "/Partarum/Events";

const ImportList = {
    Log: Log,
    Validation: Validation,
    ValidObject: ValidObject,
    Helper: Helper,
    ViewKit: ViewKit,
    Loader: Loader,
    Workbox: Workbox,
    Cache: Cache,
    HTML: HTML,
    Design: Design,
    Counter: Counter,
    System: System,
    Draw: Draw,
    Events: Events
}

export {ImportList};