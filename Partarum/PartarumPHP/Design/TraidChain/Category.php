<?php
namespace Partarum\Design\TraidChain {

    use ArrayObject;
    use ReflectionClass;
    use ReflectionException;
    use WeakMap;

    class Category extends Catalog {


        public static array $sectionThemes = [];
        
        public array $sectionNames = [];
        
        public string $parentName;

        public function __construct(null | CatalogObject $catalog) {

            if((!isset($this->catalog)) && (isset($catalog))){
                $this->catalog = $catalog;
            }
        }

        public function setTheme(string $theme) : void {
            $this->theme = $theme;
        }
        
        public function getTheme() : string{
            
            return $this->theme;
        }

        public function addSection(string $theme, string $section) : void {

            try {
                
                echo "<h3>addSection - this->theme</h3>";
               // print_r($this->{$theme});

                $this->{$theme} = new ReflectionClass($section);

                Storage::add("section", $this->{$theme}, new ArrayObject($this->{$theme}->getConstants()));

                self::$themeCache[] = $this->theme . "\\" . $theme;

                $this->sectionNames[] = $section;


                if(!isset(self::$sectionThemes[$this->theme])){
                    
                    self::$sectionThemes[$this->theme] = [];

                } else if(!is_array(self::$sectionThemes[$this->theme])){

                    self::$sectionThemes[$this->theme] = [];
                }

                self::$sectionThemes[$this->theme][] = $theme;


                echo "<h3>addSection - parentName</h3><pre>";
                print_r($this->parentName);
                echo "</pre><h3>addSection - theme</h3><pre>";
                print_r($this->theme);
                echo "</pre><h3>addSection - sectionNames</h3><pre>";
                print_r($this->sectionNames);
                echo "</pre><h3>addSection - sectionThemes</h3><pre>";
                print_r(self::$sectionThemes);
                echo "</pre><h3>addSection - this catalog</h3><pre>";
                print_r($this->catalog);
                echo "</pre><h3>addSection - Storage this-theme</h3><pre>";

                $st = Storage::get("section", $this->{$theme});

                print_r($st);

                /*
                foreach($st as $key => $value){

                    echo "<h4>key</h4>";
                    print_r($key);
                    echo "<h4>value</h4>";
                    print_r($value);
                }
                */


            } catch (ReflectionException $re){

            }
        }

        public function showSections() : array {

            return self::$sectionThemes;
        }

        public function issetSection(string $theme) : bool {

            return isset($this->{$theme});
        }

        public function getSection(string $theme){

            return Storage::getObject("section",$this->{$theme});
        }

        public function addItem(string $theme, array $item){

        }

        public function showItems(){

        }

        public function issetItem(){

        }

        public function getItem(){

        }
    }
}