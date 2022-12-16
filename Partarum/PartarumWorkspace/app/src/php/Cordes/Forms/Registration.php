<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */
namespace Cordes\Forms {

    class Registration {

        /*
          Array
            (
                [person] => natural
                [solution] => male
                [firstName] => Alexander
                [lastName] => Bombis
                [street] => Willy-Brandt-Straße, 61
                [postCode] => 39646
                [place] => 39646
                [country] => DE
                [phoneCountryCode] => germany
                [phone] => 1251561651616
                [email] =>
                [repeatEmail] => a@b.c
                [action] =>
            )
         */

        public string $person = "person";

        public string $anrede = "solution";

        public string $firstname = "firstName";

        public string $lastname = "lastName";

        public string $company = "legalName";

        public string $street_number = "street";

        public string $town = "place";

        public string $postal_code = "postCode";

        public string $country = "country";

        public string $email = "repeatEmail";

        public string $phone = "phone";

        public string $types = "string";
    }
}

