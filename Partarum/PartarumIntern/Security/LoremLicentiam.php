<?php
namespace PartarumIntern\Security {

    use JsonException;

    class LoremLicentiam {  //LoremLicentiam

        /**
         * @var LoremLicentiamObject|null
         */
        private ?LoremLicentiamObject $object;

        /**
         * LoremLicentiam constructor.
         *
         * @param $string
         */
        public function __construct($string) {

            $this->object = new LoremLicentiamObject();

            $this->object->baseString = $string;

            $this->object->to256 = $this->getToken("sha256", $string);

            if(isset($this->object->to256)) {

                $this->object->to512 =  $this->getToken("sha512", $string);

                $this->object->from256to512 = $this->getToken("sha512", $string, $this->object->to256);

                $this->object->from512to256 = $this->getToken("sha256", $string, $this->object->to512);

                $this->object->from256to512to256 = $this->getToken("sha256", $string, $this->getToken("sha512", $string, $this->object->to256));
            }
        }

        /**
         * @param string      $algo
         * @param string      $string
         * @param string|null $token
         *
         * @return string|null
         */
        private function getToken(string $algo, string $string, ?string $token = NULL) : ?string {

            if(isset($token)) {

                return ($string === $this->object->baseString) ? hash($algo, $token) : NULL;
            }

            return ($string === $this->object->baseString) ? hash($algo, $string) : NULL;
        }

        /**
         * @return LoremLicentiamObject|null
         */
        public function getKeys() : ?LoremLicentiamObject {

            return $this->object;
        }

        /**
         * @return string|null
         */
        public function getKeysJSON() : ?string {

            try {

                return json_encode($this->object, JSON_THROW_ON_ERROR);

            } catch(JsonException $e){

            }
            return NULL;
        }
    }
}