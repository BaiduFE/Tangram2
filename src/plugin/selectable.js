/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 实例化当前的选择
 * @function 
 * @name baidu.dom().draggable()
 * @grammar baidu.dom(args).draggable([selector][,options])
 * @param {Selector|TangramDom|htmlElement} args 传入当前要被拖拽的容器或者选择器
 * @param {Selector|TangramDom|htmlElement} selector 拖拽元素上面触发拖拽功能的部分，只有当鼠标在匹配元素上触发，被拖拽元素才能被拖拽
 * @param {Object} options 相关配置参数
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
 //HTML代码片段
 <div>
    <h1>test1</h1>
    <h2>test2</h2>
 </div>
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
///import plugin._util_.isCover;
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
                    if(value){
                        opt.range = value;
                        rubberSelect.range(value);
                        return selectable;
                    }else{
                        return opt.range;
                    };
                },

                //取消选择，恢复为一个都没选
                cancel:function(){
                    item.removeClass('tang-selectable-selected');
                    return selectable;
                },

                //关闭选择功能
                disable:function(){
                    if(opt.enable){
                        opt.enable = false;
                        if(rubberSelect && !rubberSelect.dispose){
                            rubberSelect.dispose();
                        };
                        offDocEvent();               
                    };
                    return selectable;
                },

                //开启选择功能
                enable:function(){
                    if(!opt.enable){
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

                //取得当前选中的值
                selected:function(){
                    return me.find('.tang-selectable-selected');
                },

                //取得没有选中的值
                unselected:function(){
                    return item.not('.tang-selectable-selected');
                },

                //取得当前所有元素
                item:function(){
                    return item;
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

            //函数节流计时器
            timer,

            //按键多选
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
            },

            handle = function(){

                //增加函数节流，防止事件频繁触发函数，影响性能
                clearTimeout(timer);
                timer = setTimeout(function(){

                    if(!keydown){

                        //只能选择一次
                        for(var i = 0 , num = item.size(); i < num; i ++){
                            var _ele = item.eq(i);
                            if(_ele.isCover(rubberSelect.target)){
                                if (!_ele.hasClass('tang-selectable-selected')) {
                                    _ele.addClass('tang-selectable-selected');
                                    selectable.fire('change',{target:_ele});
                                };
                            }else{
                                if(_ele.hasClass('tang-selectable-selected')){
                                    _ele.removeClass('tang-selectable-selected');
                                    selectable.fire('change',{target:_ele});
                                };
                            };
                        };
                    }else{

                        //按下了ctrl 或 command 键，可以多次选择

                        for(var i = 0 , num = item.size(); i < num; i ++){
                            var _ele = item.eq(i);

                            //只对选了的做判断
                            if(_ele.isCover(rubberSelect.target) && !_ele.hasClass('tang-selectable-selecting')){

                                //支持可以多次选择，判断此次碰撞是否已经选择了
                                _ele.addClass('tang-selectable-selecting');                              
                                if (!_ele.hasClass('tang-selectable-selected')) {
                                    _ele.addClass('tang-selectable-selected');
                                }else{
                                    _ele.removeClass('tang-selectable-selected');
                                };
                                selectable.fire('change',{target:_ele});
                            };
                        };
                    };

                    selectable.fire('dragging');
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
                    if(e.ctrlKey || e.keyCode == 91){
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

            offDocEvent = function(){
                doc.off('keydown',keyDownHandle);
                doc.off('keyup',keyUpHandle);
                doc.off('rubberselecting',handle);
                doc.off('rubberselectstart',fireStart);
                doc.off('rubberselectend',fireEnd);                    
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
                    opt = value;
                    item = me.children();
                    if(opt.range){
                        selectable.range(opt.range);
                    };
                    bindEvent();
                }else{

                    //此时是selector
                    item = me.find(value);
                };

            break;

            //传入selector和options
            case 2:
                item = me.find(value);
                opt = opts;
                if(opt.range){
                    selectable.range(opt.range);
                };
                bindEvent();                
            break;
        };
        bindDocEvent();
        
        //暴露getBack()方法，返回上一级TangramDom链头
        return selectable;
    }
});

