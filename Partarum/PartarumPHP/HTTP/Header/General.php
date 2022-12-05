<?php
namespace Partarum\HTTP\Header {

    interface General {

        public const ALLOWED_FIELDS_GENEREL = [
            "Accept",
            "Cache-Control",
            "Connection",
            "Date",
            "Pragma",
            "Trailer",
            "Transfer-Encoding",
            "Upgrade",
            "Via",
            "Warning"
        ];

        public const CACHE_CONTROL = [
            "Cache-Control: " => [
                "public",
                "private",
                "co-cache",
                "only-if-cached",
                "no-transform"
            ]
        ];

        /*
         ! HTTP2 deprecated
         * */
        public const CONNECTION = [
            "Connectio: " => [
                "keep-alive",
                "close"
            ]
        ];

        public const TRANSFER_ENCODING = [
            "Transfer-Encoding: " => [
                "chunked",
                "compress",
                "deflate",
                "gzip",
                "identity"
            ]
        ];

        public const TRAILER = "Trailer: ";

    }
}