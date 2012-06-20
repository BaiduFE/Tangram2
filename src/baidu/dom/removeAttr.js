/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    removeAttr: function(attrName){

        //异常处理
        if(arguments.length <= 0){
            return this;
        };

        baidu.each(this, function(item){
            item.removeAttribute(attrName);
        });
        
        return this;
    }
});