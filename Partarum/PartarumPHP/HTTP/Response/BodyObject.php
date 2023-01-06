<?php
namespace Partarum\HTTP\Response {


    use ArrayIterator;
    use JsonException;
    use Partarum\HTTP\Header;

    class BodyObject {

        public ArrayIterator $cache;

        public string $type;

        private array $outputJSON = [];

        private string $outputTEXT = "";

        public function __construct() {

            $this->cache = new ArrayIterator([]);
        }

        public function addBody($body) : void {

            $this->cache->append($body);

        }

        public function setType($contentType) {

            $this->type = match($contentType){
                "json" => "JSON",
                default => $contentType
            };
        }

        public function setBody(){

            $method = "add_" . $this->type;

            while($this->cache->valid()){

                $this->$method($this->cache->current());

                $this->cache->next();
            }

            $this->sendOutput();
        }

        private function sendOutput() : void {

            $method = "send_" . $this->type;

            $this->$method();
        }

        private function add_JSON($content){

            $this->outputJSON[] = $content;
        }

        private function send_JSON(){

            try {

                echo json_encode($this->outputJSON, JSON_THROW_ON_ERROR);

            } catch(JsonException $je){

                echo '{"error": "Output not produce"}';
            }
        }

        private function add_Text($content){

            $this->outputTEXT .= $content . PHP_EOL;
        }

        private function send_Text(){

            echo $this->outputTEXT;
        }
    }
}