<?php

$ip = $argv[1];

$port = $argv[2];

echo getcwd() . "\n";

$path = "Partarum/PartarumCLI/PartarumServer/Services/Websocket/Server/WebsocketServer_{$port}.php {$ip} {$port}";

$screenName = "socketServer_" . $port;

echo "startServer: start \n";

$executive = "screen -dmS " . $screenName;

$output = shell_exec($executive);

$server = shell_exec("screen -S " . $screenName . " -X stuff \"php " . $path . "\"'\n'");

function testSocket($port){

    $test = shell_exec("netstat -tulpen | grep " . $port);
    
    echo "socket is connected = " . $test . "\n";

    return $test;
}

$zero = 0;

while(testSocket($port) === NULL){
    $zero++;
    echo "Round " . $zero . "\n";
    echo "Socket is not connected \n";

    if($zero === 10) {
        break;
    }
}

$socketTXTPath = getcwd() . "";

exec("netstat -tulpen | grep " . $port . " > socket_".$port.".txt", $testSocket2);