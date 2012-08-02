/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */


///import baidu.string;

/**
 * 去掉字符串中的html标签
 * @function
 * @grammar baidu.string.stripTags(source)
 * @param {string} source 要处理的字符串.
 * @return {String}
 */

baidu.string.extend({
stripTags : function() {
    return (this || '').replace(/<[^>]+>/g, '');
}
}); 
