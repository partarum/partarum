<?php

include $_SERVER["DOCUMENT_ROOT"] . "/Partarum/PartarumPHP/System/Autoloader.php";
spl_autoload_register(['Autoloader', "autoload"]);