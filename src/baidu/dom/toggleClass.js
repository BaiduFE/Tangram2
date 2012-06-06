/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    toggleClass: function(value,status){
    	var type = typeof value;
        var status = (typeof status === 'undefined')? status : Boolean(status);

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
                        if(((' '+str+' ').indexOf(' '+arr[i]+' ') > -1)&&(typeof status === 'undefined')){
                            item.className = str.replace(arr[i],'');

                        }else if(((' '+str+' ').indexOf(' '+arr[i]+' ') === -1)&&(typeof status === 'undefined')){
                            item.className += arr[i];

                        }else if(((' '+str+' ').indexOf(' '+arr[i]+' ') === -1)&&(status === true)){
                            item.className += arr[i];

                        }else if(((' '+str+' ').indexOf(' '+arr[i]+' ') > -1)&&(status === false)){
                            item.className = str.replace(arr[i],'');

                        }
                    };
                });
            break;
            case 'function':

                baidu.each(this, function(item, index){
                    baidu.dom(item).toggleClass(value.call(item, index, item.className),status);
                });

            break;
            default:
            break;
        };

        return this;
    }
});