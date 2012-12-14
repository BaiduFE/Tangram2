/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 实例化当前的选择列表（selectable）功能
 * @function 
 * @name baidu().selectable()
 * @grammar baidu(args).selectable([selector][,options])
 * @param {Selector|TangramDom|htmlElement} args 传入当前要被实例化为选择列表（selectable）的容器或者CSS选择器
 * @param {Selector|TangramDom|htmlElement} selector 可选参数，可以是CSS选择器或者是HTML元素，当前选择列表（selectable）中，可以被选择的项。
 * @param {Object} options 相关配置参数
 * @param {Boolean} options.enable 当前的选择列表（selectable）实例是否可使用。
 * @param {Selector|TangramDom|htmlElement|Object} options.range 当前选择列表（selectable）激活的范围，可以是CSS选择器或者HTML元素（如果是多个，只会取出第一个），限制范围在某一个元素内。传入Object要符合{'top':123,'right':123,'bottom':123,'left':123},top和bottom都是相对屏幕上边缘，left和right都是相对屏幕左边缘。
 * @param {Function} options.onstart 当用户框选操作开始时，实例会触发“start”内部事件，并且会触发onstart方法。
 * @param {Function} options.onend 当用户框选操作结束时，实例会触发“end”内部事件，并且会触发onend方法。
 * @param {Function} options.ondragging 当用户正在拖拽选框来选择时，实例会触发“dragging”内部事件，并且会触发ondragging方法。
 * @param {Function} options.onchange 当选择列表（selectable）中的选择项发生变化时，会触发“change”内部事件，并且会触发onchange方法，在参数e.target中可以取得当前是哪一个元素改变了。所有被选择的元素都会默认被加上名为“tang-selectable-selected”的className。
 * @return {selectable} 返回选择列表（selectable）的一个实例，实例的默认配置可以直接通过options属性取到。
 * @example
    该方法会产生一个选择列表（selectable）实例，你可以通过配置，或者后期调用的方式来控制该实例的功能。
    选择列表（selectable）中所有被选择的元素都会默认被加上名为“tang-selectable-selected”的className，方便用户改变被选中的元素样式，或者对该元素做操作。

 示例代码：
 //baidu.plugin.selectable 相关CSS

 // @description 橡皮筋框选rubber select的框选层默认样式
 .tang-rubberSelect{
    border: 1px dotted #888;
    background-color: #FFF;
    filter:alpha(opacity=80);
    -moz-opacity:0.8;
    opacity: 0.8;
 }

 // selectable 默认样式
 // @description selectable 中被选中的元素默认样式
 .tang-selectable-selected{
    background-color: #888;
 }

 //HTML代码片段
 <ul class='group'>
    <li class='select'></li>
    <li class='select'></li>
    <li></li>
    <li></li>
 </ul>

 //js部分
 
 //最简单的直接使用
 var selectable = baidu('.group').selectable(); //此时group的直接子元素均可以被选择，当前被选择都会默认加上名为“tang-selectable-selected”的className。

 //设置可以被选择的元素
 var selectable = baidu('.group').selectable('.select'); //此时group元素中，有className为“.select”的子元素才可以被选择。

*/

/**
 * @description 关闭当前这个选择列表（selectable）的功能
 * @function 
 * @name baidu().selectable().disable()
 * @grammar baidu(args).selectable().disable()
 * @param {Null}
 * @return {Selectable} 返回Selectable的一个实例。
*/

/**
 * @description 开启当前这个选择列表（selectable）的功能
 * @function 
 * @name baidu().selectable().enable()
 * @grammar baidu(args).selectable().enable()
 * @param {Null}
 * @return {Selectable} 返回Selectable的一个实例。
 * @example
 该方法与disable()方法结合使用，初始化selectable时，默认是enable的状态，无需手动触发enable方法。
*/

