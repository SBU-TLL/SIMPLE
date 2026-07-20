<?php
        $p = $_GET['p'];
        if ($p == "processor" ||
            $p == "home" ||
            $p == "online_examples" ||
            $p == "setting_up" ||
            $p == "simple_uploader") {
                $file_name = "pages/" . $p . ".php";}
        else {
                $file_name = "pages/home.php";
      }
?>

    <!DOCTYPE html>
    <html>

    <head>
        <title>SIMPLE</title>
        <meta http-equiv="Content-Language" content="en-gb" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

        <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
        <script src="js/resize.js"></script>
        <script src="js/script.js"></script>
        <link rel="stylesheet" type="text/css" href="css/style.css" />
        <link rel="stylesheet" type="text/css" href="css/home.css" />
        <link rel="stylesheet" type="text/css" href="css/onlineExample.css" />
        <link rel="stylesheet" type="text/css" href="css/settingUp.css" />
        <link rel="stylesheet" type="text/css" href="css/simpleUploader.css" />

    </head>

    <body>
        <div id="stage" class="screen">

            
            
            <div id="header" class="flex">
                <ul id="navul">
                    <li class="navli"><a class="navlink" href="?p=home">Home</a></li>
                    <li class="navli"><a class="navlink" href="?p=online_examples">Online Examples</a></li>
                    <li class="navli"><a class="navlink" href="?p=home"><img src="media/simple.svg" id="simpleLogo" class="logo"></a></li>
                    <li class="navli"><a class="navlink" href="?p=setting_up">Setting Up</a></li>
                    <li class="navli"><a class="navlink" href="?p=simple_uploader">SIMPLE Uploader</a></li>
                </ul>
            </div>
            
            <div id="content">
                <?php include($file_name) ?>
            </div>

            


        </div>
    </body>

    </html>
