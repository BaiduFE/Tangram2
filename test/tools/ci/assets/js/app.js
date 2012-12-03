(function(window){
    var treeInstance,
        flattenedTreeDates = [],
        autoFixed = false,
        hideOnPass = false,
        autoRuning = false,
        currentCheck = 'unitTest',
        currentNode,
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
                            '</ul>',
        docTpl = '';

    function flatteningTreeDates(node){
        $(node.children).each(function(index, child){
            flattenedTreeDates.push(child);
            if((child.data && child.data.type == 'folder') || child.type == 'folder'){
                child.expend();
                child.collapse();
                flatteningTreeDates(child);
            }
        });
    }

    var autoNext = (function(){
        var i = -1,
            timer;
        return function(){

            timer && clearTimeout(timer);

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
                currentNode = node;
                node.focus();
                runCheck(currentCheck, node);

                timer = setTimeout(function(){
                    autoNext();
                }, 10000);
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
                if(autoRuning){
                    return;
                }
                switch(currentCheck){
                    case "unitTest":
                        runCheck('unitTest', currentNode);
                        break;
                    case "staticCheck":
                        runCheck('staticCheck', currentNode);
                        break;
                    case "syntaxCheck":
                        runCheck('syntaxCheck', currentNode);
                        break;
                    case "docPreview":
                        runCheck('docPreview', currentNode);
                        break;
                    case "src":
                        runCheck('src', currentNode);
                        break;
                    case "unit":
                        runCheck('unit', currentNode);
                        break;
                    default:
                        return;
                }
            }
        });

        treeInstance.render();
    }

    // 初始化tab
    function initTab(){
        $(".tabs li").click(function(){
            // 如果当前没有选中的树节点，或者正处于批量测试过程中，不响应点击
            if(!currentNode || autoRuning){
                return;
            }

            // 清除当前节点的状态
            currentNode.el.css('color', '');

            $(".tabs li").removeClass("current");
            $(this).addClass("current");
            var tabId = $(this).attr('id');
            var tabItemId = tabId.replace('Tab', '');
            $('.tab-item').removeClass("current");
            $('#' + tabItemId).addClass("current");

            var checkType = this.id.replace('J_', '').replace('Tab', '');
            currentCheck = checkType;
            runCheck(checkType, currentNode);
        });
    }

    // 初始化工具栏
    function initToolbar(){
        // 批量测试
        $('#J_autoRun').click(function(){
            if(currentCheck != 'unitTest' && currentCheck != 'staticCheck' && currentCheck != 'syntaxCheck'){
                alert("只有单元测试、静态检查和语法检查支持批量测试！");
                return;
            }
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

    function runCheck(type, node){
        $("#J_appDesc").hide();
        $(".tabs").show();
        switch(type){
            case "unitTest":
                unitTest(node);
                break;
            case "staticCheck":
                staticCheck(node);
                break;
            case "syntaxCheck":
                syntaxCheck(node);
                break;
            case "docPreview":
                docPreview(node);
                break;
            case "src":
                showSrc(node);
                break;
            case "unit":
                showUnit(node);
                break;
            default:
                return;
        }
    }
    
    // 单元测试
    function unitTest(node){
        var api = node.data.dir.replace('../../../src/', '').replace('.js', ''),
            unitUrl = location.href.replace('index.php', '') + '../br/run.php?case=' + api;
        
        $("#J_unitTestFrame").attr('src', unitUrl);
        var interval = setInterval(function(){
            try{
                if(J_unitTestFrame.contentWindow)
                    $("#J_unitTestFrame").css('height', $(J_unitTestFrame.contentWindow.document).height() + 'px');
                else{
                    $("#J_unitTestFrame").css('height', $(J_unitTestFrame.document).height() + 'px');
                }
            }catch(e){
                $("#J_unitTestFrame").css('height', '50px');
            }
        }, 50);
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
                            node.el.css('color', '');
                        }
                        
                        autoRuning && autoNext();
                    });
    }

    //语法检查
    function syntaxCheck(node){
        $.get('./getFileContent.php?file=' + node.data.dir, function(content){
            $("#J_syntaxCheck").html('');
            var filename = node.data.dir.replace('../../../src/', '');
            var html = '<h1 class="test-header">' + filename + '</h1><ul>';
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
                undef: true
            });

            
            $(JSHINT.errors).each(function(index, item){
                if(!item){return};
                if(/(debugger|Extra\scomma|is\snot\sdefined)/.test(item.reason) && !/nodeType/.test(item.evidence)){
                    errors++;
                    html += '<li><p><span class="line">Line ' + item.line + '</span>:<span class="code">' + item.evidence + '</span></p>'+
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
    }

    //文档预览
    function docPreview(node){
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
    }

    //显示源代码
    function showSrc(node){
        $.get('./getFileContent.php?file=' + node.data.dir, function(content){
            $("#J_src").html('<pre class="brush: js"></pre>');
            $("#J_src").find('pre').text(content);
            SyntaxHighlighter.highlight();
        });
    }

    //显示用例
    function showUnit(node){
        $.get('./getFileContent.php?file=' + node.data.dir.replace('src', 'test'), function(content){
            if(content === ''){
                $("#J_unit").html('该接口无用例');
                return;
            }
            $("#J_unit").html('<pre class="brush: js"></pre>');
            $("#J_unit").find('pre').text(content);
            SyntaxHighlighter.highlight();
        });
    }

    window.testDoneCallBack = function(info){
        if(info.failed){
            currentNode.el.css('color', '#FF0000');
        }else{
            autoRuning && hideOnPass && currentNode.el.hide();
            currentNode.el.css('color', '');
        }
        autoRuning && autoNext();
    }

    var toolbar = {
        'init': function(){

        },
        'disable': function(id){

        },
        'enable':function(){

        }
    };

    window.App = {
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