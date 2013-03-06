javascript:(function(){
	var simpletree = baidu('.simpletree'),
	    nodeList = baidu('a',simpletree[0]),
		clickedList = [],
		result = [],
		stack = [],
		titlediv = baidu('#api-content')[0];

	stack.push({'list':nodeList,'cur':0});

	function isClicked(node){
		for(i=0;i<clickedList.length && clickedList[i]!=node;i++);
		return !(i==clickedList.length);  
	}

	function clickMock(){
		var stacklen = stack.length;
		if ( stacklen <= 0){
			outputResult();
			return;
		}

		var curObj = stack[stacklen-1];
		if(curObj&&curObj.cur >= curObj.list.length){
			stack.pop();
			clickMock();
		} else {
			selector = 	curObj.list[curObj.cur];
			curObj.cur = curObj.cur +1;

			if (!isClicked(selector.id)){				
				clickedList.push(selector.id);
				try {					
					selector.click();
					checkdiv(selector);
				} catch (e){
					alert("an error was raised !");
				}
			} else {
				clickMock();
			}
		}
	}

	function isIE6()
	{
		var isIE = !!window.ActiveXObject;  
		var isIE6 = isIE && !window.XMLHttpRequest;
		return isIE6
	}

	function checkdiv(selector){
		 var txt=titlediv.innerHTML;
		 var times = 0,maxLoop = isIE6()?400:200;
		 var timer=setInterval(function(){
		 	times++;
		 	if(titlediv.innerHTML!=txt || times>maxLoop) {
		 		clearInterval(timer);
		 		times = 0;
		 		docheck(selector);
		 	}
		 },50)
	}

    function outputResult(){
		var retstr = "";
		for(m=0,n=result.length;m<n;m++){
			retstr = retstr + result[m].url + '<br/>';
		}			
		retstr = retstr||"No error was found.";
		genIframe(retstr);
    }

	function genIframe(retxt){
		var div = document.getElementById("geqa_iframe01")
		if (!div){
			div=document.createElement("div");			
			div.id= "geqa_iframe01";
			div.style.width="100%"; 
			div.style.height="200px"; 
			div.style.position = "absolute";
			document.body.appendChild(div);
		}
		
		var s = '<iframe src="javascript:document.open();document.write(\'<div>'+retxt+'</div>\');document.close();" width="100%" height="100%"></iframe>'; 
		div.innerHTML = s;
	}

	function docheck(selector){
		selector = baidu(selector);
		var nodetext = selector.text().trim();
		var apititle = baidu('h2',titlediv)[0].firstChild.nodeValue.trim();
		
		if (nodetext!=apititle&&apititle.substr(apititle.lastIndexOf('.')+1)!=nodetext)
		{
			result[result.length] = {url: window.location.href,"left":nodetext,"right":apititle};
		}

		var dropdownlayer = selector.parent().siblings('.dropdownlayer');
		if (dropdownlayer&&dropdownlayer.length>0)
		{
			var nodelist = baidu('a',dropdownlayer[0]);
			if (nodelist&&nodelist.length>0){
				stack.push({'list':nodelist,'cur':0});
			}
		}
		clickMock();
	}
	clickMock();
})();