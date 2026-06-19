<?php
	$str1 = "this is string use for Encoding our String to Protect it From Hackers(SQL Injections)";

	#Encoding the String using addcslashes() A to Z to save in Database
	$str2 =  addcslashes($str1,"a..z")."<br><br>";
	echo $str2;

	#Decoding Encoded String to Display 
	$str3 = stripslashes($str2);
	echo $str3;

	#IMPORTENT TOPIC RELATED TO PRECTUCE 

?>