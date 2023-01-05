<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
namespace Partarum\System {

    require "Root.php";
    require "AutoloadObject.php";
    
    use Exception;
    use RuntimeException;
    use stdClass;
    use Partarum\System\Root as Root;
    use Partarum\System\AutoloadObject;

    class Autoloader {

        public const FOLDER = "NamespaceRoot";

        public const NAMESPACE_ROOT = self::FOLDER;

        public const CLASS_ROOT = self::FOLDER;

        public const REGISTER = "Register";

        public const MANIFEST = "Manifest";

        public static string $root;

        public static string $slash;

        public static bool $baseSettled = FALSE;

        private static ?string $partarumRootPath = NULL;

        public static function autoload($class) : void {

            /*
            echo "<br> class = ".$class;
            echo "</br>".$_SERVER["DOCUMENT_ROOT"];
            */

            (self::$baseSettled === false) && self::setBase();

            $rootPath = self::sortByTopic($class);

            if(isset($rootPath->topic, $rootPath->path)){

                $fileName = match ($rootPath->topic) {
                    "Partarum" => self::isPartarum($class),
                    default => $rootPath->path . SLASH . $rootPath->classPath . ".php",
                };

                $cleanFilename = str_replace("//", "/", $fileName);

                //echo PHP_EOL . "Start:". PHP_EOL . "clenFilename = " . $cleanFilename . PHP_EOL . "End" . PHP_EOL;

                if(file_exists($cleanFilename)) {

                    require_once $cleanFilename;
                } else {

                    echo "not found";
                }

            } else {

                throw new Exception("Error");
            }
        }

        private static function setBase() : void {

            $root = Root::getPath();
            
            self::$root = (str_ends_with($root, DIRECTORY_SEPARATOR)) ? $root : $root . DIRECTORY_SEPARATOR;

            (!defined("ROOT")) && define("ROOT", self::$root);

            (!defined("SLASH")) && define("SLASH", DIRECTORY_SEPARATOR);

            $autoloadObjectPath = self::$root . "Partarum" . SLASH . "PartarumPHP". SLASH . "System" . SLASH . "AutoloadObject.php";

            try {
                self::loadClass($autoloadObjectPath);

                //echo PHP_EOL . "ROOT = " . ROOT . PHP_EOL;

                self::$partarumRootPath = self::$partarumRootPath ?? AutoloadObject::setNamespaceRoot("Partarum", ROOT . "Partarum" . SLASH . "PartarumPHP");

                self::$baseSettled = TRUE;

            } catch (RuntimeException $e) {
                echo $e->getMessage();
            }
        }

        private static function sortByTopic(string $class) : stdClass {

            $nameArray = explode("\\", $class);

            $topic = array_shift($nameArray);

            $result = new stdClass();

            $result->topic = $topic;
            $result->path = AutoloadObject::getNamespaceRoot($topic);
            $result->classPath = implode(DIRECTORY_SEPARATOR, $nameArray);

            /*
            echo "<pre>";
            print_r($result);
            */
            return $result;
        }

        private static function isPartarum(string $class) : string {

            $isTrait = strrpos($class, "\Feat");

            $traitsPath = self::$partarumRootPath . SLASH . "Traits";

            $classesPath = self::$partarumRootPath;

            $typPath = ($isTrait !== FALSE) ? $traitsPath : $classesPath;

            $changeNsToPath = str_replace('\\', SLASH, $class);

            $needle = "Partarum";

            $startPos = strpos($changeNsToPath, $needle);

            return $typPath . SLASH . substr_replace($changeNsToPath, "", $startPos, strlen($needle)) . '.php';
        }

        public static function addIntoManifest(){

        }

        public static function addUserAutoloader($content, $matter) : void {

            switch ($matter) {

                case self::REGISTER:

                    spl_autoload_register([$content["class"], $content["methode"]]);

                    break;
                case self::NAMESPACE_ROOT:
                case self::CLASS_ROOT:
                case self::FOLDER:

                    foreach($content as $namespaceMain => $namespacePath){

                        AutoloadObject::setNamespaceRoot($namespaceMain, $namespacePath);
                    }

                    break;
                case self::MANIFEST:

                    $json = file_get_contents($content);

                    break;

            }
        }

        /**
         * @param string $path
         *
         * @return bool
         */
        public static function loadClass(string $path) : bool {

            if(file_exists($path)){

                require_once $path;

                return TRUE;
            }

            throw new RuntimeException("Class - filepath - 404");
        }
    }
}