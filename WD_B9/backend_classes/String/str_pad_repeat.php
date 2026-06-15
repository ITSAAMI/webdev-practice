<?php
	$a = "HINA";

	#PAD is use to add char to String 
	#STR_PAD_RIGHT = String+++
	#STR_PAD_LIFT = ++String
	#STR_PAD_BOTH = +Strig+
	#Perameters : $String_Name,Complete_Size_of_new_string,Adding_part,STR_PADE_TYPE 
	echo str_pad($a,6,"*",STR_PAD_BOTH);

	#Used to Repeat given string number of time
	echo "<br>".str_repeat($a,4);


?>