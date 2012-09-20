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
 * @example
 .text()方法的结果是由所有匹配元素包含的文本内容组合起来的文本，
 由于不同的浏览器对HTML分析器的不同，在返回的文本换行和其他空格可能会有所不同。

 另：.text() 方法不要使用在 input 元素上，输入的文本需要使用.val()方法。 

 示例代码： 
 //HTML代码片段
 <div>
  <h1>baidu</h1>
  <h2>js小组</h2>
 </div>

 //取得内容
 baidu('div').text(); //得到内容 baidu js小组

 */
/**
 * @description 设置匹配元素集合中每个元素的文本内容为指定的文本内容。
 * @function 
 * @name baidu.dom().text()
 * @grammar baidu.dom(args).text(text)
 * @param {String} text 用于设置匹配元素内容的文本
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 设置匹配的所有元素的文本内容，该方法参数中传入HTML字符串，会被自动转义。

 示例代码： 
 //HTML代码片段
 <div></div>

 //取得内容
 baidu('div').text('<p>baidu</p>'); 

 //得到内容
 <div>
   &lt;p&gt;This is a test.&lt;/p&gt;
 </div>
 
 */
/**
 * @description 设置匹配元素集合中每个元素的文本内容为指定的文本内容。
 * @function 
 * @name baidu.dom().text()
 * @grammar baidu.dom(args).text(fn)
 * @param {Function} fn 用来返回设置文本内容的一个函数。接收元素的索引位置和元素旧的文本值作为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").text(function(index, text))
 */

///import baidu;
///import baidu.dom;
///import baidu.dom.empty;
///import baidu.forEach;
///import baidu.dom.append;
///import baidu.support;

baidu.dom.extend({
    text: function(value){

        var bd = baidu.dom,
            me = this,
            isSet = false,
            result;

        //当dom选择器为空时
        if(this.size()<=0){
            switch(typeof value){
                case 'undefined':
                    return undefined;
                break;
                default:
                    return me;
                break;
            }            
        }

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

        baidu.forEach(me,function(elem, index){
            
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
            };
        });

        return isSet?me:result;
    }
});
