<?php
namespace Server\System\Handle {

    enum FileCreatorType : int {

        case HTTP = 0x0001;
        case Websocket = 0x0002;
        case TCP = 0x0004;
        case UDP = 0x0008;
        case MQTT = 0x010;
        case GRPC = 0x020;

        public function createFile($port): bool {

            $newFileName = match($this){
                FileCreatorType::Websocket => "Partarum/PartarumCLI/PartarumServer/Services/Websocket/Server/" .  "WebsocketServer_" . $port . ".php",
                default => ""
            };

            if(!file_exists("Partarum/PartarumCLI/PartarumServer/Services/Websocket/Server")){

                mkdir("Partarum/PartarumCLI/PartarumServer/Services/Websocket/Server");
            }

            return match($this){
                FileCreatorType::Websocket => copy($this->getTemplatePath(), $newFileName),
                default => false
            };
        }

        public function getTemplatePath(): string {

            return match($this){
                FileCreatorType::Websocket => "Partarum/PartarumCLI/PartarumServer/Services/Templates/WebsocketServer_xxxx.php",
                default => ""
            };
        }
    }
}