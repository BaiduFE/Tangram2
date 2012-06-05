/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    hasClass: function(className){
    	
        //异常处理
        if(arguments.length <= 0 || typeof className === 'function'){
            return this;
        };

        var result ;

        baidu.each(this, function(item){
            if((' '+item.className+' ').indexOf(' '+className+' ') >-1 ){
                result = true ;
            }else{
                result = false;
            }
        });

        return result;
    }
});