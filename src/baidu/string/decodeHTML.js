/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string;

/**
 * @description 对目标字符串进行html解码
 * @function 
 * @name baidu.string().decodeHTML()
 * @grammar baidu.string(str).decodeHTML()
 * @return {String} html解码后的字符串
 */

/**
 * @description 对目标字符串进行html解码
 * @function 
 * @name baidu.string.decodeHTML
 * @grammar baidu.string.decodeHTML(str)
 * @param {String} str 目标字符串
 * @return {String} html解码后的字符串
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