<?php
namespace Partarum\Filesystem {


    use \FilesystemIterator;

    class DirectoryGenerator
    {
        public $path;

        public function __construct($path)
        {
           // echo "<br> Generator1 __construct path = ".$path;
            $this->path = $path;
        }

        public function getFilesystem()
        {

            //echo "<br> Generator 1 time: ".microtime();

            if ($this->path !== "") {
                $result = new FilesystemIterator($this->path,
                    FilesystemIterator::CURRENT_AS_SELF |
                    FilesystemIterator::SKIP_DOTS |
                    FilesystemIterator::FOLLOW_SYMLINKS);  //Iterator


                /*
                echo "<br> Start Ausgabe Generator 1 getFilesystem() result = ".$result->hasChildren();
                echo "<pre>";
                print_r($result);
                echo "<br> Ende Ausgabe Generator 1 getFilesystem() result !";
                */

                foreach ($result as $file) {

                    /*
                    echo "<br> Generator 1 result = ";
                    echo "<pre>";
                    print_r($file);
                    */

                    yield $file;    // Generator SPLFileInfo-Object
                }
            }
        }
    }
}