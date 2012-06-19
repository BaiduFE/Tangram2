///import baidu.dom;
///import baidu.each;

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
        var me = this,
            td = baidu.dom();

        baidu.each(this, function(dom){
            td[td.length ++] = fn.call(dom);
        });

        return td;
    }
});
