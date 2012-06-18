///import baidu;
///import baidu.each;
///import baidu.merge;
///import baidu.unique;
/**
 * @fileoverview
 * @name baidu.query
 * @author meizz
 * @create 2012-05-30
 * @modify 2012-06-10 将大函数分拆成 query() 和 queryCombo()；使用 querySelectAll()；
 */

/**
 * 通过指定的CSS选择器取指定的DOM元素
 * 在用户选择使用 Sizzle 时会被覆盖成 Sizzle 方法
 * 目前这个简版的 selector 函数支持四种选择器 * #id .class tagName
 *
 * @grammer baidu.query(selector[, context[, results]])
 * @param   {String}    selector    CSS选择器字符串
 * @param   {Document}  context     选择的范围
 * @param   {Array}     results     返回的结果对象（数组）
 * @return  {Array}                 筛选后的对象组
 */
baidu.query = baidu.query || (function(){

    var rId = /^(\w*)#([\w\-\$]+)$/,
        rTag = /^\w+$/,
        rClass = /^(\w*)\.([\w\-\$]+)$/,
        rDivider = /\s*,\s*/;

    // selector: #id, .className, tagName, *
    function query(selector, context) {
        var id, dom, tagName, className, arr, array = [];

        // tag#id
        if (rId.test(selector)) {
            id = RegExp.$2;
            tagName = RegExp.$1;

            // # 前有 TagName 范围限制时，返回符合条件的所有对象
            if (tagName) {
                baidu.each(context.getElementsByTagName(tagName), function(dom) {
                    dom.id == id && array.push(dom);
                });

                // # 前没有 TagName 范围限制则返回 first
                // [TODO] 在 DocumentFragment 里按 id 取对象，目前取不到
            } else {
                (dom = document.getElementById(id)) && array.push(dom);
            }

            // tagName or *
        } else if (rTag.test(selector) || selector == "*") {
            baidu.each(context.getElementsByTagName(selector), function(dom) {
                array.push(dom);
            });

            // .className
        } else if (rClass.test(selector)) {
            arr = [];
            tagName = RegExp.$1;
            className = RegExp.$2;

            if (context.getElementsByClassName) {
                arr = context.getElementsByClassName(className);
            } else {
                baidu.each(context.getElementsByTagName("*"), function(dom) {
                    dom.className && (" " + dom.className + " ").indexOf(" " + className + " ") > -1 && arr.push(dom);
                });
            }

            if (tagName && (tagName = tagName.toUpperCase())) {
                baidu.each(arr, function(dom) {
                    dom.tagName.toUpperCase() == tagName && array.push(dom);
                });
            } else {
                baidu.each(arr, function(dom) {
                    array.push(dom)
                });
            }
        }

        return array;
    }

    // selector 还可以是上述四种情况的组合，以空格分隔
    function queryCombo(selector, context, array) {
        var a, s, id = "__tangram__",
            array = array || [];

        // [TODO 20120614] 使用 querySelectorAll 方法时 bug 不少，以后再启用吧
        // 用 querySelectorAll 时若取 #id 这种唯一值时会多选
        //if (context.querySelectorAll) {
        //    // 在使用 querySelectorAll 时，若 context 无id将貌似 document 而出错
        //    if (context.nodeType == 1 && !context.id) {
        //        context.id = id;
        //        a = context.querySelectorAll("#" + id + " " + selector);
        //        context.id = "";
        //    } else {
        //        a = context.querySelectorAll(selector);
        //    }
        //    // 保持统一的返回值类型(Array)
        //    return baidu.merge(array, a);
        //} else {
            if (selector.indexOf(" ") == -1) {
                return query(selector, context);
            }

            a = selector.split(/\s+/);
            s = a.join(" ");
            baidu.each(query(a[0], context), function(dom) { // 递归
                baidu.merge(array, queryCombo(s.substr(s.indexOf(" ") + 1), dom));
            });
        //}

        return array;
    }

    return function(selector, context, results) {
        context = context || document;

        if (!selector || typeof selector != "string") {
            return results || [];
        }

        var arr = [];
        baidu.each(selector.indexOf(",") > 0 ? selector.split(rDivider) : [selector], function(item) {
            arr = arr.concat(queryCombo(item, context));
        });

        // results 可能是传入的 ArrayLike ，所以只能使用 merge()
        results ? baidu.merge(results, arr) : results = arr;
        // 去重
        return baidu.unique(results);
    };
})();