/**
 * @description 设置当前选择列表（selectable）激活的范围
 * @function 
 * @name baidu().selectable().range()
 * @grammar baidu(args).selectable().range([value])
 * @param {Selector|TangramDom|htmlElement|Object|Null} value 如果不传入参数，则为获取当前限定的范围。可以传入一个selector，如果匹配多个元素，只会取出第一个。限定拖拽元素活动的范围，只能在当前selector元素内活动。也可以传入一个Object，要符合{'top':123,'right':123,'bottom':123,'left':123},top和bottom都是相对屏幕上边缘，left和right都是相对屏幕左边缘。
 * @return {Selectable|Selector|TangramDom|htmlElement|Object} 返回Selectable的一个实例，或者是取出当前range的值。
*/

/**
 * @description 取消本次选择，恢复为上次选项
 * @function 
 * @name baidu().selectable().cancel()
 * @grammar baidu(args).selectable().cancel()
 * @param {Null}
 * @return {Selectable} 返回Selectable的一个实例。
*/

/**
 * @description 重置选择，恢复为一个都没选
 * @function 
 * @name baidu().selectable().reset()
 * @grammar baidu(args).selectable().reset()
 * @param {Null}
 * @return {Selectable} 返回Selectable的一个实例。
*/

/**
 * @description 析构函数，清除所有调用资源
 * @function 
 * @name baidu().selectable().dispose()
 * @grammar baidu(args).selectable().dispose()
 * @param {Null}
 * @return {Null} 被析构后，当前的Selectable实例只会有一个元素{dispose:true}
*/

/**
 * @description 取得或设置当前被选择的元素
 * @function 
 * @name baidu().selectable().selected()
 * @grammar baidu(args).selectable().selected([selector])
 * @param {Null|Selector|HTMLElement|TangramDom} selector 如果不传参，则为获取当前被选中的元素；传入元素，则设置元素被选中。
 * @return {TangramDom|Selectable} 不传参，直接返回当前被选择元素组成的tangramDom，可以直接调用tangram2.0的DOM操作方法，当前被选择时都会默认被加上名为“tang-selectable-selected”的className；传参则返回一个Selectable实例。
*/

/**
 * @description 取得或设置元素没有被选择框选中
 * @function 
 * @name baidu().selectable().unselected()
 * @grammar baidu(args).selectable().unselected([selector])
 * @param {Null|Selector|HTMLElement|TangramDom} selector 如果不传参，则为获取当前没被选中的元素；如果传入元素，则设置元素没被选中。
 * @return {TangramDom|Selectable} 不传参，直接返回当前没被选中元素组成的tangramDom，可以直接调用tangram2.0的DOM操作方法；传参则返回一个Selectable实例。
*/

/**
 * @description 取得当前选择列表（selectable）中所有可以被选择的元素
 * @function 
 * @name baidu().selectable().item()
 * @grammar baidu(args).selectable().item()
 * @param {Null}
 * @return {TangramDom} 直接返回当前选择列表（selectable）中所有可以被选择的元素组成的tangramDom，可以直接调用tangram2.0的DOM操作方法。
*/

/**
 * @description 取得当前被选择元素的索引，或者通过索引设置被选择项
 * @function 
 * @name baidu().selectable().index()
 * @grammar baidu(args).selectable().index([arr])
 * @param {Null|Array} arr 如果不传参，则为获取当前被选中元素的索引组成的数组；传入元素，则通过索引数组设置对应元素被选中。
 * @return {Array|Selectable} 不传参，直接返回当前被选择元素的索引组成的数组，当前被选择时都会默认被加上名为“tang-selectable-selected”的className；传参则返回一个Selectable实例。
 * @example
 该方法永远取得和设置当前顺序指定索引，如果元素顺序通过其他方式改变了，则从新计算索引，不会保留原索引。
*/

