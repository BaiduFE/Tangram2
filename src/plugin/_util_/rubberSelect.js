/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 橡皮筋选择效果
 * @function 
 * @name baidu.plugin._util_.rubberSelect
 * @grammar baidu.plugin._util_.rubberSelect(options)
 * @param {Object} options 参数
 * @param {Selector|Object} options.range 限制在某个范围内触发和拖拽，可以传入一个selector，或可以传入一个Object，要符合{'top':123,'right':123,'bottom':123,'left':123}形式。
 * @return {Object} 返回相关实例方法的对象
 * @example
 	当前橡皮筋选择框元素，默认有名为“tang-rubberSelect”的className，方便用户设置样式，或做其他操作；
	当用户开始选择时，会触发“rubberselectstart”全局事件，变化选择框时触发“rubberselecting”事件，结束时会触发“rubberselectend”事件。
*/

/**
 * @description 设置当前的限制范围
 * @function 
 * @name baidu.plugin._util_.rubberSelect().range()
 * @grammar baidu.plugin._util_.rubberSelect(options).range(value)
 * @param {Selector|Object} value 限制在某个范围内触发和拖拽，可以传入一个selector，或可以传入一个Object，要符合{'top':123,'right':123,'bottom':123,'left':123}形式。
 * @return {Object} 返回相关实例方法的对象
*/

/**
 * @description 设置当前的限制范围
 * @function 
 * @name baidu.plugin._util_.rubberSelect().range()
 * @grammar baidu.plugin._util_.rubberSelect(options).range()
 * @param {Null}
 * @return {Object|Selector} 返回当前的限制范围设置
*/

/**
 * @description 析构函数，会清除掉所有资源
 * @function 
 * @name baidu.plugin._util_.rubberSelect().dispose()
 * @grammar baidu.plugin._util_.rubberSelect(options).dispose()
 * @return {Null}
 * @example
 执行完毕后，会在原实例上面挂在唯一项，{dispose:true}
*/

/**
 * @description 当前橡皮筋选择框元素
 * @name baidu.plugin._util_.rubberSelect().target
 * @grammar baidu.plugin._util_.rubberSelect(options).target
 * @return {TangramDom} 返回当前橡皮筋选择框元素
*/

///import baidu.type;
///import baidu.dom.appendTo;
///import baidu.dom.show;
///import baidu.dom.hide;
///import baidu.dom.width;
///import baidu.dom.height;
///import baidu.dom.outerWidth;
///import baidu.dom.outerHeight;
///import baidu.dom.on;
///import baidu.dom.off;
///import baidu.dom.trigger;
///import baidu.dom.offset;
///import baidu.dom.remove;
///import plugin._util_;

baidu.plugin._util_.rubberSelect = function(options){

	var doc = baidu.dom(document),
		opts = options || {},

		//限制可触发的范围,selector或者是Object，来自options.range
		range,

		//监测点击是否在限制区内，在为true
		rangeFlag,

		//TODO：以后可以考虑支持enter和leave事件
		//关注的元素，来自options.focus
		//focus,

		//遮罩层虚线，具体样式在CSS中设置
		mask = baidu.dom('<div class="tang-rubberSelect">'),

		//第一次mousedown时的鼠标位置
		x1,y1,
		x2,y2,
		_x2,_y2,

		//函数节流计时器
		timer,

		//延时0.15秒计时器
		delayTimer,

		handle = function(e){
			clearTimeout(delayTimer);
			x1 = e.pageX;
			y1 = e.pageY;

			//监测范围
			if(range){

				//不在限制范围内
				if(x1<range.left||x1>range.right||y1<range.top||y1>range.bottom){
					rangeFlag = false;
					return;
				};
			};
			rangeFlag = true;
			doc.on('mousemove',ingHandle);
			mask.width(0).height(0).show().offset({left:x1,top:y1});
			
			doc.trigger('rubberselectstart');
			
			//为了兼容快速点击的情况
			doc.trigger('rubberselecting');
			
			//修正拖曳过程中页面里的文字会被选中
   			doc.on('selectstart',unselect);
		},

		ingHandle = function(e){

            //增加函数节流，防止事件频繁触发函数，影响性能
			clearTimeout(timer);
			timer = setTimeout(function(){
				_x2 = e.pageX;
				_y2 = e.pageY;

				//监测范围
				if(range){

					//不在限制范围内
					if(_x2<range.left){
						x2 = range.left;
					}else if(_x2>range.right){
						x2 = range.right;
					}else{
						x2 = _x2;
					};
					if(_y2<range.top){
						y2 = range.top;
					}else if(_y2>range.bottom){
						y2 = range.bottom;
					}else{
						y2 = _y2;
					};
				}else{
					x2 = _x2;
					y2 = _y2;
				};

				//橡皮筋移动算子
				//TODO： 此处的width和height应该减去border的宽度
				if(x2>x1&&y2>y1){
					mask.width(x2-x1).height(y2-y1);
				}else if(x2>x1&&y1>y2){
					mask.width(x2-x1).height(y1-y2).offset({left:x1,top:y2});
				}else if(x1>x2&&y1<y2){
					mask.width(x1-x2).height(y2-y1).offset({left:x2,top:y1});
				}else if(x1>x2&&y1>y2){
					mask.width(x1-x2).height(y1-y2).offset({left:x2,top:y2});
				};
				
				doc.trigger('rubberselecting');

			//这里是因为我喜欢3这个数字，所以用3毫秒。	
			},3);
		},

		endHandle = function(){
   			doc.off('selectstart',unselect);	
			if(rangeFlag){
				doc.off('mousemove',ingHandle);
				clearTimeout(delayTimer);
				delayTimer = setTimeout(function(){
					mask.hide();
					doc.trigger('rubberselectend');

				//用户选择延时0.15秒，雅虎交互原则。	
				},150);
			};
		},

        //防止拖拽过程中选择上文字
        unselect = function (e) {
            return e.preventDefault();
        },

        setRange = function(){
			if(opts.range){
				if(baidu.type(opts.range)=='object'){
					range = opts.range;
				}else{

					//传入的是selector
					var _ele = baidu.dom(opts.range);
					range = _ele.offset();
					range.bottom = range.top + _ele.outerHeight();
					range.right = range.left + _ele.outerWidth();
				};
			};        	
        };

    //函数主逻辑开始
    setRange();
	mask.hide().appendTo(document.body);
	doc.on('mousedown',handle);
	doc.on('mouseup',endHandle);


	return{
		target:mask,

		//设置范围
		range :function(value){
			if(!value){
				return opts.range;
			}else{
				opts.range = value;
				setRange();
				return this;
			};
		},

		//析构函数
		dispose:function(){
			doc.remove(mask);
			doc.off('mousemove',ingHandle);
			doc.off('mousedown',handle);
			doc.off('mouseup',endHandle);
			doc = mask = timer = null;
            for(var k in this){
                delete this[k];
            };
            this.dispose = true;
            return null;
		}
	}
};