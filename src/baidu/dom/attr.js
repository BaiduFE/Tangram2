/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.each;
///import baidu.support;
///import baidu.dom._isXML;
///import baidu.dom._attrHooks;

///import baidu.dom.prop;
///import baidu.dom.val;
///import baidu.dom.css;
///import baidu.dom.html;
///import baidu.dom.text;
///import baidu.dom.width;
///import baidu.dom.height;
///import baidu.dom.offset;

///import baidu.dom.removeAttr;

baidu.dom.extend({
    attr:function(name,value){
    	
        //异常处理
        if(arguments.length <= 0 || typeof name === 'function'){
            return this;
        };

        //返回结果
        var result,
            isSet = false;

        baidu.each(this, function(item,index){

            if(result){
                return;
            };

            var ret, 
                hooks, 
                notxml,
                bd = baidu.dom,
                nType = item.nodeType;

            // don't get/set properties on text, comment and attribute nodes
            if ( !item || nType === 3 || nType === 8 || nType === 2 ) {
                return;
            };

            // Fallback to prop when attributes are not supported
            if ( typeof item.getAttribute === "undefined" ) {
                result = this.prop( name, value );
            };

            switch(typeof name){
                case 'string':
                    notxml = nType !== 1 || !bd._isXML( item );

                    // All attributes are lowercase
                    // Grab necessary hook if one is defined
                    if ( notxml ) {
                        name = name.toLowerCase();
                        hooks = bd.attrHooks[ name ] || ( bd.rboolean.test( name ) ? bd.boolHook : bd.nodeHook );
                    };

                    if( typeof value === 'undefined' ){
                        
                        //get first
                        if ( hooks && "get" in hooks && notxml && (ret = hooks.get( item, name )) !== null ) {
                            //return ret;
                            result = ret;
                        } else {

                            ret = item.getAttribute( name );

                            // Non-existent attributes return null, we normalize to undefined
                            //return ret === null ? undefined : ret;
                            result = ret === null ? undefined : ret;
                        };

                    }else if( typeof value === 'function' ){

                        isSet = true;
                        var ele = bd(item);
                        ele.attr(name,value.call(item, index, ele.attr(name)));
                    
                    }else{
                        
                        //set all
                        isSet = true;
                        var attrFn = {
                            val: true,
                            css: true,
                            html: true,
                            text: true,
                            //data: true,
                            width: true,
                            height: true,
                            offset: true
                        };

                        if ( name in attrFn ) {
                            result = bd( item )[ name ]( value );
                            return;
                        };

                        if ( value === null ) {
                            bd(item).removeAttr( name );
                            return;

                        } else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( item, value, name )) !== undefined ) {
                            return ret;

                        } else {
                            item.setAttribute( name, "" + value );
                            return value;
                        };
                    };

                break;
                case 'object':

                    //set all
                    isSet = true;
                    var ele = bd(item);
                    for(key in name){
                        ele.attr(key,name[key]);
                    };

                break;
                default:
                break;
            };
        });
    
        return isSet?this:result;
    }
});