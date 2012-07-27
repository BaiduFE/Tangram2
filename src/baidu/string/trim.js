/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string;

/**
 * 删除目标字符串两端的空白字符
 * @name baidu.string.trim
 * @function
 * @grammar baidu.string.trim(source)
 * @param {string} source 目标字符串
 * @remark
 * 不支持删除单侧空白字符
 * @shortcut trim
 * @meta standard
 *             
 * @return {string} 删除两端空白字符后的字符串
 */

(function () {
    var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
    baidu.string.extend({
    trim : function () {
        return this.replace(trimer, "");
    }
    });
})();

// 声明快捷方法
baidu.trim = baidu.string.trim;
