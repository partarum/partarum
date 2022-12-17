/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
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
            ul_1: {
                _attributes: {
                    id: "primaryNav",
                    class: "nav-primary"
                },
                li: [
                    {
                        a: {
                            _attributes: {
                                href: "",
                                text: "Templates & Snippets"
                            }
                        }
                    },
                    {
                        a: {
                            _attributes: {
                                href: "",
                                text: "PartarumCSS"
                            }
                        }
                    },
                    {
                        a: {
                            _attributes: {
                                href: "",
                                text: "PartarumPHP"
                            }
                        }
                    }
                ]
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