<?php
namespace Server\System\Handle {

    require_once "DataType.php";

    use Server\System\Handle\DataType;

    enum ServerType: int {

        case HTTP = 0x0001;
        case Websocket = 0x0002;
        case TCP = 0x0004;
        case UDP = 0x0008;
        case MQTT = 0x010;
        case GRPC = 0x020;

        public function createServerFile($ip, $port){

            return match($this){
                ServerType::Websocket => FileCreatorType::Websocket->createFile()
            };
        }


    }
}