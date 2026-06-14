<?php
echo "Let Find Grade : From Marks <br>";

$marks = 1660;

if($marks >= 90 &&  $marks <= 100 ){
    echo "You are in Merit";
}elseif($marks >= 60 &&  $marks <= 89 ){
    echo "You are in 1st Division ";
}elseif($marks >= 45 &&  $marks <= 69 ){
    echo "You are in 2nd Division ";
}elseif($marks >= 33 &&  $marks <= 44 ){
    echo "You are in 3rd Division ";
}elseif($marks < 33 ){
    echo "You are Failed ";
}else{
    echo "Please enter Valid Number  ";
}         

?>