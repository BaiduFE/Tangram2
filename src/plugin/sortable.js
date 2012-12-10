/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
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
///import baidu.dom.outerWidth;
///import baidu.dom.outerHeight;
///import plugin.draggable;

baidu.dom.extend({
    sortable : function(value,opts){

        var me = this,

            //每一个可以被拖拽的项
            item,

            //每个元素的相关值
            itemAttr = [],

            //draggable对象
            draggable,

            //当前被拖拽的项
            dragEle,
            dragEleAttr,

            //克隆的拖拽元素
            dragEleClone,
            dragEleCloneAttr = {},

            //函数节流计时器
            timer,

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
                        break;
                    };
                    return sortable;
                },

                //取出可以被拖拽的项，顺序为新顺序
                item:function(){
                    return me.find('.sortable-item');
                },

                //索引
                index:function(value){
                    if(baidu.type(value)=='array'){

                    }else if(value == 'set'){

                        //set方法，内部接口
                        for(var i = 0,num = item.size();i<num;i++){
                            item.eq(i).data('sortable-id',''+i);
                        };
                    }else{
                        var index = [],
                            _item = me.find('.sortable-item');
                        for(var i = 0,num = _item.size();i<num;i++){
                            index.push(_item.eq(i).data('sortable-id'));
                        };
                        return index;
                    };
                },

                //取消拖拽，回到上一次
                cancel:function(){

                },

                //重置拖拽
                reset:function(){

                },

                //关闭拖拽
                disable:function(){
                    if(opt.enable){
                        opt.enable = false;
                        draggable.disable();
                    };
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
                    draggable.dispose();
                    doc = opt = me = item = itemAttr = draggable = dragEle = dragEleAttr = dragEleClone = dragEleCloneAttr = timer = null;
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
                    h:dragEle.outerHeight()
                };
                sortable.fire('start');

                //清除掉draggable附加的className
                dragEleClone = baidu.dom(dragEle).clone();
                dragEleClone.removeClass('tang-draggable-dragging');
                dragEle.after(dragEleClone);
                dragEleClone.css('visibility','hidden')
                dragEle.css('position','absolute');
                var o = dragEleClone.offset();
                dragEleCloneAttr.left = o.left;
                dragEleCloneAttr.top = o.top;
            },

            ingHandle = function(){
                clearTimeout(timer);
                var timer = setTimeout(function(){
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
                },10);
            },
            endHandle = function(){
                var o = dragEleClone.offset();
                
                //克隆的元素在原位
                if(o.left == dragEleCloneAttr.left && o.top == dragEleCloneAttr.top){
                    
                }else{
                    dragEleClone.after(dragEle);
                };
                dragEle.css({'position':'static',left:'',top:''});
                dragEleClone.remove();
                sortable.fire('end');
            };
        
        //函数参数逻辑
        switch(arguments.length){

            //没有传参，默认执行
            case 0:
                item = me.children().addClass('sortable-item');
                draggable = baidu(item).draggable();
                sortable.index('set');
                bindEvent();
            break;

            //传入一个参数
            case 1:
                if( baidu.type(value) == 'object' ){

                    //value是options
                }else{
                
                    //value是selector

                }
            break;

            //传入selector和options
            case 2:

                //value是selector

            break;
        };

        //暴露getBack()方法，返回上一级TangramDom链头
        return sortable;
    }
});

