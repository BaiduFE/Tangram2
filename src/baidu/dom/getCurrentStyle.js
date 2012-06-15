/**
 * @author linlingyu
 */
///import baidu.dom.getComputedStyle;
baidu.dom.extend({
    getCurrentStyle: function(key){
        var element = this[0];
        return element.style[key] || (element.currentStyle ? element.currentStyle[key] : '')
            || this.getComputedStyle(key);
    }
});