<?php
$curl_handle=curl_init();
curl_setopt($curl_handle, CURLOPT_URL,'http://localhost/test.html');
curl_setopt($curl_handle, CURLOPT_CONNECTTIMEOUT, 2);
curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl_handle, CURLOPT_USERAGENT, 'Your application name');
$query = curl_exec($curl_handle);

var_dump($query);
var_dump(curl_error($curl_handle));

curl_close($curl_handle);

