<?php
namespace Partarum\System\Memory {

    use Shmop;

    class SharedLastKeyCache extends SharedFactory implements SharedCacheInterface{

        /**
         * @var Shmop|null
         */
        private static Shmop | null $ownCacheInstance;

        /**
         * @var array|null
         */
        private static array | null $ownCache;

        private static function init() : bool {

            if(!isset(self::$ownCacheInstance, self::$ownCache)) {

                $cache = parent::getOwnCache(self::$ownCacheInstance, SharedCatalog::LAST_KEYCACHE_KEY, SharedCatalog::LAST_KEYCACHE_SIZE);

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