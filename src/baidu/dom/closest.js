/// import baidu.dom;
/// import baidu.dom.is;

/**
 * @fileoverview
 * @name baidu.dom.closest
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * 从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素
 * @param
 * @return
 */
baidu.dom.extend({
    closest : function (selector, context) {
        var dom = this.get(0)
            ,td = baidu.dom(dom);
        
        if (!dom) { return td;}

        do {
            td[0] = dom;

            if (td.is(selector, context)) return td;
        } while (dom = dom.parentNode);

        return baidu.dom();
    }
});
