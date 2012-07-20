/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.support;
///import baidu.dom._isXML;
///import baidu.dom._propHooks;

baidu.dom.extend({
    prop:function(name,value){
    	
        //异常处理
        if(arguments.length <= 0 || typeof name === 'function'){
            return this;
        };

        //返回结果
        var result;

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

            notxml = nType !== 1 || !bd._isXML( item );

            if ( notxml ) {
                // Fix name and attach hooks
                name = bd.propFix[ name ] || name;
                hooks = bd.propHooks[ name ];
            };

            switch(typeof name){
                case 'string':
                    if( typeof value === 'undefined' ){
                        
                        //get first
                        if ( hooks && "get" in hooks && (ret = hooks.get( item, name )) !== null ) {
                            //return ret;
                            result = ret ;

                        } else {
                            //return item[ name ];
                            result = item[name];
                        };

                    }else if( typeof value === 'function' ){
                        
                        var ele = bd(item);
                        ele.prop( name, value.call(item, index, ele.prop(name)));

                    }else{
                        
                        //set all
                        if ( hooks && "set" in hooks && (ret = hooks.set( item, value, name )) !== undefined ) {
                            return ret;

                        } else {
                            item[ name ] = value;
                        };
                    };

                break;
                case 'object':

                    //set all
                    var ele = bd(item);
                    for(key in name){
                        ele.prop(key,name[key]);
                    };

                break;
                default:
                break;
            };
        });

        return result?result:this;
    }
});