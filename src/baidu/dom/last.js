///import baidu.dom;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 当前集合最后一个对象
 *
 * @function
 * @name baidu.dom().last()
 * @grammar $DOM.last()
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    last : function () {
        return baidu.dom(this.get(-1));
    }
});
