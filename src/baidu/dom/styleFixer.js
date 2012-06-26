/**
 * @author linlingyu
 */

///import baidu.dom.getCurrentStyle;
///import baidu.extend;
///import baidu.each;
///import baidu.support;
///import baidu.dom._getWidthOrHeight;
///import baidu.type;

baidu.dom.styleFixer = function(){
    var alpha = /alpha\s*\(\s*opacity\s*=\s*(\d{1,3})/i,
        cssNumber = 'fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom',
        cssProps = {
            'float': baidu.support.cssFloat ? 'cssFloat' : 'styleFloat'
        },
        cssHooks = {
            opacity: {},
            width: {},
            height: {}
        };
    baidu.extend(cssHooks.opacity, baidu.support.opacity ? {
        get: function(ele, key){
            var ret = baidu.dom(ele).getCurrentStyle(key);
            return ret === '' ? '1' : ret;
        }
    } : {
        get: function(ele){
            return alpha.test((ele.currentStyle || ele.style).filter || '') ? parseFloat(RegExp.$1) / 100 : '1';
        },
        set: function(ele, key, value){
            var filterString = (ele.currentStyle || ele.style).filter || '',
                opacityValue = value * 100;
                ele.style.zoom = 1;
                ele.style.filter = alpha.test(filterString) ? filterString.replace(alpha, 'Alpha(opacity=' + opacityValue)
                    : filterString + ' progid:dximagetransform.microsoft.Alpha(opacity='+ opacityValue +')';
        }
    });
    //
    baidu.each(['width', 'height'], function(item){
        cssHooks[item].get = function(ele){
            return baidu.dom._getWidthOrHeight(ele, item) + 'px';
        }
    });
    
    //
    function camelCase(val){
        return val.replace(/-([a-z0-9])/gi, function(all, letter){return (letter + '').toUpperCase();});
    }
    //
    return function(key, value){
        var origKey = camelCase(key);
        origKey = cssProps[origKey] || origKey;
        origVal = baidu.type(value) === 'number' && !cssNumber[origKey] ? value + 'px' : value;
        return {
            key: origKey,
            value: origVal,
            hooks: cssHooks[key]
        }
    }
}();