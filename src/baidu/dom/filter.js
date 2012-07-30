///import baidu.dom;
///import baidu.dom.match;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 对 TangramDom 里的所有元素进行筛选
 * @function
 * @name baidu.dom.filter
 * @grammer TangramDom.filter(selector|tangramDom|HTMLElement|fn)
 * @param   {String}        selector    CSS选择器
 * @return  {TangramDom}    new TangramDom
 */
/**
 * @description 对 TangramDom 里的所有元素进行筛选
 * @function
 * @name baidu.dom.filter
 * @grammer TangramDom.filter(selector|tangramDom|HTMLElement|fn)
 * @param   {TangramDom}    tangramDom 对象
 * @return  {TangramDom}    new TangramDom
 */
/**
 * @description 对 TangramDom 里的所有元素进行筛选
 * @function
 * @name baidu.dom.filter
 * @grammer TangramDom.filter(selector|tangramDom|HTMLElement|fn)
 * @param   {Function}      筛选的指定方法
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    filter : function (selector) {
        return baidu.dom(baidu.dom.match(this, selector));
    }
});
