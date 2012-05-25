/// import baidu;
/// import baidu.merge;
/// import baidu.overwrite;
/// import baidu.createChain;

/**
 * baidu.dom 所有与 DOM 相关的操作方法都在此命名空间之下
 * 
 * @author: meizz
 * @namespace: baidu.dom
 * @version: 2012-04-20
 * @param   String|Element|tangramDom   selector
 * @param   Document                    context
 * @return  tangramDom
 */
baidu.createChain("dom",

    // method function
    function(selector, context){
        var e,
            mz = new baidu.dom.$Chain(context);

        // Handle $(""), $(null), or $(undefined)
        if ( !selector ) {
            return mz;
        }

        // Handle $($DOM)
        if (selector._type_ == "$DOM") {
            return selector;
        
        // Handle $(DOMElement)
        } else if ( selector.nodeType ) {
            mz[0] = selector;
            mz.length = 1;
            return mz;

        // Handle $(Array) or $(Collection)
        } else if (selector.length && mz.toString.call(selector) != "[object String]" ) {
            baidu.merge( mz, selector );
            return mz;

        } else {

            // 在没有挂载 sizzle 全功能selector之前，使用普通模式
            if ( !baidu.selector && ( e = mz.context.getElementById( selector ) )) {
                mz[0] = e;
                mz.length = 1;

            } else {
                baidu.merge( mz, baidu.selector( selector, context ));
            }
        }

        return mz;
    },

    // constructor
    function(context) {
        this.length = 0;
        this._type_ = "$DOM";
        this.context = context || document;
    }

).extend ({

    size : function(){return this.length;}
    ,get : function(index){

        if ( typeof index == "number" ) {
            return this[index];
        }

        return baidu.merge([], this);
    }

});
