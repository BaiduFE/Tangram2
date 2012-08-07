///import baidu.dom;
///import baidu.dom.each;
///import baidu.query;
///import baidu.merge;
///import baidu.each;
///import baidu.type;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-12
 * @modify
 */

/**
 * @description 按条件搜索目标元素集的所有子孙元素
 * @function
 * @name baidu.dom().find()
 * @grammar $DOM.find(selector)
 * @param   {Object}            selector    选择器
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    find : function (selector) {
        var a=[],
            expr,
            id = "__tangram__find__",
            td = baidu.dom();

        switch (baidu.type(selector)) {
        case "string" :
            this.each(function(){baidu.merge(td, baidu.query(selector, this));});
            break;
        case "HTMLElement" :
            expr = selector.tagName +"#"+ (selector.id ? selector.id : (selector.id = id));
            this.each(function(){if(baidu.query(expr, this).length > 0) a.push(selector);});
            selector.id == id && (selector.id = "");
            if (a.length > 0) baidu.merge(td, a);
            break;
        case "$DOM" :
            a = selector.get();
            this.each(function(){
                baidu.each(baidu.query("*", this), function(dom){
                    for (var i=0, n=a.length; i<n; i++) {
                        dom === a[i] && (td[td.length ++] = a[i]);
                    }
                });
            });
            break;        
        }
        return td;
    }
});
