/**
 * @author linlingyu
 */

///import baidu._util_;
///import baidu.type;
///import baidu.forEach;
///import baidu.dom.createElements;
///import baidu.dom.getDocument;
///import baidu.dom.html;

baidu._util_.smartInsert = function(tang, args, callback){
    if(args.length <= 0){return;}
    if(baidu.type(args[0]) === 'function'){
        var fn = args[0],
            tangItem;
        return baidu.forEach(tang, function(item, index){
            tangItem = baidu.dom(item);
            args[0] = fn.call(item, index, tangItem.html());
            baidu.dom._smartInsert(tangItem, args, callback);
        });
    }
    var doc = tang.getDocument() || document,
        fragment = doc.createDocumentFragment(),
        len = tang.length - 1,
        firstChild;
    for(var i = 0, item; item = args[i]; i++){
        if(item.nodeType){
            fragment.appendChild(item);
        }else{
            baidu.forEach(~'string|number'.indexOf(baidu.type(item)) ?
                baidu.dom.createElements(item, doc)
                    : item, function(ele){
                        fragment.appendChild(ele);
                    });
        }
    }
    if(!(firstChild = fragment.firstChild)){return;}
    baidu.forEach(tang, function(item, index){
        callback.call(item.nodeName.toLowerCase() === 'table'
            && firstChild.nodeName.toLowerCase() === 'tr' ?
                item.tBodies[0] || item.appendChild(item.ownerDocument.createElement('tbody'))
                    : item, index < len ? fragment.cloneNode(true) : fragment);
    });
};