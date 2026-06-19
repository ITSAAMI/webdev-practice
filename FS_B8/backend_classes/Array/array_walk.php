<?php

function Walk($x,$y)
{
	echo "$x $y <br>";
}
	
	$a =
	[
		"a" => 1, 
		"b" => 2,
		"c" => 3,
		"d" => 4
	];

	array_walk($a,"Walk");
	//array_walk_recursive(input, funcname); Same as that but for MD_array 

?>