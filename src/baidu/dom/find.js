/// import baidu.dom;
/// import baidu.dom.each;
/// import baidu.selector;
/// import baidu.merge;
/// import baidu.each;
/// import baidu.type;

/**
 * @fileoverview
 * @name baidu.dom.find
 * @author meizz
 * @create 2012-06-12
 * @modify
 */

/**
 * 按条件搜索目标元素集的所有子孙元素
 * @param   {selector|HTMLElement|$DOM}     selector
 * @return  {TangramDom}    new TangramDOM
 */
baidu.dom.extend({
    find : function (selector) {
        var a=[],
            expr,
            id = "__tangram__find__",
            td = baidu.dom();

        switch (baidu.type(selector)) {
        case "string" :
            this.each(function(){baidu.merge(td, baidu.selector(selector, this));});
            break;
        case "HTMLElement" :
            expr = selector.tagName +"#"+ (selector.id ? selector.id : (selector.id = id));
            this.each(function(){if(baidu.selector(expr, this).length > 0) a.push(selector);});
            selector.id == id && (selector.id = "");
            if (a.length > 0) baidu.merge(td, a);
            break;
        case "$DOM" :
            a = selector.get();
            this.each(function(){
                baidu.each(baidu.selector("*", this), function(dom){
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
