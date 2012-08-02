/**
 * @author linlingyu
 */
///import baidu.dom._smartInsertTo;
 
baidu.dom.extend({
    prependTo: function(target){
        baidu.dom._smartInsertTo(this, target, function(child){
            this.insertBefore(child, this.firstChild);
        });
        return this;
    }
});