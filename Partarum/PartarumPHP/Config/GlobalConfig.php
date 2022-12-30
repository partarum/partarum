<?php
namespace Partarum\Config {

    class GlobalConfig {

        public static $theme;

        public static $ses;

        public static $style;

        public static $presentation;

        public static $public;

        public static $private;

        public static $wrapper;

        public static function setTheme($theme){

            self::$theme = $theme;
        }

        public static function setSes($ses){

            self::$ses = $ses;
        }

        public static function setStyle($style){

            self::$style = $style;
        }

        public static function setPresentation($presentation){

            self::$presentation = $presentation;
        }

        public static function setPrivate($private){

            self::$private = $private;
        }

        public static function setPublic($public){

            self::$public =$public;
        }

        public static function setWrapper($wrapper){
            self::$wrapper = $wrapper;
        }

    }
}
