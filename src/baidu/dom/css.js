/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom._access;
///import baidu.dom.getCurrentStyle;

baidu.dom.extend({
    css: function(key, value){
        return this._access(key, value, function(ele, key, val){
            var fixer = baidu.dom.style;
            return fixer ? fixer(ele, key, val)
                : (val === undefined ? baidu.dom(ele).getCurrentStyle(key)
                    : (ele.style[key] = val));
        });
    }
});