/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string;

/**
 * @description 将目标字符串中可能会影响正则表达式构造的字符串进行转义
 * @function 
 * @name baidu.string().escapeReg()
 * @grammar baidu.string(str).escapeReg()
 * @return {String} 转义后的字符串
 */

/**
 * @description 将目标字符串中可能会影响正则表达式构造的字符串进行转义
 * @function 
 * @name baidu.string.escapeReg
 * @grammar baidu.string.escapeReg(str)
 * @param {String} str 目标字符串
 * @return {String} 转义后的字符串
 */

baidu.string.extend({
    escapeReg : function () {
        return this.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
    }
});
