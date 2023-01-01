<?php
namespace Partarum\PartarumCLI\System {

    use SplFileInfo;

    /**
     * Class Root
     *
     * @package APT
     */
    class Root {

        public const SLASH = DIRECTORY_SEPARATOR;
        
        public static $HOME;
        
        public static $DOCUMENT_ROOT;

        /**
         * @param string $needlePath
         * @param string $needleFile
         *
         * @return string
         */
        private static function analyseRoot(string $needlePath, string $needleFile) : string {

            $file = new SplFileInfo(__DIR__ . DIRECTORY_SEPARATOR . $needleFile);

            $isSamePath = __DIR__ === $file->getPath();

            $haystack = explode(DIRECTORY_SEPARATOR, $needlePath);

            if($isSamePath === TRUE) {

                $pathArray = explode(DIRECTORY_SEPARATOR, __DIR__);

                foreach($pathArray as $key => $needle){

                    if(in_array($needle, $haystack, TRUE)){
                        unset($pathArray[$key]);
                    }
                }

                return implode(DIRECTORY_SEPARATOR, $pathArray);
            }

            return "DOCUMENT_ROOT konnte nicht aufgelöst werden!";
        }

        /**
         * @return string|null
         */
        private static function isENV_HOME() : ?string {

            return (getenv("HOME") !== false) ? getenv("HOME") : NULL;
        }

        /**
         * @param string $needlePath
         * @param string $needleFile
         *
         * @return string
         */
        public static function getPath(string $needlePath = "Partarum", string $needleFile = Root::SLASH . "WebApp.php"): string {

            return ($_SERVER["DOCUMENT_ROOT"] !== "") ? $_SERVER["DOCUMENT_ROOT"] : (self::isENV_HOME() ?? self::analyseRoot($needlePath, $needleFile));
        }
        
        public static function getHome(){
            
            self::$HOME = self::getPath();
            
            return self::$HOME;
        }
        
        public static function getDocumentRoot(){
            
            $basePath = "Partarum/PartarumCLI/System";

            //echo __DIR__ . PHP_EOL;

            $dir = explode($basePath, __DIR__);
            
            self::$DOCUMENT_ROOT = $dir[0];
            
            print_r($dir);
            
            return $dir[0];
        }
        
        public static function setRootObject(){
            
            self::getHome();
            self::getDocumentRoot();
            
        }

        public static function cdRoot(){

            self::setRootObject();

            chdir(self::$DOCUMENT_ROOT);
        }
    }
}