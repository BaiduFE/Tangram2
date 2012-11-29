var treeDatas;
var testCaseTpl = '<h1 class="test-header">{{file}}</h1>' +
                        '<ul class="test-cases">' +
                            '<li class="{{encodingCheck.status}}"><span>文件编码检查：{{encodingCheck.status}}；当前文件编码：{{encodingCheck.msg}}</span></li>' +
                            '<li class="{{BombCheck.status}}"><span>文件Bomb头检查：{{BombCheck.status}}</span></li>' +
                            '<li class="{{tabCheck.status}}"><span>文件缩进检查：{{tabCheck.status}}</span></li>' +
                            '<li class="{{testCaseCheck.status}}">' +
                                '<span>关联用例检查：{{testCaseCheck.status}}；</span>' +
                                '<span>文件最后修改时间：{{testCaseCheck.msg.srcLastModify}}；</span>' +
                                '<span>用例最后修改时间：{{testCaseCheck.msg.testCaseLastModify}}</span>' +
                            '</li>' +
                        '</ul>';

function initApp(){
    var instance = new tree(treeDatas, $('#J_tree'));

    $(instance).bind('treerender', function(e, node){
        node.children[0].expend();
    });

    $(instance).bind('nodefocus', function(e, node){
        if(node.data.type == "file"){
            $('#J_tree').find('.focus').removeClass('focus');
            node.el.addClass("focus");
            fileStaticCheck(node);
        }
    });

    instance.render();
}

function fileStaticCheck(node){
    $("#J_result").html();

    $.getJSON('./staticcheck.php?file=' + node.data.dir, function(data){
                    data.file = node.data.dir.replace('../../../src/', '');
                    $("#J_result").html(Mustache.render(testCaseTpl, data));
                });
    
}

$.getJSON('./getFiles.php', function(data){
                    console.log(data);
                    treeDatas = data;

                    initApp();
                });

