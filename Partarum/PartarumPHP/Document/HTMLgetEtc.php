<?php
namespace Partarum\Document {

    use Partarum\GlobalConfig;
    use Partarum\Service\TheOffice;
    use Partarum\Document\FeatHTMLgetEtc;
    use Partarum\Document\HTMLObject;
    use Partarum\Document\HTMLetcElementInfo;
    use ReflectionClass;
    use Partarum\FILESYSTEM\FilesystemGenerator;

    class HTMLgetEtc {

        use FeatHTMLgetEtc;

        const HTML_PATH = "/partarum/etc/";

        const DASHBOARD_PATH = "/partarum/src/php/classes/DASHBOARD/surface/html";

        const DS = DIRECTORY_SEPARATOR;

        public $extension;

        public $templateExtension = [
            "txt",
            "plain",
            "html",
            "js"
        ];

        public $etc;

        public $templatePaths;

        public $mainTags = [
          "head" => "head",
          "header" => "1#header",
          "main" => "2#main",
          "footer" => "3#footer"
        ];

        public $paths = [
            "head" => "surface\html\head",
            "header" => "surface\html\body\wrapper\1#header",
            "main" => "surface\html\body\wrapper\2#main",
            "footer" => "surface\html\body\wrapper\3#footer"
        ];

        public $pattern;

        public $iterator;
        public $theme;

        public function __construct($theme){
            $this->theme = $theme;
            $this->setPattern();
            $this->getIterator();
            $this->getEtc();
        }



        /*
         * jedes Element aus $this->iterator
         */

        public function getEtc() {

            //$wwwRoot = $_SERVER["DOCUMENT_ROOT"];

            $wwwRoot = TheOffice::backslashRoot();

            $slash = DIRECTORY_SEPARATOR;

            $this->etc = new HTMLObject();
            $this->templatePaths = new class {};     // eigene Klasse schreiben!!

            $pattern = $this->pattern;

            //$filterDOMPathNeedle = TheOffice::getEtcPath();

            if($this->theme !== "theOffice"){

                $filterDOMPathNeedle = $wwwRoot."\\partarum\\etc\\".$this->theme ."\\";

            }else{

                $filterDOMPathNeedle = $wwwRoot."\\partarum\\src\\php\\classes\\DASHBOARD\\";

            }

            $directory = $this->iterator->getFile();

            foreach($directory as $file){

                $fileName = $file->getBasename();

                $fileExtension = $file->getExtension();

                if (!in_array($fileExtension, $this->templateExtension)) {

                    $path = $file->getPath();
                    //$pathName = $file->getPathname();

                    $tagName = $file->getBasename(".php");
                    $elementName = preg_replace("![^a-z]!", "", $tagName);

                    $filePath = $file->getPathname();

                    //echo "<br> HTMLgetEtc line 135 includePath = ".$filePath;

                    include $filePath; //autoloader_regestrie !!!


                    $filterNamespaceNeedle = (GlobalConfig::$theme !== "theOffice") ? $wwwRoot."\\partarum\\" : $wwwRoot."\\partarum\\src\\php\\classes\\";

                    $filePathWithBackslash = str_replace("/", "\\",str_replace(["1#", "2#", "3#"], "", $filePath));
                    $filterDOMPath = str_replace($filterDOMPathNeedle, "", $filePathWithBackslash);

                    $domPath = str_replace($fileName, $tagName, $filterDOMPath);
                    $slashPosParentPath = strrpos($domPath, "\\");
                    $domParentPath = substr( $domPath, 0, $slashPosParentPath);

                    //$domParentPath = str_replace("\\".$tagName,"", $domPath);

                    $slashPos = strrpos($domParentPath, "\\");
                    $domParentParentPath = substr( $domParentPath, 0, $slashPos);

                    $filterNamespacePath = str_replace($filterNamespaceNeedle, "", $filePathWithBackslash);
                    $namespacePath = str_replace($fileName, $tagName,$filterNamespacePath);

                    //echo "<br> namespacePath HTMLgetEtc = ".$namespacePath."<br>";

                    foreach ($pattern as $key => $patt) {

                        if (preg_match($patt, $path, $result)) {

                            $newPath = $key;

                            $objectLevelOnePos = strrpos( $filePath, $this->mainTags[$key]);
                            $objectLevelOne = substr($filePath, $objectLevelOnePos);
                            $objectLevelOnePath = preg_replace("![0-9]#!", "", $objectLevelOne);


                            $this->etc->$newPath->$objectLevelOnePath = new HTMLetcElementInfo();
                            $this->etc->$newPath->$objectLevelOnePath->tagName = $elementName;
                            $this->etc->$newPath->$objectLevelOnePath->domPath = $domPath;
                            $this->etc->$newPath->$objectLevelOnePath->domParentPath = $domParentPath;
                            $this->etc->$newPath->$objectLevelOnePath->domParentParentPath = $domParentParentPath;
                            $this->etc->$newPath->$objectLevelOnePath->namespacePath = $namespacePath;

                        }
                    }
                } elseif (in_array($fileExtension, $this->templateExtension)){

                    /*
                     *  .txt
                     *  .plain
                     *      parsen
                     *  .html
                     *      echo file_get_content || selbst parsen
                     *  .js
                     *      Datei in <script> einbinden
                     *  .php
                     *      schwierig.....
                     */


                    $filterPropPath = str_replace("/", "\\", $file->getPath());

                    //echo "<br> filterPropPath = ".$filterPropPath;

                    $propPath= str_replace($filterDOMPathNeedle, "", $filterPropPath);

                    $textFilePath = $file->getPathname();

                    $prop = preg_replace("/[0-9]#/", "", $propPath);

                    //echo "<br> prop = ".$prop;

                    $this->templatePaths->$prop = $textFilePath;

                    $this->extension = $fileExtension;

                    //echo "<br>HTMLgetEtc extension = ".$this->extension;
                }
            }
        }
    }
}