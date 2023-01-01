<?php

if(!class_exists('Partarum')){
    require_once $_SERVER["DOCUMENT_ROOT"] . "src/Partarum.php";
}

use Partarum\HTTP\API;

$api = new API();

$api->createJSONResponse($api->createUUID())->run();