<?php
namespace Partarum\Document {


    use DOMImplementation;
    use DOMText;

    class HTMLPlain {

        public $html;

        public $dom;

        public $surface;

        public $head;

        public $body;

        public function __construct(){

            $this->html = new DOMImplementation();
            $doctype = $this->html->createDocumentType('html');

            $this->dom = $this->html->createDocument(NULL, 'html', $doctype);
            $this->dom->formatOutput = true;
            $this->dom->encoding = 'utf-8';

            $this->surface = $this->dom->documentElement;
            $this->surface->setAttribute('lang', "de");

            $this->setHead();
            $this->setBody();
            $this->setViewport();
        }

        public function setScript($fileName, $module = FALSE){

            $script = $this->dom->createElement("script");
            $this->head->appendChild($script);

            $script->setAttribute("src", $fileName);
            ($module !== False) && $script->setAttribute("type", "module");
        }

        public function setLink($fileName){

            $link = $this->dom->createElement("link");
            $this->head->appendChild($link);

            $link->setAttribute("href", $fileName);
            $link->setAttribute("rel", "stylesheet");
            $link->setAttribute("type", "text/css");
        }

        public function setTitle($text){

            $title = $this->dom->createElement("title");
            $this->head->appendChild($title);

            $title->appendChild(new DOMText($text));
        }

        protected function setHead(){

            $this->head = $this->dom->createElement('head');
            $this->surface->appendChild($this->head);
        }

        protected function setBody(){

            $this->body = $this->dom->createElement('body');
            $this->surface->appendChild($this->body);
            $this->surface->setAttribute("style", "background-color: #f2f5f7");

        }

        protected function setViewport(){

            $viewport = $this->dom->createElement("meta");
            $this->head->appendChild($viewport);

            $viewport->setAttribute("name", "viewport");
            $viewport->setAttribute("content", "width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui");
        }

        public function close(){

            echo $this->dom->saveHTML();

        }
    }
}