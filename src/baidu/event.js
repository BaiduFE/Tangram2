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
    var e, t;
    this._type_ = "$Event";

    if (typeof event == "object") {
        this.origin = event;
        baidu.extend(this, event);
    }

    // event.type
    typeof event == "string" && (this.type = event);

    // event.timeStamp
    this.timeStamp = new Date().getTime();

    if (e = this.origin) {

        // event.target
        this.target = e.srcElement || ((t=e.target) ? (t.nodeType==1?t:t.parentNode) : null);

    }

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
