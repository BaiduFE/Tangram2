/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 从匹配的第一个元素中获取HTML内容。
 * @function 
 * @name baidu.dom().html()
 * @grammar baidu.dom(args).html()
 * @return {String|Undefined} HTML内容
 * @example
 在一个HTML文档中，我们可以使用.html()方法来获取任意一个元素的内容。
 如果选择器匹配多于一个的元素，那么只有第一个匹配元素的 HTML 内容会被获取。

 示例代码：
 //HTML代码片段
 <div>
   <h1>title</h1>
   <p>content</p>
 </div>

 //获取HTML
 baidu('div').html();  //得到 <h1>title</h1><p>content</p>

 */
 /**
 * @description 设置每一个匹配元素的html内容。
 * @function 
 * @name baidu.dom().html()
 * @grammar baidu.dom(args).html(htmlString)
 * @param {String} htmlString 用来设置每个匹配元素的一个HTML 字符串。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 我们可以使用.html()来设置元素的内容，在这些元素的任何内容完全被新的内容取代。
 如果匹配多个元素，则将会改变所有的HTML，符合get first set all原则。

 示例代码：
 //HTML代码片段
 <div>
   <h1>title</h1>
   <p>content</p>
 </div>

 //重置HTML
 baidu('div').html('<input>');
 
 //生成代码
 <div>
   <input>
 </div>
 
 */
 /**
 * @description 设置每一个匹配元素的html内容。
 * @function 
 * @name baidu.dom().html()
 * @grammar baidu.dom(args).html(fn)
 * @param {Function} fn 用来返回设置HTML内容的一个函数。接收元素的索引位置和元素旧的HTML作为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom(args).html(function(index, html))
 */

///import baidu._util_.support;
///import baidu.forEach;
///import baidu.dom.empty;
///import baidu.dom.append;

baidu.dom.extend({
    html: function(value){

        var bd = baidu.dom,
            bt = baidu._util_,
            me = this,
            isSet = false,
            htmlSerialize = !!bt.support.dom.div.getElementsByTagName('link').length,
            leadingWhitespace = (bt.support.dom.div.firstChild.nodeType === 3),
            result;

        //当dom选择器为空时
        if( !this.size() )
            switch(typeof value){
                case 'undefined':
                    return undefined;
                default:
                    return me;
            }
        
        var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
        "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            rnoInnerhtml = /<(?:script|style|link)/i,
            rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
            rleadingWhitespace = /^\s+/,
            rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            wrapMap = {
                option: [ 1, "<select multiple='multiple'>", "</select>" ],
                legend: [ 1, "<fieldset>", "</fieldset>" ],
                thead: [ 1, "<table>", "</table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
                area: [ 1, "<map>", "</map>" ],
                _default: [ 0, "", "" ]
            };
        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;

        // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
        // unless wrapped in a div with non-breaking characters in front of it.
        if ( !htmlSerialize )
            wrapMap._default = [ 1, "X<div>", "</div>" ];

        baidu.forEach( me, function( elem, index ){
            
            if( result )
                return;

            var tangramDom = bd(elem);

            switch( typeof value ){
                case 'undefined':
                    result = ( elem.nodeType === 1 ? elem.innerHTML : undefined );
                    return ;
 
                case 'number':
                    value = String(value);

                case 'string':
                    isSet = true;

                    // See if we can take a shortcut and just use innerHTML
                    if ( !rnoInnerhtml.test( value ) &&
                        ( htmlSerialize || !rnoshimcache.test( value )  ) &&
                        ( leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                        !wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

                        value = value.replace( rxhtmlTag, "<$1></$2>" );

                        try {

                            // Remove element nodes and prevent memory leaks
                            if ( elem.nodeType === 1 ) {
                                tangramDom.empty();
                                elem.innerHTML = value;
                            }

                            elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                        } catch(e) {}
                    }

                    if ( elem ) {
                        me.empty().append( value );
                    }

                break;

                case 'function':
                    isSet = true;
                    tangramDom.html(value.call(elem, index, tangramDom.html()));
                break;
            };
        });
        
        return isSet ? me : result;
    }
});