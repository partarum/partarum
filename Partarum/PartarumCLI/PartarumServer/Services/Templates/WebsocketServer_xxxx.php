<?php

require_once "Partarum/PartarumCLI/PartarumServer/Services/Websocket.php";

use Server\Service\Websocket;

    // ! Diese Datei ist jene welche im Screen läuft
    // ! Der Screen wird gestartet und diese Datei wird dann aufgerufen
/*
 *      Die Datei ist verantwortlich für die Executive des Websockets - Servers
 *
 *      1. Websocket - Instance erstellen
 *      2.
 */


$timeout = 115;

$timeCounter = 0;

$lastLoopTime = 0;

$ip = $argv[1];

$port = $argv[2];

$server = new Websocket($ip, $port);

$server->create();

/*
 *  Hier die Serverevents hinzufügen
 */

$server->start();

$startTime = time();

$origin = "websocket_" . "${ip}" . ":" . "${port}";

function heartbeat($origin, $port): void
{

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://alerta.cordes-hosting.net/api/heartbeat',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>'{
      "origin": "' . $origin .'",
      "timeout": 120,
      "tags": ["websocket", "ch-software", ' . "${port}" . '"],
      "attributes": {
        "environment": "Production",
        "service": [
          "Core",
          "HA"
        ],
        "group": "Network",
        "severity": "major"
      }
    }',
        CURLOPT_HTTPHEADER => array(
            'Authorization: Key i9vXK5kUpkRlpo4pQp2RcPIgxA8alG_eKd7IBZhy',
            'Content-type: application/json'
        ),
    ));

    $response = curl_exec($curl);

    curl_close($curl);
    echo $response;
}

while(true){

    if($timeCounter === 0){

        if(($startTime + $timeout) === time()){
            $lastLoopTime = time();
            $timeCounter++;
            heartbeat($origin, $port);
        }
    } else {

        if(($lastLoopTime + $timeout) === time()){

            $lastLoopTime = time();
            $timeCounter++;
            heartbeat($origin, $port);
        }
    }
}

