<?php
namespace Partarum\Test {

    use Partarum\Design\TraidChain\Catalog;
    use Partarum\Design\TraidChain\Category;
    use Partarum\Design\TraidChain\Storage;
    use Partarum\HTTP\Header;
    use Partarum\HTTP\Header\Entity;
    use Partarum\HTTP\Header\General;
    use Partarum\HTTP\Header\Request;
    use Partarum\HTTP\Header\Response;

    class APICatalog extends Catalog {
        
        public function __construct(){

            $this->setName(Header::class);

            /*
             *  Category hinzufügen
             */
            $base = $this->addCategory("Base");
            $base->addSection("General",General::class);
            $base->addSection("Entity", Entity::class);

            //echo ($base === $this->base) ? "Es ist das Object" : "Es ist nicht das Object";
            
            echo "<h3>APICatalog -> this - base</h3>";
            print_r($this->catalog->{"Base"});
            

            $request = $this->addCategory("Request");
            $request->addSection("Request", Request::class);
            $request->useCategory($base);


            $response = $this->addCategory("Response");
            $response->addSection("Response", Response::class);
            $response->useCategory($base);

            /*
            echo "REQUEST - START <br>";
            echo "<pre>";
            print_r($request);
            echo "REQUEST - END <br>";

            echo "<h3>APICatalog - ThemeCache : </h3>";
            print_r(self::$themeCache);
            */

            //echo "<h3> APICatalog - Storage - Catalog </h3>";
            //print_r(Storage::$catalog);


            echo "<h3>Storage - Section</h3>";
            print_r(Storage::$section);

            /*
            echo "<h3>Category - sectionThemes</h3>";
            print_r(Category::$sectionThemes);
            */
        }
    }
}