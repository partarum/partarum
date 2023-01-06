/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
import surface from "/Partarum/PartarumWorkspace/Surface/Import";
import {globalConfig} from "/Partarum/PartarumWorkspace/Surface/Config";

export default {

    section_workplace: {
        _attributes: {
            class: "box-column",
            id: "workplace",
            addEvent: {
                type: "wheel",
                topic: "Workplace",
                theme: "Workplace_wheel",
                name: "Workplace_wheel_workplace",
                targetID: "Workplace_wheel_workplace",
                doThat: (event)=>{

                    const ZOOM_SPEED = 0.1;

                    let el = document.getElementById("workplace");

                    if (event.deltaY > 0) {
                        el.style.transform = `scale(${(globalThis.zoomPoint += ZOOM_SPEED)})`;
                    } else {
                        el.style.transform = `scale(${(globalThis.zoomPoint -= ZOOM_SPEED)})`;
                    }
                }
            }
        },
        article_domain: {
            _attributes: {
                id: "domain",
                class: "box-column dev-box"
            },
            header: {
                section_description: {
                    _attributes: {
                        id: "domainDescription"
                    },
                    ul: {
                        _attributes: {
                            class: "box-column"
                        },
                        li: [
                            {
                                _attributes: {
                                    id: "closeDomain"
                                },
                                button: {
                                    _attributes: {
                                        type: "button" // event click - article schließen
                                    },
                                    i: {
                                        _attributes: {
                                            class: "fad fa-window-close"
                                        }
                                    }
                                }
                            },
                            {
                                h3: "Projektdomain:"
                            },
                            {
                                p: "Es ist wichtig hier die tatsächliche Domain, welche auf dein DocumentRoot zugreift einzutragen."
                            },
                            {
                                p: "Da die Domain fest in der .htaccess verankert wird."
                            },
                            {
                                p: "Und denke immer daran - ein Projekt - eine Domain - ein DokumentRoot!"
                            }
                        ]
                    }
                }
            },
            section: {

            },
            footer: {

            }

                /*
                ul: {
                    _attributes: {
                        id: "",
                        class: "box-row space-between"
                    },
                    li: [
                        {
                            input: {
                                _attributes: {
                                    type: "text",
                                    placeholder: "plainPHP.de"  // Hier kommt noch eine Abfrage rein!!
                                }
                            }
                        },
                        {
                            button: {
                                _attributes: {
                                    type: "button",
                                    text: "Domain speichern"  // event click - neue htacces erstellen und article schließen
                                }
                            }
                        }
                    ]
                }

                 */

        }
    },
    section_sidebar: {
        _attributes: {
            id: "sidebar"
        }
    }

}