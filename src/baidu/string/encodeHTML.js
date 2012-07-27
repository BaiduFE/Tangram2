/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string;

/**
 * 对目标字符串进行html编码
 * @name baidu.string.encodeHTML
 * @function
 * @grammar baidu.string.encodeHTML(source)
 * @param {string} source 目标字符串
 * @remark
 * 编码字符有5个：&<>"'
 * @shortcut encodeHTML
 * @meta standard
 * @see baidu.string.decodeHTML
 *             
 * @return {string} html编码后的字符串
 */
baidu.string.extend({
encodeHTML : function () {
    return this.replace(/&/g,'&amp;')
                .replace(/</g,'&lt;')
                .replace(/>/g,'&gt;')
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
}

});

baidu.encodeHTML = baidu.string.encodeHTML;