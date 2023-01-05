/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

export default {
    landingPage: {
        header: {   //ein Template daraus machen
            container: "/Partarum/PartarumWorkspace/surface/landingPage/header",
            logoBox: "/Partarum/Workspace/surface/landingPage/header/logoBox",
            menuBox: "/Partarum/Workspace/surface/landingPage/header/menuBox"
        },
        aside: {
            container: "/Partarum/Workspace/surface/landingPage/aside"
        },
        main: {
            container: "/Partarum/Workspace/surface/landingPage/main"
        },
        footer: {   // ein Template daraus machen
            container: "/Partarum/Workspace/surface/landingPage/footer",
            footerBoxLeft: "/Partarum/Workspace/surface/landingPage/footer/footerBoxLeft",
            footerBoxRight: "/Partarum/Workspace/surface/landingPage/footer/footerBoxRight"
        }
    },
    plainPHPPage: {
        header: {

        },
        main: {

        },
        footer: {

        }
    },
    partarumPage: {
        header: {
            container: "/surface/partarumPage/header"
        },
        main: {
            container: "/Partarum/Workspace/surface/partarumPage/main",
            sidebar: {
                container: "/surface/partarumPage/main/sidebar"
            },
            folderStructure: "/surface/partarumPage/main/folderStructure",
            important: "/surface/partarumPage/main/important"
        },
        footer: {
            container: ""
        }
    },
    conditionPage: {
        header: {
            container: "/surface/global/header"
        },
        main: {
            container: "/surface/conditionPage/main",
            navigation: {

            },
            showbox: {
                imprint: {
                    base: "/surface/conditionPage/main/imprint/base",
                    contentLiability: "/surface/conditionPage/main/imprint/contentLiability",
                    linkLiability: "/surface/conditionPage/main/imprint/linkLiability",
                    copyright: "/surface/conditionPage/main/imprint/copyright"
                },
                dataProtection: {
                    base: "/surface/conditionPage/main/dataProtection/base",
                    overview: "/surface/conditionPage/main/dataProtection/overview",
                    generalInformation: "/surface/conditionPage/main/dataProtection/generalAndMandatoryInformation",
                    dataAcquisition: {
                        container: "/surface/conditionPage/main/dataProtection/dataAcquisition",
                        content: "/surface/conditionPage/main/dataProtection/dataAcquisition/text"
                    },
                    newsletterAndPostal: "/surface/conditionPage/main/dataProtection/newsletterAndPostal",
                    pluginsAndTools: "/surface/conditionPage/main/dataProtection/pluginsAndTools",
                    eCommerceAndPayment: "/surface/conditionPage/main/dataProtection/eCommerceAndPaymentProviders",
                    ownServices: "/surface/conditionPage/main/dataProtection/ownServices"
                }
            }
        },
        footer: {
            container: "/surface/global/footer"
        }
    },
    global: {
        header: {
            container: "/surface/global/header"
        },
        footer: {
            container: "/surface/global/footer"
        }
    }
}