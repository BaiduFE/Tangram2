/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 在匹配的元素集合中的每个元素上添加或删除一个或多个className，如果存在就删除一个className，不存在就添加。
 * @function 
 * @name baidu.dom().toggleClass()
 * @grammar baidu.dom(args).toggleClass(className)
 * @param {String} className 要添加或者删除的className名（多个用空格间隔）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 在匹配的元素集合中的每个元素上添加或删除一个或多个样式类，取决于这个样式类是否存在或价值切换属性。
 即：如果存在就删除那个className；如果不存在就添加那个className。
 
 示例代码：
 //HTML片段
 <div id='test-div' class="class1 class3"></div>

 //单个className
 baidu('#test-div').toggleClass('class3').hasClass('class3'); //false
 
 //多个className
 baidu('#test-div').toggleClass('class1 class2').hasClass('class2'); //true

 */

/**
 * @description 在匹配的元素集合中的每个元素上添加或删除一个或多个className，如果存在就删除一个className，不存在就添加。
 * @function 
 * @name baidu.dom().toggleClass()
 * @grammar baidu.dom(args).toggleClass(className,switch)
 * @param {String} className 要添加或者删除的className名（多个用空格间隔）
 * @param {Boolean} switch 一个用来判断传入的className添加还是移除的 boolean 值。true则都添加，false则都删除。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 在匹配的元素集合中的每个元素上添加或删除一个或多个样式类，取决于这个样式类是否存在或价值切换属性。
 .toggleClass()的第二个接口使用第二个参数判断样式类是否应该被添加或删除。
 
 如果这个参数的值是true，那么这个样式类将被添加;
 如果这个参数的值是false，那么这个样式类将被移除。
 本质上是这样的（伪代码）: 
 
 if(true){
   addClass(className) 
 }else{
   removeClass(className) 
 };
 
 示例代码：
 //HTML片段
 <div class="class1 class2 class3"></div>

 //清除className
 baidu('div').toggleClass('class2 class3',false);

 */
/**
 * @description 在匹配的元素集合中的每个元素上添加或删除一个或多个className，如果存在就删除一个className，不存在就添加。
 * @function 
 * @name baidu.dom().toggleClass()
 * @grammar baidu.dom(args).toggleClass(fn[,switch])
 * @param {Function} fn 用来返回在匹配的元素集合中的每个元素上用来切换的className的一个函数。接收元素的索引位置和元素旧的className作为参数。
 * @param {Boolean} switch 一个用来判断传入的className添加还是移除的 boolean 值。true则都添加，false则都删除。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的className和index（索引值），并且将函数返回值设置为对应的className；
 通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML片段
 <div id='test-div1'></div>
 <div id='test-div2'></div>

 //迭代器方法
 //通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu('div').toggleClass(function(index,className){
    alert(index);
    alert(className);
    if(index==1){
       return "test-class"+index;
    }
 });

 */

///import baidu.dom;
///import baidu.forEach;

baidu.dom.extend({
    toggleClass: function(value,status){
        var type = typeof value;
        var status = (typeof status === 'undefined')? status : Boolean(status);

        if(arguments.length <= 0 ){
            baidu.forEach(this,function(item){
                item.className = '';
            });
        };

        switch(typeof value){
            case 'string':

                //对输入进行处理
                value = value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');

                var arr = value.split(' ');
                baidu.forEach(this, function(item){
                    var str = item.className;
                    for(var i = 0;i<arr.length;i++){

                        //有这个className
                        if((~(' '+str+' ').indexOf(' '+arr[i]+' '))&&(typeof status === 'undefined')){
                            str = (' '+str+' ').replace(' '+arr[i]+' ',' ');
                            
                        }else if((!~(' '+str+' ').indexOf(' '+arr[i]+' '))&&(typeof status === 'undefined')){
                            str += ' '+arr[i];

                        }else if((!~(' '+str+' ').indexOf(' '+arr[i]+' '))&&(status === true)){
                            str += ' '+arr[i];

                        }else if((~(' '+str+' ').indexOf(' '+arr[i]+' '))&&(status === false)){
                            str = str.replace(arr[i],'');
                        };
                    };
                    item.className = str.replace(/^\s+/g,'').replace(/\s+$/g,'');
                });
            break;
            case 'function':

                baidu.forEach(this, function(item, index){
                    baidu.dom(item).toggleClass(value.call(item, index, item.className),status);
                });

            break;
        };

        return this;
    }
});


///import baidu.dom.addClass;
///import baidu.dom.removeClass;
///import baidu.dom.hasClass;

