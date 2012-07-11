///import baidu.dom;
///import baidu.type;
///import baidu.merge;

/**
 * @fileoverview
 * @name baidu.dom.createElements
 * @author meizz
 * @create 2012-07-05
 * @modify
 */

/**
 * 通过 HTMLString 创建 DOM 对象
 *
 * @param   {HTMLString}    htmlstring
 * @return  {HTMLElement}
 */
baidu.dom.createElements = function() {
//    var div     = document.createElement("div"),
    var tagReg  = /^<(\w+)/i,
        tagMap  = {
            area    : [1, "<map>", "</map>"],
            col     : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            legend  : [1, "<fieldset>", "</fieldset>"],
            option  : [1, "<select multiple='multiple'>", "</select>"],
            td      : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            thead   : [1, "<table>", "</table>"],
            tr      : [2, "<table><tbody>", "</tbody></table>"],
            _default: [0, "", ""]
        };

    // 建立映射
    tagMap.optgroup = tagMap.option;
    tagMap.tbody = tagMap.tfoot = tagMap.colgroup = tagMap.caption = tagMap.thead;
    tagMap.th = tagMap.td;

    // 将<script>解析成正常可执行代码
    function parseScript ( box, doc ) {
        var list = box.getElementsByTagName("SCRIPT"),
            i, script, code, item;

        for ( i=list.length-1; i>=0; i-- ) {
            item = list[ i ];
            script = doc.createElement( "SCRIPT" );
            item.id && (script.id = item.id);
            item.src && (script.src = item.src);
            item.type && (script.type = item.type);
            code = item.text || item.textContent;
            script[ item.text ? "text" : "textContent" ] = code;
            item.parentNode.replaceChild( script, item );
        }
    }

    return function( htmlstring, doc ) {
        baidu.isNumber( htmlstring ) && ( htmlstring = htmlstring.toString() );
        doc = doc || document;

        var wrap, depth, box,
            hs  = htmlstring,
            n   = hs.length,
            div = doc.createElement("div"),
            result = [];

        if ( baidu.isString( hs ) ) {

            // HTMLString to HTMLElement
            if ( hs.charAt(0) == "<" &&  hs.charAt( n - 1 ) == ">" && n > 2) {
            
                wrap = tagMap[ hs.match( tagReg )[1].toLowerCase() ] || tagMap._default;

                div.innerHTML = "<i>mz</i>" + wrap[1] + hs + wrap[2];
                div.removeChild( div.firstChild );  // for ie (<script> <style>)
                parseScript(div, doc);

                depth = wrap[0];
                box = div;
                while ( depth -- ) { box = box.firstChild; };

                baidu.merge( result, box.childNodes );

                div = box = null;
            
            // TextNode
            } else {
                result.push( doc.createTextNode( hs ) );
            }
        }

        div = null;

        return result;
    };
}();

