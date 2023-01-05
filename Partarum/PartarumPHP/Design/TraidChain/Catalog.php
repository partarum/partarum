<?php
namespace Partarum\Design\TraidChain {

    use ArrayObject;
    use Partarum\Design\TraidChain\Category;
    use ReflectionClass;
    use ReflectionException;
    use WeakMap;

    class Catalog {


        public null | CatalogObject $catalog;

        public static array $themeCache = [];

        public string $theme;

        private ReflectionClass $name;



        public function setName($name){

            try {

                $this->name = new ReflectionClass($name);

            } catch(ReflectionException $re){

            }
        }

        public function getName(){

            return $this->name;
        }

        /**
         * @param string $theme
         *
         * @return \Partarum\Design\TraidChain\Category
         */
        public function addCategory(string $theme) : Category{

            $this->create();

            $this->catalog->{$theme} = new CategoryObject();

            // * neue Instanz von Category erstellen
            // ! Category extends Catalog
            $category = new Category($this->catalog);

            // * das Thema setzen
            $category->setTheme($theme);

            // * das Thema dem Themen - Cache hinzufügen | Array
            self::$themeCache[] = $theme;

            $category->parentName = $theme;
           
             // * das Category - Object und Thema dem Storage hinzufügen
            Storage::add("catalog", $category, $theme);



            return $category;
        }

        public function useCategory(Category $category){

            // * das Thema des Objektes erfahren
            $subTheme = $category->getTheme();

            // * das Subthema erstellen
            $themeName = $this->theme . "\\" . $subTheme;

            // * das Subthema dem Themen - Cache hinzufügen
            self::$themeCache[] = $themeName;

            // * Prüfen auf Sections und zusammenführen
            if(isset($this->sectionNames)){
                $this->sectionNames = array_merge($category->sectionNames, $this->sectionNames);

                foreach($this->sectionNames as $value){

                    $this->catalog->{$this->theme}->{$value} = new SectionObject();
                }
            }
        }

        public function getCategory($theme){

        }

        public function hasCategories(){

        }

        public function getCatalog(){

            return Storage::getCatalog();
        }

        private function create(){

            if(!isset($this->catalog)) {

                $this->catalog = new CatalogObject();
            }
        }

        public function include(){
            
        }
    }
}