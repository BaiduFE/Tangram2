/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.dom._showHide;

/**
 * @description 显示匹配的元素
 * @function 
 * @name baidu.dom.show
 * @grammar baidu.dom().show()
 * @return {TangramDom} 返回之前匹配的TangramDom对象
 */

baidu.dom.extend({
    show : function() {
        baidu.dom._showHide( this, true );
        return this;
    }
});

//声明快捷方式
baidu.show = baidu.dom.show;