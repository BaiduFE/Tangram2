/**
 * @author dron
 */

///import baidu.dom.on;

baidu.dom.extend({
	delegate: function(selector, type, data, fn){
        if(typeof data == "function"){
            fn = data;
            data = null;
        }
    	return this.on(type, selector, data, fn);
	}
});