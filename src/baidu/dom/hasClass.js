/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 检查匹配的元素是否含有某个特定的类
 * @function 
 * @name baidu.dom().hasClass()
 * @grammar baidu.dom(args).hasClass(className)
 * @param {string} className 要查询的className名，多个用空格分隔。
 * @return {Boolean} 同时存在返回true，不存在返回false。
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    hasClass: function(value){
        //异常处理
        if(arguments.length <= 0 || typeof value === 'function'){
            return this;
        };
        //对输入进行处理
        value = value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
        var arr = value.split(' ');
        var result;
        baidu.each(this, function(item){
            var str = item.className;
            for(var i = 0;i<arr.length;i++){
                if((' '+str+' ').indexOf(' '+arr[i]+' ') == -1){
                    //有一个不含有
                    result = false;
                    return;
                };
            };
            if(result!==false){
                result = true;
                return;
            };
        });
        return result;
    }
});
