/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 为匹配的元素删除设置的属性。
 * @function 
 * @name baidu.dom().removeProp()
 * @grammar baidu.dom(args).removeProp(property,value)
 * @param {String} property 要设置属性的名称
 * @param {String} value 要设置属性的值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
///import baidu;
///import baidu.dom;
///import baidu.each;
///import baidu.support;
///import baidu.dom._propHooks;

baidu.dom.extend({
    removeProp: function(value){

        //异常处理
        if(arguments.length <= 0 || !value || typeof value !== 'string'){
            return this;
        };

        var bd = baidu.dom;
        value = bd.propFix[ value ] || value;
        baidu.each(this, function(item){
            // try/catch handles cases where IE balks (such as removing a property on window)
            try {
                item[ value ] = undefined;
                delete item[ value ];
            } catch( e ) {

            };
        });

        return this;
    }
});