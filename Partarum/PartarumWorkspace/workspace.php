<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
error_reporting(-1);
ini_set("display_errors", "1");

$proxy = new Partarum(Partarum::PROXY, ["proxyPath" => __DIR__, "proxyRoute" =>"PartarumWorkspace", "type" => "Partarum"]);

$proxy->goDev()->with($_SERVER["REQUEST_URI"]);