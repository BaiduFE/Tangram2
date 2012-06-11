/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom._smartInsertTo;

baidu.dom.extend({
    insertBefore: function(target){
        return this._smartInsertTo(target, function(item, node){
            item.parentNode.insertBefore(node, item);
        });
    }
});