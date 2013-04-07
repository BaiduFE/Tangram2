
///import baidu.dom.getCurrentStyle;
///import baidu.dom.getDocument;
///import baidu._util_.contains;
///import baidu.dom.each;
///import baidu.dom.data;
///import baidu._util_.getDefaultDisplayValue;

/**
 * @description 显示匹配的元素
 * @function 
 * @name baidu.dom().show()
 * @grammar baidu.dom(args).show()
 * @return {TangramDom} 之前匹配的TangramDom对象
 * @example 
 show和hide方法是最简单的显示或者隐藏一个元素的方法

 示例代码：
 //HTML片段
 <div>元素</div>

 //显示一个元素
 baidu("div").show();

 */

baidu.dom.extend({
    show: function(){
        var vals = [],
            display, tang;
        this.each(function(index, ele){
            if(!ele.style){return;}
            tang = baidu.dom(ele);
            display = ele.style.display;
            vals[index] = tang.data('olddisplay');
            if(!vals[index] && display === 'none'){
                ele.style.display = '';
            }
            if(ele.style.display === ''
                && baidu._util_.isHidden(ele)){
                    tang.data('olddisplay', (vals[index] = baidu._util_.getDefaultDisplayValue(ele.nodeName)));
            }
        });
        
        return this.each(function(index, ele){
            if(!ele.style){return;}
            if(ele.style.display === 'none'
                || ele.style.display === ''){
                    ele.style.display = vals[index] || '';
            }
        });
    }
});