<?php
namespace Partarum\HTTP {

    use JsonException;
    use Partarum\HTTP\Header\Entity;
    use Partarum\Security\Token\UUID;
    use Partarum\HTTP\Response\Channel;

    class APIResponse {

        public string $id;

        public Channel $channel;

        private bool $isHeader = false;

        public function __construct() {

            $this->id = UUID::v4()->current();
            
            $this->channel = new Channel();
        }
        

        /*
         *  Generel and Response - Header !!!!
         *
         *  Entweder als Flag oder als String ( also selbsgeschriebenes Header - Field - Value )
         *
         *  oder Strings im Array
         */
        public function setHeader( string|array $value) : void {

            $header = is_string($value) ? [$value] : $value;

            $this->channel->addHeader($header, Header::TYPE_GENEREL | Header::TYPE_RESPONSE);

            $this->isHeader = true;
        }

        public function setBody($body){

            $this->channel->addBody($body);  // Entity - Header

        }

        public function run(){

            if(!isset($this->channel->headerObject->contentType)){

                $this->channel->addHeader([Entity::CONTENT_TYPE => "json"], Header::TYPE_ENTITY);

                $this->isHeader = true;
            }

            $this->channel->open();
        }

        public function getPostFromRequest(){

        }

        public function getHeaderFromRequest(){

        }

        public function getRequestInfo(){

        }

        public function createUUID() : array {
            return ["v4" => UUID::v4()->current()];
        }
    }
}