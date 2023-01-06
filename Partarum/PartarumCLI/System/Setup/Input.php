<?php
namespace Partarum\PartarumCLI\System\Setup {

    require_once "Handle.php";

    use Partarum\PartarumCLI\System\Setup\Handle;

    enum Input : int{
        case START = 0x0001;
        case BOOL = 0x0002;

        public function checkConfig($input) : array{

            // Die passende Aufgabe liefern

            return match(count($input)){
                1 => Handle::START_WITHOUT->action($input),
                2 => Handle::START_WITH_TYPE->action($input),
                default => ["type" => $input[1], "ports" => array_slice($input, 2)]
            };
        }

    }
}