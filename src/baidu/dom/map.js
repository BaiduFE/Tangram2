///import baidu.dom;
///import baidu.each;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素之前所有的同辈元素，直到遇到匹配的那个元素为止
 *
 * @function
 * @name baidu.dom().map()
 * @grammar $DOM.map(iterator)
 * @param   {Function}            iterator    遍历函数
 * @return  {TangramDom}        old TangramDom
 */
baidu.dom.extend({
    map : function (iterator) {
        baidu.paramCheck("function","baidu.dom.map");
        var me = this,
            td = baidu.dom();

        baidu.each(this, function( dom, index ){
            td[td.length ++] = iterator.call( dom, index, dom, this );
        });

        return td;
    }
});
