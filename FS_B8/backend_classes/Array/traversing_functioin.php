<?php
echo "ARRAY TRAVERSING FUNCTION </br> ";

$a = [ 5,6,7,8,9];

echo key($a)."</br>";#Echo 
next($a); #Move Pointer to Next Index
echo key($a)."</br>";
prev($a);#Move Pointer to Previous index
echo key($a)."</br>";
end($a);#Move Pointer to End index
echo key($a)."</br>";
reset($a);#Reset Pointer 
echo key($a)."</br>";
$b = each($a);#exect Value and key Return in New Array
echo pos($a)."</br>";#Echo Value of Current Position 
echo current($a)."</br>";#Echo Value of Current Position 

echo "<pre>";
print_r($b);
echo "</pre><br> FAZOOL EACH();";
?>