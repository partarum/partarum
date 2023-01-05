<?php
/**
 *          Copyright 2020 © Alexander Bombis. All rights reserved.
 *          Developed by Alexander Bombis.
 *          Email: email@alexander-bombis.de
 *
 *          The following code was created based on the template for the website http://cordes-software.de.
 *          This may also be used in full by the person or business
 *          representing the domain "cordes-software.de"
 *          and also modified for their use.
 */

define("SLASH", DIRECTORY_SEPARATOR);

$files = [
    "ConfigFile.php",
    "Head.php",
    "Header.php",
    "Footer.php",
    "Content.php",
    "traits/FeatTemplateHelper.php"
];

foreach($files as $key => $file){

    require_once __DIR__.SLASH.$file;
}


