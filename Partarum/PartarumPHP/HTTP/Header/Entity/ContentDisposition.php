<?php
namespace Partarum\HTTP\Header\Entity {

    use InvalidArgumentException;
    use Partarum\HTTP\Header\Entity;

    class ContentDisposition {

        public const INLINE = "inline";

        public const ATTACHMENT = "attachment";

        public const FORM = "form-data";
    }
}