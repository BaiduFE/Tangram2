///import baidu.type;
///import baidu.query;
///import baidu.each;
///import baidu.merge;

/**
 * @fileoverview
 * @name baidu.match
 * @author meizz
 * @create 2012-06-18
 * @modify
 */

/**
 * 对 TangramDom 里的所有元素进行筛选匹配，返回匹配上的DOM元素数组
 * @grammer TangramDom.match(selector)
 * @grammer TangramDom.match(tangramDom)
 * @grammer TangramDom.match(HTMLElement)
 * @grammer TangramDom.match(fn(index))
 * @param   {String}        selector    CSS选择器
 * @return  {Array}         Array
 */
baidu.match = (function(div, doc){
    var reg = /^[\w\#\-\$\.\*]+$/;


    return function(target, selector){
        var results = [];

        switch (baidu.type(selector)) {
            // 取两个 TangramDom 的交集
            case "$DOM" :
                for (var x=target.length-1; x>-1; x--) {
                    for (var y=selector.length-1; y>-1; y--) {
                        target[x] === selector[y] && results.push(target[x]);
                    }
                }
                break;

            // 使用过滤器函数，函数返回值是 Array
            case "function" :
                baidu.each(target, function(item, index){
                    selector.call(item, index) && results.push(item);
                });
                break;
            
            case "HTMLElement" :
                baidu.each(target, function(item){
                    item == selector && results.push(item);
                });
                break;

            // CSS 选择器
            case "string" :
                // 为提高效率，对单选择器（简版）使用临时div
                if (reg.test(selector)) {
                    baidu.each(target, function(item){
                        div.appendChild(item.cloneNode(false));
                    });
                    baidu.merge(results, baidu.query(selector, div));
                    div.innerHTML = "";
                
                // 对于复杂选择器使用 documentFragment
                } else {
                }
                break;
        }
        return results;

    };
// 使用这个临时的 div 作为CSS选择器过滤
})(document.createElement("DIV"), document.createDocumentFragment());

