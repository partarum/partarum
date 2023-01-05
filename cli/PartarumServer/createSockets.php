<?php

chdir("..");

exec("php Partarum/PartarumCLI/PartarumServer/build.php", $output, $reCode);

echo $reCode . "\n";

print_r($output);