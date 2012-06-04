/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom._smartInsert;

baidu.dom.extend({
    before: function(){
        return this._smartInsert(arguments, function(item, node){
            item.parentNode.insertBefore(node, item);
        });
    }
});