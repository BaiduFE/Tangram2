/**
 * @author linlingyu
 */
///import baidu.dom._smartInsertTo;
///import baidu.dom._g;

baidu.dom.extend({
    insertBefore: function(target){
        baidu.dom._smartInsertTo(this, target, function(node){
            this.parentNode.insertBefore(node, this);
        }, 'before');
        return this;
    }
});
baidu.dom.insertBefore = function(newElement, existElement){
    var get = baidu.dom._g;
    return baidu.dom(get(newElement)).insertBefore(get(existElement))[0];
};