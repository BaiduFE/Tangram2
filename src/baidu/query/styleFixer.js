/**
 * @author linlingyu
 */

///import baidu.query.getCurrentStyle;
///import baidu.extend;
///import baidu.forEach;
///import baidu.support;
///import baidu.type;
///import baidu.string.toCamelCase;

baidu.query.styleFixer = function(){
    var alpha = /alpha\s*\(\s*opacity\s*=\s*(\d{1,3})/i,
        nonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        cssNumber = 'fillOpacity,fontWeight,opacity,orphans,widows,zIndex,zoom',
        anchor = baidu.support.dom.a,
        cssProps = {
            'float': !!anchor.style.cssFloat ? 'cssFloat' : 'styleFloat'
        },
        cssMapping = {
            fontWeight: {normal: 400, bold: 700, bolder: 700, lighter: 100}
        },
        cssHooks = {
            opacity: {},
            width: {},
            height: {},
            fontWeight: {
                get: function(ele, key){
                    var ret = style.get(ele, key);
                    return cssMapping.fontWeight[ret] || ret;
                }
            }
        },
        style = {
            set: function(ele, key, val){ele.style[key] = val;}
        };
    baidu.extend(cssHooks.opacity, /^0.5/.test(anchor.style.opacity) ? {
        get: function(ele, key){
            var ret = baidu.query(ele).getCurrentStyle(key);
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
    baidu.forEach(['width', 'height'], function(item){
        cssHooks[item] = {
            get: function(ele){
                return baidu._util_.getWidthOrHeight(ele, item) + 'px';
            },
            set: function(ele, key, val){
                baidu.type(val) === 'number' && val < 0 && (val = 0);
                style.set(ele, key, val);
            }
        };
    });
    
    baidu.extend(style, document.documentElement.currentStyle? {
        get: function(ele, key){
            var val = baidu.query(ele).getCurrentStyle(key),
                defaultLeft;
            if(nonpx.test(val)){
                defaultLeft = ele.style.left;
                ele.style.left = key === 'fontSize' ? '1em' : val;
                val = ele.style.pixelLeft + 'px';
                ele.style.left = defaultLeft;
            }
            return val;
        }
    } : {
        get: function(ele, key){
            return baidu.query(ele).getCurrentStyle(key);
        }
    });
    
    //
    return function(ele, key, val){
        var origKey = baidu.string(key).toCamelCase(),
            method = val === undefined ? 'get' : 'set',
            origVal, hooks;
        origKey = cssProps[origKey] || origKey;
        origVal = baidu.type(val) === 'number' && !~cssNumber.indexOf(origKey) ? val + 'px' : val;
        hooks = cssHooks.hasOwnProperty(origKey) && cssHooks[origKey][method] || style[method];
        return hooks(ele, origKey, origVal);
    };
}();