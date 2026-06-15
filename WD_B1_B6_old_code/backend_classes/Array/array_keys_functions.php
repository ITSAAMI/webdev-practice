<?php
	$a = ["a" => 1, "b" => 2,"c" => 3,"d" => 4];

	// $new = array_keys($a);# Return all keys in new array 
	// array_key_first($a); # only on php 7.3.0 return first key of Array Like 3
	// array_key_last($a); # only on php 7.3.0 return last key of Array Like 0
	
	//if(array_key_exists("a",$a))# Simpaly used as Condition
	if(key_exists("a",$a))#Same as Array key exists 
	{
		echo "Found Successfully";
	}else
	{
		echo "Not Found in this Array ";
	}

	// echo "<pre>";
	// print_r($new);
	// echo "</pre>";
?>