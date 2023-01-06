<?php
namespace Partarum\HTTP\Header {

    interface Response {

        public const ALLOWED_FIELDS_RESPONSE = [
            "Accept-Ranges",
            "Age",
            "Clear-Site-Data",
            "Content-Security-Policy",
            "Link",
            "Location",
            "Proxy-Authenticate",
            "P3P",
            "Retry-After",
            "Server",
            "Set-Cookie",
            "Vary",
            "WWW-Authenticate"
        ];

        public const START_FLAG_RESPONSE = 0x07;

        public const CLEAR_SITE_DATA = [
            "Clear-Site-Data: " => [
                "cookies",
                "cache",
                "storage",
                "executionContexts",
                "*"
            ]
        ];

        public const WWW_AUTHENTICATE = "WWW-Authenticate: Basic ";
    }
}