<?php
	$Movies = array(
	$netflix = ["Game of Throne","Daralis Artaghal","the Protector",],
	$pak_dramas = ["Khani","Pyira Afzal","Mere Pass Tum hoon"],
	$pak_movies = ["Jannan","Parchi","Jawani per nahi anne"]
);



	foreach ($Movies as list($a,$b,$c )) {
		echo("<table border = '2px' cellpadding = '5px' cellspacing = '0px'> " );
		echo "<tr>   <td>$a</td>    <td>$b</td>   <td>$c</td>   </tr>";
		echo("</table>");
	}


?>