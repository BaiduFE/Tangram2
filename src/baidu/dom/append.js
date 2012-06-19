/**
 * @author linlingyu
 */
///import baidu.dom._smartInsert;
baidu.dom.extend({
    append: function(){
        baidu.dom._smartInsert(this, arguments, function(item, child){
            item.appendChild(child);
        });
        return this;
    }
});