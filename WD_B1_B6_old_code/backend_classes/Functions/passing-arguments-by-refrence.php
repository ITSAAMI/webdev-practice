<?php
function xyz(&$fx){
    
    $fx = "hey";
}

$px = 2;

xyz($px);

echo $px;
?>