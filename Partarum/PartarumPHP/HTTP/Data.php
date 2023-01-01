<?php
namespace Partarum\HTTP {

    use JsonException;
    use Partarum\HTTP\HTTPHeaderObject;
    use RuntimeException;

    class Data {

        public const REQUEST = 2;

        public const RESPONSE = 4;

        public static $header;
        
        
        public static function __callStatic($name, $arg){
            
            switch($name) {
                    
                case "fromGET":
                    
                    //return self::fromGET($arg);
                    return "static Pups";
                    break;
            }
        }
        
        public function __call($name, $arg){
            
            switch($name) {
                    
                case "fromGET":
                    
                    //return self::fromGET($arg);
                    return "non static Pups";
                    break;
            }
        }

        
        public static function fromGET(?string $needle = NULL) : string | object {
            
            if(count($_GET) > 0){
                
                
                return (isset($needle)) ? $_GET[$needle]: (object)$_GET;
            }

            return (object)$_GET;
        }
        
        
        /**
         * @return object|null
         */
        public static function fromPOST() : ?object {

            if(count($_POST) > 0){

                return (object)$_POST;

            }

            try {

                $postData = file_get_contents("php://input");

                try {

                    return json_decode($postData, FALSE, 512, JSON_THROW_ON_ERROR);

                } catch (JsonException $e) {

                }
            } catch(RuntimeException $e){

            }

            return NULL;
        }

        public static function fromHeader(?string $needle = NULL, ?int $flag = NULL) {

            $headerObject = new HTTPHeaderObject();

            if(isset($flag)){

                switch($flag) {

                    case DATA::REQUEST:

                        $headerObject->request = apache_request_headers();

                        return (isset($needle)) ? $headerObject->request[$needle] ?? NULL : $headerObject;

                    case DATA::RESPONSE:

                        $headerObject->response = apache_response_headers();

                        return (isset($needle)) ? $headerObject->response[$needle] ?? NULL : $headerObject;
                }
            }

            $headerObject->request = apache_request_headers();

            if(function_exists("apache_response_headers")) {
                $headerObject->response = apache_response_headers();
            }

            return (isset($needle)) ? ($headerObject->response[$needle] ?? $headerObject->request[$needle]) ?? NULL : $headerObject;

        }
    }
}