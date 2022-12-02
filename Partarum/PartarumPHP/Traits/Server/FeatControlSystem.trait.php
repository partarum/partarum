<?php
trait FeatControlSystem
{
    public static $slash;

    public static function getLocation()
    {
        $host = $_SERVER["HTTP_HOST"];

        if($host == "localhost")
        {
            return "C:\\inetpub\\wwwroot\\";
        }
        else if($host == "bombis.lacerta.uberspace.de")
        {
            return "/var/www/virtual/bombis/html";
        }

        exit();
    }

    public static function setLocation($item="index.php")
    {
        $host = $_SERVER["HTTP_HOST"];

        if($host == "localhost")
        {
            header("Location: http://localhost/html/".$item);
            exit();
        }
        else if($host == "bombis.lacerta.uberspace.de")
        {
            header("Location: http://bombis.lacerta.uberspace.de/".$item);
            exit();
        }
    }

    public static function getSystem()
    {

        switch (preg_match("/\//", $_SERVER["DOCUMENT_ROOT"], $result, PREG_OFFSET_CAPTURE)){

            case 1:

                self::$slash = "/";
                return "/";
                break;

            case 0:

                self::$slash = "\\";
                return "\\";
                break;
        }

        exit();
    }
}

?>