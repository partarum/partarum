<?php
namespace bin\php\classes\HTML{

    use ReflectionClass;
    use bin\php\classes\FILESYSTEM\DirectoryGenerator;

    class HTMLgetEtc {
       
        public object $element;
        public object $tagName;
        public object $etcPath;
        public object $textPath;

        const HTML_PATH = "/theOffice/etc/";
        
        const DASHBOARD_PATH = "/theOffice/bin/php/classes/DASHBOARD/surface/html";
        
        const DS = DIRECTORY_SEPARATOR;

        public object $iterator;
        public $theme;

        public function __construct($theme){
            $this->theme = $theme;
            $this->getIterator();
            $this->getEtcClass();
        }

        /*
         * $this->iterator object
         */
        public function getIterator(){
        
        	$path = $this->filterPath();
        	
        	//echo $path;

			$this->iterator = new DirectoryGenerator($path);
		}
		
		public function filterPath(){
		
			$path = ($this->theme == "theOffice") ? self::DASHBOARD_PATH : self::HTML_PATH.$this->theme."/surface/html";
			
			return $path;
			
		}

        /*
         * jedes Element aus $this->iterator
         */
        public function getEtcClass(){
            $wwwRoot = $_SERVER["DOCUMENT_ROOT"];
            $slash = DIRECTORY_SEPARATOR;

            $tagName = [];
            $IDCounter = 1;
            $ID = "tagName_";
            $this->tagName = new \stdClass();
            $this->element = new \stdClass();
            $this->etcPath = new \stdClass();
            $this->textPath = new \stdClass();
            
            $directory = $this->iterator->getDirectory();


            foreach ($directory as $fileinfo) {




                if ($fileinfo->isFile()) {

                    /*
                     * $name => Dateiname mit Endung z.B.: nav.php
                     * $className => Dateiname ohne Endung z.B.: nav
                     */


                    $fileName = $fileinfo->getBasename();      // nav.php, text.txt

                    if ($fileName != "text.txt") {
                        $className = $fileinfo->getBasename('.php');
                       // $textFile = $fileinfo->getBasename('.txt');

                        echo "<pre>";
                        print_r($fileName);

                        $subPath = $fileinfo->getSubPath();
                        $elementPath = $this->setSurfacePath($subPath)->current();

                        $counter = $IDCounter++;
                        $tagID = $ID . $counter;

                        $name = "name";
                        $path = "path";

                        $this->tagName->$tagID = new \stdClass();
                        $this->tagName->$tagID->$name = $className;

                        /*
                         * $includeAndParentPath => Unterordner von z.B.: etc/office/surface/html
                         */
                         
                         // etc\thuringia\

                        $themePath = "etc" . $slash . $this->theme . $slash;

						// etc\thuringia\surface\html\

                        $htmlPath = $themePath . "surface" . $slash . "html" . $slash;


						if($this->theme !== "theOffice"){
						
                        $includeAndParentPath = $htmlPath . $fileinfo->getSubPath();
                        

                        /*
                         *  $filePath => Der Originalpfad zur Datei, welche eingebunden werden muss
                         */

                        $filePath = $wwwRoot . $slash . "theOffice" . $slash . $includeAndParentPath . $slash . $fileName;
                        }else{
                        
                        $includeAndParentPath = self::DASHBOARD_PATH.DIRECTORY_SEPARATOR.$fileinfo->getSubPath();
                        
                        //echo "<br> includeAndParentPath = ".$includeAndParentPath;
                        
                        
                        
                        $filePath = $wwwRoot.$includeAndParentPath.DIRECTORY_SEPARATOR.$fileName;
                        
                        }
                        
                        
                        //echo "<br> HTMLgetEtc line 135 includePath = ".$filePath;

                        include $filePath; //autoloader_regestrie !!!

                        /*
                         *  Alle Zahlen und # und _ aus dem Ordnerpfad entfernen
                         *
                         *  $this->element->$className => der gefilterte Ordnerpfad
                         */

                        $filterPath_first = $includeAndParentPath;
                        $createElementPath = $elementPath;
                        
                        //echo "<br> HTMLgetEtc line 151 createElementPath= ".$createElementPath;

                        for ($x = 1; $x <= 9; $x++) {

                            $filter = $x . "#";
                            $filterPath_first = str_replace($filter, "", $filterPath_first);

                            $createElementPath = str_replace($filter, "", $createElementPath);
                        }

                        $this->tagName->$tagID->$path = $createElementPath;

                       
                       if($this->theme !== "theOffice"){
                       
                        $filterPathNeedle = "etc\\".$this->theme ."\\";

                        }else{
                        
                       	//$filterPathNeedle = DIRECTORY_SEPARATOR."theOffice".DIRECTORY_SEPARATOR."bin".DIRECTORY_SEPARATOR."php".DIRECTORY_SEPARATOR."classes".DIRECTORY_SEPARATOR."DASHBOARD".DIRECTORY_SEPARATOR;

                       	$filterPathNeedle = "\\theOffice\\bin\\php\\classes\\DASHBOARD\\";
                        }

                        //echo "<br> HTMLgetEtc line 176 filterPath_First =  ".$filterPath_first;
                        
                        $filterPath = str_replace($filterPathNeedle, "", str_replace("/", "\\",$filterPath_first));


						//echo "<br> HTMLgetEtc line 181 filterPath =  ".$filterPath;



                        if ((isset($this->element->$filterPath)) && (is_array($this->element->$filterPath))) {

                            $this->element->$filterPath[] = $tagID;
                        } else {

                            $this->element->$filterPath = [];
                            $this->element->$filterPath[] = $tagID;
                        }

                        /*
                         *  Der Namespacepfad der etc - Klasse, des Elementes
                         */
                        $convertNamespacePath = str_replace("/", "\\", $includeAndParentPath);

                        for ($i = 1; $i <= 9; $i++) {

                            $searchString = $i . "#";
                            $getNeedle = stripos($convertNamespacePath, $searchString);
                            $getNeedleElementPath = stripos($elementPath, $searchString);

                            if ($getNeedle !== FALSE) {
                                $createNamespacePath = str_replace($searchString, "", $convertNamespacePath);
                                $convertNamespacePath = $createNamespacePath;
                                
                                //echo "<pre>";
                                //echo $createNamespacePath;
                                
                            } else {
                                $createNamespacePath = $convertNamespacePath;
                            }
                        }

						if($this->theme !== "theOffice"){

                            $this->etcPath->$tagID = "\\" . $createNamespacePath . "\\" . $className . "\\etc"; //namespace!!!
                        }else{
                        
                            $namespacePathDashboard = str_replace("\\theOffice", "", $createNamespacePath);
                        
                            $this->etcPath->$tagID = $namespacePathDashboard."\\".$className."\\"."etc";
                        }
                        
                       // echo "<br> HTMLgetEtc line 198 this->etcPath->tagId =  ".$this->etcPath->$tagID;
                        
                    }
                    elseif ($fileName == "text.txt"){

                        $propPath= $this->setSurfacePath($fileinfo->getSubPath())->current();
                        $prop = preg_replace("/[0-9]#/", "", $propPath);
                        $this->textPath->$prop = $fileinfo->getRealPath();

                    }


                }
            }

            //echo "<pre>";
            /*
            echo "tagName:   ";
            print_r($this->tagName);
            */
            /*
            echo "element: ";
            print_r($this->element);
            */
            /*
            echo "Namespace:   ";
            print_r($this->etcPath);
            */
        }

        public function setSurfacePath($subPath){

           yield "surface\html\\".$subPath;

        }

        public function getEtcConst($tagName)
        {
            try {

                $etc = new ReflectionClass($this->etcPath->$tagName);
                yield $etc->getConstants();

            }catch(\Throwable $throwable){
                echo "Hier liegt ein Fehler vor!!!!";
                echo "<pre>";
                print_r($this->etcPath);
                print_r($this->etcPath->$tagName);
                echo "</pre>";
            }
        }
    }
}
