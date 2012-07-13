/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom._access;
///import baidu.dom.getCurrentStyle;

baidu.dom.extend({
    css: function(key, value){
        return baidu.dom._access.call(this, key, value, function(ele, key, val){
            var styleFixer = baidu.dom.styleFixer;
            return styleFixer ? styleFixer(ele, key, val)
                : (val === undefined ? this.getCurrentStyle(key) : ele.style[key] = val);
        });
    }
});