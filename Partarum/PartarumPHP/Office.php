<?PHP
namespace Partarum {

    //include $_SERVER["DOCUMENT_ROOT"] . "/src/php/constants.php";

    use Partarum\Config\GlobalConfig;
    use Partarum\Security\SessionWorker;
    use ReflectionClass;
    use Partarum\Database\CacheConnect;
    use Partarum\Document\HTMLPage;
    use Throwable;

    //use etc\configPage as configPage;
    //use const bin\src\constants\LOREM_PRIMUM;
    

    class Office
    {
        public $page;
        public $config;
        public $system;
        public $runTime;
        public $sessionHandler;

        public $metaUTF8;
        public $slash;

        public function __construct($theme, $part, $setSession){


            (GlobalConfig::$ses === 1) && new SessionWorker($setSession);

            $wrapper = GlobalConfig::$wrapper ?? FALSE;

            $this->page = self::htmlPage($theme, $part, $wrapper);
        }

        public static function htmlPage($theme, $part, $wrapper){

            // landingPage, start, 0

            return new HTMLPage($theme, $part);
        }

  		public function getConfigPage(){

  		    try {
                include $_SERVER["DOCUMENT_ROOT"] . "/oldSite/etc/configPage.php";
                $class = new ReflectionClass("etc\configPage");
                $this->config = $class->getConstants();
                //print_r($this->config);
                //$this->setConfigSession();
            } catch(Throwable $throwable){

                echo "Hier liegt ein Fehler vor!!!!";
                echo "<pre>";
                print_r($throwable);
                echo "</pre>";
            }
        }

        public function setConfigSession()
        {
            if (isset($this->config["SES"])) {

                $this->setSession();
            }
        }

        public function setSession()
        {
            if ($this->config["SES"] == 1) {

                $this->runTime = new Runtime(1);
            } elseif ($this->config["SES"] == 2) {

                $this->runTime = new Runtime(2);
                define("USER_SES",  $this->runTime->userSes);
            }
        }



        public static function setHTTPLocation($userIP)
        {
            // Header setzen
            $headerValue = ($userIP == "127.0.0.1") ? "Location: http://localhost/index.php" : $headerValue = "Location: https://localhost/html/index.php";
            yield $headerValue;
        }


    }
}