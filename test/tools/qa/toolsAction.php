<?php
class toolsAction extends Action{
  #   拒绝客户端访问模式
	function __construct(){C('VAILD_FUNC','rbac:reject');}

    # 普通搜索
    function scan($path , $match = Null){
      $dirs = scandir( $path );
      foreach($dirs as $d) {
            if ($d == '.' || $d == '..') {}
            else{
                $real = $path.'/'.$d;
                if(is_null($match)){  $result[]=$real;}else{ preg_match( $match , $real)==1 && $result[]=$real;}
            }
        }
        return $result;
    }
    /** 遍历搜索目录
     * @param $path   {String} 搜索路径,必须
     * @param $match  {String} 正则匹配文件路径，默认为Null不进行匹配验证
     * @return Array 文件列表结果
     */
    function scand( $path , $match = Null , $result = array()) {
        $dirs = scandir( $path );
        foreach($dirs as $d) {
            if ($d == '.' || $d == '..') {}
            else{
                $real = $path.'/'.$d;
                if(is_null($match)){  $result[]=$real;}else{ preg_match( $match , $real)==1 && $result[]=$real;}
                if(is_dir($real))  {  $result = $result + $this -> scand( $real,$match, $result ); }
            }
        }
        return $result;
    }

    /** 遍历删除目录
     * @param $dir {String} 删除目录
     * @return Boolean 删除成功返回 true 否则 false
     */
    function deld($dir) {
        $dh=@opendir($dir) ;
        while ($file=@readdir($dh)) {
            if($file!="." && $file!="..") {
                $fullpath=$dir."/".$file;
                if(!is_dir($fullpath)) { unlink($fullpath); } else { $this->deldir($fullpath);}
            }
        }
        @closedir($dh);
        return @rmdir($dir);
    }
    /** 遍历拷贝目录
     * @param $fromdir {String} 从那个目录
     * @param $todir   {String} 拷贝到那个目录
     * @return Boolean 拷贝成功返回 true 否则 false
     */    
    function copyd($fromdir,$todir){
      if (!file_exists($fromdir)){ return false;  }
      if (!eregi('/$',$fromdir)) { $fromdir=$fromdir.'/'; }
      if (!eregi('/$',$todir))   { $todir=$todir.'/';  }
      if (!file_exists($todir))  { @mkdir($todir); }
      $handle=@opendir($fromdir);
      while (($filename = @readdir($handle))!== false)
      {
        if (@filetype($fromdir.$filename)=='dir')
        {
          if ($subnum<32 and $filename!='.' and $filename!='..') { $this->copyd($fromdir.$filename.'/',$todir.$filename.'/',$subnum); }
        }
        else
        {
          @copy($fromdir.$filename,$todir.$filename);
          $mtime=@filemtime($fromdir.$filename);
          @touch($todir.$filename,$mtime);
        }
      }
      @closedir($handle);
      return true;
    }
}