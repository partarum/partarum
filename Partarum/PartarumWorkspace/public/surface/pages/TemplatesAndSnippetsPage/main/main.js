/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
import surface from "/surface/import";
import {globalConfig} from "/surface/config";

export default {

    article_sidebar: {
        _attributes: {
            id: "partarumSidebar"
        },
        _import: surface.partarumPage.main.sidebar.container
    },
    article_documentation: {
        _attributes: {
            id: "partarumDocumentation"
        },
        header: {
            h1: "Einführung in partarum.js"
        },
        section_folderStructure: {
            _attributes: {
                class: "box-column"
            },
            h3: "Ordnerstruktur und  Showbox",
            article: {
                _attributes: {
                    class: "box-row box-evenly codeBox "
                },
                _import: surface.partarumPage.main.folderStructure
            }
        },
        section_start: {
            h3: "Implementierung von partarum.js"

        },
        section_firstStep: {
            h3: "Erste Schritte",
            ol: {
                li: [
                    {
                        _attributes: {
                            text: "Wichtig!"
                        },
                        _import: surface.partarumPage.main.important
                    },
                    {
                        _attributes: {
                            text: "Für jede Seite muss eine .php geschrieben werden und im Ordner app abgelegt werden!"
                        },
                        pre: {
                            _attributes: {
                                class: "codeBox"
                            },
                            code_1: {
                                _attributes: {
                                    class: "language-html",
                                    text: Partarum.Loader.fetchFile("/fetch/partarumPage/construction/html/firstStep", "text")
                                }
                            }
                        }
                    },
                    {
                        _attributes: {
                            text: "Die 'JavascriptZurSeite.js' folgt folgenden Aufbau: "
                        },
                        pre: {
                            _attributes: {
                                class: "codeBox"
                            },
                            code: {
                                _attributes: {
                                    class: "language-js",
                                    text: Partarum.Loader.fetchFile("/fetch/partarumPage/construction/js/implementationSite", "text")
                                }
                            }
                        }
                    },
                    {
                        _attributes: {
                            text: "Der Aufbau der Javascript Datei zum Thema - z.B.: header"
                        },
                        pre: {
                            _attributes: {
                                class: "codeBox"
                            },
                            code: {
                                _attributes: {
                                    class: "language-js",
                                    text: Partarum.Loader.fetchFile("/fetch/partarumPage/construction/js/implementationTheme", "text")
                                }
                            }
                        }
                    }
                ]
            }
        }
    }
}