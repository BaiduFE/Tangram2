<?php
    header('Content-type:application/json;charset=utf-8');
    $file = $_GET['file'];
    $content = file_get_contents($file);

    // 解析每一个注释项
    function getDesc($desc){
        global $datas;
        $data = array();
        $data['hasparam'] = false;
        foreach ($desc as $key => $value) {
            if(preg_match('/@description/', $value)){
                preg_match('/description\s(.*)\r/', $value, $matches);
                $data['description'] = $matches[1];
            }elseif(preg_match('/@name/', $value)){
                preg_match('/name\s(.*)\r/', $value, $matches);
                $data['name'] = $matches[1];
            }elseif(preg_match('/@grammar/', $value)){
                preg_match('/grammar\s(.*)\r/', $value, $matches);
                $data['grammar'] = $matches[1];
                $shortgrammar = explode('.', $matches[1]);
                $data['shortgrammar'] = $shortgrammar[count($shortgrammar) - 1];
            }elseif(preg_match('/@param/', $value)){
                !$data['param'] && $data['param'] = array();
                preg_match('/param\s*([^\s]*)\s*([^\s]*)\s*(.*)\r/', $value, $matches);
                $data['param'][] = array('type' => $matches[1], 'name' => $matches[2], 'desc' => $matches[3]);
                $data['hasparam'] = true;
            }elseif(preg_match('/@return/', $value)){
                preg_match('/return\s*([^\s]*)\s*(.*)\r/', $value, $matches);
                $data['return'] = array('type' => $matches[1], 'desc' => $matches[2]);
            }elseif(preg_match('/@example/', $value)){
                $data['example'] = array();
                $example = explode('示例代码：', preg_replace('/@example\s/', '', $value));
                $data['example']['desc'] = preg_replace('/\r\n/', '<br />', $example[0]);
                $example[1] && $data['example']['code'] = $example[1];
            }
            

        }
        $datas[] = $data;
    }

    // 匹配注释块
    preg_match_all('/\/\*[\s\S]*?\*\//', $content, $matches);
    $matches = $matches[0];

    // 过滤出标准API注释块
    foreach ($matches as $key => $matche) {
        if(!preg_match('/@description/', $matche)){
            unset($matches[$key]);
        }
    }

    // 匹配出注释块的每一项
    $datas = array();
    foreach ($matches as $key => $matche) {
        preg_match_all('/(@[\s\S]*?)(?:\*\s|\*\/)/', $matche, $items);
        // var_dump($items[1]);
        getDesc($items[1]);
    }

    echo json_encode($datas);
?>