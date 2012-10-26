/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.dom;
///import baidu._util_.showHide;

/**
 * @description 显示匹配的元素
 * @function 
 * @name baidu.dom().show()
 * @grammar baidu.dom(args).show()
 * @return {TangramDom} 之前匹配的TangramDom对象
 */

baidu.dom.extend({
    show : function() {
        baidu._util_.showHide( this, true );
        return this;
    }
});