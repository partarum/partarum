<?php
namespace Server\System\Handle {

    enum SystemConfig : int {

        case HTTP = 0x0001;
        case Websocket = 0x0002;
        case TCP = 0x0004;
        case UDP = 0x0008;
        case MQTT = 0x010;
        case GRPC = 0x020;

        public function getFilePath() : string {
            return match($this){
                SystemConfig::HTTP, SystemConfig::TCP, SystemConfig::UDP, SystemConfig::MQTT, SystemConfig::GRPC => "",
                SystemConfig::Websocket => "Partarum/PartarumCLI/PartarumServer/Config/System/WebsocketConfig.json"
            };
        }
    }
}