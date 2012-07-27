///import baidu.dom;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-01
 * @modify
 */

/**
 * @description 截取一段DOM对象
 *
 * @function
 * @name baidu.unique
 * @grammar $DOM.unique(start[, end])
 * @param   {Number}        start   起始位置
 * @param   {Number}        end     [可选]结束位置
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    slice : function (start, end) {
        baidu.paramCheck("number(,number)?","baidu.dom.slice");
        return baidu.dom( this.toArray().slice(start, end) );
    }
});
