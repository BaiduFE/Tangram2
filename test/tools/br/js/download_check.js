(function(){
	var h = setInterval(function(){
		if(top.apicontent && top.count1 && top.count2){
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
	var t = setInterval(function(){
		if(typeof baidu != "undefined"){
			clearInterval(t);
			
			var tip;
			if(download_type == "1")
				tip = '左侧所有API：';
			if(download_type == "2")
				tip = '左侧所有API + 右侧"兼容相关1.*接口"：';
			if(download_type == "3")
				tip = '左侧所有API + 右侧"包含所有1.*接口"：';
			if(download_type == "4")
				tip = '左侧所有API + 右侧"兼容Magic"：';
			if(download_type == "5")
				tip = '左侧"核心" + 右侧" 完整版 Sizzle 选择器" + "YUICompress" + "参数检查" + "语言包"：';
			
			top.$("#download_tip").append("<p>" + tip + "</p>");
			
			//右侧其他选项
			if(download_type == "1" || download_type == "2" || download_type == "3" || download_type == "4"){
				if(baidu.check.toString().length < 20){
					top.$("#download_report div.correct").append("<p>baidu.check is not included.</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>baidu.check is included.</p>");
				}
				
				if(top.apicontent.length > 200000){
					top.$("#download_report div.correct").append("<p>The code is not compressed.</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>The code is not compressed.</p>");
				}
				
			}
			
			if(download_type == "1" || download_type == "2" ||download_type == "4"){
				if(baidu.sizzle == undefined){
					top.$("#download_report div.correct").append("<p>baidu.sizzle is not included.</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>baidu.sizzle is included.</p>");
				}
			}
			
			if(download_type == "1" || download_type == "2"){
				if(baidu.i18n == undefined){
					top.$("#download_report div.correct").append("<p>The language package is not included.</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>The language package is included.</p>");
				}
			}
			
			if(download_type == "4"){
				if(baidu.i18n.cultures["zh-CN"] != undefined && baidu.i18n.cultures["en-US"] == undefined){
					top.$("#download_report div.correct").append("<p>The zh-CN language package is included, the en-US language package is not included.</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>The zh-CN language package is not included or the en-US language package is included.</p>");
				}
			}
			
			if(download_type == "5"){
				if(baidu.check.toString().length > 20){
					top.$("#download_report div.correct").append("<p>baidu.check is included.</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>baidu.check is not included.</p>");
				}
				
				if(baidu.sizzle != undefined){
					top.$("#download_report div.correct").append("<p>baidu.sizzle is included.</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>baidu.sizzle is not included.</p>");
				}
				
				if(top.apicontent.length < 50000){
					top.$("#download_report div.correct").append("<p>The code is compressed.</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>The code is not compressed.</p>");
				}
				
				if(baidu.i18n.cultures["zh-CN"] != undefined && baidu.i18n.cultures["en-US"] != undefined){
					top.$("#download_report div.correct").append("<p>The language package is included.</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>The language package is not included.</p>");
				}
			}
			
			if(download_type == "1"){
				if(top.apicontent.indexOf("/// Tangram 1.x Code Start") == -1){
					top.$("#download_report div.correct").append("<p>1.x code is not included</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>1.x code is included</p>");
				}
				
				if(top.apicontent.indexOf("/// support - magic Tangram 1.x Code Start") == -1){
					top.$("#download_report div.correct").append("<p>support-magic code is not included</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>support-magic code is included</p>");
				}
				
				if(top.count2 - top.count1 - 1 == 0){
					top.$("#download_report div.correct").append("<p>The apis are same as apiMap.</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>The apis are not same as apiMap." + top.count1 + " " + top.count2 + "</p>");
				}
			}
			
			if(download_type == "2"){
				if(baidu.url == undefined){
					top.$("#download_report div.correct").append("<p>1.x code(all) is not included</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>1.x code(all) is included</p>");
				}
				
				if(baidu.dom.getAttr == undefined){
					top.$("#download_report div.correct").append("<p>support-magic code is not included</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>support-magic code is included</p>");
				}
			}
			
			if(download_type == "4"){
				if(baidu.url == undefined){
					top.$("#download_report div.correct").append("<p>1.x code(all) is not included</p>");
				}
				else{
					top.$("#download_report div.wrong").append("<p>1.x code(all) is included</p>");
				}
			}
		}
	}, 10);
	
}