<?php
namespace Partarum\PartarumCLI\System\Setup {

    enum Logo  : int {

        case START = 0x0001;

        public function getASCII() : string {

            return match($this){
                Logo::START => file_get_contents("Partarum/PartarumCLI/ASCII/start.txt"),
                default => ""
            };
        }
    }
}