///import baidu.dom;
///import baidu.type;
///import baidu.query;
///import baidu.dom.each;

/**
 * @fileoverview
 * @name baidu.dom.match
 * @author meizz
 * @create 2012-06-11
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
;(function(div){
baidu.dom.extend({
    match : function (selector) {
        var results = []
            ,me = this;

        switch (baidu.type(selector)) {
            // 取两个 TangramDom 的子集
            case "$DOM" :
                this.each(function(){
                    var i,
                        n=selector.length;

                    for (i=0; i<n; i++) {
                        selector[i] == this && results.push(this);
                    }
                });
                break;

            // 使用过滤器函数，函数返回值是 Array
            case "function" :
                this.each(function(index){
                    selector.call(this, index, this) && results.push(this);
                });
                break;

            // CSS 选择器
            case "string" :
                this.each(function(){
                    div.appendChild(this.cloneNode(false));
                    baidu.query(selector, div).length && results.push(this);
                    div.removeChild(div.firstChild);
                });
                div.innerHTML = "";
                break;
            
            case "HTMLElement" :
                this.each(function(){
                    this == selector && results.push(this);
                });
                break;
        }
        return results;
    }
});
// 使用这个临时的 div 作为CSS选择器过滤
})(document.createElement("DIV"));
