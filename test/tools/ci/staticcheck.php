<?php
    header('Content-Type:text/javascript');
    date_default_timezone_set('PRC');
    $file = $_GET['file'];
    $fileContent = file_get_contents($file);
    
    $result = array();

    # 检查文件编码
    $fileencoding = mb_detect_encoding($fileContent);
    if($fileencoding == "UTF-8"){
        $fileencodingCheck = 'pass';
    }else{
        $fileencoding = 'ASCII';
        $fileencodingCheck = 'failure';
    }

    # 检查文件Bomb头
    $bombCheck = 'pass'; 
    if(substr($fileContent, 0, 3) == chr(0xEF) . chr(0xBB) . chr(0xBF)){
        $bombCheck = 'failure';
    }

    # 检查Tab
    $tabCheck = 'pass';
    if(preg_match('/\t/', $fileContent)){
        $tabCheck = 'failure';
    }

    # 检查文件冲突
    $conflictCheck = 'pass';
    if(preg_match('/(<<<<<<\sHEAD|>>>>>>>)/', $fileContent)){
        $conflictCheck = 'failure';
    }

    # 检查关联用例是否修改
    $srcLastModifyTime = date("Y-m-d H:i:s", filemtime($file));
    $testfile = preg_replace('/src/', 'test', $file);
    $testCaseCheck = 'pass';
    if(!is_file($testfile)){
        $testLastModifyTime = '-';
        $testCaseCheck = 'attention';
    }else{
        $testLastModifyTime = date("Y-m-d H:i:s", filemtime($testfile));
        if(filemtime($file) > filemtime($testfile)){
            $testCaseCheck = 'attention';
        }
    }


    
    $result['encodingCheck'] = array('status' => $fileencodingCheck, 'msg' => $fileencoding);
    $result['BombCheck'] = array('status' => $bombCheck);
    $result['tabCheck'] = array('status' => $tabCheck);
    $result['conflictCheck'] = array('status' => $conflictCheck);
    $result['testCaseCheck'] = array('status' => $testCaseCheck, 'msg' => array('srcLastModify' => $srcLastModifyTime, 'testCaseLastModify' => $testLastModifyTime));
    
    echo json_encode($result);

    # TODO 按顺序展开节点
    # TODO API文档预览
    # TODO 自动修复编码、Bomb、Tab
?>