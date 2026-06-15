<?php

	$a = array(
	'a' => "123" ,
	'b' => 133 ,
	'c' => "tits",
	
);

	$new = array_change_key_case($a , CASE_UPPER);

	echo "<pre>";
	print_r($new);
	echo "<pre>";
?>