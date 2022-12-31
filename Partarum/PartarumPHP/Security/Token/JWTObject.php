<?php
namespace Partarum\Security\Token {

    use JsonException;

    class JWTObject {

        public JWTHeader $header;

        public JWTPayload $payload;

        public JWTSignature $signature;

        private string $secretKey;


        public function __construct() {

            $this->header = new JWTHeader();

            $this->payload = new JWTPayload();

            $this->signature = new JWTSignature();
        }

        public function setHeader(string $typ, string $algo){

            $this->header->typ = $typ;

            $this->header->algo = $algo;

        }

        public function getHeader() : ?string {

            try {

                return json_encode($this->header, JSON_THROW_ON_ERROR);

            } catch(JsonException $e){

            }

            return NULL;
        }

        public function setPayload($payload){

            foreach($payload as $key => $value){

                $this->payload->$key = $value;
            }
        }

        public function getPayload(){

            try {

                return json_encode($this->payload, JSON_THROW_ON_ERROR);

            } catch(JsonException $e){

            }

            return NULL;

        }

        public function setSignature(){

            $this->signature->setHeader($this->getHeader());

            $this->signature->setPayload($this->getPayload());

            $this->signature->setSecretKey($this->secretKey);

            return $this->signature->getHash();

        }

        public function setSecretKey($key){

            $this->secretKey = $key;

            $this->signature->setSecretKey($key);
        }
    }
}