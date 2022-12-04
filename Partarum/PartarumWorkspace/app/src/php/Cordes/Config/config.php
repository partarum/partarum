<?php
/*
 *   Copyright 2018- 2021 © Alexander Bombis. All rights reserved.
 *            Developed by Alexander Bombis.
 *            Email: email@alexander-bombis.de
 */

// Damit alle Fehler angezeigt werden
//error_reporting(E_ALL);
 
// Zum Aufbau der Verbindung zur Datenbank
// die Daten erhalten Sie von Ihrem Provider
define ( 'MYSQL_HOST', '100.64.0.208' );
define ('MYSQL_VPN_HOST', '10.8.0.38');
 
// bei XAMPP ist der MYSQL_Benutzer: root
define ( 'MYSQL_USER',  'csmanagement' );
define ( 'MYSQL_PASSWORD',  'Marvin-310592' );

define ('MYSQL_VPN_USER', 'devel');
define ('MYSQL_VPN_PASSWORD', 'GYTG3XP5');

// für unser Bsp. nennen wir die DB adressverwaltung
define ( 'MYSQL_DATABASE', 'cs_management' );

//ftp
define ('FTP_HOST', 'dev.cordes-hosting.net');
define ('FTP_USER', "cs18-0000_ftp3");
define ('FTP_PASSWORD', 'VqmtCN$4aNis');

// website httpautentication
define ('HTTP_URL', 'https://dev.cordes-hosting.net');
define ('HTTP_USER', 'devel');
define ('HTTP_PASSWORD', 'v_G2C2V*27SC');