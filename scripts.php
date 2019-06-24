<?php
    $handle=opendir("scripts/");

    while (($file = readdir($handle))!==false) {
    echo '<script type="text/javascript" src="scripts/$file"></script>';
    }

    closedir($handle);
?>