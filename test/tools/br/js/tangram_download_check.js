 (function(){
 	var parentwin = window.parent;
	window.onmessage=function(e){
	 	var h = setInterval(function(){
	 		if(baidu("#customdownload_content input.parent").length > 0){
	 			clearInterval(h);
	 			var url,data ={},resp;
			 	baidu("#customdownload_form")[0].onsubmit = function(){
			 		url = this.action;
			 		var els = this.elements;
			 		for(var i=0;i<els.length;i++){
			 			if(els[i].name){
			 				data[els[i].name]=els[i].value;
			 			}
			 		}
			 		return false;
			 	};

		 		if(e.data == "1"){
					baidu("#customdownload_content input.parent").click();
		 			baidu("#codebtn").click();
		 	 	}

		 		if(e.data == "2"){
		 			baidu("#customdownload_content input.parent").click();
					baidu("#tangram").click();
					baidu("#codebtn").click();
		 		}

		 		if(e.data == "3"){
		 			baidu("#customdownload_content input.parent").click();
					baidu("#tangramAll").click();
					baidu("#codebtn").click();
		 		 }

		 		 if(e.data == "4"){
		 			baidu("#customdownload_content input.parent").click();
					baidu("#comMagic").click();
					baidu("#codebtn").click();
		 		 }

				if(e.data == "5"){
					baidu(baidu("#customdownload_content input.child")[0]).click();
					baidu("#sizzle").click();
					baidu("#compress").click();
					baidu("#check").click();
					baidu("#zh-CN").click();
					baidu("#en-US").click();
					baidu("#codebtn").click();
				}

				if(e.data != "apiCount"){
					baidu.ajax({
						url: url,
						type: "post",
						data: data,
						dataType: "text",
						success: function(resp){
							parentwin.postMessage([resp, data.api.split(",").length], "*");
						}
					});
				}

				if(e.data == "apiCount"){
					baidu.ajax({
						url: window.location.href.split("download")[0] + "?m=frontData&a=apiMap",
						success: function(resp){
							var a = 0; 
							for(var i in resp)
								a += 1;
							parentwin.postMessage(a, "*");
						}
					});
				}
			}
		}, 20);
 	}
 })();