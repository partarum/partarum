<?php
namespace Partarum\HTTP\Header\Entity {

    use InvalidArgumentException;
    use Partarum\HTTP\Header\Entity;
    use Partarum\HTTP\Header\HeaderField;

    class ContentType implements HeaderField {

        public const BASE = "Content-Type: ";

        public const JSON = "application/json";

        public const TEXT = "text/plain";

        public const HTML = "text/html";

        public const XML = "text/xml";



        public static function getOutput($field) : string {

            $s = strtoupper($field);

            return (constant(self::class . "::$s")) !== NULL ? self::BASE . constant(self::class . "::$s") : false;
        }

    }
}