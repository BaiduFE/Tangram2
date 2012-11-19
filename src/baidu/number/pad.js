/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.number;



/**
 * @description 对目标数字进行0补齐处理
 * @function 
 * @name baidu.number().pad()
 * @grammar baidu.number(num).pad(len)
 * @param {Number} len 需要输出的长度
 * @return {String} 对目标数字进行0补齐处理后的结果
 */

/**
 * @description 对目标数字进行0补齐处理
 * @function 
 * @name baidu.number.pad
 * @grammar baidu.number.pad(num, len)
 * @param {Number} num 需要处理的数字
 * @param {Number} len 需要输出的长度
 * @return {String} 对目标数字进行0补齐处理后的结果
 */

baidu.number.extend({
    pad : function (length) {
        var source = this;
        var pre = "",
            negative = (source < 0),
            string = String(Math.abs(source));
    
        if (string.length < length) {
            pre = (new Array(length - string.length + 1)).join('0');
        }
    
        return (negative ?  "-" : "") + pre + string;
    }
});
