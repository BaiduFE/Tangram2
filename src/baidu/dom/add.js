///import baidu.dom;
///import baidu.merge;
///import baidu.type;
///import baidu.array.unique;
///import baidu.query;

/**
 * @fileoverview
 * @name baidu.dom.add
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * 给当前TangramDom对象添加新的DOM元素
 * @grammer TangramDom.add(selector)
 * @param   {String}    selector    CSS选择器
 * @return  {TangramDom}    new TangramDom
 */
/**
 * 给当前TangramDom对象添加新的DOM元素
 * @grammer TangramDom.add(HTMLElement)
 * @param   {HTMLElement}    HTMLElement    DOM对象
 * @return  {TangramDom}    new TangramDom
 */
/**
 * 给当前TangramDom对象添加新的DOM元素
 * @grammer TangramDom.add(HTMLString)
 * @param   {String}    HTMLString    HTML文本
 * @return  {TangramDom}    new TangramDom
 */
/**
 * 给当前TangramDom对象添加新的DOM元素
 * @grammer TangramDom.add(TangramDom)
 * @param   {TangramDom}    TangramDom
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    add : function (object, context) {
        var a = this.get();

        switch (baidu.type(object)) {
            case "HTMLElement" :
                a.push(object);
                break;

            case "$DOM" :
            case "array" :
                baidu.merge(a, object)
                break;

            // HTMLString or selector
            case "string" :
                baidu.merge(a, baidu.query(object, context));
                break;
            // [TODO] case "NodeList" :
            default :
                if (typeof object == "object" && object.length) {
                    baidu.merge(a, object)
                }
        }
        return baidu.dom(baidu.array(a).unique());
    }
});

// meizz 20120601 add方法可以完全使用 baidu.merge(this, baidu.dom(object, context)) 这一句代码完成所有功能，但为节约内存和提高效率的原因，将几个常用分支单独处理了
