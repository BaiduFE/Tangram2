///import baidu;
///import baidu.plugin;
///import plugin.fx.queue;

baidu.plugin( "dom", {

    clearQueue: function( type ) {
        return this.queue( type || "fx", [] );
    }
});