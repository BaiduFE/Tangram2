/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 实例化当前的拖拽（draggable）组件
 * @function 
 * @name baidu().draggable()
 * @grammar baidu(args).draggable([selector][,options])
 * @param {Selector|TangramDom|htmlElement} args 传入当前要被拖拽的容器或者选择器
 * @param {Selector|TangramDom|htmlElement} selector 可选参数，拖拽元素上面触发拖拽功能的部分，只有当鼠标在匹配元素上触发，被拖拽元素才能被拖拽
 * @param {Object} options 可选参数，相关配置参数
 * @param {Boolean} options.enable 当前的draggable实例是否可以被拖拽
 * @param {Selector|TangramDom|htmlElement|Object} options.range 当前拖拽的范围，可以限制在某一个元素内，传入selector只会取出第一个。传入Object要符合{'top':123,'right':123,'bottom':123,'left':123},top和bottom都是相对屏幕上边缘，left和right都是相对屏幕左边缘。
 * @param {Selector|TangramDom|htmlElement|Object} options.endOf 拖拽元素想要拖拽到的范围，可以限制在某些元素内，传入selector，限制用户必须拖拽到其中任意一个匹配元素内。传入Object要符合{'top':123,'right':123,'bottom':123,'left':123},top和bottom都是相对屏幕上边缘，left和right都是相对屏幕左边缘。
 * @param {Numeber} options.zIndex 拖拽元素的显示层级
 * @param {Selector|TangramDom|htmlElement} options.focus 拖拽时关注的元素，传入一个selector，当拖拽元素到focus的元素上时，会触发'enter'事件，离开时会触发'leave'事件。
 * @param {Function} options.onstart 当拖拽开启时，实例会触发“start”内部事件，并且会触发onstart方法。
 * @param {Function} options.onend 当拖拽结束时，实例会触发“end”内部事件，并且会触发onend方法。
 * @param {Function} options.ondragging 当拖拽时，实例会触发“dragging”内部事件，并且会触发ondragging方法，当前被拖拽的元素此时会默认加一个className名为“tang-draggable-dragging”。
 * @param {Function} options.onenter 当拖拽元素到options.focus匹配的元素上时，实例会触发‘enter’内部事件，并且在参数e.target中可以取得当前移入到了哪个元素。
 * @param {Function} options.onleave 当拖拽元素离开options.focus匹配的元素时，实例会触发‘leave’内部事件，并且在参数e.target中可以取得当前离开了哪个元素。
 * @return {Draggable} 返回Draggable的一个实例，实例的options属性中可以取到所有配置。
 * @example
    该方法会产生一个draggable实例，你可以通过配置，或者后期调用的方式来控制该实例的功能。
    当元素被拖拽的时候，默认会被加上一个名字为“tang-draggable-dragging”的className，方便用户改变正在拖动元素的样式，或者对该元素做操作。

 示例代码：
 相关CSS说明：
 //@description 该className会在用户拖拽某一元素时被添加到该元素上，可以方便用户添加拖拽元素的样式。
 .tang-draggable-dragging{
    filter:alpha(opacity=80);
    -moz-opacity:0.8;
    opacity: 0.8;
 }

 //HTML代码片段
 <div>
    <h1>test1</h1>
    <h2>test2</h2>
 </div>

 //js部分
 
 //最简单的直接使用
 var draggable = baidu('div').draggable(); //此时div元素都可以被拖拽了

 //设置拖拽把手
 var draggable = baidu('div').draggable('h1'); //此时div元素都可以被拖拽了，但是鼠标必须点击h1上，才能拖拽div 

*/

/**
 * @description 使当前拖拽元素无法拖拽
 * @function 
 * @name baidu().draggable().disable()
 * @grammar baidu(args).draggable().disable()
 * @param {Null}
 * @return {Draggable} 返回Draggable的一个实例
*/

