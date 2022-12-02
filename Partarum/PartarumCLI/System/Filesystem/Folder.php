<?php
namespace Partarum\PartarumCLI\System\Filesystem {

    require_once "Partarum/PartarumCLI/System/Filesystem/FolderPath.php";

    use Partarum\PartarumCLI\System\Filesystem\FolderPath;

    enum Folder : int {

        case ALL = 0x0001;
        case Partarum = 0x0002;
        case API = 0x0004;
        case app = 0x0008;
        case cli = 0x0010;
        case config = 0x0020;
        case public = 0x0040;

        public function getPath() : FolderPath
        {

            return match($this) {
                self::ALL => FolderPath::get("./"),
                default => FolderPath::get($this->name)
            };
        }

        public function getLogPath(): array {
            $folder = FolderPath::get($this->name);

            return $folder->getLogPath();
        }
    }
}