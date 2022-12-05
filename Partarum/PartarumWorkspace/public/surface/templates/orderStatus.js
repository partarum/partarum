/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

export default {
    header: {
        _attributes: {
            id: "order_status"
        },
        ul: {
            li_1: {
                $before: {
                    css: {
                        _type: "_attributes",
                        _value: {
                            class: ""
                        }
                    },
                    text: {
                        _type: "text"
                    }
                }
            },
            li_2: {
                $now: {
                    css: {
                        _type: "_attributes",
                        _value: {
                            class: ""
                        }
                    },
                    text: {
                        _type: "text"
                    }
                }
            },
            li_3: {
                $after: {
                    css: {
                        _type: "_attributes",
                        _value: {
                            class: ""
                        }
                    },
                    text: {
                        _type: "text"
                    }
                }
            }
        }
    }
}