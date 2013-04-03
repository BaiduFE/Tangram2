/**
 * @author linlingyu
 */
///import baidu._util_.cssHooks;
///import baidu._util_.cssNumber;
///import baidu.type;
///import baidu.string.toCamelCase;
///import baidu._util_.support;

baidu.dom.styleFixer = function(){
    var style = baidu._util_.style,
        cssHooks = baidu._util_.cssHooks,
        cssNumber = baidu._util_.cssNumber,
        cssProps = {
            'float': !!baidu._util_.support.dom.a.style.cssFloat ? 'cssFloat' : 'styleFloat'
        };
    return function(ele, key, val){
        var origKey = baidu.string.toCamelCase(key),
            method = val === undefined ? 'get' : 'set',
            origVal, hooks;
        origKey = cssProps[origKey] || origKey;
        origVal = baidu.type(val) === 'number' && !cssNumber[origKey] ? val + 'px' : val;
        hooks = cssHooks.hasOwnProperty(origKey) && cssHooks[origKey][method] || style[method];
        return hooks(ele, origKey, origVal);
    }
}();