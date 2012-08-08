///import baidu;
///import baidu.type;
///import baidu.id;
///import baidu.each;
///import baidu.createChain;
/*
 * @fileoverview
 * @name baidu.event
 * @author meizz, dron
 * @create 2012-06-14
 * @modify
 */

/**
 * @description 对系统event对象进行封装，主要是解决浏览器兼容问题，并且做了功能增强
 * @function
 * @name baidu.event()
 * @grammar baidu.event([event])
 * @param   {Event}         event   系统 event 对象
 * @return  {TangramEvebt}          返回 new TangramEvent 对象
 */

baidu.createChain("event",

// 执行方法
function(){
    var lastEvt = {};
    return function( event, json ){
        switch( baidu.type( event ) ){
            // event
            case "object":
                return lastEvt.originalEvent === event ? lastEvt : ( lastEvt = new baidu.$Event( event ) );

            case "$Event":
                return event;

            // event type
            case "string" :
                var e = new baidu.$Event( event );
                typeof json == "object" && baidu.each( e, json );
                return e;
        }
    }
}(),

// constructor
function( event ){
    var e, t, f;
    var me = this;

    this._type_ = "$Event";

    if( typeof event == "object" && event.type ){
        me.originalEvent = e = event;

        baidu.each( "altKey bubbles button buttons cancelable clientX clientY ctrlKey metaKey commandKey currentTarget fromElement screenX screenY shiftKey toElement type view which triggerData".split(" "), function(item){
            me[ item ] = e[ item ];
        });

        me.target = me.srcElement = e.srcElement || (( t = e.target ) ? ( t.nodeType == 3 ? t.parentNode : t ) : null);
        me.relatedTarget = e.relatedTarget || (( t = e.fromElement ) ? (t === e.target ? e.toElement : t ) : null);

        me.keyCode = me.which = e.keyCode || e.which;

        // Add which for click: 1 === left; 2 === middle; 3 === right
        if( !me.which && e.button !== undefined )
            me.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );

        var doc = document.documentElement, body = document.body;

        me.pageX = e.pageX || (e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0));
        me.pageY = e.pageY || (e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0));

        me.data;
    }

    // event.type
    typeof event == "string" && ( this.type = event );

    // event.timeStamp
    this.timeStamp = new Date().getTime();
}

// 扩展两个常用方法
).extend({
    // 阻止事件冒泡
    stopPropagation : function() {
        var e = this.originalEvent;

        e && (e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true);
    }

    // 阻止事件默认行为
    ,preventDefault : function() {
        var e = this.originalEvent;

        e && (e.preventDefault ? e.preventDefault() : e.returnValue = false);
    }
});
