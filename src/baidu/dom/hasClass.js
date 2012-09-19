/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
 
/**
 * @description 检查匹配的元素是否含有某个特定的className
 * @function 
 * @name baidu.dom().hasClass()
 * @grammar baidu.dom(args).hasClass(className)
 * @param {string} className 要查询的className名，多个用空格分隔。
 * @return {Boolean} 同时存在返回true，不存在返回false。
 * @example
 该接口支持传入多个className，并且可以打乱顺序。
 如果是多个，同时存在返回true，有一个不存在就返回false。
 示例代码：
 //HTML片段
 <div id='test-div' class='class1 class2'></div>

 //单个className
 baidu('#test-div').hasClass('class1');  //true
 
 //多个className
 baidu('#test-div').hasClass('class1 class2');  //true
 
 //多个className，顺序可以打乱
 baidu('#test-div').hasClass('class2 class1');  //true
 
 //多个className，有一个不存在则返回false
 baidu('#test-div').hasClass('class1 class2 class4');  //false

 */

///import baidu;
///import baidu.dom;
///import baidu.forEach;

baidu.dom.extend({
    hasClass: function(value){
        //异常处理
        if(arguments.length <= 0 || typeof value === 'function'){
            return this;
        };
        
        if(this.size()<=0){
            return false;
        };

        //对输入进行处理
        value = value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
        var arr = value.split(' ');
        var result;
        baidu.forEach(this, function(item){
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
