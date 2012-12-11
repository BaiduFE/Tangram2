define(function(require, exports) {
    require('shCore');
    require('shBrushJScript');
    var Mustache = require('mustache');
    var JSHINT = require('jshint').JSHINT;
    var Tools = require('Tools');
    var Console = require('Console');
    var toolbar;

    seajs.use('App', function(app){
        toolbar = app.toolbar;
    });

    var autoRuning = false,         // 是否处于自动测试状态
        failureList = [],           // 自动测试时检查失败的节点
        hideOnPass = false,         // 是否隐藏测试通过的节点
        docTpl = '',                // 文档预览的模板
        flattenedTreeDates = [],    // 扁平化后的树的数据
        currentNode,                // 当前选中节点
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

    // 获取文档预览的模板
    $.get('./docTpl.html', function(tpl){
                docTpl = tpl;
            });

    // 设置自动运行的状态
    function setAutoRuningStatus(flag){
        autoRuning = flag;
    }

    // 设置是否隐藏测试通过的节点
    function setHideOnPass(flag){
        hideOnPass = flag;
    }

    // 设置扁平化的树数据
    function setFlatteningTreeDates(datas){
        flattenedTreeDates = datas;
    }

    // 设置当前选中的节点
    function setCurrentNode(node){
        currentNode = node;
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

                seajs.use('App', function(app){
                    app.setAutoRuningStatus(false);
                });
                
                // currentNode.el.removeClass("focus");
                // currentNode = null;
                window.scrollTo(0, 0);

                // 显示统计结果
                // Console.log(failureList);
                // failureList = [];
                Console.groupEnd();
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
                    // 10秒过后认为用例超时，直接进入下一个API
                    Console.log();
                    autoNext();
                }, 10000);
            }
        }
    })();

    function runCheck(type, node){
        $("#J_appDesc").hide();
        $(".tabs").show();
        checkMode[type](node);
    }

    var checkMode = {
        /**
         * 单元测试
         */
        unitTest: function(node){
            var api = node.data.dir.replace('../../../src/', '').replace('.js', '').replace(/\//g, '.'),
                unitUrl = location.href.replace('index.php', '') + '../br/run.php?case=' + api;

            if($("#J_unitTestFrame").length === 0){
                $('#J_unitTest').html('<iframe id="J_unitTestFrame" src="" frameborder="no" scrolling="auto" ></iframe>');
            }
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

                            var log = {
                                'api': node.data.dir.replace('../../../src/', '').replace('.js', '').replace(/\//g, '.')
                            };

                            // 在节点上标出检查结果（忽略用例的检查结果）
                            if(data.conflictCheck.status == 'failure' || 
                               data.BombCheck.status == 'failure' ||
                               data.tabCheck.status == 'failure'){
                                
                                failureList.push(node);
                                node.el.css('color', '#F00');

                                log.level = 'error';
                                log.desc = '静态检查不通过';
                            }else{
                                autoRuning && hideOnPass && node.el.hide();
                                if(data.encodingCheck.status == 'warning'){
                                    log.level = 'warning';
                                    log.desc = '静态检查编码异常';
                                }else{
                                    node.el.css('color', '#00F');
                                    log.level = 'pass';
                                    log.desc = '静态检查通过';
                                }
                            }
                            
                            Console.log(log);
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

                var log = {
                    'api': node.data.dir.replace('../../../src/', '').replace('.js', '').replace(/\//g, '.')
                };

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
                    // TODO 不能匹配出所有错误
                    if(/(semicolon|debugger|Extra\scomma|is\snot\sdefined)/.test(item.reason) && !/nodeType/.test(item.evidence)){
                        errors++;
                        failureList.push(node);
                        html += '<li><p><span class="line">Line ' + item.line + '</span>:<span class="code">' + Tools.encodeHTML(item.evidence) + '</span></p>'+
                            '<p>' + item.reason + '</p></li>';
                    }
                });

                if(errors > 0){
                    // 在节点上标出检查结果
                    node.el.css('color', '#FF0000');
                    log.level = 'error';
                    log.desc = '语法检查不通过';
                }else{
                    node.el.css('color', '#00F');
                    html = '没有发现语法错误';
                    autoRuning && hideOnPass && node.el.hide();
                    log.level = 'pass';
                    log.desc = '语法检查通过';
                }

                Console.log(log);

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

    exports.autoNext = autoNext;
    exports.runCheck = runCheck;
    exports.setAutoRuningStatus = setAutoRuningStatus;
    exports.setFlatteningTreeDates = setFlatteningTreeDates;
    exports.setHideOnPass = setHideOnPass;
    exports.setCurrentNode = setCurrentNode;
});