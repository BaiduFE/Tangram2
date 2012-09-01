/// Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.form;
///import baidu.url.escapeSymbol;


/**
 * @description josn化表单数据
 * @function
 * @name baidu.form().json()
 * @grammar baidu.form(ele).json([replacer])
 * @param {function} replacer 对参数值特殊处理的函数，格式：replacer(string value, string key)
 * @return {Object} 表单数据js对象
 */

/**
 * @description josn化表单数据
 * @function
 * @name baidu.form.json
 * @grammar baidu.form.json(form[, replacer])
 * @param {Element} form 需要提交的表单元素
 * @param {function} replacer 对参数值特殊处理的函数，格式：replacer(string value, string key)
 * @return {Object} 表单数据js对象
 */

baidu.form.extend({
    json : function (replacer) {
        var form = this.form;
        var elements = form.elements,
            replacer = replacer || function (value, name) {
                return value;
            },
            data = {},
            item, itemType, itemName, itemValue, 
            opts, oi, oLen, oItem;
            
        /**
         * 向缓冲区添加参数数据
         * @private
         */
        function addData(name, value) {
            var val = data[name];
            if(val){
                val.push || ( data[name] = [val] );
                data[name].push(value);
            }else{
                data[name] = value;
            }
        }
        
        for (var i = 0, len = elements.length; i < len; i++) {
            item = elements[i];
            itemName = item.name;
            
            // 处理：可用并包含表单name的表单项
            if (!item.disabled && itemName) {
                itemType = item.type;
                itemValue = baidu.url.escapeSymbol(item.value);
            
                switch (itemType) {
                // radio和checkbox被选中时，拼装queryString数据
                case 'radio':
                case 'checkbox':
                    if (!item.checked) {
                        break;
                    }
                    
                // 默认类型，拼装queryString数据
                case 'textarea':
                case 'text':
                case 'password':
                case 'hidden':
                case 'file':
                case 'select-one':
                    addData(itemName, replacer(itemValue, itemName));
                    break;
                    
                // 多行选中select，拼装所有选中的数据
                case 'select-multiple':
                    opts = item.options;
                    oLen = opts.length;
                    for (oi = 0; oi < oLen; oi++) {
                        oItem = opts[oi];
                        if (oItem.selected) {
                            addData(itemName, replacer(oItem.value, itemName));
                        }
                    }
                    break;
                }
            }
        }
        return data;
    }
});
/// Tangram 1.x Code End
