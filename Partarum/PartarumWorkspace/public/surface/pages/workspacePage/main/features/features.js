/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

import featureBox from "/surface/templates/featureBox";
import networkPower from "/surface/config/features/networkPower";
import robotPower from "/surface/config/features/robotPower";
import servicePower from "/surface/config/features/servicePower";

export default {
    header: {
        h1: {
            _attributes: {
                text: "Warum wir?"
            }
        },
        p: {
            _attributes: {
                text: "Hoster gibt es wie Sand am Meer, warum sollten Sie sich für uns entscheiden?"
            }
        }
    },
    footer: {
        section: {
            _attributes: {
                class: "box-column space-evenly"
            },
            article_1: {
                _attributes: {
                    id: "networkPower",
                    class: "box-row"
                },
                _import: {
                    template: {
                        name: "featureBox",
                        surface: featureBox,
                        valueFile: robotPower
                    }
                }
            },
            article_2: {
                _attributes: {
                    id: "robotPower",
                    class: "box-row"
                },
                _import: {
                    template: {
                        name: "featureBox",
                        surface: featureBox,
                        valueFile: networkPower
                    }
                }
            },
            article_3: {
                _attributes: {
                    id: "servicePower",
                    class: "box-row"
                },
                _import: {
                    template: {
                        name: "featureBox",
                        surface: featureBox,
                        valueFile: servicePower
                    }
                }
            }
        }
    }
}