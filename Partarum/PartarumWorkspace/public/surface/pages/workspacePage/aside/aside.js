/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

export default {
    input: {
        _attributes: {
            type: "checkbox",
            class: "hamburger"
        }
    },
    nav: {
        _attributes: {
            id: "workspaceAsideMenu",
            class: "box-column space-between"
        },
        button_project: {
            _attributes: {
                type: "button"
            },
            i: {
                _attributes: {
                    class: "fa-duotone fa-diagram-project"
                }
            }
        },
        button_question: {
            _attributes: {
                type: "button"
            },
            i: {
                _attributes: {
                    class: "fa-duotone fa-circle-question"
                }
            }
        }
    }
}