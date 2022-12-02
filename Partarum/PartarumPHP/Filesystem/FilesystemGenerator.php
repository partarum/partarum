<?php
namespace Partarum\Filesystem {

    use Partarum\Filesystem\DirectoryGenerator;

    /*
     *  Generator 2
     */

    class FilesystemGenerator{

        public $fileGenerator;

        public $path;

        public function __construct($path){

            //echo "<br> Generator2 __construct path = ".$path;
            $this->path = $path;

        }

        public function getFile()
        {
            $fileGenerator = new DirectoryGenerator($this->path);

            //echo "<br> Generator 2 time: ".microtime();

            $fileObject = $fileGenerator->getFilesystem();    // Generator

            /*
            echo "<br> start fileObject <pre>";
            print_r($fileObject);
            echo "</pre> end fileObject<br>";
            */

            foreach ($fileObject as $file) {

                /*
                echo "<br> Generator 2 getFile file = ";
                echo "<pre>";
                */
                $fileName = $file->getFilename();   // SPLFileInfo - Object

                //print_r($fileName);


                if($fileName !== "" ){
                    if($file->isFile()) {


                        //echo "<br> Generator 2 file = ".$file;

                        yield $file;

                    }elseif($file->isDir()) {

                        //echo "<br> Generator 2 getFile() isDir file->getChildren = ";
                        //print_r($file->getChildren());

                        $result = new DirectoryBridgeGenerator($file->getPathname());
                        $resultFile = $result->getFile();

                        /*
                        echo "<br> Start Ausgabe Generator 2 -> getFile() isDir resultFile->current() = ";
                        echo "<pre>";
                        */

                        $closed = $resultFile->valid();

                        if($closed !== FALSE){

                            //print_r($resultFile->valid());

                            foreach ($resultFile as $nextFile) {

                                /*
                                echo "<pre>";
                                print_r($nextFile);
                                */

                                yield $nextFile;
                            }

                        }elseif($closed === FALSE){

                            $finish = TRUE;
                            //echo "<br> Generator ist am Ende!!!";
                        }
                        //echo "<br> Generator 2 Ende Ausgabe!";
                    }
                }
            }

        }
    }
}