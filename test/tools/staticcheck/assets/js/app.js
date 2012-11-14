var treeDatas;

function initApp(){
    var instance = new tree(treeDatas, $('#J_tree'));

    $(instance).bind('nodefocus', function(e, node){
        node.data.type == "file" && console.log(node.data.dir);
        $('#J_tree').find('.focus').removeClass('focus');
        node.el.addClass("focus");
    });

    instance.render();
}

$.getJSON('./getFiles.php', function(data){
                    console.log(data);
                    treeDatas = data;

                    initApp();
                });