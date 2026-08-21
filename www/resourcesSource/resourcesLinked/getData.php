<?php
$dataString = '';
//$fileName = $_SERVER['cn'].".csv";
$fileName = implode("/",explode("/",$_SERVER["SCRIPT_FILENAME"],-4))."/grades.csv";

if(!file_exists($fileName)) {    
    $dataString="SIMPLE, GAME, SCORE, USER\n";
}

$dataString.=$_REQUEST["SimpleName"];		//	Tony
$dataString.=",".$_REQUEST["currentGame"];	//	Tony
$dataString.=",".$_REQUEST["score"];		//	Tony
$dataString.=",".$_SERVER['cn']."\n";

file_put_contents($fileName, $dataString, FILE_APPEND);

?>
    <?php
#print_r( "****".$fileName."****" );
print_r ($_SERVER['cn']);
?>