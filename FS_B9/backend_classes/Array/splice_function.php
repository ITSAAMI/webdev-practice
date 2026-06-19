<?php
	$a = [0,1,2,3,4,5,6,7];
	$b = [22,33,44,55];

	$array_pointer = 4; # from which var to replace values in Array
	$array_values_to_replace = 0;  # how many values to replace 

	#replace Array $b to $a , delete some var like slice() 
	array_splice($a,$array_pointer,$array_values_to_replace,$b);

	
	echo("<pre>");
	print_r($a);
	echo("</pre>");




?>