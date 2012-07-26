/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */


///import baidu.string;

/**
 * @description 去掉字符串中的html标签
 * @function 
 * @name baidu.string().stripTags()
 * @grammar baidu.string(str).stripTags()
 * @return {String} 去掉html标签后的字符串
 */
/**
 * @description 去掉字符串中的html标签
 * @function 
 * @name baidu.string.stripTags
 * @grammar baidu.string.stripTags(str)
 * @param {String} str 目标字符串
 * @return {String} 去掉html标签后的字符串
 */

baidu.string.extend({
    stripTags : function() {
        return (this || '').replace(/<[^>]+>/g, '');
    }
}); 
