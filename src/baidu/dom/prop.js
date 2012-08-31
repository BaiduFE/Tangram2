/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 取得第一个匹配元素对应的属性值。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(Property)
 * @param {String} Property 要获取的值的对应属性名
 * @return {String|undefined} 只获取第一个匹配元素的属性值，当属性没有被设置时候，.prop()方法将返回undefined。
 * @example 
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 当属性没有被设置时候，.prop()方法将返回undefined；
 可以用在普通的对象，数组，窗口（window）或文件（document）上，可以检索和更改DOM属性。

 attributes和properties之间的差异在特定情况下是很重要。
 .prop方法无法取出自定义属性的值，都会返回undefined，这时要使用attr()接口。
 
 例如，考虑一个DOM元素的HTML标记中定义的<input type="checkbox" checked="checked" /> ，并假设它是一个JavaScript变量命名的elem ：
 
 elem.checked    返回 true (Boolean)
 baidu(elem).prop("checked")  返回 true (Boolean)
 elem.getAttribute("checked")  返回 "checked" (String)
 baidu(elem).attr("checked")  返回 "checked" (String)
 baidu(elem).attr("checked")  返回  true (Boolean)

 示例代码：
 //HTML片段
 <input type="checkbox" checked="checked" />

 //取得checked属性
 baidu("input").prop("checked");  //true

 */
/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(property,value)
 * @param {String} property 要设置值的属性名
 * @param {String} value 这个属性设置的值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。

 示例代码：
 //HTML片段
 <input type="checkbox"/>

 //设置checked属性
 baidu("input").prop("checked"，true);

 */
/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(object)
 * @param {Object} object 一个配对的属性值的object对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 支持传入一个Object类型，来设置多个值。
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 当属性没有被设置时候，.attr()方法将返回undefined；
 另外，.attr()不应该用在普通的对象，数组，窗口（window）或文件（document）上。若要检索和更改DOM属性请使用.prop()方法。
 注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。
 示例代码：
 //HTML片段
 <input type="checkbox"/>

 //设置checked属性
 baidu("input").prop("checked"，true);

 */
 /**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(Property,fn)
 * @param {String} Property 要设置值的属性名.
 * @param {Function} fn 这个函数返回用来设置的值，this 是当前的元素，接收元素的索引位置index和元素旧的样属性值prop为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的属性和index（索引值），并且将函数返回值设置为对应的属性；
 通过使用一个函数来设置属性， 我们可以根基元素的其他属性来计算值。举个例子，我们可以把新的值与现有的值联系在一起。

 示例代码：
 //HTML片段
 <input type="checkbox"/>
 <input type="checkbox"/>

 //迭代器方法
 //通过使用一个函数来设置属性， 我们可以根基元素的其他属性来计算值。举个例子，我们可以把新的值与现有的值联系在一起。
 baidu("input").prop("checked",function(index,prop){
    alert(index);
    alert(prop);
    if(index==1){
      return "checked";
    }
 });
 */
///import baidu;
///import baidu.dom;
///import baidu.forEach;
///import baidu.support;
///import baidu.dom._isXML;
///import baidu.dom._propHooks;

baidu.dom.extend({
    prop:function(name,value){

        //异常处理
        if(arguments.length <= 0 || typeof name === 'function'){
            return this;
        };

        //返回结果
        var result,
        me = this,
        isSet = false;
        baidu.forEach(this, function(item,index){

            if(result){
                return;
            };
            
            var ret, 
                hooks, 
                notxml,
                bd = baidu.dom,
                nType = item.nodeType;

            // don't get/set properties on text, comment and attribute nodes
            if ( !item || nType === 3 || nType === 8 || nType === 2 ) {
                return;
            };

            notxml = nType !== 1 || !bd._isXML( item );

            if ( notxml ) {
                // Fix name and attach hooks
                name = bd.propFix[ name ] || name;
                hooks = bd.propHooks[ name ];
            };
            switch(typeof name){
                case 'string':
                    if( typeof value === 'undefined' ){
                        //get first
                        if ( hooks && "get" in hooks && (ret = hooks.get( item, name )) !== null ) {
                            //return ret;
                            result = ret ;

                        } else {
                            //return item[ name ];
                            result = item[name];
                        };

                    }else if( typeof value === 'function' ){
                        
                        isSet = true;
                        var ele = bd(item);
                        ele.prop( name, value.call(item, index, ele.prop(name)));

                    }else{
                        
                        //set all
                        isSet = true;
                        if ( hooks && "set" in hooks && (ret = hooks.set( item, value, name )) !== undefined ) {
                            return ret;

                        } else {
                            item[ name ] = value;
                        };
                    };

                break;
                case 'object':

                    //set all
                    isSet = true;
                    var ele = bd(item);
                    for(key in name){
                        ele.prop(key,name[key]);
                    };

                break;
                default:
                    result = me;
                break;
            };
        });

        return isSet?this:result;
    }
});