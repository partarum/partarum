<?php
namespace Partarum\Document {


    use Partarum\Config\GlobalConfig;
    use Partarum\Document\HTMLElement as HTMLElement;
    use Partarum\Document\HTMLSeries as HTMLSeries;
    use Partarum\Document\HTMLService;
    use Partarum\Document\HTMLArticle;
    use Partarum\Document\HTMLAttribute;
    use Exception;
    use stdClass;


    trait FeatHTMLPage
    {
        public $head;
        public $body;
        public $wrapper;
        public $header;
        public $main;
        public $footer;
        public $etc;
        public $user = [];
        public $metaUTF8;
        public $config;
        public $tagID = [];
        public $theme;
        
        public $fixed = [
            "surface",
        	"surface\\html",
            "surface\\html\\head",
            "surface\\html\\body",
            "surface\\html\\body\\header",
            "surface\\html\\body\\main",
            "surface\\html\\body\\footer"
        ];

        public function setWrapperToParentObject(){

            $this->path["header"] = $this->fixed[4];
            $this->path["main"] = $this->fixed[5];
            $this->path["footer"] = $this->fixed[6];

            $wrapper = [
                $this->fixed[4],
                $this->fixed[5],
                $this->fixed[6]
            ];

            foreach ($wrapper as $path) {

                $this->dom->$path = new stdClass();
            }

        }

        public function getDOM()
        {
            return $this->dom->dom;
        }

        public function setWrapper($etc = TRUE)
        {
           /*
            * Parent:
            * $this->parentObject->"surface/html"->"surface/html/body"
            *
            * 1. $this->parentObject->
            * 2. $this->html->
            * 3. $this->body
            * #
            * 1. $this->dom->
            * 2. $this->path::html;
            *
            * Node: 
            * $this->parentObject->"surface/html/body"->"surface/html/body/wrapper"
            *
            * 1. $this->parentObject->
            * 2. $this->body->
            * 3. $this->wrapper
            *
            * eigener Path für Childs:
            * $this->parentObject->"surface/html/body/wrapper"
            *
            * 1. $this->parentObject->
            * 2. $this->wrapper
            *
            *
            * 1.$this->path = [
            	"surface" => "surface",
            	"html" => "surface".DIRECTORY_SEPARATOR."html",
            	"body" => "surface".DIRECTORY_SEPARATOR."html".DIRECTORY_SEPARATOR."body"
             	];
            *
            * 2. $this->dom
            *
            * $home = new Office();
            * $home->page; is like Office::$page = HTMLPage Object
            * $home->page->parentObject; // deprecated
            *
            * $home->page->dom->{path["html]}; return DOMElement Object für <html></html>
            * #finish
            *
            */

            $path = $this->path;
            $html = $path["html"];
            $body = $path["body"];
            $header = $path["header"];
            $main = $path["main"];
            $footer = $path["footer"];


            /*
            echo "<pre>";
            print_r($this->path);
            print_r($this->dom);
            */

            $this->dom->$body->$header = new HTMLElement("header", $this->dom->$html->$body);

            $this->dom->$body->$header->id = "globalHeader";


            $this->dom->$body->$main = new HTMLElement("main", $this->dom->$html->$body);

            $this->dom->$body->$main->id = "content";


            $this->dom->$body->$footer = new HTMLElement("footer", $this->dom->$html->$body);

            $this->dom->$body->$footer->id = "globalFooter";


            if($etc !== FALSE) {

                $this->dom->$html->$body->class = "flexibal flexColumn allScreen";

                $this->dom->$body->$header->class = "notOverTheLine flexibal flexRow flexWrap";

                //echo GlobalConfig::$theme;

                if(class_exists("Partarum\GlobalConfig")) {

                    if (GlobalConfig::$theme !== "theOffice") {

                        if (GlobalConfig::$style === "row") {

                            $this->dom->$body->$main->class = "flexibal flexRow flexWrap spaceAround";

                        } elseif (GlobalConfig::$style === "column") {

                            $this->dom->$body->$main->class = "flexibal flexColumn flexWrap spaceAround";
                        }
                    } elseif (GlobalConfig::$theme === "theOffice") {

                        $this->dom->$body->$main->class = "flexibal flexRow flexWrap flexStart";
                    }
                }

                $this->dom->$body->$footer->class = "wrapperFooter";
            }

        }

        public function setScript($fileName){

            $script = new HTMLElement("script", $this->head);
            $script->setAttribute("src", $fileName);
        }

        public function setLink($fileName){

            $link = new HTMLElement("link", $this->head);
            $link->setAttribute("href", $fileName);
            $link->setAttribute("rel", "stylesheet");
            $link->setAttribute("type", "text/css");
        }

        public function setTitle($text){

            $title = new HTMLElement("title", $this->dom->{"surface\html"}->{"surface\html\head"});
            $title->text = utf8_encode($text);
        }

        public function positionNeedle($string){

            $needle = "surface";

            $positionNeedle = stripos($string, $needle);

            yield substr($string, $positionNeedle);

        }

        public function has_string_keys(array $array) {

            return count(array_filter(array_keys($array), 'is_string')) > 0;
        }

