<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="description" content="baidu.sio().log() 示例" />
		<title>baidu.sio().log()</title>
		<link rel="stylesheet" href="../../demos/public.css" type="text/css" />
		<script type="text/javascript" src="../../demos/tangram2.0-all.js"></script>
		<script type="text/javascript" src="../../demos/public.js"></script>
	</head>
	<body>
		<div class="demo" id="demo">
			<h1 class="ac-h1"><strong>baidu.sio().log()</strong> 示例</h1>
			<p class="ac-des">
				通过请求一个图片的方式令服务器存储一条日志
			</p>
			
			<ul class="ac-ul">
				<li>语法: baidu.sio(url).log()</li>
			</ul>
			
			<div class="pannel">
				<div class="pannel-title">
					<span>通过请求一个图片的方式令服务器存储一条日志</span>
				</div>
				<div class="pannel-content">
					<!--DemoViewStart-->
					<div class="pannel-content-tool">
						<a class="button" id="demo_btn">点击发送log</a>
					</div>
					<div class="pannel-content-part">
						
					</div>
					<div class="pannel-show">
						运行结果：<span id="demo_execute_result"></span>
					</div>
					<!--DemoViewEnd-->
				</div>
			</div>
		</div>
		<script>
			baidu('#demo_btn').on('click',function(e){
				baidu.sio('./request.php').log();
				baidu('#demo_execute_result').html(text);
			});
		</script>
	</body>
</html>