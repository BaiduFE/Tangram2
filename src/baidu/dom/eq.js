///import baidu.dom;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-06
 * @modify
 */

/**
 * @description 获取TangramDom里的第N个元素，返回新的TangramDom，可以传入负整数，反向取
 * @function
 * @name baidu.dom().eq()
 * @grammar $DOM.eq(index)
 * @param   {Number}        index|-index    指定的元素下标
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    eq : function (index) {
        baidu.paramCheck("number","baidu.dom.eq");
        return baidu.dom(this.get(index));
    }
});
