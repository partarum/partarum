<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

error_reporting(-1);
ini_set("display_errors", "1");

require_once(__DIR__ . "/php/Cordes/classes/Process/Contact/SendEmail.php");

use Cordes\Process\Contact\SendEmail as SendEmail;

$contact = new SendEmail();


