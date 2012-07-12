///import baidu.dom;

/**
 * @fileoverview
 * @name baidu.dom.slice
 * @author meizz
 * @create 2012-06-01
 * @modify
 */

/**
 *
 * @param
 * @return
 */
baidu.dom.extend({
    slice : function (start, end) {
        return baidu.dom( this.toArray().slice(start, end) );
    }
});
