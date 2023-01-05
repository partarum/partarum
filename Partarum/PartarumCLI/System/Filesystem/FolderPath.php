<?php
namespace Partarum\PartarumCLI\System\Filesystem {

    enum FolderPath : string
    {

        case ALL = "./";

        case API = "API";
        case app = "app";
        case cli = "cli";
        case config = "config";
        case public = "public";

        case Partarum = "Partarum";
        case PartarumAPI = "Partarum/PartarumAPI";
        case PartarumCLI = "Partarum/PartarumCLI";
        case PartarumConfig = "Partarum/PartarumConfig";
        case PartarumCSS = "Partarum/PartarumCSS";
        case PartarumIntern = "Partarum/PartarumIntern";
        case PartarumJS = "Partarum/PartarumJS";
        case PartarumLog = "Partarum/PartarumLog";
        case PartarumLorem = "Partarum/PartarumLorem";
        case PartarumPHP = "Partarum/PartarumPHP";
        case PartarumSecura = "Partarum/PartarumSecura";
        case PartarumTemplates = "Partarum/PartarumTemplates";
        case PartarumWorkspace = "Partarum/PartarumWorkspace";

        public static function get($needle): null | FolderPath{

            return match($needle){
                "ALL" => self::tryFrom("./"),
                default => self::tryFrom($needle) ?? self::tryFrom("Partarum/" . $needle)
            };
        }

        public function getPath() : null | FolderPath {
            return $this;
        }

        public function getLogPath() : array {

            $basePath = "Partarum/PartarumLog/Filesystem/";

            $getPath = fn($folder = NULL) => [
                "folder" => $basePath . $folder,
                "allFiles" => ($folder === NULL) ? $basePath . "allFiles.json" : $basePath . $folder . "/allFiles.json",
                "allFilesInfo" => ($folder === NULL) ? $basePath . "allFilesInfo.json" : $basePath . $folder . "/allFilesInfo.json"
            ];

            return match($this){
                FolderPath::ALL => $getPath(),
                default => $getPath($this->value)
            };
        }
    }
}