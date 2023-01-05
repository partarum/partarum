/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
import {globalConfig} from "/surface/config";
import linkBox from "/Partarum/Templates/linkBox";
import primaryNav from "/surface/config/shoppingPage/header/primaryNav";

export default {

    section_1: {
        _attributes: {
            class: "logo-box"
        },
        a: {
            _attributes: {
                class: "logo",
                href: globalConfig.pageLinks.domain
            },
            picture: {

                source_1: {
                    _attributes: {
                        srcset: "public/assets/media/img/logos/logo_hosting.webp",
                        type: "image/webp"
                    }
                },
                source_2: {
                    _attributes: {
                        srcset: "public/assets/media/img/logos/logo_hosting.png",
                        type: "image/png"
                    }
                },
                img: {
                    _attributes: {
                        src: "public/assets/media/img/logos/logo_hosting.png",
                        alt: "Cordes-Hosting.net",
                        class: "looper"
                    }
                }
            }
        }
    },
    section_2: {
        _attributes: {
            class: "menu-box"
        },
        input: {
            _attributes: {
                type: "checkbox",
                class: "hamburger"
            }
        },
        nav: {
            _import: {
                template: {
                    name: "linkBox",
                    surface: linkBox,
                    valueFile: primaryNav
                }
            },
            ul_2: {
                _attributes: {
                    class: "nav-secondary"
                },
                li: [
                    {
                        a: {
                            _attributes: {
                                href: globalConfig.pageLinks.support,
                                innerHTML: "<i class='fa fa-question-circle icon-left'></i> Hilfe & Kontakt"
                            }
                        }
                    },
                    {
                        a: {
                            _attributes: {
                                href: globalConfig.pageLinks.statusPage,
                                innerHTML: "<i class='fa fa-check icon-left'></i> Server Status"
                            }
                        }
                    },
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
                    },
                    {
                        a: {
                            _attributes: {
                                href: globalConfig.pageLinks.dashboard,
                                class: "button button-primary",
                                style: "padding:2px; height:1rem;",
                                innerHTML: "<i class='fa fa-lock icon-left'></i>Login"
                            }
                        }
                    }
                ]
            }
        }
    }
}