/**
 * @description 重新获取当前元素的tangramDom链头，使其可以使用tangram的Dom操作方法
 * @function 
 * @name baidu().selectable().getBack()
 * @grammar baidu(args).selectable().getBack()
 * @param {Null}
 * @return {TangramDom} 返回当前拖拽元素的tangramDom对象，可以继续使用tangram的Dom操作方法
 * @example
 调用该方法可以继续使用tangram的Dom操作方法，如：

 示例代码：
 //HTML代码片段
 <ul class='group'>
    <li class='select'></li>
    <li class='select'></li>
    <li></li>
    <li></li>
 </ul>

 //js部分
 var selectable = baidu('.group').selectable();
 selectable.getBack().css('border','1px solid #F00');
*/

/**
 * @description 监听当前selectable实例中的内部事件
 * @function 
 * @name baidu().selectable().on()
 * @grammar baidu(args).selectable().on(name,fun)
 * @param {String} name 私有事件的名称
 * @param {Function} fun 当此事件被触发时执行的方法
 * @return {Selectable} 返回Selectable的一个实例
 * @example
 目前selectable实例中的私有事件有:
 ‘start’：用户框选开始时触发；
 ‘end’：用户框选结束时触发；
 ‘dragging’：每次框选框改变时触发；
 ‘change’：当前被框选元素改变时触发；

 示例代码：
 //HTML代码片段
 <ul class='group'>
    <li class='select'></li>
    <li class='select'></li>
    <li></li>
    <li></li>
 </ul>

 //js部分
 var selectable = baidu('.group').selectable();

 var fn = function(){
    alert('started!');    
 };

 selectable.on('start',fn);
*/

/**
 * @description 移除当前selectable实例中对内部事件的监听
 * @function 
 * @name baidu().selectable().off()
 * @grammar baidu(args).selectable().off(name,fun)
 * @param {String} name 私有事件的名称
 * @param {Function} fun 要移除的方法
 * @return {Selectable} 返回Selectable的一个实例
 * @example
 目前selectable实例中的私有事件有:
 ‘start’：用户框选开始时触发；
 ‘end’：用户框选结束时触发；
 ‘dragging’：每次框选框改变时触发；
 ‘change’：当前被框选元素改变时触发；

 示例代码：
 //HTML代码片段
 <ul class='group'>
    <li class='select'></li>
    <li class='select'></li>
    <li></li>
    <li></li>
 </ul>

 //js部分
 var selectable = baidu('.group').selectable();

 var fn = function(){
    alert('started!');    
 };

 selectable.off('start',fn);
*/

/**
 * @description 触发一个selectable实例中对内部事件
 * @function 
 * @name baidu().selectable().fire()
 * @grammar baidu(args).selectable().fire(name,options)
 * @param {String} name 私有事件的名称
 * @param {Object} options 扩展参数，所含属性键值会扩展到Event对象上 
 * @example
 目前selectable实例中的私有事件有:
 ‘start’：用户框选开始时触发；
 ‘end’：用户框选结束时触发；
 ‘dragging’：每次框选框改变时触发；
 ‘change’：当前被框选元素改变时触发；

 示例代码：
 //HTML代码片段
 <ul class='group'>
    <li class='select'></li>
    <li class='select'></li>
    <li></li>
    <li></li>
 </ul>

 //js部分
 var selectable = baidu('.group').selectable();

 //如：监听living事件
 selectable.on('living',function(){
    alert('selectable is living!');    
 });

 setTimeout(function(){
     if(selectable){

         //触发living事件
        selectable.fire('living');
     };    
 },1000);
*/

///import baidu.type;
///import baidu.setBack;
///import baidu.createSingle;
///import baidu.dom.hasClass;
///import baidu.dom.addClass;
///import baidu.dom.removeClass;
///import baidu.dom.eq;
///import baidu.dom.on;
///import baidu.dom.off;
///import baidu.dom.children;
///import baidu.dom.find;
///import baidu.dom.not;
///import plugin._util_.isCrash;
///import plugin._util_.rubberSelect;

