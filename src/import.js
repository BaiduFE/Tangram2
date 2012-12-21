/*
 * @fileoverview JavaScript framework 脚本开发框架的核心文件
 * 负责脚本模块的依赖、加载、管理等脚本框架运行环境的搭建
 *
 * @author meizz
 * @version 20111227
 * @create-date 20050227
 *
 */

// 这个 if 是阻止代码多次被初始化执行
if (typeof window["\x05TANGRAM"] != "object") {(function() {

    var exports = window["\x05TANGRAM"] = {};

    // 得到jsloader.js脚本文件对应的<script>标签元素
    var script = document.getElementsByTagName("SCRIPT");
    script = script[script.length - 1];
    var t = script.src.replace(/\\/g,"/");

    exports.async = script.getAttribute("tang_async") != null;

    // 得到加载模块的起始路径
    var rootPath = (t.lastIndexOf("/")<0?".":t.substring(0,t.lastIndexOf("/")));

    // timestamp 时间戳，以便每个HTTP都能拿到最新资源
    var TS = new Date().getTime().toString(36);

    // 判断该模块是否已加载，避免重复加载
    var existent = {};
    var existentCSS = {};
    var cssList = [];

    // 模块的依赖关系图
    exports.dependenceDiagram = {};

    // 代码内存存储对象
    var codeStorage = exports.codeStorage = {};

    // 匹配源代码里的依赖模块的正则表达式
    /// import amz.ajax.request;
    /// Import("amz.ajax.request");
    /// importCSS amzui.treeview;
    var r0_inc = /^[\t ]*\/{3,}[\t ]*(import|include)[\t \'\"\(]*([\w\-\$\.]+)[\t \'\"\)]*(\->[\t ]*([\w\$]+))?[\t ;]*$/mig;
    var r1_inc = /(import|include)[\t \'\"\(]*([\w\-\$\.]+)/;
    var r2_inc = /\/{3,}[\t ]*(import|include)[\t \(\'\"]*([\w\-\$\.]+)[\t \'\"\)]*(\->[\t ]*([\w\$]+))[; \t]/i;
    var r0_css = /^[\t ]*\/{3,}[\t ]*(importCSS|includeCSS)[\t \'\"\(]*([\w\-\$\.]+)[\t \'\"\)]*[\t ;]*$/mig;
    var r1_css = /(importCSS|importCSS)[\t \'\"\(]*([\w\-\$\.]+)/i;



    // [SECTION METHODS]
    // 将 namespace 转换成实际的文件路径
    // @return {String} 对应的路径
    function namespace2path(ns, op) {
        op = op || {};
        var p = op.path, mp = op._mpath;
        if (typeof mp == "string" && mp.length > 3) {
            mp += (mp.indexOf("?")>0?"&":"?")+(/(\?|&)\.t_=/.test(mp)?"":".t_="+TS);
            !(/^https?:\/\//i.test(mp)) && (mp = rootPath +"/"+ mp);
            return mp;
        } else  if (typeof p == "string" && p.length > 3) {
            p += (p.indexOf("?")>0?"&":"?")+(/(\?|&)\.t_=/.test(p)?"":".t_="+TS);
            return p;
        }
        return rootPath +"/"+ ns.replace(/\./g,"/") +".js"+ (op.nocache?"?.t_="+TS:"");
    }

    // 通过 ajax 请求资源
    function request(url, options) {
        options = options || {};
        var xhr = getXHR();
        var path= timestamp(url);
        try {
            xhr.open("GET", path, false);
            xhr.send("");
        } catch (ex) {
            alert("xhr.open/send error, maybe cross domain");
        }

        if (xhr.readyState == 4) {
            if (xhr.status == 0 || xhr.status == 200){
                var rs = xhr.responseText;
                if (rs == null || rs.charAt(0) == "\uFFFD") {
                    alert("Maybe file encoding isn't ANSI or UTF-8");
                    return "";
                }
                if (rs.charAt(0) == "\xef") {
                    rs = rs.substr(3);
                }
                exports.codeStorage[options.namespace || url] = rs;
                return rs;
            } else if (xhr.status == 404) {
                alert((options.namespace || url) + "\nFile not found");
            } else {
                if (!options.reload) {
                    options.reload = true;
                    return request(url, options);
                } else {
                    throw new Error((options.namespace || url)
                        + "\n" + xhr.status + ": " + xhr.statusText);
                }
            }
        }
        return "";
    }

    // 给一个 URL 添加时间戳，以防止本地缓存
    function timestamp(url) {
        return url + (~url.indexOf("?") ? "&" : "?")
        + (~url.indexOf(".mz_=") ? "" : ".mz_="+ TS);
    }

    // 创建一个 XMLHttpRequest 对象的实例
    function getXHR(){
        return window.ActiveXObject
            ? new ActiveXObject("Microsoft.XMLHTTP")
            : new XMLHttpRequest();
    }



    // 加载指定 namespace 的模块
    // options.origin   强制使用AJAX加载源代码
    // options.async    使用<script>标签加载模块，此时是异步模块
    window.Import = window.Include = function(namespace, options) {
        options = options || {};
        options.namespace = namespace;

        var path = options.path = namespace2path(namespace, options);

        // 如果重复加载则停止
        if (exist(namespace, path, options.origin)) return;

        var code = exports.codeStorage[namespace] || request(path, options);


        if (code) {
            
            var ddlist = getDependList(namespace);

            for (var i=0, n=ddlist.length; i<n; i++) {
                Import(ddlist[i], {"async": options.async});
            }

            // 生成代码依赖项列表
            depend(namespace);

            for (var i=0; i<cssList.length; i++) {
                var link = document.createElement("LINK");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = rootPath +"/_resource/"+ cssList +".css";
                script.parentNode.appendChild(link);
            }
            cssList.length = 0;

            // 对于知名语句进行闭包处理
            if (r2_inc.test(code)) {
                code = "(function(){\n"
                    + code.replace(new RegExp(r2_inc.source, "gi"), "var $4 = $2;")
                    + "\n})();";
            }
            //alert(namespace +"\n"+ code);

            //*
            // 20111228 meizz 通过这种回调方式在 Firefox 里不能严格按序创建<script>，算是一种系统BUG吧
            if (exports.async || options.async) {
                document.write("<script type='text/javascript' src='"+ timestamp(path) +"'><\/script>");
            } else {

                // 同步模式
                if (window.execScript) {    // IE Chrome
                    existent[namespace] = path;
                    window.execScript(code);
                } else {    // Firefox Mozilla Opera Safari Netscape

                    // 此处原来想用 window.eval() 或 eval.call(window) 来做
                    // 但是 eval 在上述各浏览器上有差异，因此用下面的方法做
                    var s = document.createElement("SCRIPT");
                    s.type = "text/javascript";
                    s.appendChild(document.createTextNode(code));
                    script.parentNode.appendChild(s);
                    existent[namespace] = path;
                    s = null;
                }
            }//*/
            existent[namespace] = path;
        }
        return eval(namespace);
    }

    // 判断某个模块是否已经加载
    function exist(namespace, path, origin) {
        try{if(!origin && eval(namespace)) return true;}catch(ex){}
        return existent[namespace] == path;
    }

    // 判断某个模块源代码是否已经通过 request 载入
    function loaded(namespace, path, origin) {
    }

    // 生成模块的依赖关系图 dependenceDiagram
    // module  模块的代号，通常是Import的Namespace或require的URL
    function depend(module) {
        var list = getDependList(module);
        var re = [];

        // 回调
        for (var i=0, n=list.length, a=[]; i<n; i++) {
            a = a.concat(depend([list[i]]), list[i]);
        }

        // 数组去重
        for(var i=0, n=a.length, json={}; i<n; i++) {
            !json[a[i]] && re.push(json[a[i]] = a[i]);
        }

        return (exports.dependenceDiagram[module] = re);
    }

    // 从源代码里分析出模块的直接依赖项，以数组形式返回
    function getDependList(module) {
        /// import amz.ajax.request;
        /// Import("amz.ajax.request");
        /// importCSS("amzui.treeview");

        var re = [];
        var code = exports.codeStorage[module];
        if (!code) return re;

        // import CSS
        var a = code.match(r0_css)
        if (a) {
            for (var i=0, n=a.length; i<n; i++) {
                r1_css.test(a[i]);
                var css = RegExp.$2;
                existentCSS[css] || ( (existentCSS[css]=true) && cssList.push(css) );
            }
        }

        // import js
        var a = code.match(r0_inc)
        if (a) {
            for (var i=0, n=a.length; i<n; i++) {
                r1_inc.test(a[i]);
                re.push(RegExp.$2);
            }
        }

        return re;
    }





    // [TODO]支持 common_js 协议，实现 require()
    window.require = function(url) {
        var code = "";
        return new Function("var exports;\r\n"+ code +"\r\nreturn exports || {};")();
    }






    // 模块源代码聚合
    window.Merge = function(nslist, cleanup) {
        var re = [];
        var list = nslist.split(/\s*;\s*/);
        for (var i=0, n=list.length; i<n; i++) {Import(list[i]);}

        // 取得所有的依赖项列表
        for (var i=0, n=list.length, a=[]; i<n; i++) {
            a = a.concat(exports.dependenceDiagram[list[i]], [list[i]]);
        }

        // 依赖项数组去重
        for (var i=0, n=a.length, json={}; i<n; i++) {
            !json[a[i]] && re.push(json[a[i]] = a[i]);
        }

        // 照单下菜，聚合code
        for (var i=0, n=re.length; i<n; i++) {
            re[i] = exports.codeStorage[re[i]] || "";
        }

        var code = re.join(""), regs=[];

        if (cleanup) {
            // 清除 /*..*/ 的注释
            regs[0] = /\/\*[\d\D]+?\*\//g;
            // 清除 //...  的注释
            regs[1] = /^[ \t]*\/\/+.*$/gm;

            //regs[2] = /\/\/[^\'\"]*$/gm;
            //regs[3] = /(\s){2,}/g;

            for (var i=0; i<regs.length; i++) {
                code = code.replace(regs[i], "");
                //alert(code);
            }
        }

        return code;
    }

})()}

/// [MODIFIED]

//  2011.12.31  meizz   支持 common_js，添加 require()和exports支持
//  2011.12.28  meizz   Import()支持模块预加载
//  2011.08.01  meizz   文件更名为 tangram.js，添加Merge()脚本打包功能
//  2009.03.05  berg    文件更名为 import.js
//  2008.12.26  meizz   将 Include()更名为 Import()
//  2008.02.29  meizz   废弃 Storage()本地脚本缓存策略
//  2007.08.01  meizz   文件更名 jsloader.js，废弃 Using()线上使用
//  2005.02.27  meizz   新建文档 jsframework.js，创建 Using(),Include(),Storage()
