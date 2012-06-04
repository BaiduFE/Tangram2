/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.type;
///import baidu.each;

baidu.dom.extend({
    hasClass: function(className){
    	
        //异常处理
        if(arguments.length <= 0 || typeof className === 'function'){
            return this;
        };

        //对输入进行处理
        className = String(className)
                    .replace(/^\s+/g,'')
                    .replace(/\s+$/g,'')
                    .replace(/\s+/g,' ')
                    .replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');

        var arr = className.split(' ');
        var result;

        baidu.each(this, function(item){
            for(var i = 0;i<arr.length;i++){
                
                if(!new RegExp('\\b'+arr[i]+'\\b').test(item.className)){
                    //有一个不含有
                    result = false;
                    return;
                };

                //都含有
                if(result){
                    result = true;
                };
            }
        });

        return result;
    }
});