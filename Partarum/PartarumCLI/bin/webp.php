<?php

// Image
$dir = '';
$name = 'brazil.png';
$newName = 'brazil.webp';

// Create and save
$img = imagecreatefrompng($dir . $name);
imagepalettetotruecolor($img);
imagealphablending($img, true);
imagesavealpha($img, true);
imagewebp($img, $dir . $newName, 100);
imagedestroy($img);