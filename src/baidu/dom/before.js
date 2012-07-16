/**
 * @author linlingyu
 */
///import baidu.dom._smartInsert;
///import baidu.dom._buildElements;
///import baidu.dom.getDocument;
///import baidu.merge;

baidu.dom.extend({
    before: function(){
        var parentNode = this[0] && this[0].parentNode,
            array = !parentNode && [], set;
        
        baidu.dom._smartInsert(this, arguments, function(node){
            parentNode ? parentNode.insertBefore(node, this)
                : baidu.merge(array, node.childNodes);
        });
        if(array){
            array = baidu.merge(array, this);
            this.length = 0;
            baidu.merge(this, array);
        }
        return this;
    }
});