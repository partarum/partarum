<?php
namespace Partarum\PartarumCLI\System\Filesystem {

    enum File : int {

        case ALL = 0x0001;
        case PARTARUM = 0x0002;
        case API = 0x0004;
        case APP = 0x0008;
        case CLI = 0x0010;
        case CONFIG = 0x0020;
        case PUBLIC = 0x0040;

        public function getPath() : string {

            return match($this){
                Folder::ALL => "./",
                Folder::PARTARUM => "Partarum",
                Folder::API => "API",
                Folder::APP => "app",
                Folder::CLI => "cli",
                Folder::CONFIG => "config",
                Folder::PUBLIC => "public"
            };
        }

        public function getLogPath() : array {

            $basePath = "Partarum/PartarumLog/Filesystem/";

            $getPath = fn($folder = NULL) => [
                "folder" => $basePath . $folder,
                "allFiles" => ($folder === NULL) ? $basePath . "allFiles.json" : $basePath . $folder . "/allFiles.json",
                "allFilesInfo" => ($folder === NULL) ? $basePath . "allFilesInfo.json" : $basePath . $folder . "/allFilesInfo.json"
            ];

            return match($this){
                Folder::ALL => $getPath(),
                Folder::PARTARUM => $getPath("Partarum"),
                Folder::API => $getPath("API"),
                Folder::APP => $getPath("app"),
                Folder::CLI => $getPath("cli"),
                Folder::CONFIG => $getPath("config"),
                Folder::PUBLIC => $getPath("public")
            };
        }
    }
}