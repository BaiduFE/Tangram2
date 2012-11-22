<?php
    $file = $_GET['file'];
    if(is_file($file)){
        $content = file_get_contents($file);
    }else{
        $content = '';
    }
    
    echo $content;
?>