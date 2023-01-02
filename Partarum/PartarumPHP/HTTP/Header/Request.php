<?php
namespace Partarum\HTTP\Header {

    interface Request {

        public const ALLOWED_FIELDS_REQUEST = [
            "Accept-Charset",
            "Accept-Encoding",
            "Accept-Language",
            "Authorization",
            "Cookie",
            "Date",
            "DNT",
            "ETag",
            "Expect",
            "From",
            "Host",
            "If-Match",
            "If-Modified-Since",
            "If-None-Match",
            "If-Range",
            "If-Unmodified-Since",
            "Max-Forwards",
            "Proxy-Authorization",
            "Range",
            "Referer",
            "TE",
            "Transfer-Encoding",
            "User-Agent"
        ];

        public const START_FLAG_REQUEST = 0x05;

        public const AUTHORIZATION = "Authorization: Basic ";
    }
}