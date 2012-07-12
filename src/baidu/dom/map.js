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
    map : function (iterator) {
        var me = this,
            td = baidu.dom();

        baidu.each(this, function( dom, index ){
            td[td.length ++] = iterator.call( dom, index, dom, this );
        });

        return td;
    }
});
