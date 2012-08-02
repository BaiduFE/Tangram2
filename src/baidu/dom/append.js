/**
 * @author linlingyu
 */
///import baidu.dom._smartInsert;
baidu.dom.extend({
    append: function(){
        baidu.dom._smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.appendChild(child);
        });
        return this;
    }
});