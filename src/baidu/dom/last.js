/// import baidu.dom;

/**
 * @fileoverview
 * @name baidu.dom.last
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
    last : function () {
        return baidu.dom(this.get(-1));
    }
});
