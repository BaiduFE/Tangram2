<?php
    $base_dir = '../../../../src/';
    

    $treeDates = array('children' => array(
                    array("children" => array(), "name" => "baidu", "type" => "folder"),
                    array("children" => array(), "name" => "baidu.js", "type" => "file")
                ));
    
    function getSubFolders($dir, $node){
        $handler = opendir($dir);
        $filename = readdir($handler);

        while($filename){
            // 如果是文件夹，递归执行
            if(is_dir($base_dir.$filename) && $filename != '.' && $filename != '..'){
               $trees[] = $filename;
            }else{  // 如果是文件，直接设置name和type属性
                $node["name"] = $filename;
                $node["type"] = "file";
            }

            $filename = readdir($handler);
        }
        sort($trees);
    }
    
    
    foreach ($treeDates['children'] as $child) {
        $filename = $base_dir.$child['name'];

        if(is_dir($filename)){
            getSubFolders($dir);
        }else{
            
        }
    }
?>