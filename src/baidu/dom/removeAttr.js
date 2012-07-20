/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.each;
///import baidu.support;
///import baidu.dom._propHooks;
///import baidu.dom.attr;

baidu.dom.extend({
    removeAttr: function(value){

        //异常处理
        if(arguments.length <= 0 || !value || typeof value !== 'string'){
            return this;
        };

        baidu.each(this, function(item){
            var propName, attrNames, name, l, isBool, i = 0;

            if ( item.nodeType === 1 ) {
                var bd = baidu.dom;
                attrNames = value.toLowerCase().split(/\s+/);
                l = attrNames.length;

                for ( ; i < l; i++ ) {
                    name = attrNames[ i ];

                    if ( name ) {
                        propName = bd.propFix[ name ] || name;
                        isBool = bd.rboolean.test( name );

                        // See #9699 for explanation of this approach (setting first, then removal)
                        // Do not do this for boolean attributes (see #10870)
                        if ( !isBool ) {
                            bd(item).attr(name,"");
                        }
                        item.removeAttribute( baidu.support.getSetAttribute ? name : propName );

                        // Set corresponding property to false for boolean attributes
                        if ( isBool && propName in item ) {
                            item[ propName ] = false;
                        }
                    }
                }
            }
        });
        
        return this;
    }
});