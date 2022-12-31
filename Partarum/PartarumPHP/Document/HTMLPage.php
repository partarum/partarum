<?php
namespace Partarum\Document {

    //use Partarum\TheOffice;
    use Partarum\Document\FeatHTMLPage;
    use Partarum\Document\{
        HTMLgetEtc as HTMLgetEtc,
        HTMLDocument as HTMLDocument,
        HTMLSeries as HTMLSeries,
        HTMLElement as HTMLElement};
    use stdClass;

    class HTMLPage extends HTMLDocument{
	    use FeatHTMLPage;

        // none, base ; start, finish
	    public function __construct($theme = NULL, $part = NULL){

	        parent::__construct();

            $this->setWrapperToParentObject();

		    $this->open();

		    $this->theme = $theme;

		    if(($theme !== NULL) && ($part !== NULL)) {

                (($theme !== "none") || ($theme !== "start") && ($theme === NULL)) && $this->openWithWrapper($part);

                (($theme === "none") || ($theme === "start")) && $this->openWithoutWrapper($part);

                $this->etc = (($part !== "finish") && (($theme !== "start") || ($theme !== "none"))) ? new HTMLgetEtc($theme) : false;

                if (($theme !== "start") && ($theme !== "none") && ($part !== "finish")) {

                    echo "------------------->".$theme."----------".$part;

                    $this->setPage();
                }
            }

            $this->openWithWrapper($part);

            $this->setPage();

	    }

	    public function open(){

		    parent::setBase();
		    parent::setStructur();

            $path = $this->path;
            $this->head =& $this->dom->{$path["html"]}->{$path["head"]};
            $this->body =& $this->dom->{$path["html"]}->{$path["body"]};
	    }

	    protected function setDOMReference(){

                $path = $this->path;
                $this->header =& $this->dom->{$path["body"]}->{$path["header"]};
                $this->main =& $this->dom->{$path["body"]}->{$path["main"]};
                $this->footer =& $this->dom->{$path["body"]}->{$path["footer"]};
        }

	    public function openWithWrapper($part = TRUE){

		    $this->setWrapper($this->theme !== NULL);

            ($this->theme === NULL) && $this->setDOMReference();

            (($part !== TRUE) && (($part == "finish") || ($part === NULL))) && $this->close();
	    }

	    public function openWithoutWrapper($part){

            //($this->theme === NULL) && $this->setDOMReference();

	        (($part == "finish") || ($part === NULL)) && $this->close();
	    }

        public function setPage(){


	    }

	    public function close(){

		    echo $this->dom->dom->saveHTML();
	    }
    }
}