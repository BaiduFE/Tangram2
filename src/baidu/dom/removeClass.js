/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
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

                //对输入进行处理
                value = String(value).replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
            
                var arr = value.split(' ');
                baidu.each(this, function(item){
                    var str = item.className ;
                    for(var i = 0;i<arr.length;i++){
                        while((' '+str+' ').indexOf(' '+arr[i]+' ') >= 0){
                           str = (' '+str+' ').replace(' '+arr[i]+' ',' ');
                        };
                    };
                    item.className = str.replace(/^\s+/g,'').replace(/\s+$/g,'');
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

//兼容以前的快捷方式
baidu.removeClass = baidu.dom.removeClass ;