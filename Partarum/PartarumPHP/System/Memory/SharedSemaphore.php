<?php
namespace Partarum\System\Memory {

    use SysvSemaphore;

    class SharedSemaphore {

        private static array $semKeyCache = [];

        private static array $semIDCache = [];

        private static array $semCache = [];


        public static function attach($key) : bool | SysvSemaphore{


        }
    }
}