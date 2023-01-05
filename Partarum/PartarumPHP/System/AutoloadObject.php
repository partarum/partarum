<?php
namespace Partarum\System {

    use stdClass;

    class AutoloadObject {

        private static ?object $cache = NULL;

        public static function setClassPath($class, $path){

        }

        /**
         * @param $namespace
         * @param $path
         *
         * @return mixed
         */
        public static function setNamespaceRoot($namespace, $path){

            (!isset(self::$cache)) &&  self::setBase();

            self::$cache->{$namespace} = $path;

            return $path;
        }

        /**
         * @param $namespace
         *
         * @return false
         */
        public static function getNamespaceRoot($namespace){

            return self::$cache->{$namespace} ?? FALSE;
        }

        private static function setBase(){
            self::$cache = new stdClass();
        }

        public static function getList(){
            return self::$cache;
        }
    }
}