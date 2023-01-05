<?php
namespace Partarum\Security\Token {

    use JsonException;

    class JWT {

        public JWTObject $object;

        private $hash;


        public function __construct() {

            $this->object = new JWTObject();

            $this->object->setHeader("jwt", "sha256");

        }

        public function setPayload($payload) {

            $this->object->setPayload($payload);
        }

        public function getPayload() {

            return $this->object->payload;
        }

        public function getToken(){

            $this->hash = $this->object->setSignature();

            $tokenGenerator = $this->encode([$this->object->getHeader(), $this->object->getPayload(), $this->hash]);

            $token = $tokenGenerator->current();
            $tokenGenerator->next();
            $token .= "." . $tokenGenerator->current();
            $tokenGenerator->next();
            $token .= "." . $tokenGenerator->current();

            return $token;
        }

        public function setSecretKey(string $key){

            $this->object->setSecretKey($key);
        }

        public function encode(array $array)
        {
            foreach ($array as $item) {

                yield str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($item));
            }
        }

        public function decode($token) : ?array {

            $tokenArray = (is_array($token)) ? explode(".", $token[0]) : explode(".", $token);

            if(count($tokenArray) === 3) {

                $stringArray = [];

                foreach ($tokenArray as $part) {

                    $stringArray[] = base64_decode(str_replace(['-', '_', ''], ['+', '/', '='], $part));
                }

                return $stringArray;
            }

            return NULL;
        }

        public function checkToken(?string $token, string $key) : bool{

            if(isset($token)) {

                $stringArray = $this->decode($token);

                if(isset($stringArray)) {

                    try {

                        $this->object->setPayload(json_decode($stringArray[1], TRUE, 512, JSON_THROW_ON_ERROR));

                        return hash_hmac('sha256', $stringArray[0] . "." . $stringArray[1], $key, TRUE) === $stringArray[2];

                    } catch (JsonException $e) {


                    }
                }
            }

            return FALSE;
        }
    }
}