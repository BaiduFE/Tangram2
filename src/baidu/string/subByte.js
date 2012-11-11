/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string.getByteLength;

/**
 * @description 对目标字符串按gbk编码截取字节长度
 * @function 
 * @name baidu.string().subByte()
 * @grammar baidu.string(str).subByte(len[, tail])
 * @param {Number} len 需要截取的字节长度
 * @param {String} tail [可选]追加字符串
 * @return {String} 字符串截取结果
 */

/**
 * @description 对目标字符串按gbk编码截取字节长度
 * @function 
 * @name baidu.string.subByte
 * @grammar baidu.string.subByte(str, len[, tail])
 * @param {String} str 目标字符串
 * @param {Number} len 需要截取的字节长度
 * @param {String} tail [可选]追加字符串
 * @return {String} 字符串截取结果
 */
baidu.string.extend({
    subByte : function (len, tail) {
        baidu.check('number(,string)?$', 'baidu.string.subByte');

        if(len < 0 || this.getByteLength() <= len){
            return this.valueOf()/* + tail*/; // 20121109 mz 去掉tail
        }
        //thanks 加宽提供优化方法
        var source = this.substr(0, len)
            .replace(/([^\x00-\xff])/g,"\x241 ")//双字节字符替换成两个
            .substr(0, len)//截取长度
            .replace(/[^\x00-\xff]$/,"")//去掉临界双字节字符
            .replace(/([^\x00-\xff]) /g,"\x241");//还原
        return source + (tail || "");
    }
});
