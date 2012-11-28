///import baidu;
///import baidu.forEach;
///import baidu.merge;
///import baidu.array.unique;
/*
 * @fileoverview
 * @name baidu.query
 * @author meizz
 * @create 2012-05-30
 * @modify 2012-06-10 将大函数分拆成 query() 和 queryCombo()；使用 querySelectAll()；
 */

/**
 * @description 通过指定的CSS选择器取指定的DOM元素
 * 在用户选择使用 Sizzle 时会被覆盖成 Sizzle 方法
 * 目前这个简版的 selector 函数支持四种选择器 * #id .class tagName
 *
 * @function
 * @name baidu.query
 * @grammar baidu.query(selector[, context[, results]])
 * @param   {String}    selector    CSS选择器字符串
 * @param   {Document}  context     选择的范围
 * @param   {Array}     results     返回的结果对象（数组）
 * @return  {Array}                 筛选后的对象组
 */
baidu.query = baidu.query || function(){
    var rId = /^(\w*)#([\w\-\$]+)$/
       ,rId0= /^#([\w\-\$]+)$/
       ,rTag = /^\w+$/
       ,rClass = /^(\w*)\.([\w\-\$]+)$/
       ,rComboClass = /^(\.[\w\-\$]+)+$/
       ,rDivider = /\s*,\s*/
       ,rSpace = /\s+/g
       ,slice = Array.prototype.slice;

    // selector: #id, .className, tagName, *
    function query(selector, context) {
        var t, x, id, dom, tagName, className, arr, list, array = [];

        // tag#id
        if (rId.test(selector)) {
            id = RegExp.$2;
            tagName = RegExp.$1 || "*";

            // 本段代码效率很差，不过极少流程会走到这段
            baidu.forEach(context.getElementsByTagName(tagName), function(dom) {
                dom.id == id && array.push(dom);
            });

        // tagName or *
        } else if (rTag.test(selector) || selector == "*") {
            baidu.merge(array, context.getElementsByTagName(selector));

        // .className
        } else if (rClass.test(selector)) {
            arr = [];
            tagName = RegExp.$1;
            className = RegExp.$2;
            t = " " + className + " ";
            // bug: className: .a.b

            if (context.getElementsByClassName) {
                arr = context.getElementsByClassName(className);
            } else {
                baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                    dom.className && ~(" " + dom.className + " ").indexOf(t) && (arr.push(dom));
                });
            }

            if (tagName && (tagName = tagName.toUpperCase())) {
                baidu.forEach(arr, function(dom) {
                    dom.tagName.toUpperCase() === tagName && array.push(dom);
                });
            } else {
                baidu.merge(array, arr);
            }
        
        // IE 6 7 8 里组合样式名(.a.b)
        } else if (rComboClass.test(selector)) {
            list = selector.substr(1).split(".");

            baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                if (dom.className) {
                    t = " " + dom.className + " ";
                    x = true;

                    baidu.forEach(list, function(item){
                        ~t.indexOf(" "+ item +" ") || (x = false);
                    });

                    x && array.push(dom);
                }
            });
        }

        return array;
    }

    // selector 还可以是上述四种情况的组合，以空格分隔
    // @return ArrayLike
    function queryCombo(selector, context) {
        var a, s = selector, id = "__tangram__", array = [];

        // 在 #id 且没有 context 时取 getSingle，其它时 getAll
        if (!context && rId0.test(s) && (a=document.getElementById(s.substr(1)))) {
            return [a];
        }

        context = context || document;

        // 用 querySelectorAll 时若取 #id 这种唯一值时会多选
        if (context.querySelectorAll) {
            // 在使用 querySelectorAll 时，若 context 无id将貌似 document 而出错
            if (context.nodeType == 1 && !context.id) {
                context.id = id;
                a = context.querySelectorAll("#" + id + " " + s);
                context.id = "";
            } else {
                a = context.querySelectorAll(s);
            }
            return a;
        } else {
            if (!~s.indexOf(" ")) {
                return query(s, context);
            }

            baidu.forEach(query(s.substr(0, s.indexOf(" ")), context), function(dom) { // 递归
                baidu.merge(array, queryCombo(s.substr(s.indexOf(" ") + 1), dom));
            });
        }

        return array;
    }

    return function(selector, context, results) {
        if (!selector || typeof selector != "string") {
            return results || [];
        }

        var arr = [];
        selector = selector.replace(rSpace, " ");
        results && baidu.merge(arr, results) && (results.length = 0);

        baidu.forEach(selector.indexOf(",") > 0 ? selector.split(rDivider) : [selector], function(item) {
            baidu.merge(arr, queryCombo(item, context));
        });

        return baidu.merge(results || [], baidu.array(arr).unique());
    };
}();
