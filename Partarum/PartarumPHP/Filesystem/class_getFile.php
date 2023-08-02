<?php
class getFile
{
public static $request;

public static function setStringForLanguage($item)
{
$fileValue = $item;
$fileValue = str_replace("var", "var ", $fileValue);
$fileValue = str_replace("=new", "= new ", $fileValue);
$fileValue = str_replace("<", "&lt", $fileValue);
$fileValue = str_replace("var iininstance", "var i in instance", $fileValue );
$fileValue = str_replace("instanceof", " instanceof ", $fileValue);
return $fileValue;
}

public static function getWhitespace($itemString)
{
$newString = [];
for($i=0;$i<strlen($itemString);$i++)
{
if(preg_match("/\S+/", $itemString[$i]))
{$newString[] = $itemString[$i];}
}
$result = implode($newString);
return $result;
}

public static function setJS_forJSON($item)
{
$props = ["function", "new", ":", ";", ",", ".", "/", "\\", "\"", "'", "<", ">", "+", "-", "=", "!", "&", "|", "(", ")", "{", "}", "[", "]", "true", "false", "undefined", "null"];
$changes = [];
for($i=0;$i<count($props);$i++)
{
$value = "change_$i";
$changes[] = $value;
}
$string = str_replace($props, $changes, $item);
return($string);
}

public static function getAnswer($item)
{
$getFile = $item;
$page = file_get_contents($getFile);
//$page = self::getWhitespace($page);
$page = self::setStringForLanguage($page);
//$page = self::setJS_forJSON($page);
//var_dump($page);
$jsonReturn = json_encode(utf8_encode($page));
//var_dump(json_decode($jsonReturn));
self::$request = $jsonReturn;
}

public function __construct($item)
{
self::getAnswer($item);
}
}
?>