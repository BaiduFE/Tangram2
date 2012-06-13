///import baidu;
///import baidu.merge;
///import baidu.selector;
///import baidu.createChain;

/**
 * @fileoverview
 * @param baidu.dom
 * @author meizz
 * @create 2012-05-20
 * @modify 
 */

/**
 * 创建一个空的TangramDom对象
 * @grammer baidu.dom("")
 * @param   {String}    selector    空字符串
 * @return  {TangramDom}
 */
/**
 * 创建一个空的TangramDom对象
 * @grammer baidu.dom(null)
 * @param   {Null}      selector    null对象
 * @return  {TangramDom}
 */
/**
 * 创建一个空的TangramDom对象
 * @grammer baidu.dom()
 * @param   {undefined} selector    undefined未定义
 * @return  {TangramDom}
 */
/**
 * 创建TangramDom对象
 * @grammer baidu.dom(selector[, context])
 * @param   {String}        selector    CSS选择器字符串
 * @param   {Document}      context     [可选]指选择器的范围
 * @return  {TangramDom}
 */
/**
 * 创建TangramDom对象
 * @grammer baidu.dom(HTMLElement)
 * @param   {HTMLElement}   HTMLElement DOM对象（包括Document）
 * @return  {TangramDom}
 */
/**
 * 创建TangramDom对象
 * @grammer baidu.dom(Array)
 * @param   {Array}         Array       一组DOM对象（包括Document）
 * @return  {TangramDom}
 */
/**
 * 创建TangramDom对象
 * @grammer baidu.dom(TangramDom)
 * @param   {TangramDom}    selector    TangramDom对象
 * @return  {TangramDom}
 */
/**
 * 通过传入 HTMLString 创建TangramDom对象
 * @grammer baidu.dom(HTMLString)
 * @param   {String}        selector    HTMLString
 * @return  {TangramDom}
 */
/**
 * 在dom.onready时运行指定函数
 * @grammer baidu.dom(fn)
 * @param   {Function}      selector    Function函数
 * @return  {TangramDom}
 */
baidu.createChain("dom",

    // method function
    function(selector, context){
        var e,
            me = new baidu.dom.$Chain(context);

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

        // Handle $(Array) or $(Collection)
        } else if (selector.length && me.toString.call(selector) != "[object String]" ) {
            baidu.merge(me, selector);
            return me;

        } else if (typeof selector == "string") {

            // HTMLString
            if (selector.charAt(0) == "<" && selector.charAt(selector.length-1) == ">" && selector.length > 3) {
                // [TODO] 0531 HTMLString 模式暂缓

            // baidu.selector
            } else {
                baidu.selector(selector, context, me);
            }
        }

        return me;
    },

    // constructor
    function(context) {
        this.length = 0;
        this._type_ = "$DOM";
        this.context = context || document;
    }

).extend ({

    /**
     * 取得 TangramDom 对象里的 length
     * @grammer TangramDom.size()
     * @return  {Number}    TangramDom对象里DOM元素的个数
     */
    size : function(){return this.length;}

    /**
     * 按指定序号返回TangramDom对象里的DOM元素，如果不传序号则返回所有的DOM对象
     * @grammer TangramDom.get([index])
     * @param   {Number}    index   序号
     * @return  {Array}     TangramDom对象里DOM元素
     */
    ,get : function(index){

        if ( typeof index == "number" ) {
            return index < 0 ? this[this.length + index] : this[index];
        }

        return Array.prototype.slice.call(this, 0);
    }

});
