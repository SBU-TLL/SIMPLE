<?php
$dataString = '';
//$fileName = $_SERVER['cn'].".csv";
$fileName = implode("/",explode("/",$_SERVER["SCRIPT_FILENAME"],-3))."/grades.csv";

if(!file_exists($fileName)) {    
    $dataString="SIMPLE, GAME, SCORE, USER\n";
}

$dataString.=$_POST["SimpleName"];
$dataString.=",".$_POST["currentGame"];
$dataString.=",".$_POST["score"];
$dataString.=",".$_SERVER['cn']."\n";

print file_put_contents($fileName, $dataString, FILE_APPEND);

?>
    <?php
print_r( "****".$fileName."****" );
?>