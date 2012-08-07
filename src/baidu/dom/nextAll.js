///import baidu.dom;
///import baidu.each;
///import baidu.dom.match;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-11
 * @modify
 */

/**
 * @description 查找当前元素之后所有的同辈元素
 * @function
 * @name baidu.dom().nextAll()
 * @grammar $DOM.nextAll([filter])
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    nextAll : function (selector) {
        var array = [];

        baidu.each(this, function(dom){
            while(dom = dom.nextSibling) {
                dom && (dom.nodeType == 1) && array.push(dom);
            };
        });

        return baidu.dom( baidu.dom.match(array, selector) );
    }
});
