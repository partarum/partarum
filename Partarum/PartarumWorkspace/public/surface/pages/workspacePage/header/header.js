/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
import {globalConfig} from "/Partarum/PartarumWorkspace/Surface/Config";

export default {

    input: {
        _attributes: {
            type: "checkbox",
            class: "hamburger"
        }
    },
    nav: {
        _attributes: {
            id: "workspaceMenu",
            class: "box-row space-between"
        },
        button_project: {
            _attributes: {
                type: "button"
            },
            i: {
                _attributes: {
                    class: "fa-duotone fa-diagram-project"
                }
            }
        },
        button_question: {
            _attributes: {
                type: "button"
            },
            i: {
                _attributes: {
                    class: "fa-duotone fa-circle-question"
                }
            }
        },
        button_update: {
            _attributes: {
                type: "button",
                id: "ws_update_1",
                addEvent: {
                    topic: "WSupdate",
                    theme: "WSupdate_click",
                    name: "WSupdate_click_ws_update_1",
                    targetID: "WSupdate_click_ws_update_1",
                    type: "click",
                    doThat: (event) => {

                        /*
                            via fetch() / API auf Updates prüfen und wenn TRUE, dann Update zur Verfügung stellen
                         */
                        
                        let ws = Partarum.getWorker("test");
                        
                        ws.postMessage([1,2,3,4,5]);
                    }
                }
                },
                i: {
                    _attributes: {
                        class: "fa-duotone fa-sync"
                    }
                }
            }
        }

}