/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    prop:function(name,value){
    	
        //异常处理
        if(arguments.length <= 0 ){
            return this;
        };

        //Sizzle.isXML
        var isXML = function( elem ) {
            // documentElement is verified for cases where it doesn't yet exist
            // (such as loading iframes in IE - #4833)
            var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };

        var propFix = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        };

        var propHooks = {
            tabIndex: {
                get: function( elem ) {
                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    var attributeNode = elem.getAttributeNode("tabindex");

                    return attributeNode && attributeNode.specified ?
                        parseInt( attributeNode.value, 10 ) :
                        rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
                            0 : undefined;
                }
            }
        };

        switch(typeof name){
            case 'string':
                if( typeof value === 'undefined' ){
                    var ret, hooks, notxml,
                        nType = this[0].nodeType;

                    // don't get/set properties on text, comment and attribute nodes
                    if ( !this[0] || nType === 3 || nType === 8 || nType === 2 ) {
                        return;
                    };
                    notxml = nType !== 1 || !isXMLDoc( this[0] );

                    if ( notxml ) {
                        // Fix name and attach hooks
                        name = propFix[ name ] || name;
                        hooks = propHooks[ name ];
                    };



                }else if( typeof value === 'string' ){

                }else if( typeof value === 'function' ){
                    baidu.each(this, function(item,index){
                        baidu.dom(item).addClass(value.call(item, index, item.className));
                    });
                }

            break;
            case 'object':

            break;
            default:
            break;
        };

        return this;
    }
});