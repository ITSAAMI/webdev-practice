<?php

$array1 = [
	"a" => 'Syed',
	"b" => 'wazeer',
	"c" => 'fakeer',
	"d" => 'Syed',
			];
$array2 = [
	"b" => 'jaleel',
	"c" => 'hameen',
	"d" => 'Syed',
	"e" => 'zameen',
			];

$unique = array_values($array1);


	echo "<pre>";
	print_r($unique);
	echo "</pre>";
?>