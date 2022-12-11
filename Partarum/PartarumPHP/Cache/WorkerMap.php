<?php
namespace Partarum\Cache {

    class WorkerMap {

        public function setWorker(string $name, string $value) {

            echo "<pre>";
            print_r($name);
            echo PHP_EOL;
            print_r($value);
            echo PHP_EOL;
            echo microtime();



            $this->{$name} = new $value();
            
            return $this->{$name};
        }

        public function getWorker(string $name) {

            return $this->{$name};
        }

        public function isWorker(string $name) : bool {

            return isset($this->{$name});
        }
    }
}