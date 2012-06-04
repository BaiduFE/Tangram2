/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    addClass: function(className){
    	
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

        baidu.each(this, function(item){
            for(var i = 0;i<arr.length;i++){
                if(!new RegExp('\\b'+arr[i]+'\\b').test(item.className)){
                    item.className += arr[i];
                }
            };
        });

        return this;
    }
});