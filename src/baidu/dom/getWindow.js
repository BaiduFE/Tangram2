/**
 * @author linlingyu
 */
///import baidu;
///import baidu.dom;
baidu.dom.extend({
    getWindow: function(){
        var ele = this[0],
            doc = ele.nodeType == 9 ? ele : ele.ownerDocument || ele.document;
        return baidu.dom(doc.parentWindow || doc.defaultView);
    }
});