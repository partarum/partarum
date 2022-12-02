<?php
require_once "setRoot.php";

require_once "Partarum/PartarumCLI/System/Base/Handle.php";
require_once "Partarum/PartarumCLI/System/Base/User.php";
require_once "Partarum/PartarumCLI/System/Base/UserType.php";

use Partarum\PartarumCLI\System\Base\Handle as System;
use Partarum\PartarumCLI\System\Base\User;
use Partarum\PartarumCLI\System\Base\UserType;

$user = $argv[1] ?? null;

$checkUser = System::USER->read(UserType::CHECK);

try {

    $json = json_encode($checkUser, JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE);

    file_put_contents(($user === "root") ? "Partarum/PartarumLog/System/checkUserWithRoot.json" : "Partarum/PartarumLog/System/checkUserWithNormalUser.json", $json);

} catch (JsonException $e) {

    var_dump($e);
}

