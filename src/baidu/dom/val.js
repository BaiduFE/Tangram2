///import baidu.dom.each;
///import baidu.dom.find;
///import baidu._util_.support;
///import baidu._util_.nodeName;
///import baidu._util_.inArray;
///import baidu.makeArray;
///import baidu.forEach;
///import baidu.type;
///import baidu._util_.nodeHook;
///import baidu._util_.support.getSetAttribute;
///import baidu.array.map;


baidu.dom.extend({
    val: function(){
        baidu._util_.support.dom.select.disabled = true;
        var util = baidu._util_,
            checkOn = util.support.dom.input.value === 'on',
            optDisabled = !util.support.dom.opt.disabled,
            inputType = ['radio', 'checkbox'],
            valHooks = {
                option: {
                    get: function(ele){
                        var val = ele.attributes.value;
                        return !val || val.specified ? ele.value : ele.text;
                    }
                },
                select: {
                    get: function(ele){
                        var options = ele.options,
                            index = ele.selectedIndex,
                            one = ele.type === 'select-one' || index < 0,
                            ret = one ? null : [],
                            len = one ? index + 1 : options.length,
                            i = index < 0 ? len : one ? index : 0,
                            item, val;
                        for(; i < len; i++){
                            item = options[i];
                            if((item.selected || i === index)
                                && (optDisabled ? !item.disabled : item.getAttribute('disabled') === null)
                                && (!item.parentNode.disabled || !util.nodeName(item.parentNode, 'optgroup'))){
                                val = baidu.dom(item).val();
                                if(one){return val;}
                                ret.push(val);
                            }
                        }
                        return ret;
                    },
                    set: function(ele, key, val){
                        var ret = baidu.makeArray(val);
                        baidu.dom(ele).find('option').each(function(index, item){
                            item.selected = util.inArray(baidu.dom(this).val(), ret) >= 0;
                        });
                        !ret.length && (ele.selectedIndex = -1);
                        return ret;
                    }
                }
            };
        !util.support.getSetAttribute && (valHooks.button = util.nodeHook);
        if(!checkOn){
            baidu.forEach(inputType, function(item){
                valHooks[item] = {
                    get: function(ele){
                        return ele.getAttribute('value') === null ? 'on' : ele.value;
                    }
                };
            });
        }
        baidu.forEach(inputType, function(item){
            valHooks[item] = valHooks[item] || {};
            valHooks[item].set = function(ele, key, val){
                if(baidu.type(val) === 'array'){
                    return (ele.checked = util.inArray(baidu.dom(ele).val(), val) >= 0);
                }
            }
        });
        
        return function(value){
            var ele, hooks;
            if(value === undefined){
                if(!(ele = this[0])){return;}
                hooks = valHooks[ele.type] || valHooks[ele.nodeName.toLowerCase()] || {};
                return hooks.get && hooks.get(ele, 'value') || ele.value;
            }
            this.each(function(index, item){
                if(item.nodeType !== 1){return;}
                var tang = baidu.dom(item),
                    val = baidu.type(value) === 'function' ?
                        value.call(item, index, tang.val()) : value;
                if(val == null){
                    val = '';
                }else if(baidu.type(val) === 'number'){
                    val += '';
                }else if(baidu.type(val) === 'array'){
                    val = baidu.array(val).map(function(it){
                        return it == null ? '' : it + '';
                    });
                }
                hooks = valHooks[item.type] || valHooks[item.nodeName.toLowerCase()] || {};
                if(!hooks.set || hooks.set(item, 'value', val) === undefined){
                    item.value = val;
                }
            });
            return this;
        }
    }()
});