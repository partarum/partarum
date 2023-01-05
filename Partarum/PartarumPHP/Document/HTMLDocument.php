<?php
namespace Partarum\Document {

    use DOMImplementation as DOMImplementation;
    use stdClass as stdClass;

	class HTMLDocument extends DOMImplementation
	{

            /*
            *  dom = Object { dom, surface, html, head, body }
            *  dom->dom = DOMElement append html
            *  dom->surface =  html DOMElement append head & body
            *  dom->html = Object { head = DOMElement append Child, body = DOMElement append Child }
            *  dom->head = Object { child = HTMLElement || HTMLSeries append Child }
            *  dom->body = Object { child = HTMLElement || HTMLSeries append Child }
            */


        public $dom;
		//public object $dom;
		public $path;


		public function setStructur()
		{
		    $path = $this->path;

		    $this->dom->{$path["html"]}->{$path["head"]} = $this->dom->{$path["dom"]}->createElement('head');
		    $this->dom->{$path["surface"]}->appendChild($this->dom->{$path["html"]}->{$path["head"]});

		    $this->dom->{$path["html"]}->{$path["body"]} = $this->dom->{$path["dom"]}->createElement('body');

            $this->dom->{$path["html"]}->{$path["body"]}->setAttribute('class', "pupsgesicht");

		    $this->dom->{$path["surface"]}->appendChild($this->dom->{$path["html"]}->{$path["body"]});

		}

		public function setBase()
		{
			$doctype = parent::createDocumentType('html');

			$path = $this->path;

			$this->dom->{$path["dom"]} = parent::createDocument(NULL, 'html', $doctype);
			$this->dom->{$path["dom"]}->formatOutput = true;
			$this->dom->{$path["dom"]}->encoding = 'utf-8';


			$this->dom->{$path["surface"]} = $this->dom->{$path["dom"]}->documentElement;
			$this->dom->{$path["surface"]}->setAttribute('lang', "de");

		}

		public function setParentObject(){


            $this->dom = new stdClass();

            $this->path["dom"] = "dom";
            $this->path["surface"] = "surface";
            $this->path["html"] = "surface\html";
            $this->path["head"] = $this->path["html"]."\head";
            $this->path["body"] = $this->path["html"]."\body";

            $path = $this->path;

            $this->dom->{$path["html"]} = new stdClass();
            $this->dom->{$path["head"]} = new stdClass();
            $this->dom->{$path["body"]} = new stdClass();

            /*
            echo "<pre>";
            print_r($this->dom);
            */
        }

		public function set()
		{
			echo $this->dom->dom->saveHTML();
		}

		/*
        public function setElement($el);
        {
            return new HTMLElement($el);
        }
        */
		public function __construct()
		{

		    $this->setParentObject();
			$this->setBase();
			$this->setStructur();
		}
	}
}
