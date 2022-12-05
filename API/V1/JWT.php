<?php

if(!class_exists('Partarum')){
    require_once $_SERVER["DOCUMENT_ROOT"] . "src/Partarum.php";
}

use Partarum\HTTP\API;
use Partarum\Security\Token\JWT;
use Partarum\System\Autoloader;

$backend = new Partarum();

$backend->addAutoloader( ["PartarumIntern" => $_SERVER["DOCUMENT_ROOT"] . "/src/PartarumIntern"], Autoloader::FOLDER);

$api = new API();

$post = $api->fromPOST("hallo");

$header = $api->fromHeader("Partarum-Token", API::REQUEST);


$jwt = new JWT();

$jwt->setSecretKey("pups"); // $header - der Partarum - Token welcher vergeben wird !!!!

$jwt->setPayload($post);

echo json_encode([$jwt->getToken()], JSON_THROW_ON_ERROR);