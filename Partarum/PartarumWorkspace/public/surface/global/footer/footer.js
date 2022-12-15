/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
import {globalConfig} from "/surface/config";
export default {
    section_1: {
        _attributes: {
            id: "footer_primary",
            class: "media-box-row"
        },
        article: {
            _attributes: {
                id: "footer_leftSide"
            },
            header: {
                h5: {
                    _attributes: {
                        class: "h5",
                        text: "Über Cordes - Hosting"
                    }
                }
            },
            footer: {
                _attributes: {
                    class: "box-column"
                },
                section_1: {
                    p: "Wir bieten Hosting-, Server- und Speicherlösungen für Unternehmen und Privatpersonen."
                },
                section_2: {
                    _attributes: {
                        class: "smart-top"
                    },
                    p: [
                        "Cordes - Hosting, Mittelpfad 1, 76351 Linkenheim-Hochstetten",
                        "+49 7247 3980814"
                    ]
                }
            }
        },
        aside: {
            _attributes: {
                id: "footer_rightSide",
                class: "box-column"
            },
            header: {
                h5: {
                    _attributes: {
                        class: "h5",
                        text: "Allgemeine Informationen"
                    }
                }
            },
            footer: {
                _attributes: {
                    class: "box-row box-start"
                },
                section_1: {
                    _attributes: {
                        class: "footer-links-start"
                    },
                    ul: {
                        li: [
                            {
                                a: {
                                    _attributes: {
                                        href: "#pricing",
                                        text: "Tarifübersicht"
                                    }
                                }
                            },
                            {
                                a: {
                                    _attributes: {
                                        href: "#features",
                                        text: "Merkmale"
                                    }
                                }
                            },/*
                        {
                            a: {
                                _attributes: {
                                    href: "#about",
                                    text: "Über uns"
                                }
                            }
                        },*/
                            {
                                a: {
                                    _attributes: {
                                        href: "#contact",
                                        text: "Kontakt"
                                    }
                                }
                            }
                        ]
                    }
                },
                section_2: {
                    _attributes: {
                        class: "footer-links"
                    },
                    ul: {
                        li_1: {
                            a: {
                                _attributes: {
                                    href: globalConfig.pageLinks.conditionPage,
                                    text: "Impressum"
                                }
                            }
                        },
                        li_2: {
                            a: {
                                _attributes: {
                                    href: globalConfig.pageLinks.conditionPage,
                                    text: "Datenschutzerklärung"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    section_2: {
        _attributes: {
            id: "footer_secondary",
            class: "copyright-box"
        },
        p: globalConfig.copyright,
        a: {    // unabhängig mit Javascript einfügen !!!
            _attributes: {
                id: "partarumHeartbeat",
                href: "https://alexander-bombis.de",
                innerHTML: `Programmed with <i class="fa fa-heartbeat"></i> by Alexander Bombis.`
            }
        }
    }
}