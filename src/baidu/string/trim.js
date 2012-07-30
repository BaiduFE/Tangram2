/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string;

/**
 * @description 删除目标字符串两端的空白字符
 * @function 
 * @name baidu.string().trim()
 * @grammar baidu.string(str).trim()
 * @return {String} 删除两端空白字符后的字符串
 */

/**
 * @description 删除目标字符串两端的空白字符
 * @function 
 * @name baidu.string.trim
 * @grammar baidu.string.trim(str)
 * @param {String} str 目标字符串
 * @return {String} 删除两端空白字符后的字符串
 */

baidu.string.extend({
    trim: function(){
        var trimer = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g');
        return function(){
            return this.replace(trimer, '');
        }
    }()
});


// 声明快捷方法
baidu.trim = baidu.string.trim;
