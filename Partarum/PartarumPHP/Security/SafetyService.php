<?php
namespace Partarum\Security {


    use JsonException;
    use Partarum\HTTP\Request\APIconnect;
    use Partarum\HTTP\Request\REST;
    use Partarum\Security\Token\JWT;

    class SafetyService {

        const FUCK_OFF = "Fuck off!!! Leave my page!! Bastard";

        public static $stringReplace = ['\r', '\n'];
        public static $safetyString;
        public static $result;

        const SQL_BLACKLIST = [
            "-1 UNION SELECT",
            "1 OR id > 1",
            "INSERT",
            "CREATE",
            "UPDATE",
            "SELECT",
            "FROM",
            "WHERE",
            "DELETE",
            "INTO"
        ];

        public function __construct(){

            //new SafetyFirst();
        }

        public static function safetyRequestComeIn()
        {
            $interfacePHP = [
                "bad" => [
                    "visited" => false
                ],
                "good" => [
                    "visited" => true,
                    "cookies" => session_id(),
                    "visitingDate" => "",
                    "anonym" => false
                ]
            ];

        }

        public static function safetySQL($item) {

            $item = (is_array($item)) ? $item : [$item];

            //echo "<pre>";
            //print_r($item);

            foreach($item as $key => $value) {

                $safetyString = str_replace(self::SQL_BLACKLIST, "", strip_tags(trim($value)));

                yield $safetyString;
            }
        }

        public static function isEmail($item) {

            $item = (is_array($item)) ? $item : [$item];

            foreach($item as $key => $value){

               $result = filter_var($item,FILTER_VALIDATE_EMAIL);

               yield $result;
            }
        }

        public static function hash512($item){

            $pureItem = (is_array($item)) ? $item : [$item];

            foreach($pureItem as $key => $value){

                $result = hash("sha512", $value);

                yield $result;
            }
        }

        public static function isEqualValue($firstItem, $secondItem){

            $pureFirstItem = (is_array($firstItem)) ? $firstItem : [$firstItem];
            $pureSecondItem = (is_array($secondItem)) ? $secondItem : [$secondItem];

            foreach($pureFirstItem as $key => $value){

                if($value == $pureSecondItem[$key]){

                    yield $value;
                }else{
                    yield FALSE;
                }
            }
        }

        public static function safetyUser($item)            // $item = ["user", "password"]
        {
            $trimed = array_map(function ($x) {
                return trim($x);
            }, $item);

            return $trimed;
        }

        public static function makeSafetyString($testZero){

            for ($j = 0, $jMax = count(self::$stringReplace); $j < $jMax; $j++) {
                $checkedString = str_replace(self::$stringReplace[$j], "FALSE", $testZero);
            }

            $safetyString = $checkedString;
            self::$safetyString = $safetyString;
        }

        public static function base64UrlEncode(array $array)
        {
            foreach ($array as $item) {

                yield str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($item));
            }
        }

        public static function createJWT($payload, $key){

            $jwt = new JWT();

            $jwt->setSecretKey($key);

            $jwt->setPayload($payload);

            return $jwt->getToken();

        }

        public static function checkJWT($token, $key) {

            $jwt = new JWT();

            return $jwt->checkToken($token, $key);

        }

        public static function encodeJWT($payload, $key){

            return self::createJWT($payload, $key);

        }

        public static function decodeJWT($token, $key){

            return self::checkJWT($token, $key);
        }

        public static function createUserToken($project){

            $rest = new APIConnect();

            $rest->url = "https://partarum.de/API/V1/Gratissimum";

            $rest->method = Rest::POST;

            $rest->content = [
                "customToken" => LicentiamObject::LOREM,
                "projectToken" => LicentiamObject::PROJECT[$project]
            ];

            $rest->create();

            $response = $rest->getResult();

            try {

                return json_decode($response, FALSE, 512, JSON_THROW_ON_ERROR);

            } catch (JsonException $e) {


            }

            return NULL;
        }
    }
}
