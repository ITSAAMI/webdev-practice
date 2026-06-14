<?php
	$a = "*HONDA*";
	#trim Function is used  to Delete Space from Sides of Input Felds
	$textbox_data = "   TEXT_ENTERED  ";

	echo "trim |$textbox_data| = |" . trim($textbox_data)."|<br>"; 

	echo  "Simple Trim :".trim($a , "*")."<br>";
	echo "Right Trim :".rtrim($a , "*")."<br>";
	echo "Lift Trim :".ltrim($a , "*")."<br>";
	echo "Lift Trim :".chop($a , "*")." :Same As Right Trim<br>";
	echo "Lift Trim :".trim("HONDA" , "HDA")."<br>";

?>