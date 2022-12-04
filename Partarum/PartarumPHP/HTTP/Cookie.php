<?php
namespace Partarum\HTTP {

    use Partarum\Library\typeArray;

    class Cookie {


        private string $name;

        public $value;

        public $lifetime;

        public $path;

        public $domain;

        /*
         *  FALSE || TRUE
         *
         *  standart => FALSE
         */

        public bool $secure;

        /*
         *  FALSE || TRUE
         *
         *  standart => FALSE
         */
        public bool $httponly;

        /*
         *  none || strict || lax
         *
         *  standart => lax
         */
        public string $samesite;

        const NONE = "none";

        const STRICT = "strict";

        const LAX = "lax";

        const PATH_TO_PATARUM = "../../../../secura/Crustulum/";

        public $error = [];


        /*
         *  kann ein g�ltiger Cookie sein || g�ltige Cookies
         *  kann ein neuer Cookie sein  || mehrere neue Cookies
         *
         */

        public function __construct($name = FALSE, $value = FALSE, ...$attr){

            /*
             *  $name = name || id || [...id's] || [name, value, lifetime, path, domain, secure, httponly, samesite]
             *          string || string || array[...string] || array
             *
             *  $value = cookie value
             *
             *  ...$attr =  [0 => lifetime, 1 => path, 2 => domain, 3 => secure, 4 => httponly, 5 => samesite];
             *              [0, "/", "", FALSE, FALSE, "lax"]
             */

            /*
             *  $name === FALSE => $value === FALSE && ...$attr = []
             *
             *      den Attribute werden noch Werte zugewiesen und dann mit
             *
             *      Cookie->create() || Cookie->safe() || Cookie->send() erstellt
             */

            if($name !== FALSE){

                if(is_array($name)){

                    /*
                     *  id's    (strlen(id) === 5) string
                     *   ||
                     *  attr    (count(attr) >= 2) assoziativ || numeric
                     */
                    if(typeArray::is_Assoc($name)) {

                        /*
                         *  attr
                         */

                        $keys = ["name", "value", "lifetime", "path", "domain", "secure", "httponly", "samesite"];
                        $namekeys = array_keys($name);
                        $nameValues = array_values($name);

                        $this->setProps($nameValues);

                    }else{

                        /*
                         *  id's || attr
                         */

                        $isID = typeArray::every($name,
                            function($item){ return (strlen($item) === 5);}
                            );

                        if($isID === TRUE){

                            /*
                             *  ID's
                             */

                            foreach($name as $key => $value) {

                                $getJSONCookie = file_get_contents(self::PATH_TO_PATARUM . $value.".json");

                                if($getJSONCookie !== FALSE) {

                                    $cookieArray = json_decode($getJSONCookie);

                                    /*
                                     *  Wohin mit den Cookies??? Also doch noch Ein CookieObject erstellen!!!!
                                     *  Also eine Klasse schreiben, welche nur das Cookie darstellt!!!!!
                                     */
                                }

                            }

                        }else{

                            /*
                             *  Attr
                             */

                            $this->setProps($name);

                        }
                    }
                } elseif(is_string($name)){

                    /*
                     *  name || id
                     */
                    if($value === FALSE){

                        if($getToken = file_get_contents(self::PATH_TO_PATARUM.$name.".json")){

                            $cookie = json_decode($getToken) ?? FALSE;

                            if($cookie !== FALSE){

                                $this->setProps([
                                    $cookie->name,
                                    $cookie->value,
                                    $cookie->lifetime,
                                    $cookie->path,
                                    $cookie->domain,
                                    $cookie->secure,
                                    $cookie->httponly,
                                    $cookie->samesite
                                ]);
                            }

                        } else {

                           $this->error["constructor"][] = "token not found | Line 91";

                        }
                    } else {

                        /*
                         *  $value !== FALSE = $value !!!!
                         */

                        $this->setProps([
                            0,
                            $value,
                            ...$attr
                        ]);
                    }

                } else {

                    $this->error["constructor"][] = " type of name is not correct : ".gettype($name);
                }

            } else {

                /*
                 *  is Cookie || kill || change
                 */
            }
        }

        private function setProps(...$attr){

            /*
             *  Funktion �berdenken - Cookie Attribute folgen einer festen Reihenfolge
             *
             *  - d.h. wenn ich samesite definieren will muss ich die 6 vorherkommenden auch angeben!!!
             */

            $this->name ??= $attr[0];
            $this->value ??= $attr[1];
            $this->lifetime ??= $attr[2];
            $this->path ??= $attr[3];
            $this->domain ??= $attr[4];
            $this->secure ??= $attr[5];
            $this->httponly ??= $attr[6];
            $this->samesite ??= $attr[7];

        }

        public function setName(string $name){

            $this->name = $name;
        }

        public function send(){

            $this->create();
        }

        public function safe(){

            $this->create();
        }

        public function create(){

            $optionArray = [
                "expires" => $this->lifetime,
                "path" => $this->path,
                "domain" => $this->domain,
                "secure" => $this->secure,
                "httponly" => $this->httponly,
                "samesite" => $this->samesite
            ];

            setcookie(
                $this->name,
                $this->value,
                $optionArray
            );

            $cookieArray = [
              "name" => $this->name,
              "value" => $this->value
                ] + $optionArray;

            $cookieJSON = json_encode($cookieArray);

            /*
             *  Jeder Cookie ist einmal - alle Attribute zusammen sind wie eine ID
             *
             *  jedoch k�nnen wir nur Name und Value auslesen, den Rest wei� nur derjenige,
             *  wer ihn erstellt hat, da der Client die die restlichen Informationen zur�ckh�lt
             *
             *  Was sein k�nnte ist, das sich das Value ge�ndert hat.
             *  Also gilt das ID - Thema nur Cookies, welche strict die selben bleiben m�ssen.
             *
             *  Wenn durch den Clienten das Value ge�ndert wurde ist nur noch der Name �brig,
             *  und der kann mehrfach vorkommen, da die restlichen Attribute nach Value anders sein k�nnen.
             *  Das selbe gilt f�r Cookies welche vom Clienten erstellt wurden -
             *  keine Chance um an die Attribute just im Server ranzukommen -
             *  au�er Javascript sendet jene als extra Cookie mit
             *
             */

            $id = random_bytes(5);

            $file = file_put_contents("../../../../secura/Crustulum/".$id.".cookie", $cookieJSON);

            return $id;
        }

        public function kill(){


        }

        /*
         *  name, value || alle attribute hintereinander || array mit den Attributen || id || id's
         */
        public static function destroy( $name = "", $value = "", ...$attr){

            /*
             *  Einzig strict Cookies k�nnen anhand des Namens und des Values gel�scht werden
             *   - das Script zieht sich die restlichen Werte anhand der serverseitig abgespeicherten Cookie - json - strings
             *
             *  F�r Cookies mit wechselnden Values bedarf es alle Attribute zum l�schen
             *
             *  N�chste M�glichkeit w�re : Dasa das Cookie vom user anhand der ID gel�scht wird,
             *  welche beim Erstellen mittels return zur�ckgegeben wurde. ID === TRUE!!!!
             */

            /*
             *  $name = name || id || [...id's] || [name, value, lifetime, path, domain, secure, hhtponly, samesite]
             */

            if(isset($_COOKIE[$name])) {

                setCookie($name, FALSE, 1);

                return TRUE;

            }else{

                return FALSE;
            }

        }
    }
}

