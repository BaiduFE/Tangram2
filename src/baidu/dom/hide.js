/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.dom;
///import baidu._util_.showHide;

/**
 * @description 隐藏匹配的元素
 * @function 
 * @name baidu.dom().hide()
 * @grammar baidu.dom(args).hide()
 * @return {TangramDom} 之前匹配的TangramDom对象
 */

baidu.dom.extend({
    hide: function() {
        baidu._util_.showHide( this );
        return this;
    }
});