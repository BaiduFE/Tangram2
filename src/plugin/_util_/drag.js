/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 简单的拖拽方法
 * @function 
 * @name baidu.plugin._util_.drag
 * @grammar baidu.plugin._util_.drag(selector)
 * @param {Selector|TangramDom|htmlElement} selector css选择器字符串、HTML字符串，或者页面Dom元素，只对第一个匹配元素操作
 * @return {Object} 返回相关实例方法的对象
 * @example 
 执行函数会立刻绑定“mousemove”事件，鼠标移动即会产生拖拽效果，
 当拖拽开始时触发“dragstart”事件，当拖拽时触发“dragging”，当拖拽结束时触发“dragend”。
*/

/**
 * @description 获得当前拖拽元素
 * @name baidu.plugin._util_.drag().target
 * @grammar baidu.plugin._util_.drag(selector).target
 * @return {TangramDom} 当前拖拽元素的tangramDom对象
 * @example 
 直接返回一个tangramDom对象，可以直接链式操作。
*/

/**
 * @description 停止拖拽
 * @function 
 * @name baidu.plugin._util_.drag().disable()
 * @grammar baidu.plugin._util_.drag(selector).disable()
 * @param {Null}
 * @return {Object} 返回相关实例方法的对象
 * @example 
 执行drag实例的disable()方法，会立刻停止拖拽效果。
*/

/**
 * @description 激活拖拽
 * @function 
 * @name baidu.plugin._util_.drag().enable()
 * @grammar baidu.plugin._util_.drag(selector).enable()
 * @param {Null}
 * @return {Object} 返回相关实例方法的对象
 * @example 
 执行drag实例的enable()方法，会立刻执行之前的拖拽效果。
 */

/**
 * @description 取消拖拽，匹配元素回到之前位置
 * @function 
 * @name baidu.plugin._util_.drag().cancel()
 * @grammar baidu.plugin._util_.drag(selector).cancel()
 * @param {Null}
 * @return {Object} 返回相关实例方法的对象
 * @example 
 执行drag实例的cancel()方法，设置拖拽元素回到起始的位置。
 */

/**
 * @description 获取当前限制拖拽范围
 * @function 
 * @name baidu.plugin._util_.drag().range()
 * @grammar baidu.plugin._util_.drag(selector).range()
 * @param {Null}
 * @return {String|Object} 返回当前限制拖拽的范围
 */

/**
 * @description 限制拖拽范围
 * @function 
 * @name baidu.plugin._util_.drag().range()
 * @grammar baidu.plugin._util_.drag(selector).range(selector)
 * @param {String|HTMLString|HTMLElement} selector 限定在selector匹配的元素内，如果是多个匹配第一个。
 * @return {Object} 返回相关实例方法的对象
 */

/**
 * @description 限制拖拽范围
 * @function 
 * @name baidu.plugin._util_.drag().range()
 * @grammar baidu.plugin._util_.drag(selector).range(obj)
 * @param {Object} obj 要满足{top:123,right:123,bottom:123,left:123}的形式。top 距离屏幕上方的距离，right 距离屏幕左方最大可移动到的距离，bottom 距离屏幕上方最大可移动到的距离，left 距离屏幕左侧的距离
 * @return {Object} 返回相关实例方法的对象
 */

/**
 * @description 析构方法，清除一切资源
 * @function 
 * @name baidu.plugin._util_.drag().dispose()
 * @grammar baidu.plugin._util_.drag(selector).dispose()
 * @param {Null}
 * @return {Null}
 * @example
 执行完毕后，会在原实例上面挂在唯一项，{dispose:true}
*/

///import baidu.extend;
///import baidu.query.on;
///import baidu.query.off;
///import baidu.query.eq;
///import baidu.query.trigger;
///import baidu.query.outerWidth;
///import baidu.query.outerHeight;
///import baidu.query.offset;
///import plugin._util_;

baidu.plugin._util_.drag = function(selector){

    var timer,

        doc = baidu.dom(document),

        //只对第一个值操作
        ele = baidu.dom(selector).eq(0),

        //拖拽前的offset值
        offset = ele.offset(),

        //相对宽度和高度
        width,height,

        //限定拖动范围，如果有值，则为 {top:,right:,bottom:,left:}
        range,

        //跟随鼠标移动
        move = function(ele,x,y){
            if(range){

                //优化超速移动鼠标的情况，兼容有border的情况
                x = Math.min(range.right - range.width, Math.max(range.left, x));
                y = Math.min(range.bottom - range.height, Math.max(range.top, y));
            };

            //相对屏幕设置位置
            ele.offset({'left':x,'top':y});

            //对全局派发事件
            doc.trigger('dragging');
        },

        handle = function(event){

            //增加函数节流，防止事件频繁触发函数，影响性能
            if(timer){return};
            timer = setTimeout(function(){
                var o = ele.offset();
                !width && (width = event.pageX - o.left);
                !height && (height = event.pageY - o.top);
                move(ele,event.pageX - width,event.pageY - height);
                timer = null;
            },16);
        },

        //防止拖拽过程中选择上文字
        unselect = function (e) {
            return e.preventDefault();
        },

        onEvent = function(){

            //修正拖曳过程中页面里的文字会被选中
            doc.on('selectstart',unselect);
            doc.on('mousemove',handle);

            //设置鼠标粘滞
            if (ele[0].setCapture) {
                ele[0].setCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
            };

            //清除鼠标已选择元素
            if(document.selection){
                document.selection.empty && document.selection.empty();
            }else if(window.getSelection){
                window.getSelection().removeAllRanges();
            };
        },

        offEvent = function(){

            //防止最后一次的触发
            clearTimeout(timer);

            //解除鼠标粘滞
            if (ele[0].releaseCapture) {
                ele[0].releaseCapture();
            } else if (window.releaseEvents) {
                window.releaseEvents(Event.MOUSEMOVE|Event.MOUSEUP);
            };
            doc.off('mousemove',handle);
            doc.off('selectstart',unselect);
        };

    doc.trigger('dragstart',{target:ele});
    onEvent();

    return {
        target:ele,
        disable:function(){
            offEvent();
            width = height = null;
            doc.trigger('dragend');
            return this;
        },
        enable:function(){
            doc.trigger('dragstart');
            onEvent();
            return this;
        },
        range:function(value){
            if(value === undefined){
                return range;
            };
            var uRange = value, el;
            if(baidu.type(value) !== 'object'){
                el = baidu.dom(value).eq(0);
                uRange = el.offset();
                uRange.right = uRange.left + el.outerWidth();
                uRange.bottom = uRange.top + el.outerHeight();
            };
            range = baidu.extend({
                left: Number.MIN_VALUE,
                top: Number.MIN_VALUE,
                right: Number.MAX_VALUE,
                bottom: Number.MAX_VALUE,
                width: ele.outerWidth(),
                height: ele.outerHeight()
            }, uRange);
            return this;
        },

        //取消上一次拖拽
        cancel:function(){
            ele.offset(offset);
            return this;
        },

        //析构函数
        dispose:function(){
            offEvent();
            width = height = doc = ele = offset = range = null;
            for(var k in this){
                delete this[k];
            };
            this.dispose = true;
            return null;
        }
    }
};