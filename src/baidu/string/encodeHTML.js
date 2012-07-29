/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string;

/**
 * @description 对目标字符串进行html编码
 * @function 
 * @name baidu.string().encodeHTML()
 * @grammar baidu.string(str).encodeHTML()
 * @return {String} html编码后的字符串
 */

/**
 * @description 对目标字符串进行html编码
 * @function 
 * @name baidu.string.encodeHTML
 * @grammar baidu.string.encodeHTML(str)
 * @param {String} str 目标字符串
 * @return {String} html编码后的字符串
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