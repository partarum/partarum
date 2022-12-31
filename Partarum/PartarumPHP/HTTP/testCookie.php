<?php

error_reporting(-1);
ini_set("display_errors", "1");


include_once __DIR__."/Cookie.php";

use Partarum\HTTP\Cookie;

$cookie = new Cookie();
$cookie->setName("test");
$cookie->value = "inhalt";
$cookie->lifetime = 10;                     // standart 0   laufzeit bis Ende Session || time()+3600 = 1Stunde z.B.
$cookie->path = "/";                        // standart ist das aktuelle Verzeichnis || "/" vom Document_Root aus
$cookie->domain = "partarum.com";           // standart die Domain die gerade das Script aufruft
$cookie->secure = TRUE;                     // standart FALSE   0 = geht auch ohne https, 1 = wird nur mit https gesendet
$cookie->httponly = FALSE;                  // standart FALSE   0 = Javascript hat Zugriff, 1 = Javascript darf nicht zugreifen
$cookie->create();

$cookie->setName("test"); // vielleicht besser die Propertys auf private zu setzen und sie per function zu definieren?!

$cookie1 = new Cookie([
    "name" => "test2",
    "value" => "inhalt2",
    "lifetime" => TRUE
]);

$cookie2 = new Cookie("test3", "inhalt3", time() + 3600);

$killCookie = Cookie::destroy("test");
