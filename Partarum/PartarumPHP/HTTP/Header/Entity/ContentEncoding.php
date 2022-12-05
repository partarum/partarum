<?php
namespace Partarum\HTTP\Header\Entity {

    use InvalidArgumentException;
    use Partarum\HTTP\Header\Entity;

    class ContentEncoding {

        public const GZIP = "gzip";

        public const COMPRESS = "compress";

        public const DEFLATE = "deflate";

        public const BROTLI = "br";

    }
}