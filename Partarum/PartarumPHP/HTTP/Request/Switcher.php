<?php
namespace Partarum\HTTP\Request {

    use Partarum\Cache\SharedMemory;

    class Switcher {

        /*
         *  From Switch to the Router, then dispatch the Route!
         */

        private static null | SharedMemory $RouteCache;

        private static null | SharedMemory $RouterCache;

        private static function setBase(){

            if(!isset(self::$RouteCache, self::$RouterCache)) {

                self::$RouteCache = new SharedMemory();

                self::$RouterCache = new SharedMemory();
            }
        }


        public static function setRouter(){

        }

        public static function getRouter(){

        }

        public static function setRoute(){

        }

        public static function getRoute(){

        }
    }
}