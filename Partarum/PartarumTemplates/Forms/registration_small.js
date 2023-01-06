export default {
    h4: {
        $headline : {
            text: {
                _type: "text"
            },
            style: {
                _type: "_attributes",
                _value: {
                    style: ""
                }
            },
            class: {
                _type: "_attributes",
                _value: {
                    class: ""
                }
            }
        }
    },
    section: {
        _attributes: {
            class: "box-column"
        },
        label: {
            _attributes: {
                for: "email",
                text: "Trage hier bitte deine Email - Adresse ein"
            }
        },
        section: {
            _attributes: {
                class: "box-row"
            },
            i: {
                _attributes: {
                    class: "fa fa-at"
                }
            },
            input: {
                _attributes: {
                    type: "email",
                    id: "emailForRepeat",
                    placeholder: "Email",
                    autofocus: "",
                    required: "",
                    addEvent: Partarum.Events.keycheck("keyup", "enter", "emailForRepeat", "submit")
                }
            }
        },
        footer: {
            _attributes: {
                class: "box-row box-between"
            },
            aside: {
                _attributes: {
                    id: "emailValidation"
                },
                p: {

                }
            },
            a: {
                _attributes: {
                    id: "sendTheShit",
                    style: "display: none;"
                },
                $goalAddress: {
                    href: {
                        _type: "_attributes",
                        _value: "href"
                    }
                }
            },
            button: {
                _attributes: {
                    id: "submit",
                    class: "button-form button-secondary",
                    addEvent: Partarum.Events.validation("click", "email", "submit", "emailForRepeat", {backgroundColor: "#E6E6FA", color: "#8B0000"})
                }
            }
        }
    }
}