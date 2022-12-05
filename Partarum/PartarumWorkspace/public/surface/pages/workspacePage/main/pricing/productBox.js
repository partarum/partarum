/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
import {Partarum, EventCache} from "/Partarum";
import surface from "/surface/import";
import {products} from "/surface/config/productCards/products";

export default {

    header: {
        $highlight: {
            _type: "_attributes",
            _value: {
                class: ""
            }
        },
        $highlightText: {
            _type: "text"
        }
    },
    article: {
        $active: {
            _type: "_attributes",
            _value: {
                data_productVisible: ""
            }
        },
        _attributes: {
            class: "product-card-main",
            addEvent: {
                type: "mouseover",
                bubbles: false,
                name: "noBusinessBox",
                doThat: (event) => {

                    let active = document.getElementsByClassName("product-card-main");

                    let activeLength = active.length;

                    let activCounter = 0;

                    let counter = 0;

                    let counterArray = [];

                    for (let evNode of active) {

                        evNode.removeEventListener("mouseover", EventCache.getEvent("noBusinessBox"), false);
                    }

                    for(let node of active) {

                        let productActive = node.dataset?.productvisible;

                        if (productActive !== "active") {
                            node.style.display = "none";
                            node.parentElement.style.backgroundColor = "#360000";
                            node.parentElement.style.borderRadius = "1em";
                            node.parentElement.style.boxShadow = "0px 0px 15px 1px #360000";

                            if((node.parentElement.lastChild.nodeName !== "ASIDE") && (document.getElementsByClassName("noBusinessBox").length === 0)) {

                                counter++;

                                let app = new Partarum();
                                app.themes = [
                                    {
                                        noBusinessBox: {
                                            config: surface.landingPage.main.pricing.noBusinessBox,
                                            parent: node.parentElement
                                        }
                                    }
                                ];

                                counterArray.push(counter);

                                app.create(() => {

                                    // in diesem Callback muss die Anzahl der durchlaufenden Module rein ( in dem Fall 4 von 6)

                                    let arrowBox = document.getElementById("arrowBox");

                                    if(arrowBox instanceof HTMLElement) {

                                       arrowBox.setAttribute("id", "arrowBox_" + counterArray.shift());
                                       arrowBox.style.fontSize = "3em";
                                       arrowBox.style.backgroundColor = "#360000";
                                       arrowBox.style.color = "#a52a2a";

                                        if(counterArray.length === 0) {
                                            // Hier jetzt die Zuteilung der Pfeile

                                            // für unser Thema muss das 1. und das 3. Element einen Pfeil nach Rechts bekommen
                                            // und das 2. und das 4. Element einen Pfeil nach Links

                                            for (let i = 0; i < counter; i++) {

                                                let arrowBox = document.getElementsByClassName("arrow-Box")[i];

                                                arrowBox.id = "arrowBox_" + i;

                                                let boxID = "arrowBox_" + i;

                                                let element = document.getElementById(boxID);

                                                if ((i % 2) === 0) {
                                                    // jedes zweite ab 2 = arrowLeft
                                                    console.dir(element);
                                                    for (let j = 0; j < 4; j++) {

                                                        let arrowLeft = document.createElement("i");
                                                        arrowLeft.className = "fa fa-arrow-right";
                                                        element.appendChild(arrowLeft);
                                                    }
                                                } else {
                                                    // jedes zweite ab 1 = arrowRight
                                                    console.dir(element);
                                                    for (let j = 0; j < 4; j++) {
                                                        let arrowLeft = document.createElement("i");
                                                        arrowLeft.className = "fa fa-arrow-left";
                                                        element.appendChild(arrowLeft);
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        console.dir(arrowBox);
                                    }
                                });
                            }
                        } else {
                            activCounter++;
                        }
                    }
                }
            }
        },
        section_1: {
            _attributes: {
                class: "product-card-slogan"
            },
            h4: {
                $slogan: {
                    heading: {
                        _type: "text",
                        _value: ""
                    },
                }
            },
            p: {
                $slogan: {
                    text: {
                        _type: "text",
                        _value: ""
                    }
                }
            }
        },
        section_2: {
            _attributes: {
                class: "product-card-price"
            },
            p: {
                $abo: {
                    price: {
                        _type: "text"
                    }
                },
                span: {
                    $abo: {
                        period: {
                            _type: "text"
                        }
                    }
                }
            }
        },
        section_3: {
            _attributes: {
                class: "product-card-features"
            },
            p: {
                $features: {
                    _type: "text"
                }
            }
        },
        footer: {
            _attributes: {
                class: "product-card-order"
            },
            a: {
                $theme: {
                    _type: "_attributes",
                    _value: {
                        id: ""
                    }
                },
                $active: {
                    _type: "_attributes",
                    _value: {
                        data_productActive: ""
                    }
                },
                _attributes: {
                    href: "/shoppingPage",
                    class: "button",
                    innerHTML: "<i class='fa fa-shopping-cart icon-left'></i> Jetzt registrieren",
                    addEvent: {
                        type: "click",
                        doThat: (event) => {

                            let active = event.target;

                            let productActive = !!(active.dataset.productactive);

                            if(productActive === true) {

                                let path = "surface/config/products" + products[event.target.id];

                                window.sessionStorage.setItem("card", path);
                            } else {

                                // Erstellen eines Containers, welcher sich über die Produktkarte legt und sagt, dass das gerade nicht zur Verfügung steht
                            }

                        }
                    }
                }
            }
        }
    }
}