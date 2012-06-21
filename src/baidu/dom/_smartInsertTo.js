/**
 * @author linlingyu
 */

///import baidu.type;
///import baidu.dom.clone;
///import baidu.dom.getDocument;
///import baidu.dom._buildElements;
///import baidu.dom._smartInsert;
///import baidu.dom.contains;

baidu.dom._smartInsertTo = baidu.dom._smartInsertTo || function(tang, target, callback, orie){
    baidu.type(target) === 'string'
        && target.charAt(0) === '<'
        && target.charAt(target.length - 1) === '>'
        && target.length > 2
        && (target = baidu.dom._buildElements([target], tang.getDocument() || document));
    var insert = baidu.dom(target),
        contains = baidu.dom.contains,
        len, tangDom;
    ///
    if(orie && insert[0] && !(contains(document.body, insert[0])
        || contains(document.documentElement, insert[0]))){
            orie = orie === 'before';
            tangDom = baidu.merge(orie ? tang : insert, !orie ? tang : insert);
            if(tang !== tangDom){
                tang.length = 0;
                baidu.merge(tang, tangDom);
            }
    }else{
        len = insert.length;
        for(var i = 0; i < len; i++){
            baidu.dom._smartInsert(baidu.dom(insert[i]), i > 0 ? tang.clone(true) : tang, callback);
        }
    }
};
