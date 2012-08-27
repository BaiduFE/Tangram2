///import baidu;
///import baidu.merge;
///import baidu.query;
///import baidu.createChain;

/**
 * @fileoverview DOM操作链式语法头
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * @description 生成DOM操作链头
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(selector[, context])
 * @param {Null|Undefined} selector 非正常的对象
 * @return {TangramDom} 空TangramDom对象
 * @meta standard
 */

/**
 * @description 从文档中获取指定的DOM元素
 * @function 
 * @name baidu.dom.g
 * @grammar baidu.dom.g(id)
 * @param {String|Element} id 元素的ID名称或者直接传入元素本身
 * @return {Element} 如果传入的ID是不存在的则返回Null
 */

/**
 * @description 创建一个空的TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom("")
 * @param   {String}    selector    空字符串
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建一个空的TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(null)
 * @param   {Null}      selector    null对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建一个空的TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom()
 * @param   {undefined} selector    undefined未定义
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(selector[, context])
 * @param   {String}        selector    CSS选择器字符串
 * @param   {Document}      context     [可选]指选择器的范围
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @name baidu.dom()
 * @function 
 * @grammar baidu.dom(HTMLElement)
 * @param   {HTMLElement}   HTMLElement DOM对象（包括Document）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(Array)
 * @param   {Array}         Array       一组DOM对象（包括Document）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(TangramDom)
 * @param   {TangramDom}    selector    TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 通过传入 HTMLString 创建TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(HTMLString)
 * @param   {String}        selector    HTMLString
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 在dom.onready时运行指定函数
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(fn)
 * @param   {Function} fn Function函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.createChain("dom",

// method function


function(selector, context) {
    var e, me = new baidu._private_.$DOM(context);

    // Handle $(""), $(null), or $(undefined)
    if (!selector) {
        return me;
    }

    // Handle $($DOM)
    if (selector._type_ == "$DOM") {
        return selector;

    // Handle $(DOMElement)
    } else if (selector.nodeType || selector == selector.window) {
        me[0] = selector;
        me.length = 1;
        return me;

    // Handle $(Array) or $(Collection) or $(NodeList)
    } else if (selector.length && me.toString.call(selector) != "[object String]") {
        return baidu.merge(me, selector);

    } else if (typeof selector == "string") {
        // HTMLString
        if (selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">" && selector.length > 3) {
            if ( baidu.dom.createElements ) {
                baidu.merge( me, baidu.dom.createElements(selector) );
            }

        // baidu.query
        } else {
            baidu.query(selector, context, me);
        }
    
    // document.ready
    } else if (typeof selector == "function") {
        return me.ready ? me.ready(selector) : me;
    }

    return me;
},

// constructor
function(context) {
    this.length = 0;
    this._type_ = "$DOM";
    this.context = context || document;
}

).extend({

    /**
     * @description 取得 TangramDom 对象里的 length
     * @name baidu.dom().size()
     * @function 
     * @grammar TangramDom.size()
     * @return  {Number}    TangramDom对象里DOM元素的个数
     */
    
    size: function() {
        return this.length;
    }

    ,splice : function(){}

    /**
     * @description 按指定序号返回TangramDom对象里的DOM元素，如果不传序号则返回所有的DOM对象
     * @name baidu.dom().get()
     * @function 
     * @grammar TangramDom.get([index])
     * @param   {Number}    index   序号
     * @return  {Array}     TangramDom对象里DOM元素
     */
    ,
    get: function(index) {

        if ( typeof index == "number" ) {
            return index < 0 ? this[this.length + index] : this[index];
        }

        return Array.prototype.slice.call(this, 0);
    }

    ,toArray: function(){
        return this.get();
    }

});
