<?php
namespace Partarum\Security\Token {

    class JWTSignature {

        private string $header;

        private string $payload;

        private string $secretKey;


        public function __construct() {

        }

        public function setSecretKey($key){

            $this->secretKey = $key;
        }

        public function setHeader($header){

            $this->header = $header;
        }

        public function setPayload($payload){

            $this->payload = $payload;
        }

        public function getHash(){

            return hash_hmac('sha256', $this->header . "." . $this->payload, $this->secretKey, true);
        }
    }
}