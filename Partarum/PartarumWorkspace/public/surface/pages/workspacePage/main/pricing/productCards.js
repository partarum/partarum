/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
import surface from "/surface/import";
import productBox from "/surface/landingPage/main/pricing/productBox";
import WebBusiness from "/surface/config/products/WebBusiness";
import WebFree from "/surface/config/products/WebFree";
import WebEnterprise from "/surface/config/products/WebEnterprise";
import VSM from "/surface/config/products/VSM";
import VSS from "/surface/config/products/VSS";
import VSL from "/surface/config/products/VSL";


export default {
    header: {
        ul: {
            _attributes: {
                id: "product_switch_button",
                class: "switch-button"
            },
            li_1: {
                _attributes: {
                    class: "switch-active",
                    text: "Webhost",
                    addEvent: {
                        type: "click",
                        doThat: (event) => {
                            let switchButton = document.getElementById("product_switch_button");
                            let webspace = switchButton.children[0];
                            webspace.className = "switch-active";
                            let server = switchButton.children[1];
                            server.className = "switch-not-active";

                            document.getElementById("webspace").style.display = "flex";
                            document.getElementById("server").style.display = "none";
                        }
                    }
                }
            },
            li_2: {
                _attributes: {
                    class: "switch-not-active",
                    text: "Server",
                    addEvent: {
                        type: "click",
                        doThat: (event) => {
                            let switchButton = document.getElementById("product_switch_button");
                            let webspace = switchButton.children[0];
                            webspace.className = "switch-not-active";
                            let server = switchButton.children[1];
                            server.className = "switch-active";

                            document.getElementById("webspace").style.display = "none";
                            document.getElementById("server").style.display = "flex";
                        }
                    }
                }
            }
        }
    },
    section_1: {
        _attributes: {
            id: "webspace",
            class: "media-box-row space-around"
        },
        article_1: {
            _attributes: {
                class: "product-card"
            },
            _import: {
                template: {
                    name: "productBox",
                    surface: productBox,
                    valueFile: WebBusiness
                }
            }
        },
        article_2: {
            _attributes: {
                class: "product-card product-card-highlight"
            },
            _import: {
                template: {
                    name: "productBox",
                    surface: productBox,
                    valueFile: WebFree
                }
            }
        },
        article_3: {
            _attributes: {
                class: "product-card"
            },
            _import: {
                template: {
                    name: "productBox",
                    surface: productBox,
                    valueFile: WebEnterprise
                }
            }
        }
    },
    section_2: {
        _attributes: {
            id: "server",
            class: "media-box-row space-around"
        },
        article_1: {
            _attributes: {
                class: "product-card"
            },
            _import: {
                template: {
                    name: "productBox",
                    surface: productBox,
                    valueFile: VSM
                }
            }
        },
        article_2: {
            _attributes: {
                class: "product-card product-card-highlight"
            },
            _import: {
                template: {
                    name: "productBox",
                    surface: productBox,
                    valueFile: VSS
                }
            }
        },
        article_3: {
            _attributes: {
                class: "product-card"
            },
            _import: {
                template: {
                    name: "productBox",
                    surface: productBox,
                    valueFile: VSL
                }
            }
        }
    }
}