/**
 * @description 重新开启当前拖拽元素，使其可以拖拽
 * @function 
 * @name baidu().draggable().enable()
 * @grammar baidu(args).draggable().enable()
 * @param {Null}
 * @return {Draggable} 返回Draggable的一个实例
 * @example
 该方法与disable()方法结合使用，初始化draggable时，默认是enable的状态，无需手动触发enable方法。
*/

/**
 * @description 取出或设置当前拖拽元素层级
 * @function 
 * @name baidu().draggable().zIndex()
 * @grammar baidu(args).draggable().zIndex(value)
 * @param {Number|Null} value 可以对当前拖拽元素设置层级，如果不传参数，则为获取当前层级。
 * @return {Draggable|Number} 返回Draggable的一个实例，或者返回当前的zIndex值。
*/

/**
 * @description 取得当前正在被拖拽的元素，或者上次被拖拽的元素
 * @function 
 * @name baidu().draggable().item()
 * @grammar baidu(args).draggable().item()
 * @param {Null}
 * @return {TangramDom|Undefined} 返回对应元素的tangramDom对象，用户可以直接用tangram2.0的dom方法继续操作下去。
*/

/**
 * @description 取消本次拖拽动作
 * @function 
 * @name baidu().draggable().cancel()
 * @grammar baidu(args).draggable().cancel()
 * @param {Null}
 * @return {Draggable} 返回Draggable的一个实例
*/

/**
 * @description 重置拖拽，恢复到最初
 * @function 
 * @name baidu().draggable().reset()
 * @grammar baidu(args).draggable().reset()
 * @param {Null}
 * @return {Draggable} 返回Draggable的一个实例
*/

/**
 * @description 限定拖拽元素可以活动的范围
 * @function 
 * @name baidu().draggable().range()
 * @grammar baidu(args).draggable().range(value)
 * @param {Selector|TangramDom|htmlElement|Object|Null} value 可以传入一个selector，如果匹配多个元素，只会取出第一个。限定拖拽元素活动的范围，只能在当前selector元素内活动。也可以传入一个Object，要符合{'top':123,'right':123,'bottom':123,'left':123},top和bottom都是相对屏幕上边缘，left和right都是相对屏幕左边缘。如果不传入参数，则为获取当前限定的范围。
 * @return {Draggable|Selector|TangramDom|htmlElement|Object} 返回Draggable的一个实例，或者是取出当前range的值。
*/

/**
 * @description 限定拖拽元素一定要到达的范围
 * @function 
 * @name baidu().draggable().endOf()
 * @grammar baidu(args).draggable().endOf(value)
 * @param {Selector|TangramDom|htmlElement|Object|Null} value 可以传入一个selector，限定拖拽元素只能拖拽至当前selector匹配的任意个元素内。也可以传入一个Object，要符合{'top':123,'right':123,'bottom':123,'left':123},top和bottom都是相对屏幕上边缘，left和right都是相对屏幕左边缘。如果不传入参数，则为获取当前限定的范围。
 * @return {Draggable|Selector|TangramDom|htmlElement|Object} 返回Draggable的一个实例，或者返回endOf当前的值。
*/

/**
 * @description 析构函数
 * @function 
 * @name baidu().draggable().dispose()
 * @grammar baidu(args).draggable().dispose()
 * @param {Null}
 * @return {Null}
 * @example
 执行完毕后，会在原实例上面挂在唯一项，{dispose:true}
 */

/**
 * @description 重新获取当前元素的tangramDom链头，使其可以使用tangram的Dom操作方法
 * @function 
 * @name baidu().draggable().getBack()
 * @grammar baidu(args).draggable().getBack()
 * @param {Null}
 * @return {TangramDom} 返回当前拖拽元素的tangramDom对象，可以继续使用tangram的Dom操作方法
 * @example
 调用该方法可以继续使用tangram的Dom操作方法，如：

 示例代码：
 //HTML代码片段
 <div>
    <h1>test1</h1>
    <h2>test2</h2>
 </div>
 
 //js部分
 var draggable = baidu('div').draggable('h1');
 draggable.getBack().css('border','1px solid #F00');
*/

