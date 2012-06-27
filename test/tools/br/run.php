<?php
header("Content-type: text/html; charset=utf-8");
header("Cache-Control: no-cache, max-age=10, must-revalidate");
if(!array_key_exists('quirk', $_GET)){
	print '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
};
require_once "case.class.php";
$c = new Kiss('../../../', $_GET['case']);
$title = $c->name;
$cov = array_key_exists('cov', $_GET);
$release = array_key_exists('release', $_GET);
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php print("run case $title");?></title>
<?php $c->print_js($cov, $release); ?>
<link rel="stylesheet" type="text/css" href="../qa/Public/tools/CodeMirror-2.24/lib/codemirror.css">
<link rel="stylesheet" type="text/css" href="../qa/Public/tools/CodeMirror-2.24/theme/blackboard.css">

<script type="text/javascript" src="../qa/Public/tools/CodeMirror-2.24/lib/codemirror.js"></script>
<script src="../qa/Public/tools/CodeMirror-2.24/mode/javascript/javascript.js"></script>
</head>
<body>
<h1 id="qunit-header"><span><a onclick="toggleSource()">切换显示用例源码</a></span><?php print($c->name);?></h1>
<h2 id="qunit-banner"></h2>
<h2 id="qunit-userAgent"></h2>
<div id="source" class="wrap-testing-src"></div>
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

	var testsLayer = document.getElementById("qunit-tests");
	var sourceLayer = document.getElementById("source");

	sourceCode = CodeMirror(sourceLayer, {
		mode: "javascript",
		value: "",
		theme: "blackboard",
		lineNumbers: true,
		readOnly: true
	});

	function toggleSource(){
		if(!toggleSource.view){
			testsLayer.style.display = "none";
			sourceLayer.style.display = "block";
			loadSource();
		}else{
		    testsLayer.style.display = "block";
		    sourceLayer.style.display = "none";
		}
		
		toggleSource.view = ! toggleSource.view;
	}

	function loadSource(){
	    if(loadSource.loaded)return ;
	    loadSource.loaded = true;
	    request("../qa/?a=getSrc&api=<?php print($c->name);?>", function(text){
	        sourceCode.setValue(text);
	    });
	}

	function request(url, callback){
		var xhr = request.xhr;
		if(!request.xhr){
			if(window.XMLHttpRequest){
				xhr = request.xhr = new XMLHttpRequest();
			}else{
				xhr = request.xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		xhr.open("GET", url, true);
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				callback(xhr.responseText);
			}
		};
		xhr.send(null);
	}
</script>
</body>
</html>