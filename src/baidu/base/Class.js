///import baidu.id;
///import baidu.base;
///import baidu.type;
///import baidu.extend;

/**
 * @description Tangram继承机制提供的一个基类，用户可以通过继承baidu.base.Class来获取它的属性及方法。
 *
 * @author meizz
 * @create 2005.02.28
 * @modify 2012.09.27   将原来的BaseEvent部分合并进来
 *
 * @class
 * @name baidu.base.Class
 * @grammar new baidu.base.Class()
 * @remark baidu.base.Class和它的子类的实例均包含一个全局唯一的标识guid。guid是在构造函数中生成的，因此，继承自baidu.base.Class的类应该直接或者间接调用它的构造函数。<br>baidu.base.Class的构造函数中产生guid的方式可以保证guid的唯一性，及每个实例都有一个全局唯一的guid。
 */
baidu.base.Class = (function() {
    var instances = (baidu._global_ = window[baidu.guid])._instances;
    instances || (instances = baidu._global_._instances = {});

    // constructor
    return function() {
        this.guid = baidu.id();
        this._decontrol_ || (instances[this.guid] = this);
    }
})();


baidu.extend(baidu.base.Class.prototype, {
    /*
     * 重载了默认的toString方法，使得返回信息更加准确一些。
     * 20111219 meizz 为支持老版本的className属性，以后统一改成 _type_
     * @return {string} 对象的String表示形式
     */
    toString: baidu.base.Class.prototype.toString = function(){
        return "[object " + ( this._type_ || "Object" ) + "]";
    }

    /**
     * @description 类的析构方法，且触发 ondispose 事件，此方法执行后 .disposed 值为 true
     * @name obj.dispose
     * @function 
     * @grammar obj.dispose()
     * TODO: 将_listeners中绑定的事件剔除掉
     */
    ,dispose: function() {
        if (this.fire("ondispose")) {
            // decontrol
            delete baidu._global_._instances[this.guid];

            if (this._listeners_) {
                for (var item in this._listeners_) {
                    this._listeners_[item].length = 0;
                    delete this._listeners_[item];
                }
            }

            for (var pro in this) {
                if ( !baidu.isFunction(this[pro]) ) delete this[pro];
                else this[pro] = baidu.base.blank;
            }

            this.disposed = true;   //20100716
        }
    }

    /**
     * @description 派发自定义事件，使得绑定到自定义事件上面的函数都会被执行。引入baidu.base.Event后，Class的子类实例才会获得该方法。
     * @grammar instance.fire(event[, options])
     * @param {baidu.base.Event|String}   event   Event对象，或事件名称(1.1.1起支持)
     * @param {Object}                  options 扩展参数,所含属性键值会扩展到Event对象上(1.2起支持)
     * @remark 处理会调用通过on绑定的自定义事件回调函数之外，还会调用直接绑定到对象上面的自定义事件。例如：<br>
        myobj.onMyEvent = function(){}<br>
        myobj.on("onMyEvent", function(){});
     */
    ,fire: function(event, options) {
        baidu.isString(event) && (event = new baidu.base.Event(event));

        var i, n, list
            , t=this._listeners_
            , type=event.type
            // 20121023 mz 修正事件派发多参数时，参数的正确性验证
            , argu=[event].concat( Array.prototype.slice.call(arguments, 1) );
        !t && (t = this._listeners_ = {});

        // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
        baidu.extend(event, options || {});

        event.target = event.target || this;
        event.currentTarget = this;

        type.indexOf("on") && (type = "on" + type);

        baidu.isFunction(this[type]) && this[type].apply(this, argu);
        (i=this._options) && baidu.isFunction(i[type]) && i[type].apply(this, argu);

        if (baidu.isArray(list = t[type])) {
            for (i=0, n=list.length; i<n; i++) {
                list[i].apply(this, argu);
            }

            if (list.once) {
                for(i=list.once.length-1; i>-1; i--) list.splice(list.once[i], 1);
                delete list.once;
            }
        }

        return event.returnValue;
    }

    /**
     * @description 事件注册
     * @grammer instance.on(event, handler)
     * @param   {String}    type    事件名
     * @param   {Function}  handler 事件处理函数
     * @return  {Class}     返回实例，以便于链式事件注册 $.on().on()
     */
    ,on: function(type, handler, once) {
        if (!baidu.isFunction(handler)) {
            return this;
        }

        var list, t = this._listeners_;
        !t && (t = this._listeners_ = {});

        type.indexOf("on") && (type = "on" + type);

        !baidu.isArray(list = t[type]) && (list = t[type] = []);
        if (once) {
            !list.once && (list.once = []);
            list.once.push(list.length);
        }
        t[type].push( handler );

        return this;
    }
    // 20120928 mz 取消on()的指定key

    ,once: function(type, handler) {
        return this.on(type, handler, true);
    }
    ,one: function(type, handler) {
        return this.on(type, handler, true);
    }

    /**
     * @description 注销事件处理函数
     * @grammer instance.off([event[, handler]])
     * @param   {String}    type    [可选]事件名
     * @param   {Function}  handler [可选]被注销的函数
     * @return  {Class}     返回实例，以便于链式事件注册 $.on().on()
     */
    ,off: function(type, handler) {
        var i, list,
            t = this._listeners_;
        if (!t) return this;

        // remove all event listener
        if (typeof type == "undefined") {
            for (i in t) {
                delete t[i];
            }
            return this;
        }

        type.indexOf("on") && (type = "on" + type);

        // 移除某类事件监听
        if (typeof handler == "undefined") {
            delete t[type];
        } else if (list = t[type]) {

            for (i = list.length - 1; i >= 0; i--) {
                list[i] === handler && list.splice(i, 1);
            }
        }

        return this;
    }
});


/*
 * @description 按唯一标识guid字符串取得实例对象
 * @modify 2012.12.14 mz 对1.x版本的兼容
 * @function
 * @param   {String}    guid
 * @return  {object}            实例对象
 */
window["baiduInstance"] = function(guid) {
    return window[baidu.guid]._instances[ guid ];
}



/**
 * @class   自定义的事件对象。
 * @name    baidu.base.Event
 * @grammar new baidu.base.Event(type[, target])
 * @param   {string} type    事件类型名称。为了方便区分事件和一个普通的方法，事件类型名称必须以"on"(小写)开头。
 * @param   {Object} [target]触发事件的对象
 */
baidu.base.Event = function(type, target) {
    this.type = type;
    this.returnValue = true;
    this.target = target || null;
    this.currentTarget = null;
    this.preventDefault = function() {this.returnValue = false;};
};


//  2011.11.23  meizz   添加 baiduInstance 这个全局方法，可以快速地通过guid得到实例对象
//  2011.11.22  meizz   废除创建类时指定guid的模式，guid只作为只读属性