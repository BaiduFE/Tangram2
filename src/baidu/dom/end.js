///import baidu.dom;

/**
 * @description 返回上一个集合
 * @function
 * @name baidu.dom().end()
 * @grammar baidu.dom(args).end()
 * @return {TangramDom} 返回上一个的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    end : function ( ) {
        return this.prevObject || baidu.dom();
    }
});
