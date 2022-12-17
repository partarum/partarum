<?php
/*
error_reporting(-1);
ini_set("display_errors", "1");
*/

if(!class_exists('Partarum')){
    require_once $_SERVER["DOCUMENT_ROOT"] . "src/Partarum.php";
}

use Partarum\HTTP\API;

$api = new API();

$api->createJSONResponse(decbin($api->fromGET("dec")))->run();