/**
 * @author wangxiao
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
            
                var arr = value.split(' ');

                baidu.each(this, function(item){
                    for(var i = 0;i<arr.length;i++){
                        item.className = item.className.replace(arr[i],'');
                    };
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