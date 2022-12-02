/*
 *           Copyright 2020 © Alexander Bombis. All rights reserved.
 *           Developed by Alexander Bombis.
 *           Email: email@alexander-bombis.de
 *
 *           The following code was created based on the template for the website http://cordes-software.de.
 *           This may also be used in full by the person or business
 *           representing the domain "cordes-software.de"
 *           and also modified for their use.
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