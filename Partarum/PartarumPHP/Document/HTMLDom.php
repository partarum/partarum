<?php
namespace Partarum\Document {

    class HTMLDom {

        public static array $path;

        public static string $html;

        public function __construct(){

        self::$path["html"] = "surface/html";

        }

        public function getPath($name){

            return $this->$name;

        }

        public function __set($name, $value)
        {
            $this->$name = $value;
        }

        public function __get($name)
        {
            return $this->$name;
        }
    }
}
