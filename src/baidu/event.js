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
function(event){
    switch (baidu.type(event, json)) {
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
    this._type_ = "$Event";

    typeof event == "object" && (this.origin = event);

    this.type = typeof event == "string" ? event : event.type;
});
