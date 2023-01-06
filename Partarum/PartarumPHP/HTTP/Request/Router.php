<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

namespace Partarum\HTTP\Request {

    use Partarum;
    use Partarum\HTTP\Request\Material\Extension;
    use Partarum\HTTP\Request\Routes\Manifest;

    /**
     * Class Router
     *
     * @package Partarum\HTTP\Request
     */

    class Router {

        /**
         * @var string|mixed
         */
        public string $root;

        /**
         * @var string
         */
        public string $uri;

        /**
         * @var string
         */
        public string $realURL;


        /**
         * @var string
         */
        public string $extension;

        public const MODUS_DEV = "dev";

        public const MODUS_PUBLIC = "public";

        /**
         * @var string
         */
        private string $modus = self::MODUS_PUBLIC;

        /**
         * @var array|null
         */
        private ?array $cacheTime;

        private int $type = Partarum::DOCUMENT;


        /*
         *
         *  Der Switch
         *
         *      - klärt welcher Router gewählt werden soll - also klärt die Route
         *
         *  Der Router
         *
         *      - holt das entsprechende Manifest
         *      - sozusagen ist jedes Manifest ein Router
         *
         *  Der Dispatcher
         *
         *      - geht dann den Weg der Route mit den vorhandenen Informationen
         *      - also goDev() und goPublic()
         */



        /**
         * Router constructor.
         *
         * @param string|null $uri
         */
        public function __construct(?string $uri = NULL){

            $this->root = (!defined("PARTARUM_PLUGIN_PATH")) ? ROOT  : PARTARUM_PLUGIN_PATH ;

            if(isset($uri)) {
                $this->setBase($uri);
            }
        }

        private function setBase($uri){

            $this->uri = ($uri === DIRECTORY_SEPARATOR) ? "/landingPage" : $uri;

            $this->realURL = Manifest::getRealUrl($this->uri, $this->type);

           // echo "<p>$this->realURL</p>";

            if(is_string($this->realURL)) {

                $this->extension = self::getExtension($this->realURL);

                return true;
            }

            return false;
        }

        /**
         * @param string $uri
         *
         * @return Router
         */

        public static function handleThis(string $uri): Router {

            return (new Router($uri));
        }

        /**
         * @param string $url
         *
         * @return string|string[]
         */

        public static function getExtension(string $url){

            return pathinfo($url, PATHINFO_EXTENSION);
        }

        /**
         *
         */
        public function goDev(): void {

            Extension::action($this->realURL, $this->extension);
        }

        /**
         * @param array|null $cacheTime
         */
        public function goPublic(?array $cacheTime = NULL): void {
            
            ((isset($cacheTime)) || (isset($this->cacheTime))) && Extension::action($this->realURL, $this->extension, $cacheTime ?? $this->cacheTime);
        }

        /**
         * @param string|null $uri
         *
         * @return bool
         */

        public function with(?string $uri) : bool {

            //echo "<p>$uri</p>";

             if(isset($uri)){
                 if($this->setBase($uri) === TRUE) {

                     switch ($this->modus) {
                         case self::MODUS_PUBLIC:
                             $this->goPublic();
                             break;
                         case self::MODUS_DEV :
                             $this->goDev();
                             break;
                         default:
                             $this->goPublic();
                     }

                     return TRUE;
                 }
                 return FALSE;
             }
             return FALSE;

        }


        public static function addRouter(string $name, string $manifestPath): void {

            Manifest::addUserRouter($name, $manifestPath);
        }

        /**
         * @return string
         */
        public function getModus() : string {

            return $this->modus;
        }

        /**
         * @param string $modus
         */
        public function setModus(string $modus) : void {

            $this->modus = $modus;
        }
        
        public function setType($type) : void {
            
            $this->type = $type;
        }

        /**
         * @return array|null
         */
        public function getCacheTime() : ?array {

            return $this->cacheTime;
        }

        /**
         * @param array|null $cacheTime
         */
        public function setCacheTime(?array $cacheTime = NULL) : void {

            $this->cacheTime = $cacheTime;
        }
    }
}