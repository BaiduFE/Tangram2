///import baidu.dom;

/**
 * @fileoverview
 * @name baidu.dom.each
 * @author meizz
 * @create 2012-06-05
 * @modify
 */

/**
 * @description 枚举当前 TangramDom 对象里的所有 DOM 元素，并执行指定的函数
 * 指定的函数参数（index[, dom]），函数里的 this 指向 DOM 元素
 * @function
 * @name baidu.dom().each()
 * @grammar baidu.dom(args).each(iterator)
 * @param   {Function}      iterator    迭代器
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象                tangramDom(this)
 */
baidu.dom.extend({
    each : function (iterator) {
        baidu.check("function", "baidu.dom.each");
        var i, result,
            n = this.length;

        for (i=0; i<n; i++) {
            result = iterator.call( this[i], i, this[i], this );

            if ( result === false || result == "break" ) { break;}
        }

        return this;
    }
});
