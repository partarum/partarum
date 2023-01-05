<?php
// In den Hauptpfad wechseln
chdir("..");

require_once "Partarum/PartarumCLI/System/Setup/Show.php";
require_once "Partarum/PartarumCLI/System/Setup/Logo.php";
require_once "Partarum/PartarumCLI/System/Setup/Read.php";
require_once "Partarum/PartarumCLI/System/Setup/Input.php";
require_once "Partarum/PartarumCLI/System/Setup/ConfigLoader.php";

use Partarum\PartarumCLI\System\Setup\Input;
use Partarum\PartarumCLI\System\Setup\ConfigLoader;
use Partarum\PartarumCLI\System\Setup\Logo;
use Partarum\PartarumCLI\System\Setup\Read;
use Partarum\PartarumCLI\System\Setup\Show;

// set Logo

    Show::newLine();
    Show::output(Logo::START->getASCII());
    Show::newLine();

if(!extension_loaded("swoole")) {

    Show::output("Swoole ist nicht in PHP geladen.");
    Show::newLine(1);
    Show::output("Wenn wir weiter machen wollen, müssen wir Swoole installieren  oder du installierst es selber.");
    Show::newLine(1);

    if(Read::yesOrNo("Swoole jetzt installieren ")){

        Show::output("Swoole wird jetzt installiert.");
        Show::newLine(2);
    } else {

        exit("Swoole wird nicht installiert und der Prozess wird jetzt abgebrochen!" . PHP_EOL);
    }

}


// argv checken
/*
 *  Was wird übergeben und was passiert?
 *
 *      1.  Ohne Argumente - Type und Ports sind nicht geklärt
 *      2.  == 1 Argument - Servertype wurde mitgegeben - Ports müssen noch geklärt werden
 *      3.  >== 2 Argumente - Servertype und Ports wurden mitgegeben
 *
 */

// array ["type" => "", "ip" => "", "ports" => []]

$config = Input::START->checkConfig($argv);

if($config !== NULL) {

    var_dump($config);

    // ! So wie es jetzt ist wird die Config geladen und kein einzelner Wert etc übergeben

    $executive = match ($config["type"]) {
        "1", "websocket", "ws" => "php Partarum/PartarumCLI/PartarumServer/buildWebsocket.php",
        default => ""
    };


    exec($executive, $output, $reCode);
}




    // cat /etc/os-release
//
    // ! Debian
    // swoole installieren, sofern nicht keyhelp drauf ist

    // apt list --installed 2>1 | awk -F '/' ' { print $1 } ' | tail +4 | grep swoole

    // apt update && apt upgrade -y

    // apt-get install ca-certificates apt-transport-https software-properties-common wget curl lsb-release -y

    // curl -sSL https://packages.sury.org/php/README.txt | bash -x

    // apt update

    // apt install php8.1-swoole

    // ! Ubuntu

    //  sudo apt list --installed 2>1 | awk -F '/' ' { print $1 } ' | tail +4 | grep swoole

    // sudo apt update && sudo apt upgrade -y

    // sudo apt-get install ca-certificates apt-transport-https software-properties-common wget curl lsb-release -y

    // curl -sSL https://packages.sury.org/php/README.txt | sudo bash -x

    // sudo apt update

    // sudo apt install php8.1-swoole