<?php
namespace Partarum\System\Memory {

    use JsonException;
    use Shmop;

    class SharedFactory {

        protected static function getOwnCache($ownCacheInstance, $key, $size ) : array | bool {

            $ownInstance = NULL;

            $ownCache = NULL;

            if($ownCacheInstance === NULL){

               $ownInstance =  self::getOwnCacheInstance($key, $size);

               $ownCache = SharedHelper::jsonToArray(shmop_read($ownInstance, 0, $size));

            } else {

                return TRUE;
            }

            return (isset($ownInstance, $ownCache)) ? ["instance" => $ownInstance, "cache" => $ownCache] : FALSE;
        }

        private static function getOwnCacheInstance($key, $size) : Shmop | null {

            return self::getCacheInstance($key,$size) ?? self::createCacheInstance($key, $size);
        }

        protected static function createCacheInstance(int $key, int $size = 1024) : Shmop | null {

            echo "<p>create Cache Instance</p>";

            $cacheInstance = shmop_open($key, "c", 0644, $size);

            return ($cacheInstance !== false) ? $cacheInstance : NULL;
        }

        protected static function getCacheInstance(int $key, int $size = 1024) : Shmop | null {

            echo "<pre>";

            var_dump($size);

            var_dump(dechex($key));

            debug_print_backtrace();

            $cacheInstance = FALSE;

            if($testInstance = shmop_open($key, "a", 0644, $size)) {

                $cacheInstance = shmop_open($key, "w", 0644, $size);

                var_dump($cacheInstance);
            }

            return ($cacheInstance !== FALSE) ? $cacheInstance : NULL;
        }
    }
}