<?php

$a = [1,2,3,4,5,6,7,8,9];

$chunked = array_chunk($a, 5);

echo("<pre>");
print_r($chunked);
echo("</pre>");

?>