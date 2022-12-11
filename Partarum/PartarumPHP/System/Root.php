<?php
namespace Partarum\System {

    use SplFileInfo;

    /**
     * Class Root
     *
     * @package APT
     */
    class Root {

        public const SLASH = DIRECTORY_SEPARATOR;

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

            // TODO: zusätlich noch getcwd() auswerten

            $root = ($_SERVER["DOCUMENT_ROOT"] !== "") ? $_SERVER["DOCUMENT_ROOT"] : (self::isENV_HOME() ?? self::analyseRoot($needlePath, $needleFile));

            (!defined("ROOT")) && define("ROOT", (str_ends_with($root, DIRECTORY_SEPARATOR)) ? $root : $root . DIRECTORY_SEPARATOR);

            (!defined("SLASH")) && define("SLASH", DIRECTORY_SEPARATOR);

            return $root;
        }
    }
}