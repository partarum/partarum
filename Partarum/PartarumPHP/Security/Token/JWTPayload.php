<?php
namespace Partarum\Security\Token {

    class JWTPayload {


        public function __set($name, $value) {

            $this->$name = $value;
        }

        public function __get($name) {

            return $this->$name;
        }

        public function __isset($name) {

            return isset($this->$name);
        }
    }
}