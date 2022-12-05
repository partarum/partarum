<?php
namespace Partarum\Document {

    class HTMLService
    {
        public static function createID($item, $countID)
        {
            for($i=0;$i<=$countID;$i++) {
                //echo $i;
                yield $item . "_" . $i;
            }
        }

        public static function getFolder($parentPath)
        {
            yield substr(strrchr($parentPath, DIRECTORY_SEPARATOR), 1);
        }

        public function sortParentPaths($object){

            $numberArray = [];
            $pathArray = [];
            $resultArray = [];

            foreach ($object as $path => $val) {

                $number = substr_count($path, DIRECTORY_SEPARATOR);
                $numberArray[] = $number;
                $pathArray[] = $path;
            }

            $sortArray = natsort($numberArray);

            foreach ($numberArray as $key => $v){

                $resultArray[$pathArray[$key]] = $object[$pathArray[$key]];

            }

            return $resultArray;
            /*
            echo "<pre>";
            print_r($resultArray);
            */
        }
    }
}