///import baidu.dom;
///import baidu.dom.each;

/**
 * @fileoverview
 * @name baidu.dom.map
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 *
 * @param
 * @return  {TangramDom}    old TangramDom
 */
baidu.dom.extend({
    map : function (fn) {
        var me = this;

        this.each(function(index){
            me[index] = fn.call(this);
        });
        return me;
    }
});
