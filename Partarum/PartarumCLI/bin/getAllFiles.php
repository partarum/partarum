<?php
require "setRoot.php";

require "Partarum/PartarumPHP/Filesystem/Filesystem.php";

use Partarum\PartarumPHP\Filesystem\Filesystem;
use Partarum\PartarumCLI\System\Root;

$fs = new Filesystem("./", Filesystem::RECURSIVE | Filesystem::DOCUMENT_ROOT);

try {

    $jsonAllFiles = json_encode($fs->getAllFiles(), JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE);

    $writAllFiles = file_put_contents(Root::$DOCUMENT_ROOT . "Partarum/PartarumLog/Filesystem/allFiles.json", $jsonAllFiles);


    $jsonAllFileInfo = json_encode($fs->getAllIterator(), JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE);

    $writeAllFilesIterator = file_put_contents(Root::$DOCUMENT_ROOT . "Partarum/PartarumLog/Filesystem/allFilesInfo.json", $jsonAllFileInfo);

} catch (JsonException $e) {

    var_dump($e);

}

