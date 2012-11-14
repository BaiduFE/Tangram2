var treedata = {
    children: [{
        children: apis.children || [],
        name: "baidu",
        type: "folder"
    }, {
        children: [],
        name: "baidu.js",
        type: "file"
    }]
};
var instance = new tree(treedata, $('#J_tree'));
$(instance).bind('nodefocus', function(e, node){
    console.log(node);
    $('#J_tree').find('.focus').removeClass('focus');
    node.el.addClass("focus");
});
instance.render();