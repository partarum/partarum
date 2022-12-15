<?php
error_reporting(-1);
ini_set("display_errors", "1");

if(!class_exists('Partarum')){
    require_once $_SERVER["DOCUMENT_ROOT"] . "src/Partarum.php";
}

use Partarum\HTTP\API;
use Partarum\Security\Token\JWT;
use Partarum\System\Autoloader;

$backend = new Partarum();

$backend->addAutoloader( ["PartarumIntern" => $_SERVER["DOCUMENT_ROOT"] . "/src/PartarumIntern"], Autoloader::FOLDER);

$api = new API();

$jwt = new JWT();

$post = $api->fromPOST("jwt");

if($token = $post->jwt ?? NULL) {

    $check = ($hash = $jwt->checkToken($token, "pups", TRUE)) ? 1 : 0;

    ($check === 1) && $api->createJSONResponse($hash)->run();
} else {

    $api->createJSONResponse("wrong parameter")->run();
}