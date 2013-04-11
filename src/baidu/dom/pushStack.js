///import baidu.dom;
///import baidu.merge;

/**
 * @description 压入一个新的集合到栈中，可以通过end方法返回
 * @function
 * @name baidu.dom().pushStack()
 * @grammar baidu.dom(args).pushStack( collection )
 * @param   {Object}            collection    集合（dom对象或者array）
 * @return {TangramDom} 返回新的TangramDom对象    new TangramDom
 */
baidu.dom.extend({

    pushStack : function ( elems ) {
        var ret = baidu.dom();

        baidu.merge(ret, elems);

        ret.prevObject = this;
        ret.context = this.context;

        return ret;
    }
});
