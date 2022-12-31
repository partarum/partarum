/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
import {ViewKit} from "/Partarum/ViewKit";

export default {

    $part: [
        {
            a: {
                _attributes: {
                    href: ViewKit.getURL("dataProtectionOverview"),
                    text: "Datenschutz auf einem Blick"
                }
            },
            ol: {
                li: [
                    {
                        a: {
                            _attributes: {
                                href: ViewKit.getURL("dataProtectionComment"),
                                text: "Allgemeine Hinweise"
                            }
                        }
                    },
                    {
                        a: {
                            _attributes: {
                                href: ViewKit.getURL("dataAcquisitionThisSite"),
                                text: "Datenerfassung auf dieser Webseite"
                            },
                        },
                        ol: {
                            li: [
                                {
                                    a: {
                                        _attributes: {
                                            href: ViewKit.getURL("dataAcquisitionResponsible"),
                                            text: "Wer ist verantwortlich für die Datenerfassung auf dieser Website?"
                                        }
                                    }
                                },
                                {
                                    a: {
                                        _attributes: {
                                            href: ViewKit.getURL("dataAcquisitionHowTo"),
                                            text: "Wie erfassen wir Ihre Daten?"
                                        }
                                    }
                                },
                                {
                                    a: {
                                        _attributes: {
                                            href: ViewKit.getURL("dataAcquisitionWhatWeDo"),
                                            text: "Wofür nutzen wir Ihre Daten?"
                                        }
                                    }
                                },
                                {
                                    a: {
                                        _attributes: {
                                            href: ViewKit.getURL("dataAcquisitionYourRights"),
                                            text: "Welche Rechte haben Sie bezüglich Ihrer Daten?"
                                        }
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            _attributes: {
                text: "Allgemeine Hinweise und Pflichtinformationen"
            },
            ol: {
                li: [
                    {
                        _attributes: {
                            text: "Datenschutz"
                        }
                    },
                    {
                        _attributes: {
                            text: "Hinweis zur verantwortlichen Stelle"
                        }
                    },
                    {
                        _attributes: {
                            text: "Speicherdauer"
                        }
                    },
                    {
                        _attributes: {
                            text: "Widerruf Ihrer Einwilligung zur Datenverarbeitung"
                        }
                    },
                    {
                        _attributes: {
                            text: "Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)"
                        }
                    },
                    {
                        _attributes: {
                            text: "Beschwerderecht bei der zuständigen Aufsichtsbehörde"
                        }
                    },
                    {
                        _attributes: {
                            text: "Recht auf Datenübertragbarkeit"
                        }
                    },
                    {
                        _attributes: {
                            text: "SSL- bzw. TLS-Verschlüsselung"
                        }
                    },
                    {
                        _attributes: {
                            text: "Verschlüsselter Zahlungsverkehr auf dieser Website"
                        }
                    },
                    {
                        _attributes: {
                            text: "Auskunft, Löschung und Berichtigung"
                        }
                    },
                    {
                        _attributes: {
                            text: "Recht auf Einschränkung der Verarbeitung"
                        }
                    },
                    {
                        _attributes: {
                            text: "Widerspruch gegen Werbe-E-Mails"
                        }
                    }
                ]
            }
        },
        {
            _attributes: {
                text: "Datenerfassung auf dieser Webseite"
            },
            ol: {
                li: [
                    {
                        _attributes: {
                            text: "Cookies"
                        }
                    },
                    {
                        _attributes: {
                            text: "Server-Log-Dateien"
                        }
                    },
                    {
                        _attributes: {
                            text: "Kontaktformular"
                        }
                    },
                    {
                        _attributes: {
                            text: "Anfrage per E-Mail, Telefon oder Telefax"
                        }
                    },
                    {
                        _attributes: {
                            text: "Registrierung auf dieser Website"
                        }
                    }
                ]
            }
        },
        {
            _attributes: {
                text: "Newsletter und Postwerbung"
            },
            ol: {
                li: [
                    {
                        _attributes: {
                            text: "Newsletterdaten"
                        }
                    },
                    {
                        _attributes: {
                            text: "Postwerbung"
                        }
                    }
                ]
            }
        },
        {
            _attributes: {
                text: "Plugins und Tools"
            },
            ol: {
                li: [
                    {
                        _attributes: {
                            text: "Font Awesome (lokales Hosting)"
                        }
                    }
                ]
            }
        },
        {
            _attributes: {
                text: "eCommerce und Zahlungsanbieter"
            },
            ol: {
                li: [
                    {
                        _attributes: {
                            text: "Verarbeiten von Daten (Kunden- und Vertragsdaten)"
                        }
                    },
                    {
                        _attributes: {
                            text: "Datenübermittlung bei Vertragsschluss für Dienstleistungen und digitale Inhalte"
                        }
                    },
                    {
                        _attributes: {
                            text: "Zahlungsdienste"
                        },
                        ol: {
                            li: [
                                {
                                    _attributes: {
                                        text: "PayPal"
                                    }
                                },
                                {
                                    _attributes: {
                                        text: "Klarna"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            _attributes: {
                text: "Eigene Dienste"
            },
            ol: {
                li: [
                    {
                        _attributes: {
                            text: "Umgang mit Bewerberdaten"
                        },
                        ol: {
                            li: [
                                {
                                    _attributes: {
                                        text: "Umfang und Zweck der Datenerhebung"
                                    }
                                },
                                {
                                    _attributes: {
                                        text: "Aufbewahrungsdauer der Daten"
                                    }
                                },
                                {
                                    _attributes: {
                                        text: "Aufnahme in den Bewerber-Pool"
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
}