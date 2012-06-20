/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    attr:function(attrName,value){
    	
        //异常处理
        if(arguments.length <= 0 ){
            return this;
        };

        switch(typeof attrName){
            case 'string':
                if( typeof value === 'undefined' ){
        
                    var nType = this[0].nodeType;
                    // don't get/set attributes on text, comment and attribute nodes
                    if ( !this[0] || nType === 3 || nType === 8 || nType === 2 ) {
                        return;
                    };


                }else if( typeof value === 'string' ){

                    if('style' === attrName){
                        item.style.cssText = value;
                    }else {
                        key = baidu.dom._NAME_ATTRS[key] || key;
                        element.setAttribute(key, value);
                    };
                    return element;


                }else if( typeof value === 'function' ){
                    baidu.each(this, function(item,index){
                        baidu.dom(item).addClass(value.call(item, index, item.className));
                    });
                }

            break;
            default:
            break;
        };

        return this;
    }
});