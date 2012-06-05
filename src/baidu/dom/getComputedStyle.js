/**
 * @author linlingyu
 */
///import baidu.dom;
baidu.dom.extend({
    getComputedStyle: function(key){
        var defaultView = this[0].ownerDocument.defaultView,
            computedStyle = defaultView && defaultView.getComputedStyle
                && defaultView.getComputedStyle(this[0], null);
        return computedStyle ? (computedStyle.getPropertyValue(key) || computedStyle[key]) : '';
    }
});