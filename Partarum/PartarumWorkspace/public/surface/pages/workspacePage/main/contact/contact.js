/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
import {setTrueResponse} from "/surface/landingPage/main/contact/setTrueResponse";

export default {
    header: {
        h1: {
            _attributes: {
                text: "Kontakt"
            }
        },
        p: [
            "Unsere Techniker können Ihnen die besten maßgeschneiderten Lösungen auf dem Markt anbieten,",
            "egal ob Sie ein kleines Unternehmen oder ein großes Unternehmen sind."
        ]
    },
    section: {
        form: {
            _attributes: {
                id: "contactForm",
            },
            fieldset: {
                article: {
                    _attributes: {
                        id: "formContent",
                        class: "box-column"
                    },
                    header: {
                        _attributes: {
                            class: "registrationPart"
                        },
                        section_1: {
                            _attributes: {
                                id: "nameBox",
                                class: "registrationField box-row"
                            },
                            section_1: {
                                _attributes: {
                                    class: "box-row"
                                },
                                label: {
                                    _attributes: {
                                        for: "form_Name",
                                        text: "Name"
                                    }
                                }
                            },
                            section_2: {
                                _attributes: {
                                    class: "box-row"
                                },
                                input: {
                                    _attributes: {
                                        id: "form_Name",
                                        type: "text",
                                        name: "name"
                                    }
                                }
                            }
                        },
                        section_2: {
                            _attributes: {
                                id: "emailBox",
                                class: "registrationField box-row"
                            },
                            section_1: {
                                _attributes: {
                                    class: "box-row"
                                },
                                label: {
                                    _attributes: {
                                        for: "form_Email",
                                        text: "Email"
                                    }
                                }
                            },
                            section_2: {
                                _attributes: {
                                    class: "box-row"
                                },
                                input: {
                                    _attributes: {
                                        id: "form_Email",
                                        type: "email",
                                        name: "email"
                                    }
                                }
                            }
                        }
                    },
                    section: {
                        _attributes: {
                            class: "registrationPart"
                        },
                        section_1: {
                            _attributes: {
                                id: "subjectBox",
                                class: "registrationField box-row"
                            },
                            section_1: {
                                _attributes: {
                                    class: "box-row"
                                },
                                label: {
                                    _attributes: {
                                        for: "form_Subject",
                                        text: "Betreff"
                                    }
                                }
                            },
                            section_2: {
                                _attributes: {
                                    class: "box-row"
                                },
                                input: {
                                    _attributes: {
                                        id: "form_Subject",
                                        type: "text",
                                        name: "subject"
                                    }
                                }
                            }
                        },
                        section_2: {
                            _attributes: {
                                id: "messageBox",
                                class: "registrationField box-row"
                            },
                            section_1: {
                                _attributes: {
                                    class: "box-row"
                                },
                                label: {
                                    _attributes: {
                                        for: "form_Message",
                                        text: "Nachricht"
                                    }
                                }
                            },
                            section_2: {
                                _attributes: {
                                    class: "box-row"
                                },
                                textarea: {
                                    _attributes: {
                                        id: "form_Message",
                                        name: "message",
                                        class: "w100",
                                        rows: "10"
                                    }
                                }
                            }
                        }
                    },
                    footer: {
                        _attributes: {
                            class: "registrationPart box box-end"
                        },
                        button: {
                            _attributes: {
                                type: "button",
                                class: "button-secondary",
                                addEvent: {
                                    type: "click",
                                    doThat: () => {
                                        let formD = new FormData(document.getElementById("contactForm"));

                                        fetch("/contact", {
                                            method: 'post',
                                            body: formD,
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                console.dir(data);
                                                (data !== false) && setTrueResponse(data);
                                            })
                                            .catch((error) => {
                                                console.error('Error:', error);
                                            });
                                    }
                                },
                                innerHTML: "<i class=\"fa fa-envelope icon-left\"></i>Nachricht senden"
                            }
                        }
                    }
                }
            }
        }
    }
}