<?php
namespace Partarum\Document {

    use \DOMAttr as DOMAttr;

	class HTMLAttribute{

		public function __construct($nodeObject, $element)
		{

            /*
		    echo "<pre>";
		    echo "nodeObject von HTMLAttribute : ";
		    print_r($nodeObject);
		    print_r($element);
            */

			foreach ($nodeObject as $attribute => $value) {
				(($attribute != "event") && ($value !== NULL)) && $element->appendChild(new DOMAttr($attribute, $value));
			}

		}
	}
}
