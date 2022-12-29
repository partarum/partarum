<?php
namespace Partarum\HTTP\Request\Routes {

    class ManifestProxy{

        public const PATH = [
            "assets" => "config/assets-manifest.json",
            "surface" => "config/surface-manifest.json",
            "text" => "config/text-manifest.json",
            "fetch" => "config/fetch-manifest.json",
            "app" => "config/routes-manifest.json",
            "error" => "config/error-manifest.json"
        ];

        public static function getPath($needle) : string {

            $key = strtolower($needle);

            return self::PATH[$key];
        }
    }
}