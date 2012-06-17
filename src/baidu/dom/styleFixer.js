/**
 * @author linlingyu
 */

///import baidu.dom;
///import baidu.dom.getCurrentStyle;
///import baidu.extend;
///import baidu.each;
(function(){
    var cssProps = {},
        cssNumber = 'fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom',
        cssHooks = {
            opacity: {},
            width: {},
            height: {}
        };
    function initialize(){
        if(cssProps.hasOwnProperty('float')){return;}
        var div = document.createElement('div'),
            alpha = /alpha\s*\(\s*opacity\s*=\s*(\d{1,3})/i,
            a, isOpacity;
        div.innerHTML = '<a href="/" style="float:left;opacity:.55">Tangram</a>';
        a = div.getElementsByTagName('A')[0];
        isOpacity = a.style.opacity === '0.55';
        cssProps['float'] = a.style.cssFloat ? 'cssFloat' : 'styleFloat';
        //
        baidu.extend(cssHooks.opacity, isOpacity ? {
            get: function(elem, key){
                var ret = baidu.dom(elem).getCurrentStyle(key);
                return ret === '' ? '1' : ret;
            }
        } : {
            get: function(elem){
                return alpha.test((elem.currentStyle || elem.style).filter || '') ? parseFloat(RegExp.$1) / 100 : '1';
            },
            set : function(elem, key, val){
                var filterString = (elem.currentStyle || elem.style).filter || '',
                    opacityValue = val * 100;
                elem.style.zoom = 1;
                elem.style.filter = alpha.test(filterString) ? filterString.replace(alpha, 'Alpha(opacity=' + opacityValue)
                    : filterString + ' progid:dximagetransform.microsoft.Alpha(opacity='+ opacityValue +')';
            }
        });
        //
        baidu.each(['width', 'height'], function(item){
            var itemName = item.replace(/^\w/, function(mc){return mc.toUpperCase()}),
                cssExpand = ['Top', 'Right', 'Bottom', 'Left'],
                len = cssExpand.length;
            cssHooks[item].get = function(elem){
                var bound = elem['client' + itemName],
                    i = item === 'width' ? 1 : 0,
                    tang;
                if(!bound){
                    bound = elem['offset' + itemName];
                    tang = baidu.dom(elem);
                    for(; i < len; i += 2){
                        bound -= parseFloat(tang.getCurrentStyle('border' + cssExpand[i] + 'Width')) || 0;
                        bound -= parseFloat(tang.getCurrentStyle('padding' + cssExpand[i])) || 0;
                    }
                }
                return bound + 'px';
            }
        });
    }
    //
    baidu.dom.styleFixer = function(elem, key, val){
        //camelCase
        initialize();
        var hooks = cssHooks[key],
            name = cssProps[key] || key,
            hasValue = val !== undefined,
            method = hasValue ? 'set' : 'get';
        return hooks && hooks.hasOwnProperty(method) ? hooks[method](elem, name, val)
            : (hasValue ? (elem.style[name] = val) : elem.style[name]);
    }
})();
