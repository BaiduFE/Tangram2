/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */


///import baidu.string;
///import baidu.merge;

/**
 * @description 对目标字符串进行格式化
 * @function 
 * @name baidu.string().format()
 * @grammar baidu.string(str).format(options)
 * @param {String|Object} options 提供相应数据的对象或多个字符串，参数为object时，替换目标字符串中的#{property name}部分；参数为String时，替换目标字符串中的#{0}、#{1}...部分
 * @return {String} 格式化后的字符串
 */

/**
 * @description 对目标字符串进行格式化
 * @function 
 * @name baidu.string.format
 * @grammar baidu.string.format(str, options)
 * @param {String} str 目标字符串
 * @param {String|Object} options 提供相应数据的对象或多个字符串，参数为object时，替换目标字符串中的#{property name}部分；参数为String时，替换目标字符串中的#{0}、#{1}...部分
 * @return {String} 格式化后的字符串
 */


//format(a,a,d,f,c,d,g,c);
baidu.string.extend({
    format : function (opts) {
    	var source = this.valueOf(),
            data = Array.prototype.slice.call(arguments,0), toString = Object.prototype.toString;
        if(data.length){
    	    data = data.length == 1 ? 
    	    	/* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
    	    	(opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
    	    	: data;
        	return source.replace(/#\{(.+?)\}/g, function (match, key){
    	    	var replacer = data[key];
    	    	// chrome 下 typeof /a/ == 'function'
    	    	if('[object Function]' == toString.call(replacer)){
    	    		replacer = replacer(key);
    	    	}
    	    	return ('undefined' == typeof replacer ? '' : replacer);
        	});
        }
        return source;
    }
});


// 声明快捷方法
baidu.format = baidu.string.format;
