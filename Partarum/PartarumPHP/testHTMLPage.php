<?php
error_reporting(-1);
ini_set("display_errors", "1");

include $_SERVER["DOCUMENT_ROOT"]."cordes/partarum/Autoloader.php";
spl_autoload_register(['Autoloader', "autoload"]);

use Partarum\Document\HTMLPage;

$html = new HTMLPage();
$html->openWithWrapper();
$html->setTitle("eine TestSeite");
$html->close();

//echo "<pre>";
//print_r($html);