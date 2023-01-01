<?php

require_once "System/Executive.php";
require_once "System/Handle/ServerType.php";

use Server\System\Executive;
use Server\System\Handle\ServerType;

echo count($argv);

Executive::initConfig(ServerType::Websocket);