<?php
namespace Partarum {

    use Partarum\Office;
    use Partarum\Config\GlobalConfig;
    use Partarum\Security\SafetyService;


    class WebApp {

    	public $theme;

    	public $ses = 0;

    	public $style;

    	public $wrapper = 0;

        public int $presentation = 1;

        public int $public = 1;

        public int $private = 0;


        public function create(){

         	GlobalConfig::setTheme($this->theme);
         	GlobalConfig::setSes($this->ses ?? 0);
         	GlobalConfig::setStyle($this->style);
         	GlobalConfig::setPresentation($this->presentation ?? 1);
         	GlobalConfig::setPublic($this->public ?? 1);
         	GlobalConfig::setPrivate($this->private ?? 0);
         	GlobalConfig::setWrapper(!(($this->wrapper === 0)));

            ($this->public === 0) && new SafetyService();

            $theme = $this->theme;

        	$html = new Office($theme, "start", TRUE);

            $html->page->close();
        }
    }
}