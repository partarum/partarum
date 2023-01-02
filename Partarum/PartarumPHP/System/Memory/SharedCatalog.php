<?php
namespace Partarum\System\Memory {

    class SharedCatalog {

        /**
         *
         */
        public const KEY_MIN = 0x00000001;

        /**
         *
         */
        public const KEY_MAX = 0xFFFFFFFE;

        /**
         *
         */
        public const LAST_KEYCACHE_KEY = 0x11223345;

        /**
         *
         */
        public const LAST_KEYCACHE_SIZE = 10;

        /**
         *
         */
        public const FILECACHE_KEY = 0x11223346;

        /**
         *
         */
        public const FILECACHE_SIZE = 1024;

        /**
         *
         */
        public const KEYCACHE_KEY = 0x11223344;

        /**
         *
         */
        public const KEYCACHE_SIZE = 2048;
    }
}