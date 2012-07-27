/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string;

/**
 * 将目标字符串中可能会影响正则表达式构造的字符串进行转义。
 * @name baidu.string.escapeReg
 * @function
 * @grammar baidu.string.escapeReg(source)
 * @param {string} source 目标字符串
 * @remark
 * 给以下字符前加上“\”进行转义：.*+?^=!:${}()|[]/\
 * @meta standard
 *             
 * @return {string} 转义后的字符串
 */
baidu.string.extend({
escapeReg : function () {
    return this.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
}
});
