<?php
namespace Partarum\PartarumCLI\System\Filesystem {

    use RuntimeException;

    class Copy {

        public static function File($filePathNow, $filePathNew) : bool{

            try {

                copy($filePathNow, $filePathNew);

                return true;
            } catch (RuntimeException $rex) {

                var_dump($rex);
                return false;
            }
        }
    }
}