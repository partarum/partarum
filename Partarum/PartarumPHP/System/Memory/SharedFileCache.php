<?php
namespace Partarum\System\Memory {

    use Shmop;

    class SharedFileCache extends SharedFactory implements SharedCacheInterface{

        /**
         * @var Shmop|null
         */
        private static Shmop | null $ownCacheInstance = NULL;

        /**
         * @var array|null
         */
        private static array | null $ownCache = NULL;

        private static function init() : bool {

            if(!isset(self::$ownCacheInstance, self::$ownCache)) {

                $cache = parent::getOwnCache(self::$ownCacheInstance, SharedCatalog::FILECACHE_KEY, SharedCatalog::FILECACHE_SIZE);

                if(is_array($cache)) {

                    self::$ownCacheInstance = $cache["instance"];

                    self::$ownCache = $cache["cache"];

                } else {

                    return $cache;
                }
            }

            return true;
        }


        public static function add($data){

        }

        public static function get($data){

        }

        public static function has($data){

        }
    }
}