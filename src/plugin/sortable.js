/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 实例化当前的排序列表（sortable）功能
 * @function 
 * @name baidu().sortable()
 * @grammar baidu(args).sortable([selector][,options])
 * @param {Selector|TangramDom|htmlElement} args 传入当前要被实例化为排序列表（sortable）的容器或者CSS选择器
 * @param {Selector|TangramDom|htmlElement} selector 可选参数，可以是CSS选择器或者是HTML元素，当前排序列表（sortable）中，可以被排序的项。
 * @param {Object} options 相关配置参数
 * @param {Boolean} options.enable 当前的排序列表（sortable）实例是否可使用。
 * @param {Selector|TangramDom|htmlElement|Object} options.range 当前排序列表（sortable）元素可以被拖拽的范围，可以是CSS选择器或者HTML元素（如果是多个，只会取出第一个），限制范围在某一个元素内。传入Object要符合{'top':123,'right':123,'bottom':123,'left':123},top和bottom都是相对屏幕上边缘，left和right都是相对屏幕左边缘。
 * @param {Function} options.onstart 当用户拖拽操作开始时，实例会触发“start”内部事件，并且会触发onstart方法。
 * @param {Function} options.onend 当用户拖拽操作结束时，实例会触发“end”内部事件，并且会触发onend方法。
 * @param {Function} options.ondragging 当用户正在拖拽元素时，实例会触发“dragging”内部事件，并且会触发ondragging方法。被拖拽的元素会自动被加上一个名称为“tang-draggable-dragging”的className，方便用户改变正在拖拽的这个元素样式，或者对其做操作。
 * @param {Function} options.onchange 当排序列表（sortable）中的选择项顺序发生变化时，会触发“change”内部事件，并且会触发onchange方法，在参数e.target中可以取得当前是哪一个元素改变了。
 * @return {sortable} 返回排序列表（sortable）的一个实例，实例的默认配置可以直接通过options属性取到。
 * @example
    该方法会产生一个排序列表（sortable）实例，你可以通过配置，或者后期调用的方式来控制该实例的功能。
    排序列表（sortable）中所有元素都会默认被加上名为“tang-sortable-item”的className，方便用户改变每个元素样式，或者这些元素做操作。

 示例代码：
 //baidu.plugin.sortable 相关CSS

 // @description 每个可以被排序的元素的默认样式
 .tang-sortable-item{
 
 }

 // @description 正在被拖拽的元素默认样式
 .tang-draggable-dragging{

 }

 //HTML代码片段
 <ul class='group'>
    <li class='sort'></li>
    <li class='sort'></li>
    <li></li>
    <li></li>
 </ul>

 //js部分
 
 //最简单的直接使用
 var sortable = baidu('.group').sortable(); //此时可以对group的直接子元素进行拖拽排序，当前可以被排序的元素都会默认加上名为“tang-sortable-item”的className。

 //设置可以被选择的元素
 var sortable = baidu('.group').sortable('.sort'); //此时group元素中，有className为“.sort”的子元素才可以被选择。

*/

/**
 * @description 关闭当前这个排序列表（sortable）的功能
 * @function 
 * @name baidu().sortable().disable()
 * @grammar baidu(args).sortable().disable()
 * @param {Null}
 * @return {Sortable} 返回Sortable的一个实例。
*/

/**
 * @description 开启当前这个排序列表（Sortable）的功能
 * @function 
 * @name baidu().sortable().enable()
 * @grammar baidu(args).sortable().enable()
 * @param {Null}
 * @return {Sortable} 返回Sortable的一个实例。
 * @example
 该方法与disable()方法结合使用，初始化sortable时，默认是enable的状态，无需手动触发enable方法。
*/

/**
 * @description 设置当前排序列表（sortable）可以拖拽的范围
 * @function 
 * @name baidu().sortable().range()
 * @grammar baidu(args).sortable().range(value)
 * @param {Selector|TangramDom|htmlElement|Object|Null} value 如果不传入参数，则为获取当前限定的范围。可以传入一个selector，如果匹配多个元素，只会取出第一个。限定拖拽元素活动的范围，只能在当前selector元素内活动。也可以传入一个Object，要符合{'top':123,'right':123,'bottom':123,'left':123},top和bottom都是相对屏幕上边缘，left和right都是相对屏幕左边缘。
 * @return {sortable|Selector|TangramDom|htmlElement|Object} 返回Sortable的一个实例，或者是取出当前range的值。
*/

/**
 * @description 析构函数，清除所有调用资源
 * @function 
 * @name baidu().sortable().dispose()
 * @grammar baidu(args).sortable().dispose()
 * @param {Null}
 * @return {Null} 被析构后，当前的sortable实例只会有一个元素{dispose:true}
*/

