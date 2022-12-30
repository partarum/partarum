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
                    href: ViewKit.getURL("imprintBase"),
                    text: "Angaben gemäß § 5 TMG"
                },
            },
        },
        {
            a: {
                _attributes: {
                    href: ViewKit.getURL("contentLiability"),
                    text: "Haftung für Inhalte"
                }
            }
        },
        {
            a: {
                _attributes: {
                    href: ViewKit.getURL("linkLiability"),
                    text: "Haftung für Links"
                }
            }
        },
        {
            a: {
                _attributes: {
                    href: ViewKit.getURL("imprintCopyright"),
                    text: "Urheberrecht"
                }
            }
        }
    ]
}