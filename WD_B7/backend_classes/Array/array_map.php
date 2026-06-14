<?php

function mapz($x)
{
	return $x+$x."<br>";
}
	
	$a =
	[
		"a" => 1, 
		"b" => 2,
		"c" => 3,
		"d" => 4
	];

	$new = array_map("mapz",$a);


	echo "<pre>";
	print_r($new);
	echo "</pre>";
?>