/**
 * @description 取得当前排序列表（sortable）中所有元素
 * @function 
 * @name baidu().sortable().item()
 * @grammar baidu(args).sortable().item()
 * @param {Null}
 * @return {TangramDom} 直接返回当前排序列表（sortable）中所有元素组成的tangramDom，可以直接调用tangram2.0的DOM操作方法。
 * @example
 排序列表（sortable）中所有元素都会默认被加上名为“tang-sortable-item”的className，方便用户改变每个元素样式，或者这些元素做操作。
*/

/**
 * @description 取得当前排序列表（sortable）的元素索引
 * @function 
 * @name baidu().sortable().index()
 * @grammar baidu(args).sortable().index()
 * @param {Null}
 * @return {Array} 返回当前排序列表（sortable）元素的索引组成的数组。
 * @example
 排序列表（sortable）的元素默认会按照当前顺序设置索引，初始化时为[0,1,2....]。当排序之后，顺序变化，再次取出，就可以比对和之前的索引顺序。
*/

/**
 * @description 取消本次排序操作，恢复为之前状态
 * @function 
 * @name baidu().sortable().cancel()
 * @grammar baidu(args).sortable().cancel()
 * @param {Null}
 * @return {Sortable} 返回Sortable的一个实例。
*/

/**
 * @description 重置排序列表（sortable），恢复为初始状态
 * @function 
 * @name baidu().sortable().reset()
 * @grammar baidu(args).sortable().reset()
 * @param {Null}
 * @return {Sortable} 返回Sortable的一个实例。
*/

/**
 * @description 重新获取当前元素的tangramDom链头，使其可以使用tangram的Dom操作方法
 * @function 
 * @name baidu().sortable().getBack()
 * @grammar baidu(args).sortable().getBack()
 * @param {Null}
 * @return {TangramDom} 返回当前拖拽元素的tangramDom对象，可以继续使用tangram的Dom操作方法
 * @example
 调用该方法可以继续使用tangram的Dom操作方法，如：

 示例代码：
 //HTML代码片段
 <ul class='group'>
    <li class='sort'></li>
    <li class='sort'></li>
    <li></li>
    <li></li>
 </ul>

 //js部分
 var sortable = baidu('.group').sortable();
 sortable.getBack().css('border','1px solid #F00');
*/

/**
 * @description 监听当前sortable实例中的内部事件
 * @function 
 * @name baidu().sortable().on()
 * @grammar baidu(args).sortable().on(name,fun)
 * @param {String} name 私有事件的名称
 * @param {Function} fun 当此事件被触发时执行的方法
 * @return {sortable} 返回Sortable的一个实例
 * @example
 目前sortable实例中的私有事件有:
 ‘start’：用户拖拽开始时触发；
 ‘end’：用户拖拽结束时触发；
 ‘dragging’：每次元素拖拽时触发；
 ‘change’：排序元素改变时触发；

 示例代码：
 //HTML代码片段
 <ul class='group'>
    <li class='sort'></li>
    <li class='sort'></li>
    <li></li>
    <li></li>
 </ul>

 //js部分
 var sortable = baidu('.group').sortable();

 var fn = function(){
    alert('started!');    
 };

 sortable.on('start',fn);
*/

/**
 * @description 移除当前sortable实例中对内部事件的监听
 * @function 
 * @name baidu().sortable().off()
 * @grammar baidu(args).sortable().off(name,fun)
 * @param {String} name 私有事件的名称
 * @param {Function} fun 要移除的方法
 * @return {sortable} 返回sortable的一个实例
 * @example
 目前sortable实例中的私有事件有:
 ‘start’：用户拖拽开始时触发；
 ‘end’：用户拖拽结束时触发；
 ‘dragging’：每次元素拖拽时触发；
 ‘change’：排序元素改变时触发；

 示例代码：
 //HTML代码片段
 <ul class='group'>
    <li class='sort'></li>
    <li class='sort'></li>
    <li></li>
    <li></li>
 </ul>

 //js部分
 var sortable = baidu('.group').sortable();

 var fn = function(){
    alert('started!');    
 };

 sortable.off('start',fn);
*/

/**
 * @description 触发一个sortable实例中对内部事件
 * @function 
 * @name baidu().sortable().fire()
 * @grammar baidu(args).sortable().fire(name,options)
 * @param {String} name 私有事件的名称
 * @param {Object} options 扩展参数，所含属性键值会扩展到Event对象上 
 * @example
 目前sortable实例中的私有事件有:
 ‘start’：用户拖拽开始时触发；
 ‘end’：用户拖拽结束时触发；
 ‘dragging’：每次元素拖拽时触发；
 ‘change’：排序元素改变时触发；

 示例代码：
 //HTML代码片段
 <ul class='group'>
    <li class='sort'></li>
    <li class='sort'></li>
    <li></li>
    <li></li>
 </ul>

 //js部分
 var sortable = baidu('.group').sortable();

 //如：监听living事件
 sortable.on('living',function(){
    alert('sortable is living!');    
 });

 setTimeout(function(){
     if(sortable){

         //触发living事件
        sortable.fire('living');
     };    
 },1000);
*/

