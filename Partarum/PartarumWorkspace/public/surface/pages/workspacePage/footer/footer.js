/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
import surface from "/Partarum/Workspace/surface/import";

export default {
    section_1: {
        _attributes: {
            id: "footer_primary",
            class: "media-box-row"
        },
        article: {
            _attributes: {
                id: "footer_leftSide"
            },
            _import: surface.landingPage.footer.footerBoxLeft
        },
        aside: {
            _attributes: {
                id: "footer_rightSide",
                class: "box-column"
            },
            _import: surface.landingPage.footer.footerBoxRight
        }
    },
    section_2: {
        _attributes: {
            id: "footer_secondary",
            class: "copyright-box"
        },
        p: {
            _attributes: {
                text: "Copyright © 2018-2021 self::$plainPHP; | partarum | Alexander Bombis. All Rights Reserved."
            }
        }
    }
}