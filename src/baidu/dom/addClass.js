/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 为每个匹配的元素添加指定的类名
 * @function 
 * @name baidu.dom().addClass()
 * @grammar baidu.dom(args).addClass(className)
 * @param {String} className 为每个匹配元素所要增加的一个或多个class属性名(多个用空格分隔)。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 */

/**
 * @description 为每个匹配的元素添加指定的类名
 * @function 
 * @name baidu.dom().addClass()
 * @grammar baidu.dom(args).addClass(fun)
 * @param {Function} fun 这个函数返回一个或更多用空格隔开的要增加的样式名。接收元素的索引index和元素旧的样式名className作为参数。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example baidu.dom(args).addClass(function(index,className){});
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    addClass: function(value){
    	
        //异常处理
        if(arguments.length <= 0 ){
            return this;
        };

        switch(typeof value){
            case 'string':

                //对输入进行处理
                value = value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
                
                var arr = value.split(' ');
                baidu.each(this, function(item,index){
                    var str = '';
                    if(item.className){
                        str = item.className;
                    };
                    for(var i = 0; i<arr.length; i++){
                        if((' '+str+' ').indexOf(' '+arr[i]+' ') == -1){
                            str += (' '+arr[i]);
                        };
                    };
                    item.className = str.replace(/^\s+/g,'') ;
                });

            break;
            case 'function':
                baidu.each(this, function(item,index){
                    baidu.dom(item).addClass(value.call(item, index, item.className));
                });

            break;
            default:
            break;
        };

        return this;
    }
});

//兼容以前的快捷方式
baidu.addClass = baidu.dom.addClass;