<?php
namespace Partarum\Design\TraidChain {

    use WeakMap;

    class Storage {

        public static null | WeakMap $factory;

        public static null | WeakMap $area;

        public static null | WeakMap $catalog;

        public static null | WeakMap $category;

        public static null | WeakMap $section;
        
        public static null | WeakMap $team;
        
        public static null | WeakMap $worker;
        
        public static null | WeakMap $task;
        
        public static null | WeakMap $cache;

        
        public static function add($type, $object, $value) : void {

            self::setWeakMap($type);

            // ! prüfen ob Object schon in der WeakMap ist !!!

            switch($type){

                case "factory":

                    self::$factory->offsetSet($object, $value);
                    break;

                case "area":

                    self::$area->offsetSet($object, $value);
                    break;

                case "catalog":

                    if(!self::$catalog->offsetExists($object)) {

                        self::$catalog->offsetSet($object, $value);
                    } else {

                        echo "<h1>Object schon vorhanden!</h1>";

                    }
                    break;

                case "category":

                    self::$category->offsetSet($object, $value);
                    break;

                case "section":

                    self::$section->offsetSet($object, $value);
                    break;

                case "team":

                    self::$team->offsetSet($object, $value);
                    break;

                case "worker":

                    self::$worker->offsetSet($object, $value);
                    break;

                case "task":

                    self::$task->offsetSet($object, $value);
                    break;

                case "cache":

                    self::$cache->offsetSet($object, $value);
                    break;
            }

        }

        public static function get($type, $object){
            return self::${$type}->offsetGet($object);
        }

        public static function getObject(string $theme, object $object) : object{

            return self::${$theme}->offsetGet($object);
        }

        public static function getTheme(string $theme) : bool | WeakMap {

            return (self::is($theme)) ? self::${$theme} : FALSE;
        }

        public static function is($type) : bool{

            return !isset(self::${$type});

        }

        public static function getCatalog(){

            return self::$catalog;
        }

        private static function setWeakMap($type) : void {

            if(self::is($type)){

                self::${$type} = new WeakMap();
            }
        }
    }
}