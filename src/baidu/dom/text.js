/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 得到匹配元素集合中每个元素的文本内容结合,包括他们的后代。
 * @function 
 * @name baidu.dom().text()
 * @grammar baidu.dom(args).text()
 * @param {Null} null 不传入参数
 * @return {String|Undefined} 得到匹配元素集合中每个元素的文本内容结合,包括他们的后代。
 */
/**
 * @description 设置匹配元素集合中每个元素的文本内容为指定的文本内容。
 * @function 
 * @name baidu.dom().text()
 * @grammar baidu.dom(args).text(text)
 * @param {String} text 用于设置匹配元素内容的文本
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 设置匹配元素集合中每个元素的文本内容为指定的文本内容。
 * @function 
 * @name baidu.dom().text()
 * @grammar baidu.dom(args).text(function(index, text))
 * @param {Function} function(index, text) 用来返回设置文本内容的一个函数。接收元素的索引位置和元素旧的文本值作为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

///import baidu;
///import baidu.dom;
///import baidu.each;
///import baidu.support;

baidu.dom.extend({
    text: function(value){
        /**
         * Sizzle.getText 
         * Utility function for retreiving the text value of an array of DOM nodes
         * @param {Array|Element} elem
         */
        var getText = function( elem ) {
            var i, node,
                nodeType = elem.nodeType,
                ret = "";

            if ( nodeType ) {
                if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                    // Use textContent || innerText for elements
                    if ( typeof elem.textContent === 'string' ) {
                        return elem.textContent;
                    } else if ( typeof elem.innerText === 'string' ) {
                        // Replace IE's carriage returns
                        return elem.innerText.replace( /\r/g, '' );
                    } else {
                        // Traverse it's children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText( elem );
                        }
                    }
                } else if ( nodeType === 3 || nodeType === 4 ) {
                    return elem.nodeValue;
                }
            } else {

                // If no nodeType, this is expected to be an array
                for ( i = 0; (node = elem[i]); i++ ) {
                    // Do not traverse comment nodes
                    if ( node.nodeType !== 8 ) {
                        ret += getText( node );
                    }
                }
            }
            return ret;
        };

        switch(typeof value){
            case 'undefined':
                var ele = this||{};
                return getText(ele);
            break;

            case 'string':
                baidu.each(this, function(item,index){
                    //empty方法
                    while ( item.firstChild ) {
                        item.removeChild( item.firstChild );
                    };
                    if ( item.nodeType === 1 ) {
                       item.appendChild( ( item && item.ownerDocument || document ).createTextNode( value ) );
                    };
                });
            break;

            case 'function':
                baidu.each(this, function(item,index){
                    baidu.dom(item).text( value.call(item, index, getText(item)) );
                });
            break;

            default:
            break;
        };

        return this;
    }
});
