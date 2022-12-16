<?php
namespace Partarum\System\Memory {

    use RuntimeException;
    use Shmop;

    class SharedKeyCache  extends SharedFactory implements SharedCacheInterface {

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

                $cache = parent::getOwnCache(self::$ownCacheInstance, SharedCatalog::KEYCACHE_KEY, SharedCatalog::KEYCACHE_SIZE);

                if(is_array($cache)) {

                    self::$ownCacheInstance = $cache["instance"];

                    self::$ownCache = $cache["cache"];

                } else {

                    return $cache;
                }
            }

            return true;
        }

        public static function add($data) : bool{

            if(self::init()) {

                try {

                    self::$ownCache[] = $data;

                    $process = shmop_write(self::$ownCacheInstance, $data, 0);

                    return (bool)$process;

                } catch (RuntimeException $rex) {

                    return FALSE;
                }
            }

            return FALSE;
        }

        public static function get($data){

            if(self::init()){

            }

        }

        public static function has($data) : bool {

            if(self::init()) {

                return isset(self::$ownCache) && in_array($data, self::$ownCache, TRUE);
            }

            return FALSE;
        }
    }
}