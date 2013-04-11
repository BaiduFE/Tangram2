///import baidu.dom;
///import baidu.dom.pushStack;

/**
 * @description 返回上一个dom对象
 * @function
 * @name baidu.dom().end()
 * @grammar baidu.dom(args).end()
 * @return {TangramDom} 返回前一个dom对象
 */
baidu.dom.extend({

    end : function () {
        return this.prevObject || baidu.dom(null);
    }

});
