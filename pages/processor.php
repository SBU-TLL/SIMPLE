<?php
$convert="/usr/bin/convert";
$identify="/usr/bin/identify";
$netID = $_SERVER['cn'];
$uniqueID = uniqid();
error_reporting(-1);
set_time_limit(0);
$grainsize=100; 
#header('Content-type: image/jpeg');
$UPLOADPATH="./uploads/$netID";
#echo $UPLOADPATH;
$PROJECTPATH='.';
#handle upload

$file_name =basename($_FILES['filex']['name']);
$path_parts =  pathinfo($_FILES['filex']['name']);
$ext = strtolower(substr(strrchr($file_name, "."), 1));
$uniqueID = $path_parts['filename'];
$uniqueID = str_replace(' ', '_', $uniqueID);


if($ext!="psd") 
{
	echo "The file is not a psd";
	exit();
}
else        
{	
	$uniqueIDdir = "$UPLOADPATH/$uniqueID";
	$uniqueDynamic=$uniqueIDdir."/resourcesDynamic";
	$old = umask(0);
	mkdir($uniqueIDdir,0777, true);
	umask($old);
	$tmppsd="$uniqueIDdir/img.psd";
	if(move_uploaded_file($_FILES['filex']['tmp_name'], $tmppsd))
	{
		echo "File uploaded!</br>";
	}
	else
	{
		echo "There was an error uploading the file, please try again!";
	}
}




#copy supporting file		
`cp -r $PROJECTPATH/resourcesForCopy/* $uniqueIDdir`; 
`cp -r $PROJECTPATH/resourcesForCopy/.htaccess $uniqueIDdir`;
`mkdir $uniqueDynamic`;
`mkdir $uniqueDynamic/images`;
/* */

if(1==1||$format == 'PSD')

{
	//$getLayers="/usr/bin/convert $tmppsd -verbose info: |grep Label ";

	$getLayers="$identify -verbose $tmppsd";
#	print $getLayers;
	exec($getLayers,$labels);
	$labels=implode("\n",$labels);
	preg_match("/geometry: (\d*)x([^\+]*)/sm",$labels,$size,PREG_OFFSET_CAPTURE);
	
#print_r($size);
	$width= $size[1][0];
	$height= $size[2][0];
	if($width>$height){
		$widthPercent=100;
		$heightPercent=($height/$width)*100;
	}
	else{
		$heightPercent=100;
		$widthPercent=($width/$height)*100;

	}
#print_r($labels);
	preg_match_all("/label:[ ]*(.*)/",$labels,$size);

#print_r($size);
	$size[1]=str_replace("photoshop","",$size[1]);
#$getLayers="/usr/bin/convert -set dispose Background -coalesce $tmppsd $uniqueDynamic/images/layer.png";
	$getLayers="$convert -set dispose Background -coalesce  $tmppsd $uniqueDynamic/images/layer.png";
	#print($getLayers);
	exec($getLayers,$labels);
	$i=1;
	$jsonObject = new stdClass();

	$jsonObject -> width = $widthPercent;
	$jsonObject -> height = $heightPercent;
	$jsonObject -> layers = array();
	foreach($size[1] as $lname)
	{
#$getLayers="/usr/bin/convert  -geometry 50x50 -compress none $uniqueIDdir/layer-$i.png +matte -fx a $uniqueIDdir/layer-$i.pbm";
#$getLayers="/usr/bin/convert  $uniqueIDdir/layer-$i.png -fx 'lightness > 0.3 ? 1 : 0' -geometry 75x75 -compress none $uniqueDynamic/images/layer-$i.pbm";
		$getLayers="$convert -geometry 75x75 -compress none  $uniqueDynamic/images/layer-$i.png -fx 'lightness > 0.1 ? 1 : 0'  $uniqueDynamic/images/layer-$i.pbm";

		exec($getLayers,$labels);
		
		
		$getLayers="$convert   $uniqueDynamic/images/layer-$i.png  -trim  $uniqueDynamic/images/drag-layer-$i.png";
			exec($getLayers,$labels);
		//$getLayers="/usr/bin/convert   $uniqueIDdir/layer-$i.png  -trim  $uniqueDynamic/images/drag-layer-$i.png";
		//exec($getLayers,$labels);
		//$getLayers="/usr/bin/convert   $uniqueIDdir/layer-$i.png  -trim  +repage $uniqueDynamic/images/drop-layer-$i.png";
		//exec($getLayers,$labels);
		$arrayObject = new stdClass();
		$arrayObject -> id = $i;
		$arrayObject -> lname = $lname;
		array_push($jsonObject -> layers,$arrayObject);

		$i++;
	}

	






	$arglist="$uniqueDynamic/images/layer $i $width $height";
	$mapcreate="python3 ./quadJSONsmall.py $arglist";
	exec($mapcreate." 2>&1",$json);
	$json=implode("\n",$json);
	
	$jsonObject -> imageMap =json_decode($json);
	file_put_contents("$uniqueDynamic/simple.json", json_encode($jsonObject));
}
else
{
	echo "SIMPLE process aborted.this does not appear to be a valid photoshop file";
	exit(0);
}




?>
The selector game is available <a href='<?php echo "$uniqueIDdir/index.html"; ?>' target="_blank"> here.</a></br>
The flash card game is available <a href='<?php echo "$uniqueIDdir/index.html?game=index"; ?> 'target="_blank"> here. </a></br>
The typing game is available <a href='<?php echo "$uniqueIDdir/index.html?game=typing"; ?>' target="_blank"> here.</a></br>