///import baidu.createSingle;
///import baidu.setBack;
///import baidu.type;
///import baidu.dom.find;
///import baidu.dom.children;
///import baidu.dom.clone;
///import baidu.dom.addClass;
///import baidu.dom.removeClass;
///import baidu.dom.remove;
///import baidu.dom.before;
///import baidu.dom.after;
///import baidu.dom.data;
///import baidu.dom.css;
///import baidu.dom.html;
///import baidu.dom.outerWidth;
///import baidu.dom.outerHeight;
///import plugin.draggable;

baidu.dom.extend({
    sortable : function(value,opts){

        var me = this,
            argsNum = arguments.length,

            //每一个可以被拖拽的项
            item,

            //每个元素的相关值
            itemAttr = [],

            //当前的draggable对象
            draggable,

            //当前被拖拽的项
            dragEle,

            //当前拖拽元素的相关属性信息
            dragEleAttr = {},

            //克隆的拖拽元素
            dragEleClone,
            dragEleCloneAttr = {},

            //当前sortable内的HTML，为了能够完美实现reset方法
            htmlReset = '',

            //每次变化后sortable内的HTML，为了能够完美实现cancel方法
            htmlCancel = '',
            htmlTemp = '',

            //初始化设置的值，挂在在实例上
            funs = {

                //默认参数及初始值
                options:{
                    enable:true 
                    // range:undefined,

                    //事件相关
                    // onstart:undefined,
                    // onend:undefined,
                    // ondragging:undefined,
                    // onchange:undefined
                },

                //可拖拽的范围，传入Object要符合{'top':123,'right':123,'bottom':123,'left':123}
                range:function(value){
                    switch(arguments.length){
                        
                        //不传参，get方法
                        case 0:
                            return opt.range;
                        break;

                        //传一个参数
                        case 1:

                            //value是selector
                            opt.range = value;
                            draggable.range(value);
                        break;
                    };
                    return sortable;
                },

                //取出可以被拖拽的项，顺序为新顺序
                item:function(){
                    return me.find('.tang-sortable-item');
                },

                //索引
                index:function(value){
                    if(value == 'set'){

                        //set方法，内部接口
                        for(var i = 0,num = item.size();i<num;i++){
                            item.eq(i).data('sortable-id',i);
                        };
                        return sortable;
                    }else{
                        var index = [],
                            _item = me.find('.tang-sortable-item');
                        for(var i = 0,num = _item.size();i<num;i++){
                            index.push(_item.eq(i).data('sortable-id'));
                        };
                        return index;
                    };
                },

                //取消拖拽，回到上一次
                cancel:function(){
                    me.html(htmlCancel);
                    init();
                    (opt.enable == false) && sortable.disable();
                    return sortable;
                },

                //重置拖拽
                reset:function(){
                    me.html(htmlReset);
                    init();
                    (opt.enable == false) && sortable.disable();
                    return sortable;
                },

                //关闭拖拽
                disable:function(){
                    opt.enable = false;
                    item.removeClass('tang-sortable-item');
                    draggable.disable();
                    return sortable;
                },

                //开启拖拽
                enable:function(){
                    if(!opt.enable){
                        opt.enable = true;
                        draggable.enable();
                    };
                    return sortable;
                },

                //析构函数
                dispose:function(){
                    sortable.disable();
                    draggable.dispose();
                    doc = opt = me = item = itemAttr = dragEle = dragEleAttr = dragEleClone = dragEleCloneAttr = null;
                    for(var k in sortable){
                        delete sortable[k];
                    };
                    sortable.dispose = true;
                    return null;
                }
            },

            doc = baidu.dom(document),

            //当前的sortable实例，自动挂载getBack方法，直接返回之前的链头
            sortable = baidu.setBack(baidu.createSingle(funs),me),

            opt = sortable.options,

            //初始化事件相关绑定
            bindEvent = function(){
                var evts = ['start','end','dragging','change'];
                for(var i = 0;i<evts.length; i++){
                    if( opt[ 'on'+evts[i] ] ){
                        sortable.on( evts[ i ] ,opt[ 'on'+evts[i] ] );
                    };
                };

                //在cancel和reset方法中，这些事件会被重绑，所以在这先清除。
                draggable.off('start',handle);
                draggable.off('dragging',ingHandle);
                draggable.off('end',endHandle);

                draggable.on('start',handle);
                draggable.on('dragging',ingHandle);
                draggable.on('end',endHandle);
            },

            getItemAttr = function(){
                itemAttr = [];
                for(var i = 0 , num = item.size(); i< num ; i++){
                    var ele = item.eq(i),
                        w = ele.outerWidth(),
                        h = ele.outerHeight(),
                        o = ele.offset(),

                        //TODO:如果想支持非列表类型，如块类型的并排横着摆放，在此加入left和right判断。
                        // left = {},
                        // right = {},
                        up = {top:o.top,bottom:o.top+h/2,left:o.left,right:o.left+w},
                        down = {top:o.top+h/2,bottom:o.top+h,left:o.left,right:o.left+w};
                    itemAttr.push({id:i,target:ele,up:up,down:down});
                };
            },

            //判断是否碰撞，返回当前碰撞的方位false,up,down,both
            checkCrash = function(area1,area2){
                var up = isCrash(area1.up,area2),
                    down = isCrash(area1.down,area2);
                if(up && down){
                    return 'both';
                }else if(up && !down){
                    return 'up';
                }else if(down && !up){
                    return 'down';
                }else{
                    return false;
                };
            },

            //检测两区域是否碰撞
            isCrash = function(a1,a2){
                if(a1.top>a2.bottom||a1.bottom<a2.top||a1.left>a2.right||a1.right<a2.left){
                    return false;
                }else{
                    return true;
                };
            },

            handle = function(e){
                getItemAttr();
                dragEle = e.target;
                dragEleAttr = {
                    id:dragEle.data('sortable-id'),
                    w:dragEle.outerWidth(),
                    h:dragEle.outerHeight(),
                    zIndex:dragEle.css('z-index')
                };
                sortable.fire('start');
                htmlTemp = me.html().replace(/\stang-draggable-dragging/g,'');

                //清除掉draggable附加的className
                dragEleClone = dragEle.clone();

                //TODO：以后可以考虑根据需求开放clone这个元素的样式
                dragEleClone.addClass('tang-sortable-clone');
                dragEleClone.removeClass('tang-draggable-dragging tang-sortable-item');

                dragEle.after(dragEleClone);
                dragEleClone.css('visibility','hidden');

                //TODO:这里的z-index不应该被硬编码的，需要判断下周边的z-index来设定。
                dragEle.css({'position':'absolute','z-index':200});
                var o = dragEleClone.offset();
                dragEleCloneAttr.left = o.left;
                dragEleCloneAttr.top = o.top;
            },

            ingHandle = function(){

                //这段监听的dragging，dragging已经被函数节流过了。
                var index,position;
                var o = dragEle.offset();
                dragEleAttr.top = o.top;
                dragEleAttr.left = o.left;
                dragEleAttr.bottom = o.top + dragEleAttr.h;
                dragEleAttr.right = o.left + dragEleAttr.w;
                for(var i = 0 ,num = itemAttr.length;i<num;i++){
                    if(itemAttr[i].id != dragEleAttr.id ){
                        position = checkCrash(itemAttr[i],dragEleAttr);
                        if(position == 'up'){
                            itemAttr[i].target.before(dragEleClone);
                        }else if(position == 'down'){
                            itemAttr[i].target.after(dragEleClone);
                        }else if(position == 'both'){
                            //itemAttr[i].target.before(dragEleClone);
                        }else{

                        };
                    };
                };
                sortable.fire('dragging');
            },

            endHandle = function(){
                var o = dragEleClone.offset();
                
                //克隆的元素在原位
                if(o.left == dragEleCloneAttr.left && o.top == dragEleCloneAttr.top){
                }else{
                    htmlCancel = htmlTemp;
                    sortable.fire('change');
                    dragEleClone.after(dragEle);
                };
                dragEle.css({'position':'static',left:'',top:'','z-index':dragEleAttr.zIndex});
                dragEleClone.remove();
                dragEleClone = null;
                sortable.fire('end');
            },

            setOpt = function(opts){
                for(var k in opts){
                    opt[k] = opts[k];
                };
                (opt.enable == false) && sortable.disable();
            },

            //函数主逻辑
            init = function(){

                //函数参数逻辑
                switch(argsNum){

                    //没有传参，默认执行
                    case 0:
                        item = me.children();
                    break;

                    //传入一个参数
                    case 1:
                        if( baidu.type(value) == 'object' ){
                            item = me.children();

                            //value是options
                            setOpt(value);
                        }else{
                        
                            //value是selector
                            item = me.find(value);
                        };
                    break;

                    //传入selector和options
                    case 2:

                        //value是selector
                        item = me.find(value);
                        setOpt(opts);
                    break;
                };
                item.addClass('tang-sortable-item');
                draggable = baidu(item).draggable().range(opt.range);
                sortable.index('set');
                bindEvent();
            };

        init();
        htmlReset = htmlCancel = me.html();

        //暴露getBack()方法，返回上一级TangramDom链头
        return sortable;
    }
});

