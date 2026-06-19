<?php
$md_array = 
[
$a = 
	[
		"name" => "gul khan",
		"fname" => "khan gul",
		"nic" => "1720118130091"
	],
	$a = 
	[
		"name" => "syed Amir",
		"fname" => "hayat ur rehman",
		"nic" => "1720118130091"
	],
];
	

	$new = array_column($md_array, "name");
	echo("<pre>");
	print_r($new);
	echo("</pre>");
?>