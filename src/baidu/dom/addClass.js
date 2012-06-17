/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    addClass: function(value){
    	
        //异常处理
        if(arguments.length <= 0 ){
            return this;
        };

        switch(typeof value){
            case 'string':

                //对输入进行处理
                value = value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
                
                var arr = value.split(' ');
                baidu.each(this, function(item,index){
                    var str = '';
                    if(item.className){
                        str = item.className;
                    };
                    for(var i = 0; i<arr.length; i++){
                        if((' '+str+' ').indexOf(' '+arr[i]+' ') == -1){
                            str += (' '+arr[i]);
                        };
                    };
                    item.className = str ;
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