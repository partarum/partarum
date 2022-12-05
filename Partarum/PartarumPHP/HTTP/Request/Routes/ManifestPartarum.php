<?php
namespace Partarum\HTTP\Request\Routes {

    class ManifestPartarum{

        public const PATH = [
            "partarum" => "Partarum/PartarumConfig/partarum-manifest.json",
            "partarumjs" => "Partarum/PartarumConfig/partarum-manifest.json"
        ];

        public static function getPath(array $needle) : string {

            $key = strtolower($needle[1]);

            return self::PATH[$key];
        }
    }
}