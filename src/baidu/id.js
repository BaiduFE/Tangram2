///import baidu;
/**
 * @fileoverview
 * @name baidu.id
 * @author dron
 * @create 2012-06-13
 */

baidu.id = function(){
	var id = function(){
		return id.num = ++ id.num || 1;
	};
	var key = "Tangram" + Math.random().toString().slice(2);
	return function(dom){
	    if(dom && dom[key]){ // baidu.id(dom): returns dom.tangramId
	        return dom[key];
	    }else if(dom){ // if dom has no property 'tangramId', build one
	    	return dom[key] = id();
	    }else{ // baidu.id(): returns a new id
	    	return id();
	    }
	}
}();