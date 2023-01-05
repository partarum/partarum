<?php
namespace Partarum\Document {

    use Partarum\Filesystem\FilesystemGenerator;
    use ReflectionClass;

    trait FeatHTMLgetEtc {


        public function getIterator(){

            $path = $this->filterPath();

            $this->iterator = new FilesystemGenerator($path);
        }

        public function filterPath(){

            $path = ($this->theme == "theOffice") ? $_SERVER["DOCUMENT_ROOT"].self::DASHBOARD_PATH : $_SERVER["DOCUMENT_ROOT"].self::HTML_PATH.$this->theme."/surface/html";

            return $path;

        }

        public function getEtcConst($namespacePath)
        {

            //echo "<br> namespacePath featHTMLgetEtc = ".$namespacePath;

            try {

                $etc = new ReflectionClass($namespacePath."\\etc");
                yield $etc->getConstants();

            }catch(\Throwable $throwable){
                echo "Hier liegt ein Fehler vor!!!!";
                echo "<pre>";
                print_r($throwable);
                //print_r($this->etcPath);
                //print_r($this->etcPath->$tagName);
                echo "</pre>";
            }
        }

        public function setPattern(){

            $this->pattern = [
                "head" => "{".preg_quote("head")."$}",
                "header" => "{".preg_quote("1#header")."}",
                "main" => "{".preg_quote("2#main")."}",
                "footer" => "{".preg_quote("3#footer")."}"
            ];
        }

        public function setSurfacePath($subPath){

            yield "surface\html\\".$subPath;

        }
    }
}