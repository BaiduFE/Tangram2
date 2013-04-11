///import baidu.dom;
///import baidu.dom.pushStack;
///import baidu.forEach;

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
 * @grammar baidu.dom(args).map(iterator)
 * @param   {Function}            iterator    遍历函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象        old TangramDom
 */
baidu.dom.extend({
    map : function (iterator) {
        baidu.check("function","baidu.dom.map");
        var ret = [],
            i = 0;

        baidu.forEach(this, function( dom, index ){
            ret[ i++ ] = iterator.call( dom, index, dom, dom );
        });

        return this.pushStack( ret );
    }
});
