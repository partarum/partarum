<?php
namespace Partarum\PartarumCLI\System\Setup {

    class Show {

        public const IS_CONFIG = "Hast du eine Config im JSON - Format vorbereitet?";

        public static function output($output) : void {

            echo $output;
        }

        public static function newLine($n = 1) : void{

            for($i = 0; $i < $n; $i++){

                echo PHP_EOL;
            }
        }
    }
}