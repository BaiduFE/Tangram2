/// import baidu.dom;

/**
 * @fileoverview
 * @name baidu.dom.first
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 *
 * @param
 * @return
 */
baidu.dom.extend({
    first : function () {
        return baidu.dom(this[0]);
    }
});
