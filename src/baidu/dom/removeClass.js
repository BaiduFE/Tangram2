/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 移除每个匹配元素的一个，多个或全部样式。
 * @function 
 * @name baidu.dom().removeClass()
 * @grammar baidu.dom(args).removeClass(className)
 * @param {String}  className 所要移除的一个或多个class属性名(多个用空格分隔)。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 */

/**
 * @description 移除每个匹配元素的一个，多个或全部样式。
 * @function 
 * @name baidu.dom().removeClass()
 * @grammar baidu.dom(args).removeClass(fn)
 * @param {Function}  fn(index, className) 这个函数返回一个或更多用空格隔开的要增加的样式名。接收元素的索引index和元素旧的样式名className作为参数。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").removeClass(function(index,className))
 */
 
///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    removeClass: function(value){
        if(arguments.length <= 0 ){
            baidu.each(this,function(item){
                item.className = '';
            });
        };
        switch(typeof value){
            case 'string':
                //对输入进行处理
                value = String(value).replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
                var arr = value.split(' ');
                baidu.each(this, function(item){
                    var str = item.className ;
                    for(var i = 0;i<arr.length;i++){
                        while((' '+str+' ').indexOf(' '+arr[i]+' ') >= 0){
                           str = (' '+str+' ').replace(' '+arr[i]+' ',' ');
                        };
                    };
                    item.className = str.replace(/^\s+/g,'').replace(/\s+$/g,'');
                });
            break;
            case 'function':
                baidu.each(this, function(item, index ,className){
                    baidu.dom(item).removeClass(value.call(item, index, item.className));
                });
            break;
            default:
            break;
        };

        return this;
    }
});
/// Tangram 1.x Code Start
//兼容以前的快捷方式
baidu.removeClass = baidu.dom.removeClass ;
/// Tangram 1.x Code End
