(function(){
	var h = setInterval(function(){
		if(top.apicontent){
			$("body").append("<div></div>");
			$("body").append('<script type="text/javascript">' + top.apicontent + '<\/script>');
			clearInterval(h);
			if(top.flag == false){
				download_test();
				top.flag = true;
			}
		}
	}, 10);
})();

function download_test(){
	var download_type = location.search.match(/download=[0-9]/)[0].split("=")[1];
	if(download_type == "1"){
		var t = setInterval(function(){
			if(typeof baidu != "undefined"){
				clearInterval(t);
				if(baidu.check.toString().length < 20){
					top.$("#download_report div.correct").append("<p>baidu.check is not included.</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>baidu.check is not included.</p>");
				}
			}
		}, 10);
	}
}