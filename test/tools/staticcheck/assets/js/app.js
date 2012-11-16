var treeDatas;
var treeInstance;
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
    treeInstance = new tree(treeDatas, $('#J_tree'));

    $(treeInstance).bind('treerender', function(e, node){
        node.children[0].expend();
    });

    $(treeInstance).bind('nodefocus', function(e, node){
        if(node.data.type == "file"){
            $('#J_tree').find('.focus').removeClass('focus');
            node.el.addClass("focus");
            fileStaticCheck(node);
        }
    });

    treeInstance.render();

}

function fileStaticCheck(node){
    $("#J_result").html();

    $.getJSON('./staticcheck.php?file=' + node.data.dir, function(data){
                    data.file = node.data.dir.replace('../../../src/', '');
                    $("#J_result").html(Mustache.render(testCaseTpl, data));

                    // 在节点上标出检查结果（忽略用例的检查结果）
                    if(data.encodingCheck.status == 'failure' || 
                       data.BombCheck.status == 'failure' ||
                       data.tabCheck.status == 'failure'){
                        node.el.css('color', '#FF0000');
                    }
                    
                    window['autoNext'] && autoRun();
                });
    
}

$.getJSON('./getFiles.php', function(data){
                    console.log(data);
                    treeDatas = data;

                    initApp();
                });

// 被创建有data，被展开有children
// 这段比较挫，暂时没办法优化
function autoRun(){
    var currentNode = window['_tree'];
// debugger;
    while(currentNode.children.length && currentNode.children[0].data.type == "folder"){
        currentNode.children[0].expend();
        currentNode = currentNode.children[0];
    }

    currentNode.data.children.shift();
    currentNode = currentNode.children.shift();
    
    _node = currentNode;
    while(_node && _node.parent.children.length == 0 && _node.parent != window['_tree']){
        _node.parent.parent.children.shift();
        _node.parent.parent.data.children.shift();
        _node = _node.parent;
    }

    // currentNode && console.log(currentNode.data.dir);
    if(currentNode){
        fileStaticCheck(currentNode);
    }else{
        window['autoNext'] = false;
        $('#J_autoRun').removeAttr('disabled');
    }
}

$('#J_autoRun').click(function(){
    $('#J_autoRun').attr('disabled', 'disabled');
    window['autoNext'] = true;

    var _tree = {};
    $.extend(_tree, treeInstance);
    window['_tree'] = _tree;
    autoRun();

});