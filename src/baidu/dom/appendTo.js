/**
 * @author linlingyu
 */
///import baidu.dom._smartInsertTo;
 
baidu.dom.extend({
    appendTo: function(target){
        baidu.dom._smartInsertTo(this, target, function(child){
            this.appendChild(child);
        });
        return this;
    }
});