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
                value = String(value)
                            .replace(/^\s+/g,'')
                            .replace(/\s+$/g,'')
                            .replace(/\s+/g,' ')
                            .replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');

                var arr = value.split(' ');

                baidu.each(this, function(item){
                    for(var i = 0;i<arr.length;i++){
                        if(!new RegExp('\\b'+arr[i]+'\\b').test(item.className)){
                            item.className += (' '+arr[i]);
                        }
                    };
                });
            break;
            case 'function':
                baidu.each(this, function(item, index ,className){
                    value.call(item, index, item.className);
                });
            break;
            default:
            break;
        };

        return this;
    }
});