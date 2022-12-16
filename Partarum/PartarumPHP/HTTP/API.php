<?php
/*
 *           Copyright 2020 © Alexander Bombis. All rights reserved.
 *           Developed by Alexander Bombis.
 *           Email: email@alexander-bombis.de
 *
 *           The following code was created based on the template for the website http://cordes-software.de.
 *           This may also be used in full by the person or business
 *           representing the domain "cordes-software.de"
 *           and also modified for their use.
 */
namespace Partarum\HTTP {

    use Partarum\HTTP\Header\Entity\Allow;
    use Partarum\HTTP\Header\Entity;
    use Partarum\HTTP\Request\REST;
    use Partarum\Security\Token\UUID;

    class API extends Header{

        public array $requestCache = [];

        public array $responseCache = [];

        public APIRequest $request; // Area

        public APIResponse $response;   // Area

        public const REQUEST = Data::REQUEST;
        
        public const RESPONSE = Data::RESPONSE;
        
        public const METHOD_GET = Allow::GET;

        public const METHOD_POST = Allow::POST;

        
        public $data;

        public function __construct(){

        }

        private function getRequestData(){

            $this->data = REST::getRequestData();
        }


        public function createRequest(null | string $url = null) : APIRequest {

            $request = new APIRequest();
            
            if(isset($url)){
                $request->setURL($url);
            }

            $this->requestCache[$request->id] = $request;

            return $request;
        }

        public function setRequest() : APIRequest {

            return $this->createRequest();
        }

        public function addRequest(APIRequest $request) {

            $this->requestCache[$request->id] = $request;
        }

        public function getRequest(){

        }

        public function createResponse() : APIResponse {

            $this->response = new APIResponse();

            return $this->response;
        }

        public function createJSONResponse($body = null){

            $response = $this->createResponse();

            $response->setHeader([Entity::CONTENT_TYPE => "json"]);

            if(isset($body)){
                $response->setBody($body);
            }

            return $response;
        }

        public function setResponse(){

            return $this->createResponse();

        }
        
       public function getData() : Data {
            
            return new Data();
        }

        public function fromGET(?string $needle = NULL) : string|object {

            return Data::fromGET($needle);

        }

        public function fromPOST($needle){

            $data = Data::fromPost();

            return $data;

        }
        
        public function fromHeader($key, $flag){
            $data = Data::fromHeader($key, $flag);
            
            return $data;
        }

        public function createUUID(){
            return ["v4" => UUID::v4()->current()];
        }
    }
}

