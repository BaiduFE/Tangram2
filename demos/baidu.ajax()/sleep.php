<?php	
	$time = $_REQUEST['time'] + 0;
	if($time > 10){
		echo '啊哦，时间太长，服务器hold不住哦！';
	}else{
		sleep($time);

		date_default_timezone_set(PRC);
		echo '响应时间：'.date("Y-m-d G:i:s");
	}
?>