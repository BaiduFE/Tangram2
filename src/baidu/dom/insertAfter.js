/**
 * @author linlingyu
 */

///import baidu.dom._smartInsertTo;
///import baidu.dom._g;

baidu.dom.extend({
    insertAfter: function(target){
        baidu.dom._smartInsertTo(this, target, function(node){
            this.parentNode.insertBefore(node, this.nextSibling);
        }, 'after');
        return this;
    }
});
baidu.dom.insertAfter = function(newElement, existElement){
    var get = baidu.dom._g;
    return baidu.dom(get(newElement)).insertAfter(get(existElement))[0];
};