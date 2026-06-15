<?php



	$ra = 
	[
		$ax = [1,2,3],
		$ay = [4,5,6]
	];

	$rb = 
	[
		$bx = [1,2,3],
		$by = [4,5,6]
	];

	$md_array = array_merge_recursive($ra,$rb);


	echo "<pre>";
	print_r($md_array);
	echo "</pre>";


	/*$a = [1,2,3,4,5];
	$b = [6,7,8,9,10];


	$c= array_merge($a,$b);

	echo "<pre>";
	print_r($c);
	echo "</pre>";*/



?>