void function(global, tree){

	Array.prototype.filter = function(fn, context) {
		var result = [ ], val;
		for (var i = 0, len = this.length >>> 0; i < len; i++) {
			if (i in this) {
				val = this[i]; // in case fn mutates this
				if (fn.call(context, val, i, this)) {
					result.push(val);
				}
			}
		}
		return result;
	};

	var frame = document.getElementById("test-frame");
	var curApi = 0;
	var flagedMapping = {};
	var treeData, autoRunTask, autoRunning = false;
	var stopOnError = true;
	
	var icons = {
		norm: "images/tree/etfile.gif",
		succ: "images/tree/etfile-succ.gif",
		fail: "images/tree/etfile-fail.gif"
	};

	var runTest = function(id){
	    var api;
	    curApi = id;
	    api = tree.dataMapping[id].api;
	    frame.setAttribute("src", "../br/run.php?case=" + api);
	};

	var autoNext = function(){
	    var id;
	    if(id = autoRunTask.shift())
	        id = id.id,
	        tree.focusToKey(id),
	        runTest(id);
	    else
	        autoRunning = false;
	}

	global.autoRunStart = function(){
		button("enable", "stop");
		button("disable", "autoRun");
		button("disable", "clear");
		clearStatus();
		autoRunning = true;
	    autoRunTask = treeData.slice(0).filter(function(item){
	        return item.nodeType == "normal";
	    });
	    autoNext();
	};

	global.autoRunStop = function(){
		button("disable", "stop");
		button("enable", "autoRun");
		button("enable", "clear");
		autoRunning = false;
	};

	global.changeStopOnError = function(value){
	    stopOnError = value;
	};

	global.clearStatus = function(){
		for(var id in flagedMapping){
		    if(flagedMapping.hasOwnProperty(id)){
		        tree.setNodeIcon(id, icons.norm);
		        delete flagedMapping[id];
		    }
		}
	};

	global.dataCallBack = function(arr){
		tree = new tree({
			container: "test-tree",
			data: treeData = arr,
			enableCheckBox: false,
			clickHandler: function(conf){
			    if(conf.nodeType == "normal")
			        runTest(conf.id);
			},
			nameRenderer: function(name, data){ 
				return data.nodeType == "normal" ? name + ".js" : name;
			}
		});
		tree.render();
	};

	global.testDoneCallBack = function(data){
		if(data.failed == 0){
			tree.setNodeIcon(curApi, icons.succ);
		}else{
		    tree.setNodeIcon(curApi, icons.fail);
		}

		flagedMapping[curApi] = 1;

		if(autoRunning){
			if(stopOnError){
			    if(data.failed == 0){
			        autoNext();
			    }else{
			        autoRunning = false;
			    }
			}else{
			 	autoNext();   
			}
		}
	};

	global.button = function(fst, sec, thd){
		var el;
	    if(typeof fst == "function"){
	    	el = sec.parentNode;
	    	if(!/ disabled/.test(el.className)){
	    	    fst();
	    	}
	    }else if(fst === "disable"){
	    	el = document.getElementById(sec + "Button");
	    	el.className = el.className.replace(/( disabled)|$/, " disabled");
	    }else if(fst === "enable"){
	    	el = document.getElementById(sec + "Button");
	    	el.className = el.className.replace(/( disabled)|$/, "");
	    }
	};

}(this, tree);