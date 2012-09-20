/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom.getDocument;

/**
 * @description 取得匹配元素所属的window对象
 * @function 
 * @name baidu.dom().getWindow()
 * @grammar baidu.dom(args).getWindow()
 * @return {window} 返回匹配元素所属的window对象
 */
/**
 * @description 获取目标元素所属的window对象
 * @function 
 * @name baidu.dom.getWindow
 * @grammar baidu.dom.getWindow(element)
 * @param {String|Element} element 目标元素或目标元素的id
 * @return {window} 目标元素所属的window对象
 */
baidu.dom.extend({
    getWindow: function(){
        var doc = this.getDocument();
        return (this.size()<=0)? undefined :(doc.parentWindow || doc.defaultView);
    }
});