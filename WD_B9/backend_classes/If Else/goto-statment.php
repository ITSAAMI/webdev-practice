<?php
echo "Goto Statment: <br>";
for($a=1;$a<=10;$a++){
    if($a==3){
        echo "A = $a <br>";
        goto abc;
    }
    echo "A = $a <br>";
}
abc:
echo "Out of Loop Echo "
?>