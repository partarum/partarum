<?php
//namespace bin\php\classes\HTML;
error_reporting(-1);
ini_set("display_errors", "1");

class testGeneratorEtc
{
    public object $element;
    public array $tagName;  // war Array
    public object $etcPath; // war Array
    const HTML_PATH = "/office/etc/surface";
    public object $iterator;

    /*
     * $this->iterator object
     */
    public function getIterator()
    {

        $this->iterator = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator(
                $_SERVER["DOCUMENT_ROOT"].self::HTML_PATH,
                \FilesystemIterator::CURRENT_AS_SELF | \FilesystemIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::CHILD_FIRST);
    }

    /*
     * jedes Element aus $this->iterator
     */

    //public function

    public function getEtcClass()
    {
        $tagName = [];
        $this->element = new \stdClass();
        $this->etcPath = new \stdClass();

        foreach ($this->iterator as $fileinfo) {

            if ($fileinfo->isFile()) {
                $name = $fileinfo->getBasename();      // nav.php
                $className = $fileinfo->getBasename('.php');
                $includeAndParentPath = "etc".DIRECTORY_SEPARATOR."surface".DIRECTORY_SEPARATOR.$fileinfo->getSubPath();    //  html\body\wrapper\header
                $filePath = $_SERVER["DOCUMENT_ROOT"].DIRECTORY_SEPARATOR."office".DIRECTORY_SEPARATOR.$includeAndParentPath.DIRECTORY_SEPARATOR.$name;
                include $filePath; //autoloader_regestrie !!!
                $this->element->$className = $includeAndParentPath;
                $tagName[] = $className;
                $createNamespacePath = str_replace("/", "\\", $includeAndParentPath);
                $this->etcPath->$className = "\\".$createNamespacePath."\\".$className."\\etc"; //namespace!!!
            }
        }
        $this->tagName = (PHP_OS_FAMILY == "Windows") ? array_reverse($tagName) : $tagName;
    }

    public function getEtcConst($tagName)
    {
        try {
                $etc = new \ReflectionClass($this->etcPath->$tagName);
                yield $etc->getConstants();

        }catch(\Throwable $throwable){
            echo "Hier liegt ein Fehler vor!!!!";
            echo "<pre>";
            print_r($this->etcPath);
            echo "</pre>";
        }
    }

    public function __construct()
    {
        $this->getIterator();
        $this->getEtcClass();
        //$this->getEtcConst();
    }
}

$test = new testGeneratorEtc();
$tagNames = $test->tagName;

print_r($test->element);

foreach ($tagNames as $key => $value) {

    $etc = $test->getEtcConst($value);
    //print_r($etc->current());
    // Generator Object

    //Das ist jetzt der Bereich in dem ich meine Elemente erstellen muss!!!
}

// Ausgabe -> das letzte �bergebene yield
/*
foreach($etc as $key) {
    print_r($key);
    //$etc->next();
}
*/