<?php
class indexAction extends Action{
    function index(){
        $this->display();
    }
    function getJs(){

        $dirname =  '../../baidu';
        $list    = A('tools')->scand( $dirname  , '/\.js$/'  );
        #   扫描目录
        foreach ($list as $k => $v) {
            $list[$k] =  preg_replace( '/^\.\.\/\.\.\//', '', $v);
            preg_match('/^(.*)\/([\w\$_-]+\.js)$/', $list[$k] ,$match);

            #记录每个节点信息
            $node =  array(
                'dir'  => str_replace(  '/','.',$match[1] ),
                'name' => $match[2],
                'leaf' => 1,
                'api'  => preg_replace('/\.js$/', '', str_replace(  '/','.',$list[$k] ) ) ,
                'id'   => count($nodes)+1
            );
            $nodes[] = $node;

            #分析节点的目录
            $dirs = explode('.',$node['dir'] );
            for($i =0 ; $i<count($dirs) ; $i++ ) {
                $k =   implode('.', array_slice( $dirs,0,$i+1) )  ;
               $folders[ $k ] = 1;
            }
            $apis[] = $node['name'];
        }


        $dirs = array_keys( $folders );
        $allDirs = count($dirs);

        #   格式化node数据
        foreach ($nodes as $key => $value) {
            $nodes[$key]['id']  +=  $allDirs ;
            //$nodes[$key]['id']  .=  '' ;
            $nodes[$key]['pId'] =  array_search( $value['dir'], $dirs) +1;
            //$nodes[$key]['pId'] .=  '';
            unset( $nodes[$key]['dir'] );
        }

        #   格式化folder数据
        for($i=0;$i<count($dirs);$i++){
            $p    = implode ( '.', array_slice( explode('.',$dirs[$i] ) , 0,-1 ) );
            $pId  = strlen($p) <1 ? 0 : array_search( $p, $dirs)+1 ;
            $node = array(
                'id'   => ($i+1),//.'',
                'pId'  => $pId,//.'',
                'name' => $dirs[$i]
            );
            $fnodes[] = $node;
        }

        echo json_encode( array_merge( $fnodes,$nodes)  );

    }
    function getTs(){
    	
    	echo "dataCallBack(";
            $this->getJS();
        echo ");";

    }


    function getTest(){

        $dirname =  '../../baidu';
        $list = A('tools')->scand( $dirname  , '/\.js$/'  );
        $json = array(''=>0);
        $node = array();
        foreach ($list as  $value) {
            $value = str_replace( '/' , '.', str_replace( $dirname , 'baidu', $value) );
            $apiname  = preg_replace( '/\.js$/', '', $value);
            $apiinfo  = explode('.', $apiname);
            $apins    = array_slice($apiinfo, 0,-1);
            for($i = 0 ; $i<count( $apiinfo) ;$i++){
                $api = implode('.',array_slice( $apiinfo,0,$i+1)); 
                if( is_null( $json[$api] ) ){
                    $json[$api] = count( $json );
                }
             }
        }
        foreach ($json as $api => $id) {
            if($id===0){ continue  ;}
            $info = explode('.', $api);
            $name = array_pop($info);
            $ns   = implode('.', $info);

            $node[] = array(
                'id'   => $id,
                'name' => $name,
                'pId'  => $json[$ns],
                'api'  => $api,
                //'testCount' => $this->getTestCount( $api)
            );
        }
        echo "dataCallBack(" . json_encode($node) . ");";

    }
    function getSrc($dir='../../'){
        $api = $_GET['api'];
        $path = joinPath($dir,str_replace('.','/',$api).'.js');
        echo file_get_contents( $path );
    }
    
}