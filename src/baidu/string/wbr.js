/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.string;

/**
 * @description 为目标字符串添加wbr软换行
 * @function 
 * @name baidu.string().wbr()
 * @grammar baidu.string(str).wbr()
 * @return {String} 添加软换行后的字符串
 */

/**
 * @description 为目标字符串添加wbr软换行
 * @function 
 * @name baidu.string.wbr
 * @grammar baidu.string.wbr(str)
 * @param {String} str 目标字符串
 * @return {String} 添加软换行后的字符串
 */

/*
1.支持html标签、属性以及字符实体。<br>
2.任意字符中间都会插入wbr标签，对于过长的文本，会造成dom节点元素增多，占用浏览器资源。
3.在opera下，浏览器默认css不会为wbr加上样式，导致没有换行效果，可以在css中加上 wbr:after { content: "\00200B" } 解决此问题
*/
baidu.string.extend({
    wbr : function () {
        return this.replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, '$&<wbr>')
            .replace(/><wbr>/g, '>');
    }
});
