/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    html: function(value){
        var html = function (ele){
            return ele.nodeType === 1 ? ele.innerHTML.toLowerCase() : null;
        };
        var ele = this[0]||{};
        switch(typeof value){
            case 'undefined':
                return html(ele);
            break;

            case 'string':
                var wrapMap = {
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
                
                // Make sure that link elements get serialized correctly by innerHTML
                // This requires a wrapper element in IE
                var div = document.createElement( "div" );
                var htmlSerialize = !!div.getElementsByTagName("link").length; 
                
                // IE can't serialize <link> and <script> tags normally
                if ( htmlSerialize ) {
                    wrapMap._default = [ 1, "div<div>", "</div>" ];
                };
                var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig;
                if(!(/<(?:script|style)/i.test(value)) &&
                    // IE strips leading whitespace when .innerHTML is used
                    ( div.nodeType === 3 || !(/^\s+/.test( value )) ) &&
                    !wrapMap[(/<([\w:]+)/.exec( value ) || ["", ""] )[1].toLowerCase() ]){

                        baidu.each(this, function(item,index){
                            if ( item.nodeType === 1 ) {
                                //to do 去掉已经移除的HTML中绑定过的事件
                                item.innerHTML = value;
                            }
                        });
					ele = 0;
                }
                if(ele){
                	baidu.dom(ele).empty().append(value);
                }
            break;

            case 'function':
                baidu.each(this, function(item,index){
                    baidu.dom(item).html(value.call(item, index, html(item)));
                });
            break;

            default:
            break;
        };

        return this;
    }
});
