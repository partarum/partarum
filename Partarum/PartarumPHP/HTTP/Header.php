<?php
namespace Partarum\HTTP {

    use Partarum\HTTP\Header\Cause;
    use Partarum\HTTP\Header\Entity\ContentType;

    class Header extends Cause {



        public const TYPE_GENEREL = 0x000F;

        public const TYPE_REQUEST = 0x001E;

        public const TYPE_RESPONSE = 0x003C;

        public const TYPE_ENTITY = 0x0078;


        public const CONTENT_TYPE_JSON = ContentType::JSON;

        /*
         *  Erstellen einer Function, welcher auf die jeweiligen HTTP - Header Befehle zugreift und den Output anfordert
         *
         * Schema:
         *      Header -> Cause
         *          Cause implements Emtity Generel, Response und Request
         *
         *              Entity usw. beschreiben die jeweiligen Befehle in ihren Bereich
         *
         *              Für jeden Bereich gibt es einen Ordner und für jeden Befehl eine Klasse.
         *
         *
         */

    }
}