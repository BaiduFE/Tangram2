///import baidu.each;
///import baidu.dom.match;
///import baidu.array.unique;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-12
 * @modify
 */

/**
 * @description 从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素
 *
 * @function
 * @name baidu.dom().closest()
 * @grammar $DOM.closest(selector)
 * @param   {Object}            selector    选择器
 * @param   {HTMLElement}       context     选择器适用范围
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    closest : function (selector, context) {
        var results = baidu.array();

        baidu.each ( this, function(dom) {
            var t = [dom];
            while ( dom = dom.parentNode ) {
                dom.nodeType && t.push( dom );
            }
            t = baidu.dom.match( t, selector, context );

            t.length && results.push(t[0]);
        });
        
        return baidu.dom( results.unique() );
    }
});
