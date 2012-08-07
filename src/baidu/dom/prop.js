/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 取得第一个匹配元素对应的属性值。
 * @function 
 * @name baidu.dom.prop
 * @grammar baidu.dom(args).prop(Property)
 * @param {String} Property 要获取的值的对应属性名
 * @return {String|undefined} 只获取第一个匹配元素的属性值，当属性没有被设置时候，.prop()方法将返回undefined。
 */
/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom.prop
 * @grammar baidu.dom(args).prop(property,value)
 * @param {String} property 要设置值的属性名
 * @param {String} value 这个属性设置的值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom.prop
 * @grammar baidu.dom(args).prop(object)
 * @param {Object} object 一个配对的属性值的object对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
 /**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom.prop
 * @grammar baidu.dom(args).prop(Property,fn)
 * @param {String} Property 要设置值的属性名.
 * @param {Function} fn 这个函数返回用来设置的值，this 是当前的元素，接收元素的索引位置index和元素旧的样属性值prop为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom(args).prop(Property,function(index,prop))
 */
///import baidu;
///import baidu.dom;
///import baidu.each;
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
        baidu.each(this,function(item,index){

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