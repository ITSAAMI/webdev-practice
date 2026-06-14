<?php
		$a = 1;
		echo $a . "<br>";
		function show(){
			 global $a;
			echo $a . "<br>";

		}

		 	show();
			echo $a . "<br>";
?>