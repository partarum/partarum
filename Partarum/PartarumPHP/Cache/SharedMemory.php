<?php
namespace Partarum\Cache {

    use Partarum\System\Memory\SharedHelper;
    use Partarum\System\Memory\SharedManager;
    use Shmop;


    class SharedMemory {

        private $id;

        private int $key;

        private Shmop $memory;


        public function __construct(int | null $key = NULL) {

            $attach = SharedManager::attach($key);

            $this->memory = $attach["memory"];

            $this->key = $attach["key"];
        }

        public function open(){

        }

        public function close(){

        }

        public function read($offset = 0, $size = 0) : null | array {

            return SharedHelper::jsonToArray(shmop_read($this->memory, $offset, $size));

        }

        public function write($data) : null | bool | int {

            $json = SharedHelper::dataToJSON($data);

            if($json !== NULL){

                return shmop_write($this->memory, $json, 0);
            }

            return NULL;

        }

        public function add(){

        }

        public function get(){

        }

        public function remove(){

            SharedManager::remove($this->memory, $this->key, $this->id); // muss natürlich noch aus dem Manager !!!

            $this->__destruct();
        }

        public function __destruct() {


        }


    }
}