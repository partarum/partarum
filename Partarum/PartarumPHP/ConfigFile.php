<?php
/**
 *
 *        Copyright 2020 © Alexander Bombis. All rights reserved.
 *        Developed by Alexander Bombis.
 *        Email: email@alexander-bombis.de
 *
 */

class ConfigFile{

    protected $configFile;

    protected $configObject;

    public function __construct($configFile){

        $this->configFile = $configFile;

        $this->getConfigFile();
    }

    protected function getConfigFile(){

        $file = file_get_contents($this->configFile);

        $this->configObject = json_decode($file);
    }
}