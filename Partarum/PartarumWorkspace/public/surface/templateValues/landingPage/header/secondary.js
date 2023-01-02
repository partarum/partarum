/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

export default {
    $style:
        "nav-secondary"
    ,
    $id: "secondaryNav",
    $links: [
        {
            href: 'javascript: setIntoView("product-cards", "end");',
            text: "Tarifübersicht"
        },
        {
            href: 'javascript: setIntoView("features");',
            text: "Merkmale"
        },
        {
            href: 'javascript: setIntoView("contact");',
            text: "Kontakt"
        }
    ]
}