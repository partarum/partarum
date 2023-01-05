<?php
namespace Partarum\System\Memory {

    use JsonException;

    class SharedHelper {

        public static function dataToJSON($data) : null | string {

            try {

                return json_encode($data, JSON_THROW_ON_ERROR);

            } catch(JsonException $jex){

                return NULL;
            }
        }


        public static function jsonToArray($shmopString) : null | array {

            try {

                return json_decode(preg_replace('/[\x00-\x1F\x80-\x9F]/u', '',trim($shmopString)), TRUE, 512, JSON_THROW_ON_ERROR);

            } catch (JsonException $jex) {

                return NULL;
            }
        }

        public static function createHexString(int $num) : string {

            return "0x".str_pad(dechex($num), 8, "0", STR_PAD_LEFT);
        }
    }
}