/**
 * @description 监听当前draggable实例中的内部事件
 * @function 
 * @name baidu().draggable().on()
 * @grammar baidu(args).draggable().on(name,fun)
 * @param {String} name 私有事件的名称
 * @param {Function} fun 当此事件被触发时执行的方法
 * @return {Draggable} 返回Draggable的一个实例
 * @example
 目前draggable实例中的私有事件有:
 ‘start’：drag开始时触发；
 ‘end’：drag结束时触发；
 ‘dragging’：drag正在进行时触发；
 ‘enter’：移入到options.focus匹配的元素上；
 ‘leave’：移出options.focus匹配的元素；

 示例代码：
 //HTML代码片段
 <div>
    <h1>test1</h1>
    <h2>test2</h2>
 </div>
 
 //js部分
 var draggable = baidu('div').draggable('h1');

 var fn = function(){
    alert('drag started!');    
 };

 draggable.on('start',fn);
*/

/**
 * @description 移除当前draggable实例中对内部事件的监听
 * @function 
 * @name baidu().draggable().off()
 * @grammar baidu(args).draggable().off(name,fun)
 * @param {String} name 私有事件的名称
 * @param {Function} fun 要移除的方法
 * @return {Draggable} 返回Draggable的一个实例
 * @example
 目前draggable实例中的私有事件有:
 ‘start’：drag开始时触发；
 ‘end’：drag结束时触发；
 ‘dragging’：drag正在进行时触发；
 ‘enter’：移入到options.focus匹配的元素上；
 ‘leave’：移出options.focus匹配的元素；

 示例代码：
 //HTML代码片段
 <div>
    <h1>test1</h1>
    <h2>test2</h2>
 </div>
 
 //js部分
 var draggable = baidu('div').draggable('h1');

 var fn = function(){
    alert('drag started!');    
 };

 draggable.off('start',fn);
*/

/**
 * @description 触发一个draggable实例中对内部事件
 * @function 
 * @name baidu().draggable().fire()
 * @grammar baidu(args).draggable().fire(name,options)
 * @param {String} name 私有事件的名称
 * @param {Object} options 扩展参数，所含属性键值会扩展到Event对象上 
 * @example
 目前draggable实例中的私有事件有:
 ‘start’：drag开始时触发；
 ‘end’：drag结束时触发；
 ‘dragging’：drag正在进行时触发；
 ‘enter’：移入到options.focus匹配的元素上；
 ‘leave’：移出options.focus匹配的元素；

 示例代码：
 //HTML代码片段
 <div>
    <h1>test1</h1>
    <h2>test2</h2>
 </div>
 
 //js部分
 var draggable = baidu('div').draggable('h1');

 //如：监听living事件
 draggable.on('living',function(){
    alert('draggable is living!');    
 });

 setTimeout(function(){
     if(draggable){

         //触发living事件
        draggable.fire('living');
     };    
 },1000);
*/

///import baidu.id;
///import baidu.type;
///import baidu.setBack;
///import baidu.createSingle;
///import baidu.dom.not;
///import baidu.dom.css;
///import baidu.dom.find;
///import baidu.dom.contains;
///import baidu.dom.addClass;
///import baidu.dom.removeClass;
///import baidu.dom.data;
///import plugin._util_.drag;
///import plugin._util_.isCover;

