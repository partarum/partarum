<?php
namespace Partarum\HTTP\Request\Routes {

    class ManifestPlugin{

        public const PATH = [

        ];

        public static function getPath($needle) : string {

            $key = strtolower($needle);

            return self::PATH[$key];
        }
    }
}