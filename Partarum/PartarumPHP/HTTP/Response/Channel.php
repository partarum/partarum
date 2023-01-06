<?php
namespace Partarum\HTTP\Response {

    use Partarum\HTTP\Header;
    use Partarum\HTTP\Header\Entity;
    use Partarum\HTTP\HeaderObject;

    class Channel {

        public HeaderObject $headerObject;

        public BodyObject $bodyObject;

        public function __construct() {

            $this->headerObject = new HeaderObject();

            $this->bodyObject = new BodyObject();
        }


        /*
         *  immer Generel oder Response - Header
         */

        public function addHeader(array $value, int $type){


            switch($type){

                case Header::TYPE_GENEREL | Header::TYPE_RESPONSE :

                    break;

                case Header::TYPE_ENTITY:

                    $this->headerObject->addHeader($value);
                    break;
            }

        }


        /**
         * @param     $body
         */
        public function addBody($body){

            $this->bodyObject->addBody($body);
        }

        public function open(){

            $this->headerObject->setHeader();

            if(!isset($this->headerObject->contentType)){

                $this->headerObject->addHeader([Entity::CONTENT_TYPE => "json"]);
            }

            $this->bodyObject->setType($this->headerObject->contentType);

            $this->bodyObject->setBody();
        }

    }
}