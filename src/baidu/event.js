///import baidu;
///import baidu.type;
///import baidu.each;
///import baidu.createChain;
/**
 * @fileoverview
 * @name baidu.event
 * @author meizz
 * @create 2012-06-14
 * @modify
 */

/**
 * 对系统 event 对象进行封装，主要是解决浏览器兼容问题，并且做了功能增强
 *
 * @grammer baidu.event([event])
 * @param   {Event}         event   系统 event 对象
 * @return  {TangramEvebt}          返回 new TangramEvent 对象
 */
baidu.createChain("event",

// 执行方法
function(event, json){
    switch (baidu.type(event)) {
        // event
        case "object" :
            return new baidu.$Event(event);
            break;

        case "$Event" :
            return event;
            break;

        // event type
        case "string" :
            var e = new baidu.$Event(event);
            typeof json == "object" && baidu.each(e, json);
            return e;
            break;
    }
},

// constructor
function(event){
    var e, t, f;
    var me = this;

    this._type_ = "$Event";

    if (typeof event == "object" && event.type) {
        me.origin = e = event;

        me.type = e.type;
        me.target = me.srcElement = e.srcElement || ((t=e.target) ? (t.nodeType==1?t:t.parentNode) : null);
        me.relatedTarget = e.relatedTarget || ((t=e.fromElement) ? (t===e.target?e.toElement:t) : null);

        me.keyCode = me.which = e.keyCode || e.which;

        baidu.each( "altKey clientX clientY ctrlKey metaKey screenX screenY shiftKey".split(" "), function(item){
            me[ item ] = e[ item ];
        });

        var doc = document.documentElement, body = document.body;
        me.pageX = e.pageX || (e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft  || body && body.clientLeft || 0));
        me.pageY = e.pageY || (e.clientY + (doc && doc.scrollTop  ||  body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0));

        me.data;
    }

    // event.type
    typeof event == "string" && (this.type = event);

    // event.timeStamp
    this.timeStamp = new Date().getTime();

// 扩展两个常用方法
}).extend({
    // 阻止事件冒泡
    stopPropagation : function() {
        var e = this.origin;

        e && (e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true);
    }

    // 阻止事件默认行为
    ,preventDefault : function() {
        var e = this.origin;

        e && (e.preventDefault ? e.preventDefault() : e.returnvalue = false);
    }
});
