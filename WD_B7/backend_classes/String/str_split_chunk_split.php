<?php

	$a = "coding addicted";
	$a_array = str_split($a);

	$new = chunk_split($a,3,"..");
	
	echo "$new";
	echo "<pre>";
	print_r($a_array);
	echo "</pre>";
?>