<?php
error_reporting(-1);
ini_set("display_errors", "1");

/*
Generator:

In einer Genratorfunktion wird der Wert mittel yield zeitgleich zur�ckgegeben
und ist dann in der Funktion nicht mehr vorhanden.

Wenn ich eine Schleife im Generator laufen lasse, gibt dieser in jedem Durchgang den Wert zur�ck.
*/

function testGenerator($item){

    foreach($item as $key => $value ) {
        //print_r($item); // sind dreimal ein Array
        //yield "Schl�ssel---:".$key."-----Value---:".$value."</br>";
        yield $key => $value;
        //yield $value;
    }

}



class testClass {

    const EINS = 1;
    const ZWEI = 2;
    const DREI = 3;

    public function __set($name, $value){

        $this->$name = $value;

    }

    public function __get($key){

        return constant("self::".$key);

    }
}

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator(
        $_SERVER["DOCUMENT_ROOT"]."/office/bin/php/classes/HTML",
        FilesystemIterator::CURRENT_AS_SELF | FilesystemIterator::SKIP_DOTS),
    RecursiveIteratorIterator::CHILD_FIRST);

$getTestGenerator = new ReflectionClass("testClass");


    echo "<pre>";

    //print_r($iterator); RekursiveIteratorIterator Object

    //$test = $getTestGenerator->getConstants(); // gibt ein Array zur�ck
    $test = $iterator;
   //print_r($test); // ist das ReflectionClass Object

    //$one = 1;
    //$testTheClass = new testClass();
    $testStdClass = new stdClass();

    foreach($test as $key => $value ) {        //f�r jedes yield im Generator folgt ein extra Schleifenlauf
        $testStdClass->$key = $value;

    }

    print_r($testStdClass);
    echo "</pre>";

    $itemOne = "EINS";
    //echo $testStdClass->$itemOne;





