define(function(require, exports) {
    require('jQuery');
    var Tree = require('Tree').tree;
    var Check = require('Check');
    var Console = require('Console');

    var treeInstance,               // 树的实例
        treeData,                   // 源码目录树
        flattenedTreeDates = [],    // 扁平化后的树的数据
        hideOnPass = false,         // 是否隐藏测试通过的节点
        autoRuning = false,         // 是否处于自动测试状态
        currentCheckMode = 'unitTest',  // 当前检查的模式
        currentNode;                // 当前检查的节点

    // 设置自动运行的状态
    function setAutoRuningStatus(flag){
        autoRuning = flag;
    }

    var fileTree = {
        /**
         * 初始化树
         */
        init: function(){
            treeInstance = new Tree(treeData, $('#J_tree'));

            $(treeInstance).bind('nodefocus', function(e, node){

                // 节点是文件类型
                if(node.data.type == "file"){
                    // 清除当前节点的状态
                    node.el.css('color', '');
                    // focus当前节点
                    currentNode && currentNode.el.removeClass('focus');
                    node.el.addClass("focus");

                    currentNode = node;
                    Check.setCurrentNode(node);
                    // 执行检查
                    Check.runCheck(currentCheckMode, node);
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
                Check.setAutoRuningStatus(true);

                // 清除用例状态
                $('.node-item').css('color', '').css('display', '');

                // 显示对应的tab
                tab.focus(currentCheckMode);
                // 清空错误列表
                // failureList = [];

                switch(currentCheckMode){
                    case 'unitTest':
                        Console.group('单元测试');
                        break;
                    case 'staticCheck':
                        Console.group('静态检查');
                        break;
                    case 'syntaxCheck':
                        Console.group('语法检查');
                        break;
                }
                
                Check.autoNext();
            });

            // 隐藏测试通过的文件
            $('#J_hideOnPass').click(function(){
                if(this.checked){
                    hideOnPass = true;
                    Check.setHideOnPass(true);
                }else{
                    hideOnPass = false;
                    Check.setHideOnPass(false);
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
                Check.runCheck(currentCheckMode, currentNode);

                // 清除当前节点的状态
                currentNode.el.css('color', '');
            });
        },

        /**
         * 将当前焦点设置到某个tab上
         * name => J_(name)Tab => J_(name) => Check.runCheck(name, node)
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
        seajs.use('App', function(app){
            app._testDoneCallBack(info);
        });
    };

    // 解决作用域问题
    exports._testDoneCallBack = function(info){
        var log = {
            'api': currentNode.data.dir.replace('../../../src/', '').replace('.js', '').replace(/\//g, '.')
        };

        if(info.failed){
            // failureList.push(currentNode);
            currentNode.el.css('color', '#FF0000');
            log.level = 'error';
            log.desc = '单元测试不通过';
        }else{
            autoRuning && hideOnPass && currentNode.el.hide();
            currentNode.el.css('color', '#00F');
            log.level = 'pass';
            log.desc = '单元测试通过';
        }

        Console.log(log);
        autoRuning && Check.autoNext();
    };

    /**
     * 初始化应用
     */
    var initApp = function(){
        // 初始化树
        fileTree.init();
        // 将树的数据扁平化
        fileTree.flatteningTreeDates();
        Check.setFlatteningTreeDates(flattenedTreeDates);
        // 默认展开树的第一个子节点
        treeInstance.children[0].expend();
        // 初始化Tab
        tab.init();
        // 初始化Toolbar
        toolbar.init();
        // 初始化控制台
        Console.init();
    };

    exports.run = function(){
        // 获取源码目录树
        $.getJSON('./getFiles.php', function(data){
                    treeData = data;
                    initApp();
                });
    };

    exports.toolbar = toolbar;
    exports.setAutoRuningStatus = setAutoRuningStatus;
});