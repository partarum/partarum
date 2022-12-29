/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

export default {
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
                            href: "/conditionPage",
                            text: "Impressum"
                        }
                    }
                },
                li_2: {
                    a: {
                        _attributes: {
                            href: "/conditionPage",
                            text: "Datenschutzerklärung"
                        }
                    }
                }
            }
        }
    }
}