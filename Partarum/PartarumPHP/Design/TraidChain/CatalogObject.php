<?php
namespace Partarum\Design\TraidChain {

    class CatalogObject {

        public function __set(string $name, $value) : void {
            // TODO: Implement __set() method.

            $this->{$name} = $value;
        }

        public function __get(string $name) {
            // TODO: Implement __get() method.

            return $this->{$name};
        }

        public function __isset(string $name) : bool {
            // TODO: Implement __isset() method.

            return (isset($this->{$name}));
        }
    }
}