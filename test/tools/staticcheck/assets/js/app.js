var treedata = {
    children: [{
        children: apis.children || [],
        folder_id: "0",
        folder_name: "Tangram2.0",
        name: "Tangram2.0"
    }, {
        children: [],
        folder_id: "234",
        folder_name: "baidu.js",
        name: "baidu.js"
    }]
};
var instance = new tree(treedata, $('#J_tree'));
instance.render();