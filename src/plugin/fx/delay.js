///import baidu.plugin;
///import plugin.fx.queue;

baidu.plugin( "dom", {

    delay: function( duration, type ){
        type = type || "fx";
        return this.queue(type, function( next, hooks ){
            var timer = setTimeout(next, duration || 0);
            hooks.stop = function(){
                clearTimeout( timer );
            }
        });
    }
});