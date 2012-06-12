<?php
class indexAction extends Action{
    function index(){
        $this->display();
    }
    function getTest(){
    	$testJson = 'testDb.json';
    	if( file_exists( $testJson ) ){ echo "dataCallBack(" . file_get_contents( $testJson ) . ");"; return false;	}

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
    			'testCount' => $this->getTestCount( $api)
    		);
    	}
    	json_put($testJson,$node);
    	echo "dataCallBack(" . json_encode($node) . ");";

    }
    function getTestCount($api,$dir='../../'){
    	$path = joinPath($dir,str_replace('.','/',$api).'.js');
    	if( file_exists($path) ){
    		$con = file_get_contents( $path);
			preg_match_all('/test\(\"/', $con, $matches);
			return count($matches[0]);
			
		}else{
			return 0;
		}
    }
    function getSrc($dir='../../'){
    	$api = $_GET['api'];
    	$path = joinPath($dir,str_replace('.','/',$api).'.js');
    	echo file_get_contents( $path );
    }
}