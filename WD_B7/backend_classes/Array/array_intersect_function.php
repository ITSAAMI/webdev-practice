<?php
	# WHEN GET FREE THEN MUST TRY "U" KEYS FUNCTION WHICH IS REMINED 
	// $ia = [1,2,3,4,5];
	// $ib = [3,4,5,6,7];

	// $inew = array_intersect($ia, $ib);# Compair Values and Intersect 

	$aa = ["a" => 1,"b" => 2,"c" => 3];
	$ab = ["c" => 2,"b" => 2,"e" => 4];

	//$aNew = array_intersect_key($aa,$ab);#Compair Keys and Intersect 
	$aNew = array_intersect_assoc($aa,$ab);# Compair Both Values and Keys then intersect 
	

echo "<pre>";
print_r($aNew);
echo "<pre>";


?>