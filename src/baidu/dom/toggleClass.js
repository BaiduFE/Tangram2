/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    toggleClass: function(value){
    	
        if(arguments.length <= 0 ){
            baidu.each(this,function(item){
                item.className = '';
            });
        };

        switch(typeof value){
            case 'string':
                var arr = value.split(' ');

                baidu.each(this, function(item){
                    var str = item.className;
                    for(var i = 0;i<arr.length;i++){

                        //有这个className
                        if((' '+str+' ').indexOf(' '+arr[i]+' ') > -1){
                            item.className = str.replace(arr[i],'');
                        }else{
                            item.className += arr[i];
                        }
                    };
                });

            break;
            case 'function':

                baidu.each(this, function(item, index ,className){
                    baidu.dom(item).toggleClass(value.call(item, index, item.className));
                });

            break;
            default:
            break;
        };

        return this;
    }
});