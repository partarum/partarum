<?php
include "PartarumPHP/System/Autoloader.php";

use Partarum\System\Autoloader;

spl_autoload_register([Autoloader::class, "autoload"]);