<?php
namespace Partarum\PartarumCLI\System\Setup {

    class Read {

        public static function yesOrNo($question) : bool {

            $no = ["n", "N"];

            echo $question, PHP_EOL, PHP_EOL;
            return (in_array(readline("Bitte antworte mit J oder Y für 'Ja' oder N für 'Nein': \n"), $no) === false);
        }
        public static function andGetInput($output, $type = "string", $separator = " "): array|bool|string {

            $question = "";

            if(is_array($output)){

                for($i = 0; $i < count($output); $i++) {

                    if($i === (count($output) - 1)){

                        $question = $output[$i];
                    } else {

                        echo ($output[$i] === " ") ? PHP_EOL : $output[$i];
                    }
                }

            } else {
                $question = $output;
            }

            return ($type === "array") ? explode($separator, readline($question)) : readline($question);
        }
    }
}