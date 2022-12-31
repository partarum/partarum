<?php
namespace Partarum\Design\TraidChain {

    class Agent {

        /*
         *  Was macht der Agent?
         *
         *  Er koordiniert die Abwicklung und konfiguriert das Produkt
         */


        public null | Factory $factory;

        public null | Catalog $catalog;

        public null | Store $store;

        public function setFactory(Factory | string $factory){

            if(!isset($this->factory)) {

                $this->factory = (is_string($factory)) ? new $factory() : $factory;
            }
        }

        public function setCatalog(Catalog | string $catalog){

            if(!isset($this->catalog)){

                $this->catalog = (is_string($catalog)) ? new $catalog() : $catalog;
            }

        }

        public function showCatalog(){

            echo "<h3>Agent - showCatalog</h3>";
            print_r($this->catalog);
            print_r($this->catalog->getCatalog());
            //print_r(Storage::$catalog); // ! leer
            //print_r(Storage::$section); // ! leer
        }

        public function addProduct($product){

            $this->checkStore();

        }

        public function showProducts(){

        }

        public function issetProduct(){

        }

        public function getProduct(){

        }

        private function checkStore(){

            (!isset($this->store)) && $this->createStore();
        }

        private function createStore(){

            $this->store = new Store();
        }
    }
}