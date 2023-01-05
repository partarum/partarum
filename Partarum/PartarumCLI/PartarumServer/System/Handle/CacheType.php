<?php
namespace Server\System\Handle {

    enum CacheType : int {

        case IP = 0x0001;
        case Socket = 0x0002;
        case Websocket = 0x0004;

        public function getFilePath() : string {

            return match($this){
                CacheType::IP => "Partarum/PartarumCLI/PartarumServer/Cache/ip.json",
                CacheType::Socket=> "Partarum/PartarumCLI/PartarumServer/Cache/socket.json",
                CacheType::Websocket => "Partarum/PartarumCLI/PartarumServer/Cache/websocket.json"
            };
        }

    }
}