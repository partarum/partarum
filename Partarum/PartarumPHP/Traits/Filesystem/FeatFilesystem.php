<?php
namespace Partarum\PartarumPHP\Traits\Filesystem {

    use DateTime;

    trait FeatFilesystem {

        public static $fileFolder = [

            "folder" => [
                "path"             => [],
                "name"             => [],
                "accessTime"       => [
                    "timestamp" => [],
                    "dateTime"  => []
                ],
                "modificationTime" => [
                    "timestamp" => [],
                    "dateTime"  => []
                ]
            ],
            "file"   => [
                "path"             => [],
                "name"             => [],
                "accessTime"       => [],
                "modificationTime" => []
            ]
        ];

        public static function setFileFolder($iterator, $type, $path, $pathType) {
            self::$fileFolder[$path][$type]["path"][]                          = $iterator[0];
            self::$fileFolder[$path][$type]["name"][]                          = $iterator[1];
            self::$fileFolder[$path][$type]["accessTime"]["timestamp"][]       = $iterator[2];
            self::$fileFolder[$path][$type]["accessTime"]["dateTime"][]        = self::setDateTime($iterator[2]);
            self::$fileFolder[$path][$type]["modificationTime"]["timestamp"][] = $iterator[3];
            self::$fileFolder[$path][$type]["modificationTime"]["dateTime"][]  = self::setDateTime($iterator[3]);
        }

        public static function setDateTime($timestamp) {
            $dateTime = DateTime::createFromFormat("U", $timestamp);
            return $dateTime->format("d m Y H:i:s");
        }

    }
}