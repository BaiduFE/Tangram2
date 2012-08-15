<?php
	date_default_timezone_set(PRC);
	$i = 1;
	echo '<h2>'.date('Y-m-d H:i:s').'</h2>';
	echo '<p>['.$_REQUEST['author'].']['.$_REQUEST['gender'].'] '.$_REQUEST['message']
?>