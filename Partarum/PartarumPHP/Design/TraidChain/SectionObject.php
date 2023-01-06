<?php
namespace Partarum\Design\TraidChain {

    use ArrayObject;

    class SectionObject extends ArrayObject {

        public function __construct($array = [], $flags = 0, $iteratorClass = "ArrayIterator") {
            parent::__construct($array, $flags, $iteratorClass);
        }
    }
}