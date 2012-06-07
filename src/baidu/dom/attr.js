/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    attr:function(attrName){
    	
        //异常处理
        if(arguments.length <= 0 ){
            return this;
        };

        switch(typeof value){
            case 'string':

                baidu.each(this, function(item){
                    
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