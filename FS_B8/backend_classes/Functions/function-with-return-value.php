<?php
function per($math,$sci,$comp,$gk){
    $sub = $math+$sci+$comp+$gk;
    return $sub;
}
$total = per(96,96,94,100);

$per = $total/4;

echo $per;
?>