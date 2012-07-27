/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string;

/**
 * 对目标字符串进行html解码
 * @name baidu.string.decodeHTML
 * @function
 * @grammar baidu.string.decodeHTML(source)
 * @param {string} source 目标字符串
 * @shortcut decodeHTML
 * @meta standard
 * @see baidu.string.encodeHTML
 *             
 * @return {string} html解码后的字符串
 */

baidu.string.extend({
decodeHTML : function () {
    var str = this
                .replace(/&quot;/g,'"')
                .replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
                .replace(/&amp;/g, "&");
    //处理转义的中文和实体字符
    return str.replace(/&#([\d]+);/g, function(_0, _1){
        return String.fromCharCode(parseInt(_1, 10));
    });
}
});

baidu.decodeHTML = baidu.string.decodeHTML;
