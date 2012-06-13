<?php

ini_set("error_reporting", E_ALL ^ E_NOTICE);

#   简单的PHP框架 webooxx@gmail.com
/** 核心类 */
class ooxx {
    private static $CONFIG = array(
        'MOD_KEY'=>'m',                  #    请求控制器模块的参数名称
        'ACT_KEY'=>'a',                  #    请求控制器模块中方法的参数名称
        'DEF_MOD'=>'index',              #    默认执行的控制器模块
        'DEF_ACT'=>'index',              #    默认执行的控制器模块方法
        'MOD_EXT'=>'Action',             #    控制器模块类名后缀
        'MOD_FILE_EXT'=>'Action.php',    #    控制器模块类文件名后缀
        'DIR_APP'=>'.',                  #    应用程序目录
        'DIR_ACT'=>'.',                #    应用程序控制器模块目录
        'DIR_TPL'=>'.',                #    应用程序模板文件目录
        'DIR_THEME'=>'.',                #    应用程序模板主题目录
        'TPL_ENGINE'=>'default'          #    模板引擎类型，默认为default，会将../Public/转换为当前tpl主题目录下的Public路径
    );
    private static $MODULES = array();
    public static function run($cfg = array(),$argv = array()){
        #    命令模式传递参数
        if( count($argv)>1 ){ $al = count($argv); ooxx::set('CMD_MOD',true); for($i=1;$i<$al;$i++){ $arg = explode('=',$argv[$i]); $_GET[$arg[0]]=$arg[1]; } }
        #    配置信息
        foreach($cfg as $k=>$v){ ooxx::set($k,$v); }
        $m = ooxx::get('MOD_KEY');
        $a = ooxx::get('ACT_KEY');
        $m = empty($_GET[$m]) ? ooxx::get('DEF_MOD') : $_GET[$m];
        $a = empty($_GET[$a]) ? ooxx::get('DEF_ACT') : $_GET[$a];
        #    实例化请求的控制器模块方法
        $s = ooxx::mod($m);
        $s->act_name = $m;
        $s->fun_name = $a;
        $s->_call_by_client($a,$m);
    }
    public static function mod($m){
        if( ooxx::$MODULES[$m] ){ return ooxx::$MODULES[$m];}
        else{
            require_once( joinPath( ooxx::get('DIR_APP'),ooxx::get('DIR_ACT'), $m.ooxx::get('MOD_FILE_EXT') ));
            $c = $m.ooxx::get('MOD_EXT');
            return ooxx::$MODULES[$m] = new $c;
        }
    }
    public static function get($n)   { return is_null($n) ? ooxx::$CONFIG : ooxx::$CONFIG[$n]; }
    public static function set($n,$v){ return ooxx::$CONFIG[$n] = $v; }
}
/** 控制器类 */
class Action {
    protected $tpl_vars;
    #    实例化时记录原始方法名
    function __call($n,$a){ 
        if( $n==='_call_by_client' ){ 
            $this->fun_name = $a[0];
            //$this->act_name = $a[1];
            if(  C('VAILD_FUNC')  ){
                $v = explode( ':', C('VAILD_FUNC') );
                $m = ooxx::mod($v[0]);
                if( !$m->$v[1]( array('act'=>$a[1],'fun'=>$a[0])) )  { die(); }
            }
            $this->$a[0]();
        }else{
            $this->display($n.'.html');
        }
    }
    #    展现 格式：主题:目录:文件名；默认值=>；默认主题:模块名:方法名.html；A调用时候 模块名是A调用的模块。
    public function display($p=Null){ echo $this->fetch($p);  }
    #    模板赋值
    public function assign($n,$v=null){ $this->tpl_vars[$n] = $v;}
    #    获取赋值后的模板内容
	public function fetch($p){
		$p = joinPath( ooxx::get('DIR_APP'),ooxx::get('DIR_TPL'),$this->getTplPath($p) );
		switch( ooxx::get('TPL_ENGINE') ){
			default :
				$con = file_get_contents($p);
                $con = str_replace('../Public/',joinPath( ooxx::get('DIR_TPL'),'Public')."/", $con ); 
			break ;
		}
		return $con ;
	}
    #    返回模板路径，默认路径：主题目录/当前模块名/方法名.html，格式控制 '.:index:index.html'
    private function getTplPath($path){
        $module=substr(get_class($this),0,-6);
        $path = array_reverse ( explode(":",$path) );
        $back = array($this->fun_name.".html",$module,ooxx::get('DIR_THEME'));
        for($i=0;$i<3;$i++){ $path[$i] && $back[$i] = $path[$i]; }
        return join('/' ,array_reverse ( $back ) );
    }
}

