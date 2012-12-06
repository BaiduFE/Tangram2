<?php
ini_set("error_reporting", E_ALL ^ E_NOTICE);
header("Content-type: text/html; charset=utf-8");
header("Cache-Control: no-cache, max-age=10, must-revalidate");
if(!array_key_exists('quirk', $_GET)){
    print '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
};
require_once "case.class.php";
$c = new Kiss('../../../', $_GET['case']);
if($c->fileunexist){
    echo '该接口无用例<script type="text/javascript">if(parent && parent.testDoneCallBack){parent.testDoneCallBack({});}</script>';
    return;
}
$title = $c->name;
$cov = array_key_exists('cov', $_GET);
$release = array_key_exists('release', $_GET);
$compatible = array_key_exists('compatible', $_GET);
$download = array_key_exists('download', $_GET);
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php print("run case $title");?></title>
<?php $c->print_js($cov, $release, $compatible, $download); ?>

</head>
<body>
<h1 id="qunit-header"><span><a href="<?php echo 'http://'.$_SERVER['SERVER_NAME'].$_SERVER["REQUEST_URI"];?>" target="_blank">新窗口打开</a></span><?php print($c->name);?></h1>
<h2 id="qunit-banner"></h2>
<h2 id="qunit-userAgent"></h2>
<ol id="qunit-tests"></ol>

<script type="text/javascript">
    void function(){
        var p, f, s = 0;
        if( ( p = window.parent ) && ( f = p.document.getElementById("test-frame") ) )
            setInterval(function(){
                if(s != document.documentElement.scrollHeight){
                    s = document.documentElement.scrollHeight;
                    f.style.height = s + "px";   
                }
            }, 100);
    }();
</script>
</body>
</html>