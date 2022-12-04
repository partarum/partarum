<?php
namespace Partarum\Document {

    use \DOMElement as DOMElement;
    use \DOMText as DOMText;
    use Partarum\Document\HTMLAttribute;

    class HTMLElement extends DOMElement{
        
        public $parent = [];

        public function __set($name, $value){

            switch ($name) {
                case "text":
                    $this->appendChild(new DOMText($value));
                    break;
                default:

                    /*
                    echo "<pre>";
                    echo "value von __set HTMLElement : <br>";
                    print_r($value);
                    */

                    new HTMLAttribute([$name => $value], $this);
            }
        }

        public function __construct($node, $parent = NULL) {
            /*
            echo "<pre>";
            echo $node;
            echo "<br>Elternelement: ";
            print_r($parent);
            */

            if ($parent !== NULL) {
                /*
                echo "---type---".get_class($parent);


                echo "<pre>";
                echo "node ist ein : ".gettype($node); // string
                */

                if ((is_object($node)) && ((isset($node->element)) && ($node->element !== NULL))) {
                    parent::__construct($node->element);

                    /*
                    echo "<pre>";
                    echo "parentNode part 2:   ".get_class($parent);
                    */

                    $this->parent[] = $parent;

                    $parent->appendChild($this);
                    //$parent[]->children = $this;

                    ((isset($node->text)) && ($node->text !== NULL)) && $this->appendChild(new DOMText($node->text));

                    unset($node->element);
                    unset($node->text);

                    new HTMLAttribute($node, $this);
                } elseif (is_string($node)) {
                
                    /*
                	echo "<pre>";
                	echo "node : ".$node;
                	
                    echo "parentNodeTagName:   ".$parent->tagName;
                    */
                    //print_r($parent);


                    /*
                     *  Hier muss unterschieden werden zwischen HTMLElement und HTMLSeries
                     */
                    $getParentClass = get_class($parent);

                    if(($getParentClass == "Partarum\Document\HTMLElement") || ($getParentClass == "DOMElement")) {
                        parent::__construct($node);

                        /*
                        echo "<pre>";
                        echo "letztes Parentobject nach parent::construct :  ".get_class($parent);
                        print_r($this);
                        */

                        $parent->appendChild($this);

                    } else {

                        parent::__construct($node);

                        /*
                        echo "<pre>";
                        print_r($parent);
                        */

                        $parent->parent[0]->appendChild($this);

                        //$parent->appendChild($this);
                        //echo "Hier kommt eine Ausgabe für HTMLSeries - Objecte hin!!!";
                    }



                } else {
                    echo "du hast kein Element angegeben";
                }
            }
        }

    }
}
