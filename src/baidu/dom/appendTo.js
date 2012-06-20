/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom._smartInsertTo;
 
baidu.dom.extend({
    appendTo: function(target){
        return this._smartInsertTo(target, function(item, child){
            item.appendChild(child);
        });
    }
});