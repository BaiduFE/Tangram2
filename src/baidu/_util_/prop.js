///import baidu._util_.propFixer;
///import baidu._util_.isXML;
baidu._util_.prop = function(){
    var rfocusable = /^(?:button|input|object|select|textarea)$/i,
        rclickable = /^a(?:rea|)$/i,
        select = document.createElement('select'),
        opt = select.appendChild(document.createElement('option')),
        propHooks = {
            tabIndex: {
                get: function(ele){
                    var attrNode = ele.getAttributeNode('tabindex');
                    return attrNode && attrNode.specified ? parseInt(attrNode.value, 10)
                        : rfocusable.test(ele.nodeName) || rclickable.test(ele.nodeName)
                            && ele.href ? 0 : undefined;
                }
            }
        };
        !opt.selected && (propHooks.selected = {
            get: function(ele){
                var par = ele.parentNode;
                if(par){
                    par.selectedIndex;
                    par.parentNode && par.parentNode.selectedIndex;
                }
                return null;
            }
        });
        select = opt = null;
    
    return function(ele, key, val){
        var nType = ele.nodeType,
            hooks, ret;
        if(!ele || ~'238'.indexOf(nType)){return;}
        if(nType !== 1 || !baidu._util_.isXML(ele)){
            key = baidu._util_.propFixer[key] || key;
            hooks = propHooks[key] || {};
        }
        if(val !== undefined){
            if(hooks.set && (ret = hooks.set(ele, key, val)) !== undefined){
                return ret;
            }else{
                return (ele[key] = val);
            }
        }else{
            if(hooks.get && (ret = hooks.get(ele, key)) !== null){
                return ret;
            }else{
                return ele[key];
            }
        }
    }
}();