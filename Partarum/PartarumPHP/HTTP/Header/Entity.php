<?php
namespace Partarum\HTTP\Header {

    use Partarum\HTTP\Header;
    use Partarum\HTTP\Header\Entity\Allow;
    use Partarum\HTTP\Header\Entity\ContentType;

    interface Entity {

        public const ALLOWED_FIELDS_ENTITY = [
            "Allow",
            "Content-Disposition",
            "Content-Encoding",
            "Content-Language",
            "Content-Length",
            "Content-Location",
            "Content-MD5",
            "Content-Range",
            "Content-Type",
            "Expires",
            "Last-Modified"
        ];

        public const ALLOW = Allow::class;

        public const CONTENT_DISPOSITION = [
            "Content-Disposition: " => [
                "inline",
                "attachment",
                "form"
            ]
        ];

        public const CONTENT_ENCODING = [
            "Content-Encoding: " => [
                "gzip",
                "compress",
                "deflate",
                "br"
            ]
        ];

        public const CONTENT_LANGUAGE = "Content-Language: ";

        public const CONTENT_LENGTH = "Content-Length: ";

        public const CONTENT_LOCATION = "Content-Location: ";

        public const CONTENT_MD5 = "Content-MD5: ";

        public const CONTENT_RANGE = "Content-Range: ";

        /*
        public const CONTENT_TYPE = [
            "base" => ContentType::BASE,
            "options" => [
                "json",
                "html",
                "xml",
                "text"
            ]
        ];
        */

        public const CONTENT_TYPE = ContentType::class;

        public const EXPIRES = "Expires: ";

        public const LAST_MODIFIED = "Last-Modified: ";

    }
}