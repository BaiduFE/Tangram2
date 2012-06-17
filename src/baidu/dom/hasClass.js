/**
 * @author wangxiao
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