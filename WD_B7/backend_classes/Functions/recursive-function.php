<?php

function xyz($a){
    if( $a<=5){
        echo "A = $a <br>";
        xyz($a+1);
    }
}
xyz(1);

?>