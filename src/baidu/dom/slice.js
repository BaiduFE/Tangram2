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
        var all = this.get();

        start < 0 && (start = all.length + start);
        end && end < 0 && (end = all.length + end);

        return baidu.dom(all.slice(start, end));
    }
});
