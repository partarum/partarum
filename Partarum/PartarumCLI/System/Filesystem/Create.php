<?php
namespace Partarum\PartarumCLI\System\Filesystem {

    use JsonException;
    use Partarum\PartarumCLI\System\Filesystem\Folder;
    use Partarum\PartarumCLI\System\Root;
    use Partarum\PartarumPHP\Filesystem\Filesystem;

    class Create {

        public static function Log(Folder | FolderPath | null $folder) : null | array {

            $readPath = $folder->getPath()->value ?? "./";

            var_dump($readPath);

            $fs = new Filesystem($readPath, Filesystem::RECURSIVE | Filesystem::DOCUMENT_ROOT);

            $logPath = $folder->getLogPath() ?? "Partarum/PartarumLog/all_" . time() . ".json";

            try {

                self::Folder($logPath["folder"]);

                $jsonAllFiles = json_encode($fs->getAllFiles(), JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE);

                $writAllFiles = file_put_contents($logPath["allFiles"], $jsonAllFiles);

                chown($logPath["allFiles"], posix_getpwuid(filegroup(__FILE__))["name"]);


                $jsonAllFileInfo = json_encode($fs->getAllIterator(), JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE);

                $writeAllFilesIterator = file_put_contents($logPath["allFilesInfo"], $jsonAllFileInfo);

                chown($logPath["allFilesInfo"], posix_getpwuid(filegroup(__FILE__))["name"]);

                Filesystem::clearCache();

                return [$writAllFiles, $writeAllFilesIterator];

            } catch (JsonException $e) {

                var_dump($e);

                return null;
            }
        }

        public static function Folder(string | array $path): array {

            $pathArray = is_array($path) ? $path : [$path];

            $result = [];

            foreach ($pathArray as $nextPath) {

                if (!file_exists($nextPath)) {

                    mkdir($nextPath, 0755, true);

                    chown($nextPath, posix_getpwuid(filegroup(__FILE__))["name"]);

                    $result[] = [0, 1];
                } else {

                    $result[] = [1, 1];
                }
            }

            return $result;
        }

        public static function File($path) : array {

            if(!file_exists($path)){

                touch($path);

                chown($path, posix_getpwuid(filegroup(__FILE__))["name"]);

                return [0,1];
            }

            return [1,1];
        }

        public static function Backup() : array{

            return [];
        }

        public static function Checkup($item) : array {

            $path = "Partarum/PartarumLog/Checkup";
            $objectPath = $path . "/objects";

            $firstCheckFilePath = $path . "/firstCheckFile.json";

            $startStructure = self::Folder([$path, $objectPath]);

            (in_array([0,1], $startStructure)) && self::Folder($objectPath . "/00");
            // jetzt mit hex 8Bit

            if(self::File($firstCheckFilePath) == [0,1]){

                $log = self::Log(Folder::ALL);

                Handle::FILE->copy("Partarum/PartarumLog/Filesystem/allFiles.json", "Partarum/PartarumLog/Checkup/firstTimeAllFiles.json");

                chown("Partarum/PartarumLog/Checkup/firstTimeAllFiles.json", posix_getpwuid(filegroup(__FILE__))["name"]);

                $hashAllFilesFile = hash_file("sha256","Partarum/PartarumLog/Checkup/firstTimeAllFiles.json");

                $input = [
                    "hash" => $hashAllFilesFile,
                    "path" => "Partarum/PartarumLog/Checkup/firstTimeAllFiles.json"
                ];

                try {
                    $json = json_encode($input, JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR | JSON_INVALID_UTF8_SUBSTITUTE);

                    file_put_contents($firstCheckFilePath, $json);


                } catch(JsonException $je) {

                    var_dump($je);
                }
            }





            return [];
        }
    }
}