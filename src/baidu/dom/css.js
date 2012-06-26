/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom._access;
///import baidu.dom.getCurrentStyle;

baidu.dom.extend({
    css: function(key, value){
        return baidu.dom._access.call(this, key, value, function(ele, key, val){
            var styleFixer = baidu.dom.styleFixer,
                fixer = styleFixer && styleFixer(key, val),
                origKey = fixer ? fixer.key : key,
                origVal = fixer ? fixer.value : val,
                hooks = fixer && fixer.hooks;
            return val !== undefined ? (hooks && hooks.hasOwnProperty('set') ? hooks.set(ele, origKey, origVal) : ele.style[origKey] = origVal)
                : (hooks && hooks.hasOwnProperty('get') ? hooks.get(ele, origKey) : this.getCurrentStyle(origKey));
        });
    }
});