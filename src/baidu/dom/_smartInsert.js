/**
 * @author linlingyu
 */

///import baidu.type;
///import baidu.each;
///import baidu.dom.getDocument;

baidu.dom._smartInsert = baidu.dom._smartInsert || function(){
    var defaultFragment = document.createDocumentFragment(),
        tagPatrn = /^<(\w+)/i,
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
    function buildFragment(doc, content){
        var wrap = tagMap[content.match(tagPatrn)[1].toLowerCase()] || tagMap._default,
            fragment = doc.createDocumentFragment(),
            depth = wrap[0],
            ele = doc.createElement('div');
        fragment.appendChild(ele);
        ele.innerHTML = wrap[1] + content + wrap[2];
        buildScript(doc, ele);
        while(depth--){ele = ele.lastChild;}
        ele = ele.childNodes;
        fragment.removeChild(fragment.firstChild);
        if(ele.nodeType){
            fragment.appendChild(ele);
        }else{
            while(ele[0]){fragment.appendChild(ele[0]);}
        }
        return fragment;
    }
    //
    function buildScript(doc, ele){
        var nodeList = ele.getElementsByTagName('script'),
            len = nodeList.length,
            item, script;
        for(var i = 0; i < len; i++){
            item = nodeList[i];
            script = doc.createElement('script');
            item.type && (script.type = item.type);
            item.src && (script.src = item.src);
            item.text ? script.text = item.text
                : (item.textContent ? script.textContent = item.textContent : false);
            item.parentNode.replaceChild(script, item);
        }
    }
    //
    return function(tang, args, callback){
        if(args.length <= 0){return;}
        if(baidu.type(args[0]) === 'function'){
            return baidu.each(this, function(item, index){
                args[0] = args[0].call(this, index, item.innerHTML);
                baidu.dom._smartInsert(baidu.dom(this), args, callback);
            });
        }
        var doc = tang.getDocument() || document,
            fragment = doc === document ? defaultFragment : doc.createDocumentFragment(),
            len = args.length,
            item;
        
        for(var i = 0; i < len; i++){
            item = args[i];
            switch(baidu.type(item)){
                case 'number':
                    item += '';
                case 'string':
                    fragment.appendChild(item.charAt(0) === '<'
                        && item.charAt(item.length - 1) === '>'
                        && item.length > 2 ? buildFragment(doc, item)
                            : doc.createTextNode(item));
                    break;
                case 'HTMLElement':
                    item = [item];
                case '$DOM':
                case 'array':
                    baidu.each(item, function(ele){
                        fragment.appendChild(ele);
                    });
                    break;
            }
        }
        //
        baidu.each(tang, function(item, index){
            callback('table' === item.nodeName.toLowerCase()
                && 'tr' === fragment.firstChild.nodeName.toLowerCase() ? item.tBodies[0]
                    : item, index > 0 ? fragment.cloneNode(true) : fragment);
        });
    }
}();