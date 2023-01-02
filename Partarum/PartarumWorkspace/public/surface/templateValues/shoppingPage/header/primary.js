/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

import {landingPage} from "/surface/config";

export default {
    $style:
        "nav-primary"
    ,
    $id: "primaryNav",
    $links: [
        {
            href: landingPage.productCards,
            text: "Tarifübersicht"
        },
        {
            href: landingPage.features,
            text: "Merkmale"
        },
        {
            href: landingPage.contact,
            text: "Kontakt"
        }
    ]
}