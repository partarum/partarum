<?php

echo <<<EOF
                                     ____            _                             
 ***********************************|  _ \ __ _ _ __| |_ __ _ _ __ _   _ _ __ ___  
                                    | |_) / _` | '__| __/ _` | '__| | | | '_ ` _ \ 
                                    |  __/ (_| | |  | || (_| | |  | |_| | | | | | |
                                    |_|   \__,_|_|   \__\__,_|_|   \__,_|_| |_| |_|***************                          
     Eine Zusammenarbeit von:                     

 +-++-++-++-++-++-++-++-++-++-++-++-++-++-++-++-++-++-+          +-++-++-++-++-++-++-++-++-++-++-+
 |c||o||r||d||e||s||-||h||o||s||t||i||n||g||.||n||e||t|          |p||a||r||t||a||r||u||m||.||d||e|
 +-++-++-++-++-++-++-++-++-++-++-++-++-++-++-++-++-++-+          +-++-++-++-++-++-++-++-++-++-++-+
 
 *************************************************************************************************
EOF;
echo "\n \n";


echo "Hast du eine Config im JSON - Format vorbereitet, oder sollen wir das jetzt noch schnell machen? \n \n";
$isConfig = readline("Bitte antworte mit J oder Y für 'Ja' oder N für 'Nein': \n");

$no = ["n", "N"];

$config = null;

if(in_array($isConfig, $no)){

    echo "Dann lass uns deine Server schnell konfigurieren :) \n";

    $ip = readline("Bitte gib die IP an, auf welchen die Ports laufen sollen: \n");

    $ports = explode(" ", readline("Bitte gib alle Ports mit einem Leerzeichen getrennt an: \n"));

    echo "\n";
    echo "Folgende Ports werden jetzt konfiguriert: \n";
    foreach($ports as $value){
        echo $ip . ":" . $value . "\n";
    }



} else {

    $path = readline("Gib den Pfad der Config an: \n");

    if(file_exists($path)){

        $config = json_decode(file_get_contents($path), false);
    } else {

        echo $path . "\n";
    }

}