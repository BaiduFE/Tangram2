///import baidu.dom;
///import baidu.type;
///import baidu.query.match;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 去除当前集合中符合再次输入的选择器的项
 *
 * @function
 * @name baidu.dom().not()
 * @grammar baidu.dom(args).not(selector)
 * @param   {Object}            selector    选择器
  
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 * @example 
 去除当前集合中符合再次输入的选择器的项
 
 示例代码：
 //HTML片段
 <div class="test">1</div>
 <div>2</div>
 <div>3</div>
 <div class="test">4</div>

 //去掉class为test的元素
 baidu('div').not('.test');

 //结果
 <div>2</div>
 <div>3</div>

 */
baidu.query.extend({
    not : function (selector) {
        var i, j, n
            ,all= this.get()
            ,a  = baidu.isArray(selector) ? selector
                : baidu.query.match(this, selector);

        for (i=all.length - 1; i>-1; i--) {
            for (j=0, n=a.length; j<n; j++) {
                a[j] === all[i] && all.splice(i, 1);
            }
        }

        return baidu.dom(all);
    }
});
