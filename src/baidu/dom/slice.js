///import baidu.dom;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-01
 * @modify 2012-07-27 meizz end为undefined时在IE浏览器里出错
 */

/**
 * @description 截取一段DOM对象
 * @function
 * @name baidu.dom().slice()
 * @grammar baidu.dom(args).slice(start[, end])
 * @param   {Number}        start   起始位置
 * @param   {Number}        end     [可选]结束位置
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */

baidu.dom.extend({
    slice : function(){
        var slice = Array.prototype.slice;

        return function (start, end) {
            baidu.check("number(,number)?","baidu.dom.slice");

            // ie bug
            // return baidu.dom( this.toArray().slice(start, end) );
            return baidu.dom( slice.apply(this, arguments) );
        }
    }()
});
