<?php
	#True = Zero
	#fales = all Non Zero
	#nagative is Smaller size
	#Positive is Larger size

	$a = "Hello Word";
	$b = "HELLO WORD";

	#Compair AB
	echo strcmp($a,$b);
	#N is Used for Length
	echo strncmp($a,$b,6);
	#case is Use For Case_insensetive
	echo strcasecmp($a,$b);
	#both Case and N are used for length + case-insenctive 
	echo strncasecmp($a,$b,5);
	#Nat is used for Natriol Algorithm : Recommended
	echo strnatcmp($a,$b);
	#Nat + case = Case-insensetive + Natriol Algo Used 
	echo strnatcasecmp($a,$b);
	#Compair Parts of Strings Perameters: Str1,str2,Start,Length
	echo substr_compare($a,$b,6,4);
	#Return Simillers Charaters 
	echo similar_text($a, $b);



?>