/// Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
 
/**
 * @description 为匹配的元素删除设置的属性。
 * @function 
 * @name baidu.dom().removeAttr()
 * @grammar baidu.dom(args).removeAttr(attributeName);
 * @param {String} attributeName 要设置属性的名称，它可以是一个空格分隔的属性列表;
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 .removeAttr() 方法使用原生的 JavaScript removeAttribute() 函数,
 但是它的优点是能够直接被TangramDom对象访问调用，可以链式的继续调用下去，
 而且具有良好的浏览器兼容性。

 示例代码：

 //HTML代码片段
 <input type='text' value='123' data1='baidu' data2='google'/>

 //清除一个属性
 baidu("input").removeAttr("value");

 //清除个属性
 baidu("input").removeAttr("value data1 google");

 */

///import baidu.forEach;
///import baidu.support;
///import baidu.dom._propHooks;
///import baidu.dom.attr;

baidu.dom.extend({
    removeAttr: function(value){

        //异常处理
        if(arguments.length <= 0 || !value || typeof value !== 'string'){
            return this;
        };

        baidu.forEach(this, function(item){
            var propName, attrNames, name, l, isBool, i = 0;

            if ( item.nodeType === 1 ) {
                var bd = baidu.dom;
                attrNames = value.toLowerCase().split(/\s+/);
                l = attrNames.length;

                for ( ; i < l; i++ ) {
                    name = attrNames[ i ];

                    if ( name ) {
                        propName = bd.propFix[ name ] || name;
                        isBool = bd.rboolean.test( name );

                        // See #9699 for explanation of this approach (setting first, then removal)
                        // Do not do this for boolean attributes (see #10870)
                        if ( !isBool ) {
                            bd(item).attr(name,"");
                        }
                        item.removeAttribute( baidu.support.getSetAttribute ? name : propName );

                        // Set corresponding property to false for boolean attributes
                        if ( isBool && propName in item ) {
                            item[ propName ] = false;
                        }
                    }
                }
            }
        });
        
        return this;
    }
});
/// Tangram 1.x Code End
