/**
 * @author linlingyu
 */

///import baidu;
///import baidu.dom;
///import baidu.dom._smartInsert;
baidu.dom.extend({
    after: function(){
        return this._smartInsert(arguments, function(item, node){
            item.parentNode.insertBefore(node, item.nextSibling);
        });
    }
});