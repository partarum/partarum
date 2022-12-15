<?php

error_reporting(-1);
ini_set("display_errors", "1");

if(!class_exists("Autoloader")) {

    include __DIR__ . "/Autoloader.php";
    spl_autoload_register(['Autoloader', "autoload"]);
}

use Partarum\Document\HTMLPlain;

$html = new HTMLPlain();
$html->setScript("testClientSettingClass.js");
$html->close();