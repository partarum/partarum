<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

namespace Cordes\Email {

    class Access
    {

        private string $hostname = "vweb01.cordes-hosting.net";

        //private string $username = "abombis@cordes-software.de";

        //private string $password = 'snJ6tXJrw2G4wPD';

        private string $username = "noreply@cordes-hosting.net";

        private string $password = '*$T7@Lqe6TQL';

        private string $secure = "tls";

        private int $port = 25;


        public function getData()
        {

            $object = new \stdClass();
            $object->hostname = $this->hostname;
            $object->username = $this->username;
            $object->password = $this->password;
            $object->secure = $this->secure;
            $object->port = $this->port;

            return $object;
        }

        public function __set($name, $value){

            $this->$name = $value;
        }
    }
}