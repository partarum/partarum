<?php
namespace Partarum\Test {

    use Partarum\HTTP\Header;
    use Partarum\Design\TraidChain\Agent;
    
    class API extends Agent{

        use APIStore;

        public function __construct(){

            $this->setFactory(APIFactory::class);

            $this->setCatalog(APICatalog::class);
        }
        
        public function setRequest(){
            
            return $this->factory->createRequest();
        }
        
        public function setResponse(){

            return $this->factory->createResponse();
        }
    }
}