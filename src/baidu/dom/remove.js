/**
 * @author linlingyu
 */
///import baidu.dom.filter;
///import baidu.id;
///import baidu.dom._eventBase;
/**
 * @description 将匹配到的DOM元素从文档中移除，并移除对应的DOM元素的事件
 * @function 
 * @name baidu.dom().remove()
 * @grammar baidu.dom(args).remove([selector])
 * @param {String} selector 一个字符串的选择器，对前面匹配到的DOM元素再做进一步的过滤
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 */
/**
 * @description 从DOM树上移除目标元素
 * @function 
 * @name baidu.dom.remove
 * @grammar baidu.dom.remove(element)
 * @param {String|Element} element 需要移除的元素或元素的id
 * @return {Element} 被移除的DOM元素
 */

baidu.dom.extend({
    remove: function(){
        function cleanData(array){
            var tangId;
            for(var i = 0, ele; ele = array[i]; i++){
                tangId = baidu.id(ele, 'get');
                if(!tangId){continue;}
                baidu.dom._eventBase.removeAll(ele);
                baidu.id(ele, 'remove');
            }
        }
        //
        return function(selector, keepData){
            arguments.length > 0
                && baidu.paramCheck('^string(?:,boolean)?$', 'baidu.dom.remove');
            var array = selector ? this.filter(selector) : this,
                elements;
            for(var i = 0, ele; ele = array[i]; i++){
                if(!keepData){
                    cleanData(ele.getElementsByTagName('*'));
                    cleanData([ele]);
                }
                ele.parentNode && ele.parentNode.removeChild(ele);
            }
            return this;
        }
    }()
});