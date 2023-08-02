<?php
namespace Partarum\PartarumCLI\System\Filesystem {

    require_once "Partarum/PartarumPHP/Filesystem/Filesystem.php";
    require_once "Partarum/PartarumCLI/System/Filesystem/Create.php";
    require_once "Partarum/PartarumCLI/System/Filesystem/Copy.php";

    use JsonException;
    use Partarum\PartarumPHP\Filesystem\Filesystem;
    use Partarum\PartarumCLI\System\Root;
    use Partarum\PartarumCLI\System\Filesystem\Create;
    use Partarum\PartarumCLI\System\Filesystem\Copy;

    enum Handle: int {

        case LOG = 0x0001;
        case FOLDER = 0x0002;
        case FILE = 0x0004;
        case BACKUP = 0x0008;
        case CHECKUP = 0x0010;

        public function create(Folder | FolderPath | File | null $item) : null | array {

            return match($this){
                Handle::LOG => Create::Log($item),
                Handle::FOLDER => Create::FOLDER($item),
                Handle::FILE => Create::File($item),
                Handle::BACKUP => Create::Backup($item),
                Handle::CHECKUP => Create::Checkup($item)
            };
        }

        public function get(){

        }

        public function read() {

        }

        public function delete() {

        }

        public function copy($file1, $file2): bool {

            return Copy::File($file1, $file2);
        }

        public function move() {

        }

        public function write() {

        }

        public function diff() {

        }

        public function compare() {

        }

    }
}