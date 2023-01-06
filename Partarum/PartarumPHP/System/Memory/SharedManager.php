<?php
namespace Partarum\System\Memory {

    use JsonException;
    use Partarum\System\Root;

    class SharedManager extends SharedFactory {

        /**
         * @var array
         */
        private static array $shmodCache = [];

        /**
         * @var string|null
         */
        private static string | null $root = NULL;


        /**
         * Checks if there is an shmop instance with the key in the Cache
         *
         * @param string|int|null $key The Key for the Shmop
         * @param int|null        $size The Size for the RAM
         *
         * @return array An Array with the instance and the key
         */
        public static function attach(null | string | int $key = null, null | int $size = 1024) : array {

            if(self::$root === NULL) {
                self::$root = Root::getPath();
            }

            $inode = self::createKey($key);

            if(!SharedKeyCache::has($inode)) {

                SharedKeyCache::add($inode);
            }

            if(!in_array($inode, self::$shmodCache, TRUE)){

                self::$shmodCache[$inode] = shmop_open($inode, "c", 0644, $size);
            }

            return ["key" => $inode, "memory" => self::$shmodCache[$inode]];
        }

        public static function detach(){

        }

        public static function remove($instance, $key, $id){

        }

        private static function getKeyFromString(string | NULL $string = NULL) : int{

            $key = 0;

            if($string !== NULL){

                $key = (file_exists($string)) ? fileinode($string) : 0;

            } else {

                $file = self::createFileForInode();

                $key = $file["inode"]; // ! Key muss noch an den Programmierer zurückgegeben werden

            }



            return $key;
        }

        private static function createKey($key) : int {

            return match(gettype($key)){
                "string" => self::getKeyFromString($key), // überprüfen ob String ein Filepath ist oder ein String zum verhexen
                "integer" => $key, // noch eine Testfunktion schreiben ob ein HEX-Wert (length: 2 || 4 || 6 ....) übergeben wurde
                "NULL" => self::getKeyFromString()
            };
        }

        private static function createFileForInode() : array | null {

            $timestamp = time();

            $timeString = (string) $timestamp;

            $date = getDate($timestamp);

            $fileName = date("Y_m_d", $timestamp) . "_" . $timeString;

            try {

                $json = json_encode($date, JSON_THROW_ON_ERROR);

                $path = ROOT . SLASH . "Partarum" . SLASH . "PartarumLorem" . SLASH . "SharedMemory" . SLASH . $fileName . ".json";

                file_put_contents($path, $json);

                $inode = fileinode($path);

                $smPath = ROOT . SLASH . "Partarum" . SLASH . "PartarumLorem" . SLASH . "SharedMemory" . SLASH . ".SM.json";

                $smJSON = file_get_contents($smPath);

                $smJSONArray = json_decode($smJSON, TRUE, 512, JSON_THROW_ON_ERROR);

                $smJSONArray[$fileName] = $inode;

                file_put_contents($smPath, json_encode($smJSONArray, JSON_THROW_ON_ERROR));

                return ["file" => $path, "inode" => $inode];

            } catch(JSONException $jex){

                return NULL;
            }
        }

    }
}