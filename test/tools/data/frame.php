<?php header("Content-type: text/html; charset=utf-8");
?>
<html>
<head>
<style type="text/css">
* {
	margin: 0;
	padding: 0;
}
</style>
<script type="text/javascript" src="../br/js/jquery-1.7.2.js"></script>
<?php
$release = preg_match('/release=true/i', $_SERVER['QUERY_STRING']);
$compatible = preg_match('/compatible=true/i', $_SERVER['QUERY_STRING']);
$download = preg_match('/download=/i', $_SERVER['QUERY_STRING']);
if($release == 0 && $download == 0 && array_key_exists('f', $_GET))
print "<script type='text/javascript' src='../br/import.php?f={$_GET['f']}'></script>";
else{
	if($download == 0){
		if($compatible == 0)
			$file_name = "tangram_base";
		else
			$file_name = "tangram_compatible";
		print "<script type='text/javascript' src='../../../release/$file_name.js'></script>";
	}
}
if($download !=0 ){
	print '<script type="text/javascript" src="../br/js/download_check.js"></script>'."\n";
}
?>
<script type="text/javascript">
	parent && parent.ua.onload && parent.ua.onload(window);
</script>
</head>
<body>
</body>
<script>
</script>
</html>
