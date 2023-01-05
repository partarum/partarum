<?php
namespace Partarum\HTTP {

    use Partarum\Library\typeArray;

    class CookieObject {

        private $name;

        private $value;

        private $expire;

        private $path;

        private $domain;

        private $secure;

        private $httponly;

        private $samesite;

        public function __construct(...$arg) {

            if (count($arg) === 1) {

                /*
                 *  $arg[0] ein Array mit den Attributen
                 */

                $this->setProps();

            } else {

                /*
                 *  Es m�ssen 8 Argumente sein !!!
                 */

                throw new \ArgumentCountError("You need 8 attributes for Cookies");
            }

            if (count($arg) === 8) {

                /*
                 *  $arg ein Array mit den Attributen
                 *  egal ob numeric oder associative
                 */

                $this->setProps($arg);

            } else {

                /*
                 *  Falsche Anzahl - die �bergabe an den Constructor ist klar definiert
                 */

                throw new \ArgumentCountError("You need one array argument with all Cookie - attributes or 8 attributes as arguments");

            }
        }

        private function setProps($arg){

            $this->name = $arg[0] ?? $arg["name"];
            $this->value = $arg[1] ?? $arg["value"];
            $this->expire = $arg[2] ?? $arg["expire"];
            $this->path = $arg[3] ?? $arg["path"];
            $this->domain = $arg[4] ?? $arg["domain"];
            $this->secure = $arg[5] ?? $arg["secure"];
            $this->httponly = $arg[6] ?? $arg["httponly"];
            $this->samesite = $arg[7] ?? $arg["samesite"];

        }

        public function setName($name){

            $this->name = $name;
        }

        public function setValue($value){

            $this->value = $value;
        }

        public function setExpire($expire){

            $this->expire = $expire;
        }

        public function setPath($path){

            $this->path = $path;
        }

        public function setDomain($domain){

            $this->domain = $domain;
        }

        public function setSecure($secure){

            $this->secure = $secure;
        }

        public function setHttponly($httponly){

            $this->httponly = $httponly;
        }

        public function setSamesite($samesite){

            $this->samesite = $samesite;
        }

        public function getName(){

            return $this->name;
        }

        public function getValue(){

            return $this->value;
        }

        public function getExpire(){

            return $this->expire;
        }

        public function getPath(){

            return $this->path;
        }

        public function getDomain(){

            return $this->domain;
        }

        public function getSecure(){

            return $this->secure;
        }

        public function getHttponly(){

            return $this->httponly;
        }

        public function getSamesite(){

            return $this->samesite;
        }
    }
}