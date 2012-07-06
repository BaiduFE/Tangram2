/**
 * @author linlingyu
 */
///import baidu.dom.remove;
baidu.dom.extend({
    detach: function(selector){
        return this.remove(selector, true);
    }
});