baidu.dom.extend({
    draggable:function(value,opts){

        var me = this,

            //存放drag实例，drag.target是当前的拖拽元素
            drag,

            //存放当前拖拽元素
            dragEle,

            //drag enter的元素列表，在drag leave中会监测
            dragEnter = {},

            //初始化设置的值，挂在在实例上
            funs = {

                //默认参数及初始值
                options:{
                    enable:true 
                    // range:undefined,
                    // endOf:undefined,
                    // zIndex:undefined,
                    // focus:undefined,

                    // //事件相关
                    // onstart:undefined,
                    // onend:undefined,
                    // onenter:undefined,
                    // onleave:undefined,
                    // ondragging:undefined
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
                        break;
                    };
                    return draggable;
                },

                //最终要拖拽到
                endOf:function(value){
                    switch(arguments.length){
                        
                        //不传参，get方法
                        case 0:
                            if(baidu.type(opt.endOf)=='object'){

                                //endOf的范围是Object,{'top':123,'right':123,'bottom':123,'left':123}
                                if(dragEle.w){
                                    dragEle.w = dragEle.outerWidth();
                                    dragEle.h = dragEle.outerHeight();
                                };
                                var o = dragEle.offset(),
                                    eo = opt.endOf;
                                
                                if((o.top+dragEle.h<eo.top)||(o.top>eo.bottom)||(o.left+dragEle.w<eo.left)||(o.left>eo.right)){
                                    draggable.cancel();
                                };
                            }else{

                                //endOf的范围是selector
                                if(!baidu.dom(opt.endOf).isCover(drag.target,true)){
                                    draggable.cancel();
                                };                                
                            };
                            return opt.endOf;
                        break;

                        //传一个参数
                        case 1:

                            //value是selector
                            opt.endOf = value;
                        break;
                    };
                    return draggable;
                },

                //获取当前正在被拖拽的元素，或者上一次被拖拽的元素
                item:function(){
                    return dragEle;
                },

                //显示层级
                zIndex:function(value){
                    if(value){
                        opt.zIndex = value;
                        draggable.getBack().css('z-index',value);
                        return draggable;
                    }else{
                        return opt.zIndex;
                    };
                },

                //重置方法，恢复到最初
                reset:function(){
                    var o = dragEle.data('offset');
                    if(o.left){
                        dragEle.offset(o);
                    };
                    return draggable;
                },

                //取消拖拽，回到上一次
                cancel:function(){
                    if(drag){
                        drag.cancel();
                    };
                    return draggable;
                },

                //关闭拖拽
                disable:function(){
                    if(opt.enable){
                        opt.enable = false;
                        if(baidu.type(value)!='object'){
                            me.find(value).css('cursor','default');
                        }else{
                            me.css('cursor','default');
                        };
                        doc.off('mouseup',endHandle);
                        doc.off('dragging',ingHandle);                    
                    };
                    return draggable;
                },

                //开启拖拽
                enable:function(){
                    if(!opt.enable){
                        opt.enable = true;
                        if(baidu.type(value)!='object'){
                            baidu.dom(value).css('cursor','move');
                        }else{
                            me.css('cursor','move');
                        };
                        doc.on('mouseup',endHandle);
                        doc.on('dragging',ingHandle);
                    };
                    return draggable;
                },

                //析构函数
                dispose:function(){
                    draggable.disable();
                    if(!drag.dispose){
                        drag.dispose();
                    };

                    //此处删除所有事件，如果用户有其他事件可能会一起删除。
                    //TODO：后续修改下。
                    me.off('mousedown','**');
                    drag = dragEle = focusEle = doc = opt = null;
                    for(var k in draggable){
                        delete draggable[k];
                    };
                    draggable.dispose = true;
                    return null;
                }
            },
            doc = baidu.dom(document),

            //当前的draggable实例，自动挂载getBack方法，直接返回之前的链头
            draggable = baidu.setBack(baidu.createSingle(funs),me),

            opt = draggable.options,

            //拖拽执行（主逻辑），mousedown时触发
            handle = function(e){
                
                //拖拽是否可用
                if(!opt.enable){return};

                //实例一个drag
                if(drag){
                    drag.dispose();
                };
                drag = baidu.plugin._util_.drag(e.currentTarget);
                dragEle = drag.target;
                dragEle.addClass('tang-draggable-dragging');
                draggable.fire('start',{target:dragEle,pageX:e.pageX,pageY:e.pageY});

                if(!dragEle.data('offset')){
                    dragEle.data('offset',dragEle.offset());
                };

                //限制了范围
                if(opt.range){
                    switch(baidu.type(opt.range)){
                        case 'string':
                            drag.range(opt.range);
                        break;
                        case 'object':
                            var or = opt.range;
                            drag.range(or);
                        break;
                    };
                };

                //是否有层级设置
                if(opt.zIndex){
                    draggable.zIndex(opt.zIndex);
                };

                doc.on('mouseup',endHandle);
                doc.on('dragging',ingHandle);
            },

            //拖拽停止
            endHandle = function(e){

                //是否到达拖拽目的地
                if(opt.endOf){
                    draggable.endOf();
                };
                dragEle.removeClass('tang-draggable-dragging');
                drag.disable();
                doc.off('mouseup',endHandle);
                doc.off('dragging',ingHandle);
                draggable.fire('end');
            },

            //拖拽中
            ingHandle = function(e){
                draggable.fire('dragging');
                enterAndLeave();
            },

            //初始化事件相关绑定
            bindEvent = function(){
                var evts = ['start','end','dragging','enter','leave'];
                for(var i = 0;i<evts.length; i++){
                    if( opt[ 'on'+evts[i] ] ){
                        draggable.on( evts[ i ] ,opt[ 'on'+evts[i] ] );
                    };
                };
            },

            //根据第二个selector，设置拖拽激活区，只对该区域监听mousedown事件
            setItem = function(){
                me.find(value).css('cursor','move');
                me.on('mousedown',function(e){
                    if(baidu.dom(e.currentTarget).contains(e.target)){
                        handle(e);
                    };
                });
            },

            //当用户传入options时，处理逻辑
            setOpt = function(opts){
                for(var k in opts){
                    opt[k] = opts[k];
                };
                if(opt.focus){

                    //要去掉自己本身
                    focusEle = baidu.dom(opt.focus).not(me);
                };
                if(opt.zIndex){
                    draggable.zIndex(opt.zIndex);
                };
                bindEvent();   
            },

            //实现draggable中的'enter'和‘leave’事件
            enterAndLeave = function(){

                if( opt.focus  && (opt.onenter||opt.onleave) ){

                    //存储当前enter的元素
                    var _dragEnter = {};

                    for(var i = 0,num = focusEle.size(); i < num; i++){
                        
                        var _e = focusEle.eq(i);
                        var id = baidu.id(_e.get(0));

                        if( _e.isCover(dragEle) ){

                            //观察对象的改变来触发
                            if(!dragEnter[id]){
                                dragEnter[id] = _e.get(0);
                                draggable.fire('enter',{'target':dragEnter[id]});
                            };
                            _dragEnter[id] = _e.get(0);
                        };

                    };

                    //判断是否触发leave事件
                    for(var k in dragEnter){
                        if(dragEnter[k] && !_dragEnter[k]){
                            draggable.fire('leave',{'target':dragEnter[k]});
                            dragEnter[k] = null;
                        };
                    };

                };                
            };
        
        //函数参数逻辑
        switch(arguments.length){

            //没有传参，默认执行
            case 0:
                me.css('cursor','move').on('mousedown',handle);
            break;

            //传入一个参数
            case 1:

                if( baidu.type(value) == 'object' ){

                    //value是options
                    setOpt(value);
                    me.css('cursor','move').on('mousedown',handle);
                }else{
                
                    //value是selector
                    setItem();
                }
            break;

            //传入selector和options
            case 2:

                //value是selector
                setOpt(opts);
                setItem();
            break;
        };

        //暴露getBack()方法，返回上一级TangramDom链头
        return draggable;
    }
});

