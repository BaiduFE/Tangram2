/**
 * @author linlingyu
 */
///import baidu.dom._smartInsert;

baidu.dom.extend({
    prepend: function(){
        baidu.dom._smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.insertBefore(child, this.firstChild);
        });
        return this;
    }
});