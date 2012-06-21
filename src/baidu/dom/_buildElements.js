/**
 * @author linlingyu
 */

///import baidu.dom;
///import baidu.type;
///import baidu.merge;

baidu.dom._buildElements = baidu.dom._buildElements || function(){
    var tagPatrn = /^<(\w+)/i,
        tagMap = {
            option: [1, '<select multiple="multiple">', '</select>'],
            legend: [1, '<fieldset>', '</fieldset>'],
            thead: [1, '<table>', '</table>'],
            tr: [2, '<table><tbody>', '</tbody></table>'],
            td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
            col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
            area: [1, '<map>', '</map>'],
            _default: [0, '', '']
        };
    tagMap.optgroup = tagMap.option;
    tagMap.tbody = tagMap.tfoot = tagMap.colgroup = tagMap.caption = tagMap.thead;
    tagMap.th = tagMap.td;
    //
    function buildScript(doc, ele){
        var nodeList = ele.getElementsByTagName('script'),
            len = nodeList.length,
            item, script;
        for(var i = 0; i < len; i++){
            item = nodeList[i];
            script = doc.createElement('script');
            item.id && (script.id = item.id);
            item.type && (script.type = item.type);
            item.src && (script.src = item.src);
            item.text ? script.text = item.text
                : (item.textContent ? script.textContent = item.textContent : false);
            item.parentNode.replaceChild(script, item);
        }
    }
    //
    return function(array, doc){
        doc = doc || document;
        var len = array.length,
            ret = [],
            div, item, wrap, depth;
        //
        for(var i = 0; i < len; i++){
            item = array[i];
            switch(baidu.type(item)){
                case 'number':
                    item += '';
                case 'string':
                    if(item.charAt(0) === '<'
                        && item.charAt(item.length - 1) === '>'
                        && item.length > 2){
                            if(!div){
                                div = doc.createElement('div');
                                doc.createDocumentFragment().appendChild(div);
                            }
                            wrap = tagMap[item.match(tagPatrn)[1].toLowerCase()] || tagMap._default;
                            depth = wrap[0];
                            div.innerHTML = '<div>for IE script</div>' + wrap[1] + item + wrap[2];
                            buildScript(doc, div);
                            div.removeChild(div.firstChild);//remove (for ie script) element
                            item = div;
                            while(depth--){item = item.lastChild;}
                            item = item.childNodes;
                    }else{
                        item = doc.createTextNode(item);
                    }
                    break;
            }
            baidu.merge(ret, item.nodeType ? [item] : item);
        }
        return ret;
    }
}();