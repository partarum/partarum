<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

error_reporting(-1);
ini_set("display_errors", "1");

$ht = file_get_contents($_SERVER["DOCUMENT_ROOT"]."/.htaccess");

echo "<pre>";
print_r($ht);

$domain = "plainphp.de";

    /*
     *  $template noch auslagern, damit ich das in einer json - Datei definieren kann - oder auch nicht - wegen der Variablen !!!!
     */

$template = [

    "DirectoryIndex index.php",
    "RewriteEngine on",
    "RewriteBase /",
    "AddType text/javascript .js",
    "AddType text/css .css",
    "AddType image/webp .webp",
    "AddType image/png .png",
    "AddType image/jpeg .jpg",
    "AddType application/vnd.ms-fontobject  eot",
    "AddType font/truetype                  ttf",
    "AddType font/opentype                  otf",
    "AddType application/x-font-woff        woff",
    "RewriteCond %{REQUEST_FILENAME} !-f",
    "RewriteCond %{REQUEST_FILENAME} !-d",
    "RewriteCond %{HTTP_HOST} ^(www.)?{$domain}$",
    "RewriteCond %{REQUEST_URI} !^/public/",
    "RewriteRule  ^(.*)?$ index.php [QSA]"
];


$htacces = fopen($_SERVER["DOCUMENT_ROOT"]."/.htaccess", "w");

    foreach ($template as $line){

        fwrite($htacces, $line . "\n");
    }

fclose($htacces);

    echo "<pre>";
    print_r(file_get_contents($_SERVER["DOCUMENT_ROOT"]."/.htaccess"));