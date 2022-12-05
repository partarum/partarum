import {globalConfig} from "/surface/config";
import linkBox from "/Partarum/Templates/linkBox";
import primaryNav from "/surface/templateValues/landingPage/header/primaryNav";

export default {

    input: {
        _attributes: {
            type: "checkbox",
            class: "hamburger"
        }
    },
    nav: {
        _attributes: {
            id: "headerNav"
        },
        _import: {
            template: {
                name: "linkBox",
                surface: linkBox,
                valueFile: primaryNav
            }
        },
        ul_2: {
            _attributes: {
                id: "secondaryNav",
                class: "nav-secondary"
            },
            li: [

                {
                    a: {
                        _attributes: {
                            href: globalConfig.pageLinks.conditionPage,
                            innerHTML: "Impressum"
                        }
                    }
                },
                {
                    a: {
                        _attributes: {
                            href: globalConfig.pageLinks.conditionPage,
                            innerHTML: "Datenschutzerklärung"
                        }
                    }
                }
            ]
        }
    }
}