/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

export default {
    section: {
        header: {
            aside: {
                _attributes: {
                    class: "box-row space-evenly"
                },
                i_1: {
                    $leftIcon: {
                        _type: "_attributes",
                        _value: {
                            class: ""
                        }
                    }
                },
                i_2: {
                    $rightIcon: {
                        _type: "_attributes",
                        _value: {
                            class: ""
                        }
                    }
                }
            },
            h3: {
                $headline: {
                    _type: "text"
                }
            }
        },
        footer: {
            _attributes: {
                class: "text-setLeft"
            },
            p: {
                $description: {
                    _type: "text"
                }
            }
        }
    }
}