<?php
namespace Partarum\Service {

    use Partarum\Cache\WorkerMap;
    use Partarum\Service\Binary\FlagWorker;
    use WeakMap;

    // TODO Abändern - eigentlich ist das eine große globale Storage - Klasse - auch eine Fabrik, aber auch nur eine Ableitung !!!!!!

    class Factory {

        private static ?WeakMap $map = NULL;

        private static ?WorkerMap $workerMap = NULL;

        private static int $counter = 0;

        private static function status(){

            (!isset(self::$map)) && self::setMap();
        }

        public static function addWorker(){

            self::createWorker();

        }

        public static function createWorker(){

            self::status();

            $workerID = str_replace([".", " "], "_", "FlagWorker_" . microtime());

            $worker = self::$workerMap->setWorker($workerID, FlagWorker::class);

            self::$map->offsetSet($worker, $workerID);

            return $worker;
        }

        public static function checkWorker(){

        }

        public static function deleteWorker(){

        }

        public

        private static function setMap(){

            self::$map = new WeakMap();

            self::$workerMap = new WorkerMap();
        }
    }
}
