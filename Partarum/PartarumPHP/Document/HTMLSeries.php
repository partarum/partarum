<?php
namespace Partarum\Document {

    use Partarum\Document\HTMLElement;
    use Partarum\Document\HTMLAttribute;
    use Partarum\Document\HTMLText;

    class HTMLSeries
    {
        /* Die Elemente die erstellt werden  */
        public $elements = [];

        private $tagName;

        public $parent;

        public $countQuantity;

        public $length;

        //public $id;

        public function __construct($name, $parent, $count = 1)
        {

            /*
            echo "<pre>";
            echo "Parent-Element: ---- from: ".$name."------>";
            print_r($parent);
            echo "</pre>";
            */


            $this->tagName = $name;
            $this->parent = $this->getParentType($parent);

            $this->add($count);
        }

        public function add($count)
        {
            //echo $count;

            /*
            echo "<pre>";
            echo "<br> Anzahl der Elemente die erstellt werden sollen : ".$count;
            echo "<br>HTMLSeries - add - tagName : ".$this->tagName;
            echo " --- Anzahl Elemente im Array : ".count($this->parent);
            print_r($this->parent);
            echo "<br> after parent";
            */

            // Anzahl der Eltern
            for ($h = 0; $h < count($this->parent); $h++) {
            
                /*
            	echo "<pre>";
                echo "h: --".gettype($this->parent[$h])."----;";
                */

                // Anzahl der Kinder
                for ($j = 0; $j < $count; $j++) {

                    /*
                    echo "Anfang Schleife Element" . $this->tagName . " - parent : ";
                    echo "<pre>";
                    print_r($this->parent[$h]);
                    */

                    //echo "<br> Type des Parent von Series zu Element : ".get_class($this->parent[$h]);

                    $el = new HTMLElement($this->tagName, $this->parent[$h]);
                    $this->elements[] = $el;

                    //echo "Schleifenende";
                }
            }

            $this->length = count($this->elements);
        }

        public function __set($name, $value)
        {
            switch ($name) {
                case "quantity":

                    if ($this->countQuantity === NULL) {
                        $this->add($value - 1);
                        $this->countQuantity = 1;
                    } elseif ($this->countQuantity == 1) {
                        echo "Dein HTMLSeries Object hat schon eine quantity Anweisung!";
                    }

                    break;
                case "text":
                /*
                echo "<pre>";
                echo "name";
                print_r($name);
                */

                    for ($i = 0; $i < count($this->elements); $i++) {
                    /*
                    echo $i;
                    echo $value[$i];
                    echo "<pre>";
                    print_r($this->elements[$i]);
                    */

                        new HTMLText($value[$i], $this->elements[$i]);
                    }
                    break;
                default:
                    if (is_array($value)) {
                       // $this->id = ($name == "id") ? $value : "kein Wert";

                        /*
                        echo "<pre>";
                        echo "<br> --- attribute : ".$name;
                        print_r($value);
                        print_r($this->elements);
                        */

                        if (count($value) == count($this->elements)) {
                            for ($i = 0; $i < count($value); $i++) {

								/*
                                echo "<pre>";
                                echo $value[$i];
								*/

                                new HTMLAttribute([$name => $value[$i]], $this->elements[$i]);
                            }
                        }
                    }
            }
        }

        public function __get($name)
        {
            /*
            Was kann $name sein?

              - eine ID
              - ein DOMElement / DOMNode Attribute

            Was darf es nicht sein?

              - ein Zähler
            */
        }

        /*
         * Wenn an HTMLSeries ein Object als Parent übergeben wird, ist es nur logisch, das alle
         * Elemente darin angesprochen sind. Ansonsten täte man ja ein Element, oder spezifisch die Elemente angeben,
         * welche man meint z.B. parent->elements[0] || [parent->elements[1], parent->elements[5]] usw....
         * Das sind dann zwar auch Objecte, aber eben einzelne.
         */
        public function getParentType($parent)
        {
        
        	/*
        	echo "<pre>";
        	print_r($parent);
        	*/
        
        
            $name = (is_object($parent)) ? get_class($parent) : ((is_array($parent)) ? "Array" : NULL);

            //echo $name;

            switch ($name) {

                case "Partarum\Document\HTMLSeries":
                    //echo "case: HTMLSeries - ";
                    return $parent->elements; //ist ein Array
                    break;
                case "Partarum\Document\HTMLElement":
                    //echo "case: HTMLElement - ";
                    return [$parent]; // ist jetzt auch ein Array
                    break;
                case "DOMElement":
                    //echo "case: DOMElement - ";
                    return [$parent];
                    break;
                case "Array":
                    //echo "case: Array - ";

                    $type = gettype($parent[0]);

                    $resultParent = ($type == "object") ? (
                        (get_class($parent[0]) == "Partarum\Document\HTMLSeries") ? $parent[0]->elements : $parent[0]) : $parent;


                    return $resultParent; // ist ein Array
                    break;
                case NULL:
                    //echo "case: NULL - ";
                    return NULL;
                    break;
            }
        }
    }
}
