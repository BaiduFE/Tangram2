/// include baidu;
/// include baidu.merge;

/**
 * @fileoverview
 * @name baidu.selector
 * @author meizz
 * @create 2012-05-30
 * @modify
 */

/**
 * 通过指定的CSS选择器取指定的DOM元素
 * 在用户选择使用 Sizzle 时会被覆盖成 Sizzle 方法
 * 目前这个简版的 selector 函数支持四种选择器 * #id .class tagName
 *
 * @grammer baidu.selector(selector[, context[, results]])
 * @param   {String}    selector    CSS选择器字符串
 * @param   {Document}  context     选择的范围
 * @param   {Array}     results     返回的结果对象（数组）
 * @return  {Array}                 筛选后的对象组
 */
(function(){
    baidu.selector = baidu.selector || function(selector, context, results) {
        context = context || document;
        results = results || [];

        if (!selector || typeof selector != "string") {
            return results;
        }

        var i, item, dom, all
            ,s = selector.split(",")
            ,n = s.length;

        // [selector1,selector2,selector3,...]
        for (i=0; i<n; i++) {
            item = s[i];
            
            // #id
            if (item.charAt(0) == "#") {
                dom = context.getElementById(item.substr(1));
                dom && baidu.merge(results, [dom]);

            // TagName
            }else if (rTag.test(item)) {
                baidu.merge(results, context.getElementsByTagName(item));
            
            }else if (rClass.test(item) || item == "*") {
                all = all || context.getElementsByTagName("*");

                // *
                if (item == "*") {
                    baidu.merge(results, all);

                // .className
                } else {
                    var c = [], cn = item.substr(1);
                    for (var k=0, m=all.length; k<m; k++) {
                        ~all[k].className.indexOf(cn) && c.push(all[k]);
                    }
                    baidu.merge(results, c);
                }
            }

        }

        return results;
    };

    var rTag = /^\w+$/;
    var rClass = /^\.[\w\-]+$/;
})();
