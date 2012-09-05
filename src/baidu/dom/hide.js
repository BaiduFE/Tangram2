/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu._util_.showHide;

/**
 * @description 隐藏匹配的元素
 * @function 
 * @name baidu.dom.show
 * @grammar baidu.dom().show()
 * @return {TangramDom} 返回之前匹配的TangramDom对象
 */

baidu.dom.extend({
    hide: function() {
        baidu._util_.showHide( this );
        return this;
    }
});

//声明快捷方式
baidu.hide = baidu.dom.hide;
