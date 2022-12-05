<?php

require_once "setRoot.php";

require_once "Partarum/PartarumCLI/System/Base/Handle.php";
require_once "Partarum/PartarumCLI/System/Base/User.php";
require_once "Partarum/PartarumCLI/System/Base/UserType.php";

require_once "Partarum/PartarumCLI/System/Filesystem/Handle.php";
require_once "Partarum/PartarumCLI/System/Filesystem/Folder.php";
require_once "Partarum/PartarumCLI/System/Filesystem/FolderType.php";

use Partarum\PartarumCLI\System\Base\Handle as System;
use Partarum\PartarumCLI\System\Base\UserType;
use Partarum\PartarumCLI\System\Filesystem\Folder;
use Partarum\PartarumCLI\System\Filesystem\FolderType;
use Partarum\PartarumCLI\System\Filesystem\Handle as Filesystem;

var_dump(System::USER->read(UserType::CHECK));

Filesystem::CHECKUP->create(Folder::ALL);
//Filesystem::BACKUP->create(Folder::ALL);

Filesystem::LOG->create(Folder::API);

Filesystem::LOG->create(Folder::app);

Filesystem::LOG->create(Folder::cli);

Filesystem::LOG->create(Folder::config);

Filesystem::LOG->create(Folder::Partarum);

Filesystem::LOG->create(Folder::public);

Filesystem::LOG->create(Folder::ALL);

Filesystem::LOG->create(FolderType::Partarum->filter("PartarumJS"));

Filesystem::CHECKUP->create(Folder::ALL);

//Filesystem::CHECKUP->

//Filesystem::BACKUP->compare();


