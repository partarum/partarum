<?php
namespace Partarum\PartarumPHP\Filesystem {

    if(php_sapi_name() === "cli"){

        require_once "Partarum/PartarumPHP/Service/Binary/FlagWorker.php";
        require_once "Partarum/PartarumPHP/Traits/Filesystem/FeatFilesystem.php";
        require_once "Partarum/PartarumCLI/System/Root.php";
    }


    use FilesystemIterator;
    use Partarum\PartarumPHP\Traits\Filesystem\FeatFilesystem;
    use Partarum\PartarumCLI\System\Root;
    use Partarum\Service\Binary\FlagWorker;
    use SplFileInfo;

    class Filesystem extends FlagWorker {

        use FeatFilesystem;

        public const RECURSIVE = 2;

        public const ONLY = 4;

        public const ABSOLUTE = 8;

        public const DOCUMENT_ROOT = 16;

        static public array $allFiles = [];

        static public array $allIterators = [];



        public function __construct(?string $path = NULL, int $flag = Filesystem::ONLY) {

            parent::__construct();

            $this->setFlags($flag, true);

            $aktVer = $path ?? getcwd();

            $iterator = new FilesystemIterator(
                $aktVer,
                FilesystemIterator::KEY_AS_PATHNAME | FilesystemIterator::CURRENT_AS_SELF
            );


            foreach ($iterator as $fileInform => $wtf) {

                $type = ($iterator->isDir()) ? "folder" : "file";

                if($type === "file"){

                    self::$allFiles[] = ($this->isFlagSet(self::DOCUMENT_ROOT)) ? str_replace(Root::$DOCUMENT_ROOT, "", $fileInform) : $fileInform;

                    self::$allIterators[] = pathinfo($fileInform);
                }

                self::setFileFolder([
                                        $fileInform,
                                        $iterator->getFilename(),
                                        $iterator->getATime(),
                                        $iterator->getMTime()
                                    ], $type, $path, ($this->isFlagSet(self::ABSOLUTE) ? self::ABSOLUTE : self::DOCUMENT_ROOT)
                );



                if($this->isFlagSet(self::RECURSIVE)){

                    ($type === "folder") && $this->nextRound($iterator->getRealPath());
                }
            }
        }

        private function nextRound($path){


            $next = new Filesystem($path, $this->flags);

        }

        public function getAllFiles(): array {

            return self::$allFiles;
        }

        public function getAllIterator(): array {

            return self::$allIterators;
        }

        public static function clearCache() : void {

            self::$allFiles = [];
            self::$allIterators = [];
        }
    }
}