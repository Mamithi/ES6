<?php
function foo(&$arg) {
    $z = $arg;
    $arg  += 1;
    return $z;
}

$x = 3;
$y = foo($x);

echo $x;

echo '<br>';

echo $y;


?>