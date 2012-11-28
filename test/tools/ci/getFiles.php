<?php
    header('Content-Type:text/javascript');
    $src_dir = '../../../src';

    if(preg_match('/magic/i', $_SERVER["REQUEST_URI"])){
        $treeDates = array('children' => array(
                    array('children' => array(), 'name' => 'magic', 'type' => 'folder', 'dir' => $src_dir.'/magic'),
                    array('children' => array(), 'name' => 'magic.js', 'type' => 'file', 'dir' => $src_dir.'/magic.js')
                ));
    }else{
        $treeDates = array('children' => array(
                    array('children' => array(), 'name' => 'baidu', 'type' => 'folder', 'dir' => $src_dir.'/baidu'),
                    array('children' => array(), 'name' => 'baidu.js', 'type' => 'file', 'dir' => $src_dir.'/baidu.js')
                ));
    }
    
    function getSubFolders($dir, &$node){
        $handler = opendir($dir);
        $filename = readdir($handler);

        $_files = array();

        while($filename){
            // 如果是文件夹，递归执行
            if(is_dir($dir.'/'.$filename) && $filename != '.' && $filename != '..'){
                $child = array('children' => array(), 'name' => $filename, 'type' => 'folder', 'dir' => $dir.'/'.$filename);
                $node['children'][] = $child;
                getSubFolders($dir.'/'.$filename, $node['children'][count($node['children']) - 1]);
            }elseif(is_file($dir.'/'.$filename)){  // 如果是文件，直接设置name和type属性
                $_files[] = array('children' => array(), 'name' => $filename, 'type' => 'file', 'dir' => $dir.'/'.$filename);
            }

            $filename = readdir($handler);
        }

        // 最后合并文件类型的节点，以保证文件夹在前面，文件在后面
        $node['children'] = array_merge($node['children'], $_files);
    }
    
    
    foreach ($treeDates['children'] as $key=>$child) {
        $filename = $src_dir.'/'.$child['name'];

        if(is_dir($filename)){
            getSubFolders($filename, $treeDates['children'][$key]);
        }else{
            
        }
    }

    echo json_encode($treeDates);
?>
