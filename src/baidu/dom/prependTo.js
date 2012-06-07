/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom._smartInsertTo;
 
baidu.dom.extend({
    prependTo: function(target){
        return this._smartInsertTo(target, function(item, child){
            item.insertBefore(child, item.firstChild);
        });
    }
});