<?php

	/* # this is Example in index Array 
	$a = [23,32,32,343,45,56];
	$b = [11,11,00];
	$c = array_replace($a,$b);*/

	# this is For multidimentional Array 
	$Movies = array(
	$netflix = ["Game of Throne"],
	$pak_dramas = ["Khani"],
	$pak_movies = ["Jannan"]);

	$colors = array(
	$red = ["red"],
	$green = ["green"],
	$yellow = ["Yellow"]);

	$newArray = array_replace_recursive($Movies, $colors);

	echo "<pre>";
	print_r($newArray);
	echo "</pre>";
?>