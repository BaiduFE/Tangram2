<?php
function sendmail($body, $debug = false){
	include('Mail.php');
	$headers['From']    = 'xxxx@baidu.com';
	$headers['To']      = 'xxxx <xxxx@baidu.com>';
	$headers['Subject'] = '批量运行结果——tangram ui';
	$params['host'] = 'hotswap-c.baidu.com';//email.baidu.com';
	$headers['Content-type'] = "text/html;charset=utf-8";//设置邮件内容为html格式
	$params['auth'] = false;
	$params['debug'] = false;
	// Create the mail object using the Mail::factory method
	$mail_object =& Mail::factory('smtp', $params);
	$result = $mail_object->send($headers['To'], $headers, $body);
}
?>