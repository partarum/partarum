<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

error_reporting(-1);
ini_set("display_errors", "1");

require $_SERVER["DOCUMENT_ROOT"] . "/Partarum/Partarum.php";

use Partarum\System\Autoloader;

$backend = new Partarum();

//$backend->addAutoloader(["APT" => ROOT . "APT"], Autoloader::FOLDER);

$backend->goDev()->with($_SERVER["REQUEST_URI"]);

//$backend->goPublic(["js" => 31536000, "css" => 31536000])->with($_SERVER["REQUEST_URI"]);