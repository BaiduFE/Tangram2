var treedata = {
    children: [{
        children: apis.children || [],
        folder_id: "0",
        folder_name: "Tangram2.0",
        name: "Tangram2.0",
        type: "folder"
    }, {
        children: [],
        folder_id: "234",
        folder_name: "baidu.js",
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