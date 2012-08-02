/**
 * @author linlingyu
 */
///import baidu.dom;
baidu.dom.extend({
    getDocument: function(){
        var ele = this[0];
        return ele.nodeType == 9 ? ele : ele.ownerDocument || ele.document;
    }
});