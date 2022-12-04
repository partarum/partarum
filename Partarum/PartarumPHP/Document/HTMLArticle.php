<?php
namespace Partarum\Document {

    use Partarum\Service\TheOffice;
    use \SplFileObject;
    use Partarum\Document\HTMLElement as HTMLElement;
    use stdClass;

    class HTMLArticle {

		public object $file;

		public object $articleDom;

		public array $cacheOpenBlockTagNodes = [];

		public array $cacheInlineTagNodes = [];

		public array $cacheOpenBlockTagNames = [];

		public bool $list = FALSE;

		public array $liCache = [];

		public object $textObject;

		public array $cache = [];

		public int $cacheParentTag;

		private static $trash;

		public array $inlineTags = [ "big", "b", "i", "small", "tt", "abbr",
            "acronym", "cite", "code", "dfn", "em", "kbd", "strong",
            "samp", "var", "a", "bdo", "br", "img", "map", "object", "q",
            "span", "script", "sub", "sup", "button", "input", "label", "select", "textarea" ];

		public array $blockTags = [ "address", "article", "aside", "blockquote", "details",
            "dialog", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure",
            "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup",
            "hr", "li", "main", "nav", "ol", "p", "pre", "section", "table", "ul" ];

		public array $ownBlockTags = ["list"];



		public function __construct($filePath, $parentNode){

		    $this->setBase($parentNode);

		    $this->textObject = new stdClass();

			$this->getFile($filePath);
			
			$counter = 1;

			foreach($this->file as $line) {

			    //echo "<br> line HTMLArticel = ".$line;
                $resultLine = $this->getType($this->cW($line));

                $this->setTextObject($resultLine->current(), $counter);

                $counter++;
            }

			
		}

		public function setBase($parentNode){

			$this->articleDom = new HTMLElement("article", $parentNode->elements[0]);
			$this->articleDom->align = "center";
		}

        private function setList(){

		    $this->list = TRUE;

		    yield "ul";
        }

        public function startBlockTag($line){

            $attributeStartBlockTag = "class";

            $tagName = ($line[1] == "list") ? $this->setList()->current() : $line[1];

            $countNodes = count($this->cacheOpenBlockTagNodes);
            $countNames = count($this->cacheOpenBlockTagNames);

            if($countNames == 0){

                $node = new HTMLElement($tagName, $this->articleDom);

                $this->cacheParentTag = $countNodes;

            }else{

                $node = new HTMLElement($tagName, (
                ($countNames == 0) ? end($this->cacheOpenBlockTagNodes) : (
                (($countNames == 1) && ($countNodes >= 1)) ? $this->cacheOpenBlockTagNodes[$this->cacheParentTag] :(
                ($countNames > 1) ? $this->cacheOpenBlockTagNodes[$this->cacheParentTag + 1] : false
                ))));
            }

            $this->cacheOpenBlockTagNodes[] = $node;
            $this->cacheOpenBlockTagNames[] = $line[1];

            if(isset($line[2])){
                $this->cacheOpenBlockTagNodes[$countNodes]->$attributeStartBlockTag = $line[2];
            }
        }

        public function createTextElement($line){

		    $liCacheLength = count($this->liCache);

            $tagName = ($this->list === FALSE) ? "p" : (
            (strpos($line[1], "+") !== FALSE ) ? "li" : (
            (strpos($line[1], "+") !== TRUE) ? "p" : FALSE ));

            $parent = (($tagName == "p") && ($liCacheLength == 0)) ? end($this->cacheOpenBlockTagNodes) : (
                (($tagName == "li") && ($liCacheLength >= 0)) ? end($this->cacheOpenBlockTagNodes) : (
                (($tagName == "p") && ($liCacheLength == 1)) ? end($this->liCache) : FALSE));

            $textNode = new HTMLElement($tagName, $parent);

            if(($tagName == "li") && ($liCacheLength == 0)){

                $blockText = new HTMLElement("p", $textNode);
                $blockText->text = utf8_encode(ltrim($line[1], "+"));
                $this->liCache[] = $textNode;

            }elseif(($tagName == "li") && ($liCacheLength > 0)){

                $blockText = new HTMLElement("p", $textNode);
                $blockText->text = utf8_encode(ltrim($line[1], "+"));
                $trash = array_pop($this->liCache);

            }elseif($tagName == "p"){

                $textNode->text = utf8_encode($line[1]);
            }
        }


		public function setTextObject($line, $counter){

            /*
		    echo "<pre>";
		    print_r($line);
            */

		    if($line[0] == "startBlockTag"){

		        $this->startBlockTag($line);

            }elseif($line[0] == "endBlockTag"){

		        if(str_replace("/", "", $line[1]) == end($this->cacheOpenBlockTagNames)){

		            self::$trash = array_pop($this->cacheOpenBlockTagNames);

		            if($line[1] == "/ul"){$this->list = FALSE;}
                }
            }elseif($line[0] == "text"){

		        $this->createTextElement($line);

            }elseif($line[0] == "inline"){

                if((count($line[1])) == (count($line[2]) - 1)){

                    $restText = $line[2];
                    $result = $line[1];

                    foreach($restText as $key => $textpart){

                        //echo "<br> textpart - Anzahl: ".strlen($textpart)."  Zeichen für : ".$textpart;

                        if(strlen($textpart) > 0) {
                            $inlineTextNode = new HTMLElement("p", end($this->cacheOpenBlockTagNodes));
                            $inlineTextNode->text = utf8_encode($textpart);
                        }

                        if(isset($result[$key])) {


                            /*
                             * Hier muss noch unterschieden werden, das wirklich reine Inlineelemente
                             * in ein <p>...</p> eingesetzt werden!!!
                             *
                             */
                            $this->cacheInlineTagNodes[] = new HTMLElement($result[$key][2], end($this->cacheOpenBlockTagNodes));
                            end($this->cacheInlineTagNodes)->text = utf8_encode(strip_tags($result[$key][0]));

                            if(count($result[$key]) > 5){

                                preg_match_all("/(.*?)(\"[\w]+\")/",$result[$key][3] ,$attr, PREG_SET_ORDER);

                                $attribute = str_replace(" = ", "", $attr[0][1]);
                                $attributeValue = str_replace("\"", "", $attr[0][2]);

                                end($this->cacheInlineTagNodes)->$attribute = $attributeValue;

                            }
                        }

                    }
                }

            }

        }


