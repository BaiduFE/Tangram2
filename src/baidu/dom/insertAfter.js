/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom._smartInsertTo;
baidu.dom.extend({
    insertAfter: function(target){
        return this._smartInsertTo(target, function(item, node){
            item.parentNode.insertBefore(node, item.nextSibling);
        });
    }
});