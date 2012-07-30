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
///import baidu.dom.empty;
///import baidu.each;
///import baidu.dom.append;
///import baidu.support;

baidu.dom.extend({
    text: function(value){

        /* Sizzle.getText
         * Utility function for retrieving the text value of an array of DOM nodes
         * @param {Array|Element} elem
         */
        var getText = function( elem ) {
            var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;

            if ( nodeType ) {
                if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (see #11153)
                    if ( typeof elem.textContent === "string" ) {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            ret += getText( elem );
                        }
                    }
                } else if ( nodeType === 3 || nodeType === 4 ) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes
            } else {

                // If no nodeType, this is expected to be an array
                for ( ; (node = elem[i]); i++ ) {
                    // Do not traverse comment nodes
                    ret += getText( node );
                }
            }
            return ret;
        };

        var bd = baidu.dom,
            me = this,
            isSet = false,
            result;

        baidu.each(me,function(elem,index){
            
            var tangramDom = bd(elem);
            if(result){
                return;
            };

            switch(typeof value){
                case 'undefined':
        
                    //get first
                    result = getText(elem);
                    return result;

                break;

                case 'number':
                    value = String(value);
                case 'string':

                    //set all
                    isSet = true;
                    tangramDom.empty().append( ( elem && elem.ownerDocument || document ).createTextNode( value ) );
                break;

                case 'function':

                    //set all
                    isSet = true;
                    tangramDom.text(value.call(elem, index, tangramDom.text()));

                break;

                default:
                break;
            };
        });

        return isSet?me:result;
    }
});
