<?php
namespace Partarum\Filesystem {

    use Partarum\Filesystem\FilesystemGenerator;

    /*
     *  Generator 3
     */

    class DirectoryBridgeGenerator {

        public $path;

        public function __construct($path){

            //echo "<br> Generator 3 __construct path = ".$path;
            $this->path = $path;
        }

        public function getFile(){

            //echo "<br> Generator 3 time: ".microtime();

            $fileObject = new FilesystemGenerator($this->path);
            $fileGenerator = $fileObject->getFile();

            if($fileGenerator->valid() === TRUE) {

                /*
                echo "<br> Generator 3 getFile fileGenerator valid() = " . $fileGenerator->valid();
                echo "<pre>";
                print_r($fileGenerator->current());
                */

                foreach ($fileGenerator as $file) {


                    /*
                    echo "<br> Generator 3 Bridge->getFile() = ";
                    print_r($file);
                    */

                    yield $file;
                }
            }

        }
    }
}