baidu.dom.extend({
    selectable:function(value,opts){

        var me = this,

            //初始化设置的值，挂载在实例上
            funs = {

                //默认参数及初始值
                options:{

                    //是否可用
                    enable:true

                    //可以激活选择功能的范围 
                    // range:undefined,

                    //事件相关
                    // onstart:undefined,
                    // onend:undefined,
                    // ondragging:undefined,

                    //选择元素改变时触发，增加和减少都会触发
                    // onchange:undefined
                },

                //激活选择的范围，传入selector或者Object要符合{'top':123,'right':123,'bottom':123,'left':123}
                range:function(value){
                    if(value && rubberSelect && rubberSelect.dispose != true){
                        opt.range = value;
                        rubberSelect.range(value);
                        return selectable;
                    }else{
                        return opt.range;
                    };
                },

                //取消选择，恢复上次选择的结果
                cancel:function(){
                    if(lastSelected){
                        item.removeClass('tang-selectable-selected');
                        lastSelected.addClass('tang-selectable-selected');
                    }else{
                        selectable.reset();
                    }
                    return selectable;
                },

                //取消选择，恢复为一个都没选
                reset:function(){
                    lastSelected = me.find('.tang-selectable-selected');
                    item.removeClass('tang-selectable-selected');
                    return selectable;
                },
                
                //关闭选择功能
                disable:function(){
                    opt.enable = false;
                    if(rubberSelect && rubberSelect.dispose != true){
                        rubberSelect.dispose();
                        offDocEvent();
                    };
                    return selectable;
                },

                //开启选择功能
                enable:function(){
                    if(!opt.enable){
                        opt.enable = true;
                        if(rubberSelect.dispose){
                            rubberSelect = baidu.plugin._util_.rubberSelect();
                        };
                        bindDocEvent();
                    };
                    return selectable;
                },

                //析构函数
                dispose:function(){
                    rubberSelect.dispose();
                    selectable.disable();
                    doc = rubberSelect = item = timer = null;
                    for(var k in selectable){
                        delete selectable[k];
                    };
                    selectable.dispose = true;
                    return null;
                },

                //设置或取得当前选中的项
                selected:function(value){
                    if(value){
                        me.find(value).addClass('tang-selectable-selected');
                        return selectable;
                    }else{
                        return me.find('.tang-selectable-selected');
                    };
                },

                //取得没有选中的值
                unselected:function(value){
                    if(value){
                        me.find(value).removeClass('tang-selectable-selected');
                        return selectable;
                    }else{
                        return me.not('.tang-selectable-selected');
                    };
                },

                //取得当前所有元素
                item:function(){
                    return item;
                },

                //取得当前选择元素的编号，或通过数组设置
                index:function(value){
                    if(baidu.type(value)=='array'){
                        item.removeClass('tang-selectable-selected');
                        for(var i = 0,num = value.length;i<num;i++){
                            item.eq(value[i]).addClass('tang-selectable-selected');
                        };
                        return selectable;
                    }else{
                        var arr = [];
                        for(var i = 0, num = item.size();i<num;i++){
                            if(item.eq(i).hasClass('tang-selectable-selected')){
                                arr.push(i);
                            };
                        };
                        return arr;
                    };
                }

            },

            doc = baidu.dom(document),

            //当前的selectable实例，自动挂载getBack方法，直接返回之前的链头
            selectable = baidu.setBack(baidu.createSingle(funs),me),

            opt = selectable.options,

            //存放rubberSelect
            rubberSelect,

            //selectable的item
            item,

            //存储上一次选择的项，cancel方法中用来还原
            lastSelected,

            //函数节流计时器
            timer,

            //按键多选的标志量，可以多选为true
            keydown = false,

            //初始化事件相关绑定
            bindEvent = function(){
                var evts = ['start','end','dragging','change'];
                for(var i = 0,num = evts.length;i< num; i++){
                    if( opt[ 'on'+evts[i] ] ){
                        selectable.on( evts[ i ] ,opt[ 'on'+evts[i] ] );
                    };
                };

                //支持多选功能
                selectable.on('end',function(){
                    item.removeClass('tang-selectable-selecting');
                });

                //支持多选功能
                selectable.on('start',function(){
                    lastSelected = me.find('.tang-selectable-selected');
                });
            },

            handle = function(){

                //增加函数节流，防止事件频繁触发函数，影响性能
                clearTimeout(timer);
                timer = setTimeout(function(){
                    selectable.fire('dragging');
                    if(!keydown){

                        //只能选择一次
                        for(var i = 0 , num = item.size(); i < num; i ++){
                            var _ele = item.eq(i);
                            if(_ele.isCrash(rubberSelect.target)){
                                if (!_ele.hasClass('tang-selectable-selected')) {
                                    selectable.fire('change',{target:_ele});
                                    _ele.addClass('tang-selectable-selected');
                                };
                            }else{
                                if(_ele.hasClass('tang-selectable-selected')){
                                    selectable.fire('change',{target:_ele});
                                    _ele.removeClass('tang-selectable-selected');
                                };
                            };
                        };
                    }else{

                        //按下了ctrl 或 command 键，可以多次选择

                        for(var i = 0 , num = item.size(); i < num; i ++){
                            var _ele = item.eq(i);

                            //只对选了的做判断
                            if(_ele.isCrash(rubberSelect.target) && !_ele.hasClass('tang-selectable-selecting')){
                                selectable.fire('change',{target:_ele});

                                //支持可以多次选择，判断此次碰撞是否已经选择了
                                _ele.addClass('tang-selectable-selecting');                              
                                if (!_ele.hasClass('tang-selectable-selected')) {
                                    _ele.addClass('tang-selectable-selected');
                                }else{
                                    _ele.removeClass('tang-selectable-selected');
                                };
                            };
                        };
                    };

                },3);
            },

            keyDownHandle = function(e){
                    
                    //Win下Ctrl 和 Mac下 command 键
                    if(e.ctrlKey || e.keyCode == 91){
                        keydown = true;
                    };
            },

            keyUpHandle = function(e){

                    //Win下Ctrl 和 Mac下 command 键
                    if(!e.ctrlKey || e.keyCode == 91){
                        keydown = false;
                        item.removeClass('tang-selectable-selecting');
                    };
            },

            fireStart = function(){
                selectable.fire('start');
            },

            fireEnd = function(){
                selectable.fire('end');
            },

            bindDocEvent = function(){
                doc.on('keydown',keyDownHandle);
                doc.on('keyup',keyUpHandle);
                doc.on('rubberselecting',handle);
                doc.on('rubberselectstart',fireStart);
                doc.on('rubberselectend',fireEnd);
            },

            //统一的解绑事件
            offDocEvent = function(){
                doc.off('keydown',keyDownHandle);
                doc.off('keyup',keyUpHandle);
                doc.off('rubberselecting',handle);
                doc.off('rubberselectstart',fireStart);
                doc.off('rubberselectend',fireEnd);                    
            },

            setOpt = function(opts){
                for(var k in opts){
                    opt[k] = opts[k];
                };
                if(opt.enable == false){
                    selectable.disable();
                };
                if(opt.range){
                    selectable.range(opt.range);
                };
            };

        //函数参数逻辑
        rubberSelect = baidu.plugin._util_.rubberSelect();
        switch(arguments.length){

            //没有传参，默认执行
            case 0:
                item = me.children();
            break;

            //传入一个参数
            case 1:
                if(baidu.type(value) == 'object'){

                    //此时value为options
                    item = me.children();
                    setOpt(value);
                }else{

                    //此时是selector
                    item = me.find(value);
                };

            break;

            //传入selector和options
            case 2:
                item = me.find(value);
                setOpt(opts);
            break;
        };
        bindEvent();
        bindDocEvent();
        
        //暴露getBack()方法，返回上一级TangramDom链头
        return selectable;
    }
});

