(function(window){

    var treeInstance,               // 树的实例
        treeData,                   // 源码目录树
        flattenedTreeDates = [],    // 扁平化后的树的数据
        hideOnPass = false,         // 是否隐藏测试通过的节点
        autoRuning = false,         // 是否处于自动测试状态
        currentCheckMode = 'unitTest',  // 当前检查的模式
        currentNode,                // 当前检查的节点
        failureList = [],           // 自动测试时检查失败的节点
        docTpl = '',                // 文档预览的模板
        testCaseTpl = '<h1 class="test-header">{{file}}</h1>' +
                            '<ul class="test-cases">' +
                                '<li class="{{encodingCheck.status}}"><span>文件编码检查：{{encodingCheck.status}}；当前文件编码：{{encodingCheck.msg}}</span></li>' +
                                '<li class="{{BombCheck.status}}"><span>文件Bomb头检查：{{BombCheck.status}}</span></li>' +
                                '<li class="{{tabCheck.status}}"><span>文件缩进检查：{{tabCheck.status}}</span></li>' +
                                '<li class="{{conflictCheck.status}}"><span>文件冲突检查：{{conflictCheck.status}}</span></li>' +
                                '<li class="{{testCaseCheck.status}}">' +
                                    '<span>关联用例检查：{{testCaseCheck.status}}；</span>' +
                                    '<span>源码最后修改时间：{{testCaseCheck.msg.srcLastModify}}；</span>' +
                                    '<span>用例最后修改时间：{{testCaseCheck.msg.testCaseLastModify}}</span>' +
                                '</li>' +
                            '</ul>';

    // 编码HTML
    function encodeHTML(source) {
        return String(source)
                    .replace(/&/g,'&amp;')
                    .replace(/</g,'&lt;')
                    .replace(/>/g,'&gt;')
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;");
    }

    // 显示批量测试的结果
    function showTestResult(){
        var html = '',
            count = 0,
            _list = {};

        if(failureList.length){
            $(failureList).each(function(index, item){
                var api = item.data.dir.replace('../../../src/', '');
                if(_list[api]){return;};
                _list[api] = true;
                count++;
                html += '<li>' + api + '</li>';
            });
            html += '</ul>';

            html = '<p>共有' + count + '个接口检查不通过：<p><ul>' + html;
        }else{
            html = '<p>所有文件全部检查通过。</p>';
        }
        
        $('#J_' + currentCheckMode).html(html);
        window.scrollTo(0, 0);
        failureList = [];
    }

    var autoNext = (function(){
        var i = -1,
            timer;

        return function(){
            timer && clearTimeout(timer);

            // 跑完了
            if(++i >= flattenedTreeDates.length){
                toolbar.enable();
                i = -1;
                autoRuning = false;
                currentNode.el.removeClass("focus");
                currentNode = null;

                // 显示统计结果
                showTestResult();
                return;
            }

            var node = flattenedTreeDates[i];

            // 将节点移动到可视区域
            if(node.el.offset().top > $(window).scrollTop() + $(window).height()){
                $(window).scrollTop(node.el.offset().top);
            }
            
            if(node.data.type == 'folder'){
                node.expend();
                autoNext();
            }else{
                node.focus();

                timer = setTimeout(function(){
                    autoNext();
                }, 10000);
            }
        }
    })();

    function runCheck(type, node){
        $("#J_appDesc").hide();
        $(".tabs").show();
        !node && (node = currentNode);
        checkMode[type](node);
    }

    var checkMode = {
        /**
         * 单元测试
         */
        unitTest: function(node){
            var api = node.data.dir.replace('../../../src/', '').replace('.js', ''),
                unitUrl = location.href.replace('index.php', '') + '../br/run.php?case=' + api;
            
            $("#J_unitTestFrame").attr('src', unitUrl);
            var interval = setInterval(function(){
                try{
                    if(J_unitTestFrame.contentWindow)
                        $("#J_unitTestFrame").css('height', $(J_unitTestFrame.contentWindow.document).height() + 'px');
                    else
                        $("#J_unitTestFrame").css('height', $(J_unitTestFrame.document).height() + 'px');
                }catch(e){
                    $("#J_unitTestFrame").css('height', '50px');
                }
            }, 50);

            setTimeout(function(){
                clearInterval(interval);
            }, 10000);
        },

        /**
         * 静态检查
         */
        staticCheck: function(node){
            $("#J_result").html();

            $.getJSON('./staticcheck.php?file=' + node.data.dir, function(data){
                            data.file = node.data.dir.replace('../../../src/', '');
                            $("#J_staticCheck").html(Mustache.render(testCaseTpl, data));

                            // 在节点上标出检查结果（忽略用例的检查结果）
                            if(data.encodingCheck.status == 'failure' || 
                               data.BombCheck.status == 'failure' ||
                               data.tabCheck.status == 'failure'){
                                
                                failureList.push(node);
                                node.el.css('color', '#FF0000');
                            }else{
                                autoRuning && hideOnPass && node.el.hide();
                                node.el.css('color', '');
                            }
                            
                            autoRuning && autoNext();
                        });
        },

        /**
         * 语法检查
         */
        syntaxCheck: function(node){
            $.get('./getFileContent.php?file=' + node.data.dir, function(content){
                $("#J_syntaxCheck").html('');
                var filename = node.data.dir.replace('../../../src/', '');
                var html = '<h1 class="test-header">' + filename + '</h1><ul class="test-case">';
                var errors = 0;

                JSHINT(content, {
                    boss: true,
                    eqnull: true,
                    evil: true,
                    browser: true,
                    tangram: true,
                    magic: true,
                    laxbreak: true,
                    loopfunc: true,
                    nonew: true,
                    undef: true,
                    maxerr: 200
                });

                
                $(JSHINT.errors).each(function(index, item){
                    if(!item){return};
                    if(/(debugger|Extra\scomma|is\snot\sdefined)/.test(item.reason) && !/nodeType/.test(item.evidence)){
                        errors++;
                        failureList.push(node);
                        html += '<li><p><span class="line">Line ' + item.line + '</span>:<span class="code">' + encodeHTML(item.evidence) + '</span></p>'+
                            '<p>' + item.reason + '</p></li>';
                    }
                });

                if(errors > 0){
                    // 在节点上标出检查结果
                    node.el.css('color', '#FF0000');
                }else{
                    html = '没有发现语法错误';
                    autoRuning && hideOnPass && node.el.hide();
                    node.el.css('color', '');
                }

                $("#J_syntaxCheck")[0].innerHTML = html;
                autoRuning && autoNext();
            });
        },

        /**
         * 文档预览
         */
        docPreview: function(node){
            if(!docTpl) return;

            $.getJSON('./doc.php?file=' + node.data.dir, function(data){
                $("#J_docPreview").html('');
                var doc = '';
                $(data).each(function(index, item){
                    doc += Mustache.render(docTpl, item, true);
                });

                (doc == '') && (doc = '该文件无文档');
                $("#J_docPreview")[0].innerHTML = doc;
                SyntaxHighlighter.highlight();
            });
        },

        /**
         * 显示源代码
         */
        showSrc: function(node){
            $.get('./getFileContent.php?file=' + node.data.dir, function(content){
                $("#J_showSrc").html('<pre class="brush: js"></pre>');
                $("#J_showSrc").find('pre').text(content);
                SyntaxHighlighter.highlight();
            });
        },

        /**
         * 显示用例
         */
        showUnit: function(node){
            $.get('./getFileContent.php?file=' + node.data.dir.replace('src', 'test'), function(content){
                if(content === ''){
                    $("#J_showUnit").html('该接口无用例');
                    return;
                }
                $("#J_showUnit").html('<pre class="brush: js"></pre>');
                $("#J_showUnit").find('pre').text(content);
                SyntaxHighlighter.highlight();
            });
        }
    };

    var fileTree = {
        /**
         * 初始化树
         */
        init: function(){
            treeInstance = new tree(treeData, $('#J_tree'));

            $(treeInstance).bind('nodefocus', function(e, node){

                // 节点是文件类型
                if(node.data.type == "file"){
                    // 清除当前节点的状态
                    currentNode && currentNode.el.css('color', '');
                    // focus当前节点
                    currentNode && currentNode.el.removeClass('focus');
                    node.el.addClass("focus");

                    currentNode = node;
                    // 执行检查
                    runCheck(currentCheckMode, node);
                }else{  // 节点是文件夹类型
                    // node.expended ? node.collapse() : node.expend();
                }
            });

            treeInstance.render();
        },

        /**
         * 将树的数据扁平化
         */
        flatteningTreeDates: function(node){
            if(!node) node = treeInstance;

            $(node.children).each(function(index, child){
                flattenedTreeDates.push(child);
                if((child.data && child.data.type == 'folder') || child.type == 'folder'){
                    child.expend();
                    child.collapse();
                    fileTree.flatteningTreeDates(child);
                }
            });
        }
    };

    var toolbar = {
        /**
         * 初始化toolbar
         */
        init: function(){
            // 批量单元测试
            $('.actions button').click(function(){
                // 从按钮id中分析出当前需要执行的checkMode
                var id = $(this).attr('id');
                currentCheckMode = id.replace('J_autoRun', '').replace(/^\w/, function(w){
                    return w.toLowerCase();
                });

                toolbar.disable();
                autoRuning = true;

                // 清除用例状态
                $('.node-item').css('color', '').css('display', '');

                // 显示对应的tab
                tab.focus(currentCheckMode);
                // 清空错误列表
                failureList = [];
                autoNext();
            });

            // 隐藏测试通过的文件
            $('#J_hideOnPass').click(function(){
                if(this.checked){
                    hideOnPass = true;
                }else{
                    hideOnPass = false;
                }
            });
        },

        /**
         * 禁用toolbar的所有功能
         */
        disable: function(){
            $('#J_autoRunUnitTest').attr('disabled', 'disabled');
            $('#J_autoRunStaticCheck').attr('disabled', 'disabled');
            $('#J_autoRunSyntaxCheck').attr('disabled', 'disabled');
            $('#J_hideOnPass').attr('disabled', 'disabled');
        },

        /**
         * 启用toolbar的所有功能
         */
        enable: function(){
            $('#J_autoRunUnitTest').removeAttr('disabled');
            $('#J_autoRunStaticCheck').removeAttr('disabled');
            $('#J_autoRunSyntaxCheck').removeAttr('disabled');
            $('#J_hideOnPass').removeAttr('disabled');
        }
    };

    var tab = {
        /**
         * 初始化Tab
         */
        init: function(){
            $(".tabs li").click(function(){
                // 如果当前没有选中的树节点，或者正处于批量测试过程中，不响应点击
                if(!currentNode || autoRuning){
                    !currentNode && alert("未选择API！");
                    return;
                }

                var tabId = $(this).attr('id');
                var tabname = tabId.replace('Tab', '').replace('J_', '');
                tab.focus(tabname);

                // 执行对应的检查
                currentCheckMode = tabname;
                runCheck(currentCheckMode);

                // 清除当前节点的状态
                currentNode.el.css('color', '');
            });
        },

        /**
         * 将当前焦点设置到某个tab上
         * name => J_(name)Tab => J_(name) => runCheck(name, node)
         */
        focus: function(name){

            $(".tabs li").removeClass("current");
            $("#J_" + name + "Tab").addClass("current");
            
            $('.tab-item').removeClass("current");
            $('#J_' + name).addClass("current");
        }
    };

    /**
     * 单测用例执行完后的回调
     */
    window.testDoneCallBack = function(info){
        if(info.failed){
            failureList.push(node);
            currentNode.el.css('color', '#FF0000');
        }else{
            autoRuning && hideOnPass && currentNode.el.hide();
            currentNode.el.css('color', '');
        }
        autoRuning && autoNext();
    }

    window.App = {
        run: function(){
            // 获取文档预览的模板
            $.get('./docTpl.html', function(tpl){
                        docTpl = tpl;
                    });

            // 获取源码目录树
            $.getJSON('./getFiles.php', function(data){
                        treeData = data;
                        window.App.init();
                    });
        },

        /**
         * 初始化应用
         */
        init: function(){
            //初始化树
            fileTree.init();
            //将树的数据扁平化
            fileTree.flatteningTreeDates();
            //默认展开树的第一个子节点
            treeInstance.children[0].expend();
            //初始化Tab
            tab.init();
            //初始化Toolbar
            toolbar.init();
        }
    }
})(window);