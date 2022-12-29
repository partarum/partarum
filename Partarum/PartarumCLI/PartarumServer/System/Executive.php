<?php
namespace Server\System {

    require_once "Handle/ConfigType.php";
    require_once "Handle/ServerType.php";
    require_once "Handle/CacheType.php";
    require_once "Handle/DataType.php";
    require_once "Handle/FileLoaderType.php";
    require_once "Handle/FileCreatorType.php";


    use Server\System\Handle\ConfigType;
    use Server\System\Handle\DataType;
    use Server\System\Handle\FileCreatorType;
    use Server\System\Handle\FileLoaderType;
    use Server\System\Handle\ServerType;
    use Server\System\Handle\CacheType;

    class Executive {

        public static function startServer(){

        }

        public static function stopServer(){

        }

        public static function createServer($ip, $port){

            // jeder Server muss einzeln als Datei in einem Screen ausgeführt werden !!!
            /*
             *  1. Server - Datei erstellen
             *  2. Server in die Caches eintragen
             *  3. Server logen
             *  4. Server starten
             */

            if(FileCreatorType::Websocket->createFile($port)){

                echo "createServer \n";

                echo getcwd() . "\n";

                $file = "Partarum/PartarumCLI/PartarumServer/Services/Websocket/Executive/startServer.php {$ip} {$port}";

                echo $file . "\n";

                $screenName = "startServer_" . $port;

                $executive = "screen -dmS " . $screenName;

                $output = shell_exec($executive);

                exec("screen -list", $list, $status);

                $server = shell_exec("screen -S " . $screenName . " -X stuff \"php " . $file . "\"'\n'");

            }
        }

        public static function deleteServer(){

        }

        public static function initConfig($type){

           $userWebsocketConfig = FileLoaderType::Config->load(ConfigType::User->fromServer(ServerType::Websocket), DataType::Array);

           $systemWebsocketConfig = FileLoaderType::Config->load(ConfigType::System->fromServer(ServerType::Websocket), DataType::Array);

           $activeWebsockets = FileLoaderType::Cache->load(CacheType::Websocket, Datatype::Array);

           $ipCache = FileLoaderType::Cache->load(CacheType::IP, Datatype::Array);


            // ! ---------------------------------------------------------------------------------------------------------------------------------------
            // ! Configverarbeitung abändern, damit Callbacks oder Text oder Streams etc... an die jeweiligen Events der Server mitgegeben werden können
            // ! ---------------------------------------------------------------------------------------------------------------------------------------




           echo "userWebsocketConfig: \n";
           print_r($userWebsocketConfig);
           echo "activeWebsockets: \n";
           print_r(gettype($activeWebsockets));

           if($activeWebsockets === NULL){

               // userConfig kann so wie sie ist umgesetzt werden

               foreach($userWebsocketConfig as $ip => $portConfig){

                   foreach($portConfig as $port => $config){

                       self::createServer($ip, $port);
                   }
               }

           } else {

               // userConfig muss mit aktiven Sockets verglichen werden
           }

           /*
            *   Dateien müssen noch miteinander verglichen werden
            *
            *   Ziel: Die Server welche noch nicht laufen, müssen laufen, und die die nicht mehr registriert sind, müssen stoppen
            *
            *       Welche Server müssen laufen?
            *
            *           - Alle die in der User - Config enthalten sind
            *
            *       Welche Server laufen bereits?
            *
            *           - Alle die in der System - Config enthalten sind
            *
            *       Welche Server müssen gestoppt werden?
            *
            *           - Alle die in der System - Config stehen, aber nicht mehr in der User - Config
            *
            *       Wie erreiche ich das Ziel - also welche Möglichkeiten habe ich dafür?
            *
            *           - die User - Config mit der System - Config vergleichen
            *
            *               - wenn IP in System vorhanden, dann Port prüfen, wenn Port vorhanden, dann nichts machen
            *
            *               - wenn IP oder Port in System nicht vorhanden, dann IP in die Config setzen und Server auf dem Port starten
            */

        }

        public static function readConfig(){

        }

        public static function compareConfig(){

        }

        public static function build(){

        }
    }
}