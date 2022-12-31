/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
export default {
    ol: {
        _attributes: {
            class: "codeBox"
        },
        li: [
            {
                _attributes: {
                    text: ".php - Datei erstellen und im Ordner app ablegen"
                },
                ol: {
                    li: [
                        {
                            _attributes: {
                                text: "Pfad mit gewünschtem Routing - Name in die routes-manifest.json schreiben"
                            }
                        }
                    ]
                }
            },
            {
                _attributes: {
                    text: "Grundaufbau in die php implementieren"
                }
            },
            {
                _attributes: {
                    text: "Die .js - Datei erstellen, welche in der .php als Modul eingebunden wird und den Javascript - Teil implementiert"
                },
                ol: {
                    li: {
                        _attributes: {
                            text: "Pfad mit gewünschten Routing - Name in die surface-manifest.json schreiben"
                        }
                    }
                }
            },
            {
                _attributes: {
                    text: "Sämtliche statischen import - Anweisungen, welche Javascript exportieren gehören auch im Routing definiert"
                },
                ol: {
                    li: "Dazu bitte die surface-manifest.json benutzen"
                }
            },
            {
                _attributes: {
                    text: "Sämtliche dynamischen Import - Anweisungen, welche Javascript exportieren gehören auch im Routing definiert"
                },
                ol: {
                    li: [
                        "Zur Zeit noch in der surface-manifest.json",
                        "sowohl auch in der surface-import.json"
                    ]
                }
            }
        ]
    }
}