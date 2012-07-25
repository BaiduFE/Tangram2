/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string.getByteLength;

/**
 * 对目标字符串按gbk编码截取字节长度
 * @name baidu.string.subByte
 * @function
 * @grammar baidu.string.subByte(source, length)
 * @param {string} source 目标字符串
 * @param {number} length 需要截取的字节长度
 * @param {string} [tail] 追加字符串,可选.
 * @remark
 * 截取过程中，遇到半个汉字时，向下取整。
 * @see baidu.string.getByteLength
 *             
 * @returns {string} 字符串截取结果
 */
baidu.string.extend({
    subByte : function (len, tail) {
        var source = this.valueOf();
        tail = tail || '';
        if(len < 0 || baidu.string(source).getByteLength() <= len){
            return source + tail;
        }
        //thanks 加宽提供优化方法
        source = source.substr(0, len).replace(/([^\x00-\xff])/g,"\x241 ")//双字节字符替换成两个
            .substr(0, len)//截取长度
            .replace(/[^\x00-\xff]$/,"")//去掉临界双字节字符
            .replace(/([^\x00-\xff]) /g,"\x241");//还原
        return source + tail;
    }
});
