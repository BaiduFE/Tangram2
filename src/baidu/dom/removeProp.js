/**
 * @author wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    removeProp: function(propName){

        //异常处理
        if(arguments.length <= 0){
            return this;
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

        propName = propFix[ propName ] || propName;

        baidu.each(this, function(item){
            // try/catch handles cases where IE balks (such as removing a property on window)
            try {
                item[ propName ] = undefined;
                delete item[ propName ];
            } catch( e ) {}
        });

        return this;
    }
});