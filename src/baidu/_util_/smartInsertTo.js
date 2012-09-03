/**
 * @author linlingyu
 */

///import baidu._util_;
///import baidu.type;
///import baidu.dom.clone;
///import baidu.dom.getDocument;
///import baidu.dom.createElements;
///import baidu._util_.smartInsert;
///import baidu.dom.contains;

baidu._util_.smartInsertTo = function(tang, target, callback, orie){
    var insert = baidu.dom(target),
        first = insert[0],
        tangDom;
        
    if(orie && first && (!first.parentNode || first.parentNode.nodeType === 11)){
        orie = orie === 'before';
        tangDom = baidu.merge(orie ? tang : insert, !orie ? tang : insert);
        if(tang !== tangDom){
            tang.length = 0;
            baidu.merge(tang, tangDom);
        }
    }else{
        for(var i = 0, item; item = insert[i]; i++){
            baidu._util_.smartInsert(baidu.dom(item), i > 0 ? tang.clone(true) : tang, callback);
        }
    }
};
