<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
namespace Partarum\HTTP\Request\Routes {

    class ManifestRoots {

        public const PATH = [
            "assets" => "config/assets-manifest.json",
            "surface" => "config/surface-manifest.json",
            "text" => "config/text-manifest.json",
            "fetch" => "config/fetch-manifest.json",
            "app" => "config/routes-manifest.json",
            "error" => "config/error-manifest.json"
        ];

        public static function getPath(array $needle) : string {

            // uriArray auswerten bzgl der keys in Path

            /*
            echo PHP_EOL;
            print_r($needle);
            echo PHP_EOL;
            */

            $key = strtolower($needle[1]);

            return self::PATH[$key] ?? self::PATH["app"];
        }
    }
}