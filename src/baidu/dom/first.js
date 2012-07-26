///import baidu.dom;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 当前集合第一个元素
 *
 * @function
 * @name baidu.dom.first
 * @grammar $DOM.first()
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    first : function () {
        return baidu.dom(this[0]);
    }
});
