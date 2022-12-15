<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

namespace Cordes\Email {

    require_once(__DIR__ . "/Access.php");

    use Cordes\Email\Access as Access;

    class Config
    {

        public string $recipient;

        public string $sender;

        public object $smtp;

        public int $wordwrap = 78;

        public string $charset = "UTF-8";

        public string $encoding = "quoted-printable";


        public function __construct(){

            $access = new Access();
            $this->smtp = $access->getData();
        }

        public function __set($name, $value){

            $this->$name = $value;
        }
    }
}
