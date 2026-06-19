<?php
	# WHEN GET FREE THEN MUST TRY "U" DIFFERENT FUNCTION WHICH IS REMINED 
	//$ia = [1,2,3,4,5];
	//$ib = [3,4,5,6,7];

	//$inew = array_intersect($ia, $ib);# Compair Values

	$aa = ["a" => 1,"b" => 2,"c" => 3];
	$ab = ["c" => 2,"b" => 2,"e" => 4];

	//$aNew = array_intersect_key($aa,$ab);#Compair Keys
	$aNew = array_intersect_assoc($aa,$ab);# Compair Both Values 
	

echo "<pre>";
print_r($aNew);
echo "<pre>";


?>