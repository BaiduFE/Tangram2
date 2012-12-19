///import baidu._util_.nodeName;
///import baidu._util_.prop;
///import baidu._util_.propFixer;
///import baidu._util_.nodeHook;
///import baidu._util_.support.getSetAttribute;
///import baidu._util_.isXML;
///import baidu._util_.removeAttr;
///import baidu.forEach;
baidu._util_.attr = function(){
    var util = baidu._util_,
        rtype = /^(?:button|input)$/i,
        supportDom = util.support.dom,
        radioValue = supportDom.input.value === 't',
        hrefNormalized = supportDom.a.getAttribute('href') === '/a',
        style = /top/.test(supportDom.a.getAttribute('style')),
        nodeHook = util.nodeHook,
        attrFixer = {
            className: 'class'
        },
        boolHook = {//处理对属性值是布尔值的情况
            get: function(ele, key){
                var val = util.prop(ele, key), attrNode;
                return val === true || typeof val !== 'boolean'
                    && (attrNode = ele.getAttributeNode(key))
                    && attrNode.nodeValue !== false ? key.toLowerCase() : undefined;
            },
            set: function(ele, key, val){
                if(val === false){
                    util.removeAttr(ele, key);
                }else{
                    var propName = util.propFixer[key] || key;
                    (propName in ele) && (ele[propName] = true);
                    ele.setAttribute(key, key.toLowerCase());
                }
                return key;
            }
        },
        attrHooks = {
            type: {
                set: function(ele, key, val){
                    // We can't allow the type property to be changed (since it causes problems in IE)
                    if(rtype.test(ele.nodeName) && ele.parentNode){return val;};
                    if(!radioValue && val === 'radio' && util.nodeName(ele, 'input')){
                        var v = ele.value;
                        ele.setAttribute('type', val);
                        v && (ele.value = v);                        
                        return val;
                    };
                }
            },
            value: {
                get: function(ele, key){
                    if(nodeHook && util.nodeName(ele, 'button')){
                        return nodeHook.get(ele, key);
                    }
                    return key in ele ? ele.value : null;
                },
                set: function(ele, key, val){
                    if(nodeHook && util.nodeName(ele, 'button')){
                        return nodeHook.set(ele, key, val);
                    }
                    ele.value = val;
                }
            }
        };
    // Set width and height to auto instead of 0 on empty string
    // This is for removals
    if(!util.support.getSetAttribute){//
        baidu.forEach(['width', 'height'], function(item){
            attrHooks[item] = {
                set: function(ele, key, val){
                    if(val === ''){
                        ele.setAttribute(key, 'auto');
                        return val;
                    }
                }
            };
        });
        attrHooks.contenteditable = {
            get: nodeHook.get,
            set: function(ele, key, val){
                val === '' && (val = false);
                nodeHook.set(ele, key, val);
            }
        };
    }
    // Some attributes require a special call on IE
    if(!hrefNormalized){
        [ "href", "src", "width", "height" ]
        baidu.forEach(['href', 'src', 'width', 'height'], function(item){
            attrHooks[item] = {
                get: function(ele, key){
                    var ret = ele.getAttribute(key, 2);
                    return ret === null ? undefined : ret;
                }
            };
        });
    }
    if(!style){
        attrHooks.style = {
            get: function(ele){return ele.style.cssText.toLowerCase() || undefined;},
            set: function(ele, key, val){return (ele.style.cssText = val + '');}
        };
    }
    //attr
    return function(ele, key, val, pass){
        var nType = ele.nodeType,
            notxml = nType !== 1 || !util.isXML(ele),
            hooks, ret;
        if(!ele || ~'238'.indexOf(nType)){return;}
        if(pass && baidu.dom.fn[key]){
            return baidu.dom(ele)[key](val);
        }
        //if getAttribute is undefined, use prop interface
        if(notxml){
            key = attrFixer[key] || key.toLowerCase();
            hooks = attrHooks[key] || (util.propFixer.rboolean.test(key) ? boolHook : nodeHook);
        }
        if(val!== undefined){
            if(val === null){
                util.removeAttr(ele, key);
                return
            }else if(notxml && hooks && hooks.set && (ret = hooks.set(ele, key, val)) !== undefined){
                return ret;
            }else{
                ele.setAttribute(key, val + '');
                return val;
            }
        }else if(notxml && hooks && hooks.get && (ret = hooks.get(ele, key)) !== null){
            return ret;
        }else{
            ret = ele.getAttribute(key);
            return ret === null ? undefined : ret;
        }
   }
}();