/** 数据模型类 */
class Model{
    private static $DB;
    public static function getDb($n){
        if( !Model::$DB ){
            $db = new mysql_db();
            $db->sql_connect( ooxx::get('DB_HOST'), ooxx::get('DB_USER'), ooxx::get('DB_PWD'), ooxx::get('DB_NAME'));
            Model::$DB = $db;
        }else{ $db = Model::$DB; }
        $db->_sql = array();
        $db->_sql['table'] = $n;
        return $db;
    }

    public function __call($n,$a){
        #    处理数据库的操作
        $db = Model::$DB; $a = $a[0];

        if( in_array($n,array('field','table','where','limit')) ){
            if( is_string($a) ){ $db->_sql[$n] = $a; }
            if( is_array($a) ){
                if( $n==='where' ){
                    $w = array();
                    foreach($a as $k=>$v){ $w[]="$k = $v"; }
                    $db->_sql[$n] = trim( implode(" and ",$w));
                }
                else{ $db->_sql[$n] = implode(",",$a); }
            }return $db;#    返回实例以支持链式调用
        }
        if( in_array($n,array('find','findAll')) ){
            if( $n === 'find'){ $db->_sql["limit"] = is_numeric($a) ? "0,$a" : ( $db->_sql["limit"] ? $db->_sql["limit"] : "0,1" ) ; }
            $db->_sql["field"] = $db->_sql["field"] ? $db->_sql["field"] : "*";
            $db->_sql["table"] = $db->_sql["table"] ? " from ".$db->_sql["table"]  : "";
            $db->_sql["where"] = $db->_sql["where"] ? " where ".$db->_sql["where"] : "";
            $db->_sql["limit"] = $db->_sql["limit"] ? " limit ".$db->_sql["limit"] : "";
            $sql = array( "select", $db->_sql["field"], $db->_sql["table"], $db->_sql["where"], $db->_sql["limit"], $db->_sql["group"] );
            if($a === true) { echo '<br /><b>SQL String</b>: '. join(" ",$sql) .'!<br />'; }
            $result = $db->query( join(" ",$sql) );
            while($row=mysql_fetch_array( $result )) { $return[] = $row; }
            return $return;
        }
        #    数据格式重构
        if( $n==='data'){
            if( is_array($a) ){ $db->_sql[$n] = $a;}
            if( is_string($a) ){ $ds = explode(',',trim($a)); foreach($ds as $d) { $row = explode('=',$d); $db->_sql[$n][$row[0]]=$row[1]; } }
        }
        if( in_array($n,array('save','add','delete','del')) ){
            if( $a ){ $db->data($a); }
            if($n === 'save'){
                foreach( $db->_sql["data"] as $k=>$v ){ $data[] = " $k = '$v' "; }
                $sql = array("update",$db->_sql["table"],"set", implode(',',$data) ," where ",$db->_sql["where"],);
            }
            if($n === 'add'){ $sql = array( "insert into",$db->_sql["table"] ,'('.implode(',' ,array_keys( $db->_sql["data"] ) ).') values (\''.implode('\',\'' ,array_values( $db->_sql["data"] ) ).'\')' ); }
            if($n === 'del'||$n === 'delete'){ $sql = array( "delete from",$db->_sql["table"]," where ",$db->_sql["where"] );}
            if( ($n==='save'||$n === 'del'||$n === 'delete') && !$db->_sql["where"] ){ echo '<br /><b>SQL ERROR,EMPTY CONDITION FOR WHERE</b>: '. join(" ",$sql) .'!<br />';return false;}
            return $db->query( implode(" ",$sql) );
        }
        if( $n === 'query' ){ return $db->query($a); }

    }

}
/** mysql数据库类 */
class mysql_db extends Model{
    public $_sql = array();
    function sql_connect($sqlserver, $sqluser, $sqlpassword, $database){
        $this->connect_id = mysql_connect($sqlserver, $sqluser, $sqlpassword);
        if($this->connect_id){
            mysql_query('set names "UTF8"');
            if (mysql_select_db($database)){ return $this->connect_id; }else{ return $this->error(); }
        }
        else{ return $this->error(); }
    }
    function error($sql=""){ if(mysql_error() != ''){ echo '<b>MySQL Error</b>: '.mysql_error().'<br/>'.$sql.'<br />'; } }
    function query($query){
        if ($query != NULL){
            $this->query_result = mysql_query($query, $this->connect_id);
            if(!$this->query_result){ return $this->error($query); }
            else{ return $this->query_result; }
        }
        else{ return '<b>MySQL Error</b>: Empty Query!'; }
    }
    function sql_close(){ if($this->connect_id){ return mysql_close($this->connect_id); } }
}
#   快捷函数
function C( $n=Null,$v=Null){ return ( is_null($v) || is_null($n) ) ? ooxx::get($n) : ooxx::set($n,$v); }
function A( $n=Null ){ return is_null($n) ? ooxx::mod( ooxx::get('DEF_MOD') ) : ooxx::mod( $n ); }
function M( $n=Null ){ return Model::getDb( $n ); }
function json_get($file){return json_decode( file_get_contents($file) );}
function json_put($file,$json){ return file_put_contents($file,json_encode($json));}
function O2A($obj){ $result = array(); if(!is_array($obj)){ if($var = get_object_vars($obj)){ foreach($var as $key => $value){ $result[$key] = O2A($value); } } else{ return $obj; } } else{ foreach($obj as $key => $value){ $result[$key] = O2A($value); } } return $result; }
function joinPath() { $args = func_get_args(); $paths = array(); foreach ($args as $arg) { $paths = array_merge($paths, (array)$arg); } $paths = array_map(create_function('$p', 'return trim($p, "/");'), $paths);  $paths = array_filter($paths); return join('/', $paths);}
function dump($arg){ echo '<pre>';var_dump($arg);echo '</pre>'; }
#   日志函数
function Log4j($msg,$level=0){
	$msg = " [".$level."] >>> ".date("H:i:s")." $msg \r\n";
    $echoLevel  = is_null(  C('Log4j-echoLevel')  ) ? C('Log4j-echoLevel')  : 0 ;
    $writeLevel = is_null(  C('Log4j-writeLevel') ) ? C('Log4j-writeLevel') : 1 ;
    if( $level >= $echoLevel  ){ echo $msg; }
    if( $level >= $writeLevel ){ 
        $path = joinPath( C('Log4j-writeDir'), $map[$level].'-'.date("Ymd").'.log' );
        $f = fopen( $path , "a");
        fwrite($f, $msg);
        fclose($f);
    }
}
session_start();
/* 数据库配置 */
$cfgs = array(
    #'VAILD_FUNC'=>'rbac:check', #   访问验证模块
    'DB_HOST'=>getenv('HTTP_BAE_ENV_ADDR_SQL_IP').':'.getenv('HTTP_BAE_ENV_ADDR_SQL_PORT'),
    'DB_NAME'=>'nyaRWctetNokwguvNUkn',
    'DB_USER'=>getenv('HTTP_BAE_ENV_AK'),
    'DB_PWD'=>getenv('HTTP_BAE_ENV_SK'),
);

ooxx::run($cfgs, $argv);
