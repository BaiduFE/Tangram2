///import baidu.lang.Class;
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 */
/**
 * @description 自定义的事件对象。
 * @class
 * @name     baidu.lang.Event
 * @grammar baidu.lang.Event(type[, target])
 * @param     {string} type     事件类型名称。为了方便区分事件和一个普通的方法，事件类型名称必须以"on"(小写)开头。
 * @param     {Object} [target]触发事件的对象
 * @meta standard
 * @remark 引入该模块，会自动为Class引入3个事件扩展方法：addEventListener、removeEventListener和dispatchEvent。
 * @meta standard
 * @see baidu.lang.Class
 */
baidu.lang.Event = baidu.base.Event;
/**
 * @description 派发自定义事件，使得绑定到自定义事件上面的函数都会被执行。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
 * @name obj.dispatchEvent
 * @grammar obj.dispatchEvent(event, options)
 * @param {baidu.lang.Event|String} event     Event对象，或事件名称(1.1.1起支持)
 * @param {Object}                     options 扩展参数,所含属性键值会扩展到Event对象上(1.2起支持)
 * @remark 处理会调用通过addEventListenr绑定的自定义事件回调函数之外，还会调用直接绑定到对象上面的自定义事件。例如：<br>
myobj.onMyEvent = function(){}<br>
myobj.addEventListener("onMyEvent", function(){});
 */
/**
 * @description 注册对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
 * @name obj.addEventListener
 * @grammar obj.addEventListener(type, handler[, key])
 * @param   {string}   type         自定义事件的名称
 * @param   {Function} handler      自定义事件被触发时应该调用的回调函数
 * @return  {Function}              将用户注入的监听函数返回，以便移除事件监听，特别适用于匿名函数。
 * @remark  事件类型区分大小写。如果自定义事件名称不是以小写"on"开头，该方法会给它加上"on"再进行判断，即"click"和"onclick"会被认为是同一种事件。 
 */



//  2011.12.19  meizz   很悲剧，第三个参数 key 还需要支持一段时间，以兼容老版本脚本
//  2011.11.24  meizz   事件添加监听方法 addEventListener 移除第三个参数 key，添加返回值 handler
//  2011.11.23  meizz   事件handler的存储对象由json改成array，以保证注册函数的执行顺序
//  2011.11.22  meizz   将 removeEventListener 方法分拆到 baidu.lang.Class.removeEventListener 中，以节约主程序代码

/// support magic - Tangram 1.x Code End