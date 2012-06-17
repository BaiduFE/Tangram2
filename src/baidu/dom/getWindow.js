/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom.getDocument;
baidu.dom.extend({
    getWindow: function(){
        var doc = this.getDocument();
        return doc.parentWindow || doc.defaultView;
    }
});