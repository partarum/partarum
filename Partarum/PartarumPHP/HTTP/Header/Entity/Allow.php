<?php
namespace Partarum\HTTP\Header\Entity {

    use InvalidArgumentException;
    use Partarum\HTTP\Header\Entity;

    class Allow {

        public const GET = "GET";

        public const POST = "POST";

        public const PUT = "PUT";

        public const DELETE = "DELETE";

        public const CONNECT = "Connect";

        public const OPTIONS = "Options";

        public const TRACE = "Trace";

        public const PATCH = "Patch";

    }
}