		public function getFile($filePath){

		    /*
		     *  Liefert in einer Schleife jede eingelesene Zeile
		     */

			$this->file = new SplFileObject($filePath);
		}

        public function cW($string) {

		    /*
		     *  alle Leerzeichen am Anfang und am Ende der Linie entfernen
		     */

            return trim( preg_replace('/\s+/', ' ', $string) );
        }


        public function getMarkupTag($string){


            yield ($string == "<->") ? "header" : (
            ($string == "</->") ? "/header" : (
            ($string == "<-->") ? "section" : (
            ($string == "</-->") ? "/section" : (
            ($string == "<--->") ? "footer" : (
            ($string == "</--->") ? "/footer" : FALSE)))));

        }

        /*
        public function getInlineTag(){


        }
        */

        public function getBlockTag($line, $place){

            if($place == "start") {
                $cleanString = str_replace("<", "", str_replace(">", "", $line));
            }elseif($place == "end"){
                $cleanString = str_replace("</", "", str_replace(">", "", $line));
            }


            if((in_array($cleanString, $this->blockTags)) || (in_array($cleanString, $this->ownBlockTags))){

                if($place == "start") {
                    yield $cleanString;
                }elseif($place == "end") {
                    yield "/".$cleanString;
                }
            }


        }

        public function getType($line){
        
        	$length = strlen($line);

        	if ($length <= 10){

        		 
        		 if((strpos($line, "<") !== FALSE) && (strpos($line, ">") !== FALSE) && (strpos($line, "</") === FALSE)){

        		    // echo "<br>".$line;

        		     $tagNameStart = $this->getMarkupTag($line)->current();

        		     if($tagNameStart === FALSE) {
                         $tagNameStart = $this->getBlockTag($line, "start")->current();

                         //echo "<br> tagNameStart = ".$tagNameStart;
                     }
        		     
        		     yield ["startBlockTag", $tagNameStart];

        		 }elseif((strpos($line, "<") === FALSE) && (strpos($line, ">") === FALSE) && (strpos($line, "</") === FALSE)){

        		     $smallText = $line;

        		     yield ["smallText", $smallText];

                 }

        		 if (strpos($line, "</") !== FALSE){

        		     $tagNameEnd = $this->getMarkupTag($line)->current();

                     if($tagNameEnd === FALSE) {
                         $tagNameEnd = $this->getBlockTag($line, "end")->current();

                         //echo "<br> tagNameEnd = ".$tagNameEnd;
                     }

        		     yield ["endBlockTag", $tagNameEnd];
                 }
        		
        	}elseif((strpos($line, "<") === FALSE) && (strpos($line, ">") === FALSE) && (strpos($line, "</") === FALSE)){

        	    //echo "<br>".$line;
        	    yield ["text", $line];

            }elseif((strpos($line, "<") !== FALSE) && (strpos($line, "[") !== FALSE)){

                //echo "<br>".$line;

                $style = preg_match("/(<.*?>)(\[.*?])/", $line, $styleArray);

                $tagNameStart = $this->getMarkupTag($styleArray[1])->current();

                if($tagNameStart === FALSE){
                    $tagNameStart = $this->getBlockTag($styleArray[1], "start")->current();
                }

                $attributeOpen = str_replace("[", "", $styleArray[2]);
                $attribute = str_replace("]", "", $attributeOpen);

                /*
                echo "<pre>";
                print_r($styleArray);
                */
                yield ["startBlockTag", $tagNameStart, $attribute];

            }else{

                $stringOTag = "/(<([\w]++)[^>](.*?)>)(.*?)(<\/\\2>)/";

                $stringTagWithoutAttribute = "/(<([\w]++)[^>]*>)(.*?)(<\/\\2>)/";

                $result = [];

                preg_match_all($stringOTag, $line, $inlineWithAttribute, PREG_SET_ORDER);

                if(count($inlineWithAttribute) == 0){

                    preg_match_all($stringTagWithoutAttribute, $line, $inline, PREG_SET_ORDER);

                    $result = $inline;

                }else{

                    preg_match_all($stringTagWithoutAttribute, $line, $inline, PREG_SET_ORDER);

                    if(count($inlineWithAttribute) == count($inline)){

                        $result = $inlineWithAttribute;
                    }else{

                        foreach($inlineWithAttribute as $key => $value){

                            $result[] = $value;

                            foreach($inline as $inlineKey => $inlineArray) {

                                if($value[0] !== $inlineArray[0]) {

                                    if($key !== $inlineKey) {

                                        $result[] = $inlineArray;

                                    }else{

                                        array_unshift($result, $inlineArray);
                                    }
                                }
                            }
                        }
                    }
                }

                $splitPatternTags = "/(<.*?>.*?<\/.*?>)/";

                $restText = preg_split($splitPatternTags, $line);

        	    yield ["inline", $result, $restText];
            }
        	
        }
	}
}