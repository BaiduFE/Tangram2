/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string;

/**
 * @description 将目标字符串进行驼峰化处理
 * @function 
 * @name baidu.string().toCamelCase()
 * @grammar baidu.string(str).toCamelCase()
 * @return {String} 驼峰化处理后的字符串
 */

/**
 * @description 将目标字符串进行驼峰化处理
 * @function 
 * @name baidu.string.toCamelCase
 * @grammar baidu.string.toCamelCase(str)
 * @param {String} str 目标字符串
 * @return {String} 驼峰化处理后的字符串
 */

 //支持单词以“-_”分隔
 //todo:考虑以后去掉下划线支持？
baidu.string.extend({
    toCamelCase : function () {
    	var source = this.valueOf();
        //提前判断，提高getStyle等的效率 thanks xianwei
        if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
            return source;
        }
        return source.replace(/[-_][^-_]/g, function (match) {
            return match.charAt(1).toUpperCase();
        });
    }
});
