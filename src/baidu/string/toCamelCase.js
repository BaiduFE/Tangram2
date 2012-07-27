/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string;

/**
 * 将目标字符串进行驼峰化处理
 * @name baidu.string.toCamelCase
 * @function
 * @grammar baidu.string.toCamelCase(source)
 * @param {string} source 目标字符串
 * @remark
 * 支持单词以“-_”分隔
 * @meta standard
 *             
 * @return {string} 驼峰化处理后的字符串
 */
 
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
