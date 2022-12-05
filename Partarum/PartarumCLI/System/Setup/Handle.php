<?php
namespace Partarum\PartarumCLI\System\Setup {

    enum Handle : int{

        case START_WITHOUT = 0x0001;
        case START_WITH_TYPE = 0x0002;
        case START_WITH_IP = 0x0004;
        case START_WITH_PORTS = 0x0008;

        public function action($input) : array | null {

            $config = [];

            $act = match($this){
                Handle::START_WITHOUT =>  (function (){

                    if($this->isConfig() === false){

                        Show::newLine(1);
                        Show::output("Dann wollen wir mal loslegen - da nichts angegeben wurde - das komplette Programm.");
                        Show::newLine(1);

                        $config = [];

                        $config["type"] = Read::andGetInput(file("Partarum/PartarumCLI/ASCII/serverType.txt"));

                        var_dump($config);

                        Show::newLine(1);

                        $config["ip"] = Read::andGetInput("Jetzt bitte die IP: ");
                        Show::newLine(1);

                        $config["ports"] = Read::andGetInput("Zu guter Letzt die Ports auf denen die Server laufen sollen: ", "array");
                        Show::newLine(1);

                        return $config;
                    }
                })(),
                Handle::START_WITH_TYPE => (function (){

                    if($this->isConfig() === false){

                        Show::newLine(1);

                        $config = [];

                        $config["ip"] = Read::andGetInput("Jetzt bitte die IP: ");
                        Show::newLine(1);

                        $config["ports"] = Read::andGetInput("Zu guter Letzt die Ports auf denen die Server laufen sollen: ");
                        Show::newLine(1);

                        return $config;
                    }

                })(),
                Handle::START_WITH_IP => (function (){

                    /*
                     *  Ab hier kann man davon ausgehen, das keine Config erstellt wurde und wir die Ports abfragen müssen.
                     */

                    Show::newLine(1);

                    $config = [];

                    $config["ports"] = Read::andGetInput("Zu guter Letzt die Ports auf denen die Server laufen sollen: ");
                    Show::newLine(1);

                    return $config;
                })(),
                Handle::START_WITH_PORTS => (function (){

                    // Hier muss nichts mehr abgefragt werden - lediglich später wegen der PHP - Scripte
                    echo "huhu";

                    return [];
                })()
            };

            return $act;
        }

        public function isConfig() : string|bool
        {
            return match($this){
                Handle::START_WITHOUT, Handle::START_WITH_TYPE => Read::yesOrNo(Show::IS_CONFIG),
                default => ""
            };
        }
    }
}