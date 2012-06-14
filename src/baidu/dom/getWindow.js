/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom.getDocument;
baidu.dom.extend({
    getWindow: function(){
        var ele = this[0],
            doc = baidu.dom(ele).getDocument();
        return doc.parentWindow || doc.defaultView;
    }
});