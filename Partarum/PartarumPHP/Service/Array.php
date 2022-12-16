<?php
namespace Partarum\Library {

    class typeArray {

        public static function is_Assoc(array &$array ) : bool {

            return is_array($array) and (array_values($array) !== $array);
        }

        public static function every(array &$array, $function)  : bool {

            foreach($array as $key => $value){

                if(!$function($value)){ return FALSE;}
            }

            return TRUE;

        }

    }
}