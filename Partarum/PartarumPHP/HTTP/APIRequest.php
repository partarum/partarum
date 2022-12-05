<?php
namespace Partarum\HTTP {


    use ArrayIterator;
    use JsonException;
    use Partarum\HTTP\Header\Entity\Allow;
    use Partarum\HTTP\Request\REST;
    use Partarum\Security\Token\UUID;

    class APIRequest {

         /*
         *  Das REST - Object
         */
        public object $rest;

        /*
         *  Adresse der API
         */
        public string $url;
        
        public string $param = "?";

        /*
         *  HTTP - Methode | POST, GET, PUT, DELETE, UPDATE
         */
        public string $method = Allow::GET;

        
        /*
         *  HTTP - Authentifizierung
         */
        public array $auth;

        /*
         *  Content - Type
         */
        public string $contentType;

        public $content;

        public $result;
        
        public string $id;

        private string $params = "?";

        public function __construct() {

            $this->id = UUID::v4()->current();
            
            $this->rest = new REST();
        }
        
        public function setURL(string $url){

            $this->url = $url;
        }
        
        public function setParams(array $params) {
            
            $iterator = new ArrayIterator($params);
            
            while($iterator->valid()){
                
                $this->params .= $iterator->key() . "=" . $iterator->current();
                
                $iterator->next();
                
                if($iterator->valid()){
                    $this->params .= "&";
                }
            }
        }

        public function setMethod(string $method){
            $this->method = $method;
        }

        public function setBaseHeader(){
            


        }

        public function setPersonalHeader(array $header){

        }

        public function setBody($content, int $flag){

        }

        // erwarte einen oder mehrere bestimmte MIME - Typen
        public function expectContentType(string $type) : void{

        }

        // erwarte bestimmte Bedingungen vom Header
        public function expectStrictHeader(string | array $param) : void{

        }

        /**
         * @throws JsonException
         */
        public function run() {

           
            if($this->method === Allow::GET){
                
                $this->rest->setURL(strlen($this->params) > 1 ? $this->url . $this->params : $this->url);

            } else {
                
                $this->rest->setURL($this->url);
            }

            $this->rest->setMethod($this->method);

            if($this->method !== Allow::GET){
                
                // baseHeader und personalHeader auswerten
                $this->rest->setHeader([
                    //"auth" => $this->auth ?? NULL,
                    "contentType" => $this->contentType
                ]);

                $this->rest->setContent($this->content);

            }

            $this->result = $this->rest->exec();

            $this->rest->close();


            // ! muss noch auf den Content geprüft werden - es soll kein JSON - String zurückgegeben werden!!!
            return json_decode($this->result, FALSE, 512, JSON_THROW_ON_ERROR);
        }

        /**
         * @return mixed
         */
        public function getResult(){
            return $this->result;
        }
        
        public function getBaseHeader(){
            
            
            
        }
    }
}