/// import baidu.dom;

/**
 * @fileoverview
 * @name baidu.dom.eq
 * @author meizz
 * @create 2012-06-06
 * @modify
 */

/**
 * 获取 TangramDom 里的第 N 个元素，返回新的 TangramDom
 * 可以传入负整数，反向取
 * @param   {Number}        index|-index    指定的元素下标
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    eq : function (index) {
        return baidu.dom(this.get(index));
    }
});
