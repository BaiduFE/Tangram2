///import baidu.extend;
///import baidu.each;
///import baidu.dom.getCurrentStyle;
///import baidu._util_.getWidthOrHeight;
///import baidu._util_.support;
///import baidu._util_.setPositiveNumber;

baidu._util_.style = baidu.extend({
    set: function(ele, key, val){ele.style[key] = val;}
}, document.documentElement.currentStyle? {
    get: function(ele, key){
        var val = baidu.dom(ele).getCurrentStyle(key),
            defaultLeft;
        if(/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i.test(val)){
            defaultLeft = ele.style.left;
            ele.style.left = key === 'fontSize' ? '1em' : val;
            val = ele.style.pixelLeft + 'px';
            ele.style.left = defaultLeft;
        }
        return val;
    }
} : {
    get: function(ele, key){
        return baidu.dom(ele).getCurrentStyle(key);
    }
});

baidu._util_.cssHooks = function(){
    var alpha = /alpha\s*\(\s*opacity\s*=\s*(\d{1,3})/i,
        style = baidu._util_.style,
//        nonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        anchor = baidu._util_.support.dom.a,
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
        };
    //
    function setValue(ele, key, val){
        baidu.type(val) === 'string' && (val = baidu._util_.setPositiveNumber(ele, val));
        style.set(ele, key, val);
    }
    //
    baidu.extend(cssHooks.opacity, /^0.5/.test(anchor.style.opacity) ? {
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
    baidu.forEach(['width', 'height'], function(item){
        cssHooks[item] = {
            get: function(ele){
                return baidu._util_.getWidthOrHeight(ele, item) + 'px';
            },
            set: setValue
        };
    });

    baidu.each({
        padding: "",
        border: "Width"
    }, function( prefix, suffix ) {
        cssHooks[prefix + suffix] = {set: setValue};
        var cssExpand = [ "Top", "Right", "Bottom", "Left" ],
            i=0;
        for ( ; i < 4; i++ ) {
            cssHooks[ prefix + cssExpand[ i ] + suffix ] = {
                set: setValue
            };
        }
    });
    return cssHooks;
}();