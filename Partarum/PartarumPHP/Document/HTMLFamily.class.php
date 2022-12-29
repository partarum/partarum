<?php
namespace Partarum\Document {

    use Partarum\Document\HTMLSeries;

    class HTMLFamily extends HTMLElement
    {

        public function setChild($name)
        {
            /*
                Wird automatisch zu children hinzugefügt
            */
            $el = new HTMLElement($name, $this);
        }

        public function setChildren($name, $quantity = 1)
        {
            $el = new HTMLSeries($name, $this, $quantity);
        }

        public function setGrandChild($name, $parent = 0)
        {
            $el = new HTMLElement($name, $this->children[$parent]);
        }

        public function setGrandChildren($name, $parent = 0, $quantity = 1)
        {
            $el = new HTMLSeries($name, $this->children[$parent], $quantity);
        }

        public function __construct($name, $parent)
        {
            /*
                $name ist der Elementname

                $parent ist das Elternobject
            */
            parent::__construct($name, $parent);
        }
    }
}