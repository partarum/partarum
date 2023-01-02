<?php
require "PartarumPHP/System/Autoloader.php";
use Partarum\System\Autoloader;
spl_autoload_register([Autoloader::class, "autoload"]);

use Partarum\HTTP\Request\Switcher;
use Partarum\HTTP\Request\Router;
use Partarum\System\Root;

/**
 * Class Partarum
 */

class Partarum {


    /**
     *
     */
    public const DOCUMENT = 2;

    /**
     *
     */
    public const PROXY = 4;

    /**
     *
     */
    public const PLUGIN = 8;

    /**
     * @var bool
     */
    public static bool $inUse = false;

    /**
     * @var int
     */
    public int $type = 2;

    /**
     * @var Router
     */
    public Router $router;

    public static Switcher $switcher;

    public static $proxyRoutes = [];


    /**
     * @param int        $type      Partarum::DOCUMENT || Partarum::PROXY || Partarum::PLUGIN
     * @param array|null $option    Partarum::DOCUMENT -> NULL
     *                              Partarum::PROXY -> ["manifest" => path] || ["proxyPath" => path, "type" => Partarum] (ist das gleiche was auch im Manifest drin steht)
     *                              Partarum::PLUGIN -> ["manifest" => path] || ["rootPath" => path, "pluginPath" => path] (ist das gleiche was auch im Manifest drin steht)
     *
     *
     */
    public function __construct(int $type = PARTARUM::DOCUMENT, null | array $option = NULL) {


        //if($type === self::PROXY) {

            //$debug = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1);

            /*
             * Array
                    (
                        [0] => Array
                            (
                                [file] => /home/users/partarum21-0005/www/dev.partarum.net/Partarum/PartarumWorkspace/workspace.php
                                [line] => 10
                                [function] => __construct
                                [class] => Partarum
                                [type] => ->
                            )

                    )
             */
        //}

        $this->type = $type;

        $manifestArray = [];

        $rootPath = "";

        if($type !== self::DOCUMENT){

            if(isset($option["manifest"])){

                try {
                    $manifestArray = json_decode($option["manifest"], TRUE, 512, JSON_THROW_ON_ERROR);

                    $rootPath = $manifestArray["rootPath"] || $manifestArray["proxyPath"];

                } catch(JsonException $je){

                    echo "<pre>";
                    print_r($je);
                }
            } else {

                $rootPath = $option["rootPath"] ?? $option["proxyPath"];
            }

        }


        if((self::$inUse === false) && ($type === self::PLUGIN || self::DOCUMENT)) {

            $getRoot = Root::getPath();

            $root = ($getRoot[-1] === "/") ? $getRoot : $getRoot . "/";

            (!defined("ROOT")) && define("ROOT", ("" === $rootPath) ? $root : $root . $rootPath);

            (!defined("SLASH")) && define("SLASH", DIRECTORY_SEPARATOR);

            (!defined("PARTARUM_PATH")) && define("PARTARUM_PATH", __DIR__);
        }

        switch($type){

            case self::PROXY:

                define("PARTARUM_PROXY_PATH", $option["proxyPath"]);

                break;

            case self::PLUGIN:

                define("PARTARUM_PLUGIN_PATH", ROOT . SLASH . $manifestArray["pluginPath"]);

                define("PARTARUM_RELATIV_PLUGIN_PATH", SLASH . $manifestArray["rootPath"] . SLASH . $manifestArray["pluginPath"]);
        }

        self::$inUse = true;
    }

    /**
     *
     */
    public function addAutoloader($content, $matter){

        Autoloader::addUserAutoloader($content, $matter);
        // Wichtig !!!

    }

    public function addRouter(string $name, string $manifestPath){

        Router::addRouter($name, $manifestPath);
    }


    /**
     * @return Router
     */
    public function goDev() : Router {

        $this->router = new Router();
        $this->router->setType($this->type);
        $this->router->setModus(Router::MODUS_DEV);

        return $this->router;
    }

    /**
     * @return Router
     */
    public function goPublic($cacheTime) : Router {

        $this->router = new Router();
        $this->router->setModus(Router::MODUS_PUBLIC);
        $this->router->setCacheTime($cacheTime);

        return $this->router;
    }
}