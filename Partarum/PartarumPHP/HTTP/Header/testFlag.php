<?php

/*
require_once "../Header.php";

use Partarum\HTTP\Header;

$flagOR = Header::ALLOW_GET |
            Header::ALLOW_POST |
            Header::ALLOW_PUT |
            Header::ALLOW_DELETE |
            Header::CONTENT_DISPOSITION_INLINE |
            Header::CONTENT_DISPOSITION_ATTACHMENT |
            Header::CONTENT_DISPOSITION_FORM |
            Header::CONTENT_TYPE_JSON |
            Header::CONTENT_TYPE_TEXT |
            Header::CONTENT_TYPE_HTML |
            Header::CONTENT_TYPE_XML;



echo $flagOR . PHP_EOL;

$flagXOR = Header::ALLOW_GET ^
    Header::ALLOW_POST ^
    Header::ALLOW_PUT ^
    Header::ALLOW_DELETE ^
    Header::CONTENT_DISPOSITION_INLINE ^
    Header::CONTENT_DISPOSITION_ATTACHMENT ^
    Header::CONTENT_DISPOSITION_FORM ^
    Header::CONTENT_TYPE_JSON ^
    Header::CONTENT_TYPE_TEXT ^
    Header::CONTENT_TYPE_HTML ^
    Header::CONTENT_TYPE_XML;

echo $flagXOR . PHP_EOL;

$flagAND = Header::ALLOW_GET &
    Header::ALLOW_POST &
    Header::ALLOW_PUT &
    Header::ALLOW_DELETE &
    Header::CONTENT_DISPOSITION_INLINE &
    Header::CONTENT_DISPOSITION_ATTACHMENT &
    Header::CONTENT_DISPOSITION_FORM &
    Header::CONTENT_TYPE_JSON &
    Header::CONTENT_TYPE_TEXT &
    Header::CONTENT_TYPE_HTML &
    Header::CONTENT_TYPE_XML;

echo $flagAND . PHP_EOL;

$t1 = Header::ALLOW_GET | Header::CONTENT_DISPOSITION_INLINE | Header::CONTENT_TYPE_JSON;
*/
// 18 | 5 | 3 = 23
// 18 | 5 | 6 = 23
// 18 | 5 | 12 = 31     // 7
// 18 | 5 | 24 = 31
// 18 | 5 | 48 = 55     //24
// 18 | 5 | 96 = 119    //64
// 18 | 5 | 192 = 215   //96
// 18 | 5 | 384 = 407   //192

// 18 + 5 + 3 = 26
// 18 + 5 + 6 = 29
// 18 + 5 + 12 = 35
// 18 + 5 + 24 = 47
// 18 + 5 + 48 = 71
// 18 + 5 + 96 = 119
// 18 + 5 + 192 = 215
// 18 + 5 + 384 = 407

// kleinste Möglichkeit pro Feld wenn alle angegeben sind = 18 5 3 !!!
// Bei 23 ist die kleinste Zahl der Einheit_1 = 18 = < 26 also möglich - der Rest sind dann 8 usw....

//kleinste Möglichkeit pro Feld wenn nur zwei angegeben sind = z.B.: 18 5 (23) || 18 3 (21) || 5 3 (8)

/*
 *  3
 *  5
 *  5 + 3 = 8
 *  5 + 6 = 11
 *  10 + 3 = 13
 *  10 + 6 = 16
 *  5 + 12 = 17
 *  18
 *  18 + 3 = 21
 *  10 + 12 = 22
 *  20 + 3 = 23 || 18 + 5 = 23
 *  20 + 6 = 26 || 18 + 5 + 3 = 26
 *  5 + 24 = 29
 * 20 + 12 = 32
 * 10 + 24 = 34
 *
 */

// erste Gemeinsamkeit -> jedes Ergebnis ist die Summe von drei binär gerechneten Zahlwerten !!!

//echo $t1 . PHP_EOL;

echo (0x000000174876E800 | 0x0001) << 1 ;
echo PHP_EOL;

echo 0x001 + 0x0001 + 0x00000001 + 0x0000000000000001 + 0xF0000000000000000000000000000001;

echo PHP_EOL;

echo PHP_INT_MAX;

$entityStart = 0x09;

$entityEnd = 0x9000000000000000;

$flagResult = 0x09;

echo PHP_EOL;
echo $entityEnd . PHP_EOL;

for($flagAll = $entityStart; $flagAll > $flagAll >> 1; $flagAll <<= 1){

    echo "Bitwise operator: " . $flagAll . PHP_EOL;

    $flagResult |= $flagAll;

    echo "OR: " . $flagResult . PHP_EOL;

    echo "AND: " . ($flagResult & $flagAll) . PHP_EOL;
}

echo "Flagwert gesamt von 9 aufwärts: " . $flagResult . PHP_EOL;

$needle = 0x09 | 0x12 | 0x80;

echo "gesuchter Wert : " . $needle . PHP_EOL;

$length = ceil(log10(abs($needle)));

echo "Länge von needle = " . $length . PHP_EOL;

$startFlag = 0x0009;

$flag = 0x0012 | 0x0090;

$mod = $flag % $startFlag;

echo "mod: " . $mod . PHP_EOL;

if($mod === 0){

    $firstFlag = ($flag / 2) & $flag;

    $secondFlag = $flag - $firstFlag;

} else {

    $firstFlag = $flag - $mod;

    $secondFlag = ($firstFlag / $startFlag) + $mod;
}

echo "firstFlag : " . $firstFlag . PHP_EOL;
echo "nextFlag: " . $secondFlag . PHP_EOL;

$f = 9 | 144 | 1152;

echo $f . PHP_EOL;

//$f &= ~ 144;
$f ^= 144;
echo $f . PHP_EOL;
//echo strlen(PHP_INT_MAX);

/*
while($flagAll < 0x9000000000000000){

    echo $flagAll . PHP_EOL;

    $flagAll <<= 1;

    $flagResult |= $flagAll;
}
*/