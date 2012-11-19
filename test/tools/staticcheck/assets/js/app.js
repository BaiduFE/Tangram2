(function(window){
    var treeInstance,
        flattenedTreeDates = [],
        autoFixed = false,
        hideOnPass = false,
        autoRuning = false,
        currentCheck = 'staticCheck',
        currentNode,
        testCaseTpl = '<h1 class="test-header">{{file}}</h1>' +
                            '<ul class="test-cases">' +
                                '<li class="{{encodingCheck.status}}"><span>文件编码检查：{{encodingCheck.status}}；当前文件编码：{{encodingCheck.msg}}</span></li>' +
                                '<li class="{{BombCheck.status}}"><span>文件Bomb头检查：{{BombCheck.status}}</span></li>' +
                                '<li class="{{tabCheck.status}}"><span>文件缩进检查：{{tabCheck.status}}</span></li>' +
                                '<li class="{{testCaseCheck.status}}">' +
                                    '<span>关联用例检查：{{testCaseCheck.status}}；</span>' +
                                    '<span>文件最后修改时间：{{testCaseCheck.msg.srcLastModify}}；</span>' +
                                    '<span>用例最后修改时间：{{testCaseCheck.msg.testCaseLastModify}}</span>' +
                                '</li>' +
                            '</ul>',
        docTpl = '';

    function flatteningTreeDates(node){
        node.children.forEach(function(child){
            flattenedTreeDates.push(child);
            if((child.data && child.data.type == 'folder') || child.type == 'folder'){
                child.expend();
                child.collapse();
                flatteningTreeDates(child);
            }
        });
    }

    var autoNext = (function(){
        var i = -1;
        return function(){

            // 跑完了
            if(++i >= flattenedTreeDates.length){
                $('#J_autoRun').removeAttr('disabled');
                $('#J_autoFixed').removeAttr('disabled');
                $('#J_hideOnPass').removeAttr('disabled');
                i = -1;
                autoRuning = false;
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
                staticCheck(node);
            }
            
        }
    })();

    // 初始化文件树
    function initTree(data){
        treeInstance = new tree(data, $('#J_tree'));

        $(treeInstance).bind('treerender', function(e, node){
            node.children[0].expend();
        });

        $(treeInstance).bind('nodefocus', function(e, node){
            if(node.data.type == "file"){
                $('#J_tree').find('.focus').removeClass('focus');
                node.el.addClass("focus");
                currentNode = node;

                // 处于自动测试时，不响应
                switch(currentCheck){
                    case "syntaxCheck":
                        !autoRuning && syntaxCheck(node);
                        break;
                    case "doc":
                        docPreview(node);
                        break;
                    default:
                        !autoRuning && staticCheck(node);
                }
            }
        });

        treeInstance.render();
    }

    // 初始化tab
    function initTab(){
        $(".tabs li").click(function(){
            $(".tabs li").removeClass("current");
            $(this).addClass("current");
            var tabId = $(this).attr('id');
            var tabItemId = tabId.replace('Tab', '');
            $('.tab-item').removeClass("current");
            $('#' + tabItemId).addClass("current");

            switch(this.id){
                case "J_syntaxCheckTab":
                    currentCheck = "syntaxCheck";
                    currentNode && !autoRuning && syntaxCheck(currentNode);
                    break;
                case "J_docTab":
                    currentCheck = "doc";
                    currentNode && docPreview(currentNode);
                    break;
                default:
                    currentCheck = "staticCheck";
                    currentNode && !autoRuning && staticCheck(currentNode);
            }
        });
    }

    // 初始化工具栏
    function initToolbar(){
        // 批量测试
        $('#J_autoRun').click(function(){
            $('#J_autoRun').attr('disabled', 'disabled');
            $('#J_autoFixed').attr('disabled', 'disabled');
            $('#J_hideOnPass').attr('disabled', 'disabled');
            autoRuning = true;

            // 清除用例状态
            $('.node-item').css('color', '').css('display', '');
            autoNext();
        });

        // 发现错误时自动修复
        $('#J_autoFixed').click(function(){
            if(this.checked){
                autoFixed = true;
            }else{
                autoFixed = false;
            }
        });

        // 隐藏测试通过的文件
        $('#J_hideOnPass').click(function(){
            if(this.checked){
                hideOnPass = true;
            }else{
                hideOnPass = false;
            }
        });

        // 保持检查结果在可视范围内
        // $(window).scroll(function(){
        //     if($(window).scrollTop() > 137){
        //         $('.main-wrap').css('padding-top', $(window).scrollTop() - 137);
        //     }else{
        //         $('.main-wrap').css('padding-top', 0);
        //     }
        // });
    }

    // 静态检查
    function staticCheck(node){
        $("#J_result").html();

        $.getJSON('./staticcheck.php?file=' + node.data.dir + '&autoFixed=' + autoFixed, function(data){
                        data.file = node.data.dir.replace('../../../src/', '');
                        $("#J_staticCheck").html(Mustache.render(testCaseTpl, data));

                        // 在节点上标出检查结果（忽略用例的检查结果）
                        if(data.encodingCheck.status == 'failure' || 
                           data.BombCheck.status == 'failure' ||
                           data.tabCheck.status == 'failure'){
                            node.el.css('color', '#FF0000');
                        }else{
                            autoRuning && hideOnPass && node.el.hide();
                        }
                        
                        autoRuning && autoNext();
                    });
    }

    //动态检查
    function syntaxCheck(node){

    }

    //文档预览
    function docPreview(node){
        if(!docTpl) return;

        $.getJSON('./doc.php?file=' + node.data.dir, function(data){
            $("#J_doc").html('');
            data.forEach(function(item){
                $("#J_doc")[0].innerHTML += Mustache.render(docTpl, item, true);
            });
            SyntaxHighlighter.highlight();
        });
    }

    window.app = {
        run: function(){
            $.get('./docTpl.html', function(tpl){
                        docTpl = tpl;
                    });
            $.getJSON('./getFiles.php', function(data){
                        initTree(data);
                        initTab();
                        flatteningTreeDates(treeInstance);
                        treeInstance.children[0].expend();
                        initToolbar();

                    });
        }
    };
})(window);