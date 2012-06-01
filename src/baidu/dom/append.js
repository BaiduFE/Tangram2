/**
 * @author linlingyu
 */
///import baidu;
///import baidu.dom;
///import baidu.dom._smartInsert;
baidu.dom.extend({
    append: function(){
        return this._smartInsert(arguments, function(item, child){
            item.appendChild(child);
        });
    }
});