        public function isAssoc(array $arr)
        {
            if (array() === $arr) return false;
            return array_keys($arr) !== range(0, count($arr) - 1);
        }


        public function getEtcKeys($etc){
        
       

            foreach($etc as $key => $value){

                yield $key;
            }
        }

        public function getAttributeValue($value){

            if ((gettype($value) === "array") && ($this->isAssoc($value) != 1)) {

                yield implode(" ", $value);

            } else {

                yield $value;
            }
        }

        public function setTextValue($attribute, $loged){

            // loged = angemeldet; logged = protokoliert;

            if (is_array($attribute)) {

                if ((isset($attribute["member"])) && ($loged === true)) {

                    yield $attribute["member"];

                } elseif ((isset($attribute["public"])) && ($loged === false)) {

                    yield $attribute["public"];

                }

                /*
                 *
                 * Hier kommt dann noch ein "else" hin für Textarrays, wo jeder Arraywert ein Textteil darstellt!!!
                 *
                 * z.B.: mit Schlüssel die ein Element vorschreiben
                 *
                 *  const TEXT = [
                 *  "p" => "Hallo",
                 *  "small" => "Welt"
                 * ];
                 *
                 */
            }
        }

        /*
         *  setEtc muss noch angepasst werden !!!
         *
         */

        public function setEtc($parentPath, $domPath, $etc, $tagName){

            /*
             *  $node = string =
             *  $nodeName =
             *  $tagName =
             *  $etc = etc - Array
             */
            //$nodeException = new Exception("No Node by path");

            //echo "<br>".$domPath;

            /*
            echo "<pre>";
            echo "<br> etc = ";
            print_r($etc);
            */

            // muss abgeändert werden!!!

            if ((is_string($parentPath) && (isset($this->dom->$parentPath))) && (is_array($etc))) {


                $node = (isset($this->dom->$parentPath->$domPath)) ? $this->dom->$parentPath->$domPath : false;

                $loged = false;

                $etcID = $etc["ID"] ?? false;

                /*
                echo "<br> etc =";
                echo "<pre>";
                print_r($etc);
                */

                $etcKeys = $this->getEtcKeys($etc); // Generator

                foreach ($etcKeys as $value) {

                    if ($value != "COUNT") {

                        // Kleinschreibung erzeugen
                        $little = ($value == "CLASSNAMES") ? "class" : strtolower($value);
                        
                        $getAttrValue = $this->getAttributeValue($etc[$value]); // Generator

                        $attribute = $getAttrValue->current();

                        if ($value == "TEXT") {

                            $getTextValue = $this->setTextValue($attribute, $loged); // Generator

                            foreach( $getTextValue as $attr){

                                $attribute = $attr;
                            }
                        }
                        
                        if (($value == "TEXTFILE") || ($value == "TEMPLATE")){

                            // absolute Pfadangabe - SplFileObject !!!
                            /*
                            echo "<pre>";
                            print_r($this->etc->templatePaths);
                            */

                            if(isset($this->etc->templatePaths->$domPath)) {

                                //echo "<br>featHTMLPage extension = ".$this->etc->extension;

                                if(in_array($this->etc->extension, ["txt", "plain", "html"])) {

                                    $articel = new HTMLArticle(
                                        $this->etc->templatePaths->$domPath,
                                        $this->dom->$parentPath->$domPath
                                    );
                                }elseif($this->etc->extension == "js"){

                                    $script = new HTMLElement("script", $this->dom->$parentPath->$domPath);
                                    $script->type = "module";

                                    $script->src = $etc["TEMPLATE"];
                                }
                            }
                           // echo "<br> TEMPLATE = ".$etc[$value];

                            $script = new HTMLElement("script", $this->dom->$parentPath->$domPath);
                            $script->type = "module";

                            $script->src = $etc["TEMPLATE"];
                        }

                        if (!is_array($attribute) && (get_class($node) == "Partarum\Document\HTMLSeries")) {

                            if ($value !== "ID"){

                                /*
                                echo "<pre>";
                                print_r($node);
                                */

                                $node->$little = array_fill(0, count($node->elements), utf8_encode($attribute));

                            } elseif (($value === "ID") && ($etcID === true)) {

                               // echo "<br>etcID = ".$etcID;

                                $getID = HTMLService::createID($tagName, count($node->elements)); // $tagName statt $etc !!

                                foreach($node->elements as $partNode) {

                                    $partNode->id = $getID->current();
                                    $getID->next();
                                }
                            } elseif(($value == "ID") && (is_string($attribute))){

                                //echo "<br> attribute FeatHTMLPage 350 = ".$attribute;

                                $node->elements[0]->$little = $attribute;
                            }
                        } elseif ((is_array($attribute)) && (get_class($node) == "Partarum\Document\HTMLSeries")) {

                            $counter = 1;

                            foreach ($node->elements as $key => $partNode) {

                                if (isset($attribute[$counter])) {

                                    $partNode->$little = $attribute[$counter];
                                }
                                $counter++;
                            }
                        }
                        $getAttrValue->next();
                    }
                }
            }
        }
    }
}
