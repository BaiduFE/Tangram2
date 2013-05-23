///import baidu.plugin;
///import baidu.forEach;
///import plugin.fx.animate;
///import baidu._util_.isHidden;
/**
 * @description 调整所选元素的透明度
 * @function
 * @name baidu().fadeTo()
 * @grammar baidu(args).fadeTo( duration, opacity [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {Number}    opacity    目标透明度
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return {Object} self
 */
/**
 * @description 调整所选元素的透明度
 * @function
 * @name baidu().fadeTo()
 * @grammar baidu(args).fadeTo( duration, opacity [, easing ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {Number}    opacity    目标透明度
 * @param   {String}    easing    设置动画的缓动函数，默认为swing
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 通过透明度渐变隐藏所选元素。
 * @function
 * @name baidu().fadeOut()
 * @grammar baidu(args).fadeOut( [duration ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 通过透明度渐变隐藏所选元素。
 * @function
 * @name baidu().fadeOut()
 * @grammar baidu(args).fadeOut( [duration ] [, easing ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {String}    easing    设置动画的缓动函数，默认为swing
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 通过透明度渐变隐藏所选元素。
 * @function
 * @name baidu().fadeOut()
 * @grammar baidu(args).fadeOut( options )
 * @param   {Object}    options    配置项
 * @param   {String|Number}    options.duration    动画执行总时间, 默认400ms
 * @param   {String}    options.easing    设置动画的缓动函数，默认为swing
 * @param   {Boolean|String}    options.queue    设置队列名称，如果传入true, 队列名称为fx, 传入false或空，将不以队列形式运行此动画。
 * @param   {Object}    options.specialEasing    设置特定属性的缓动方式。比如{width: 'linner', height: 'swing'}
 * @param   {Function}    options.step   这个方法将会在每个元素的每个属性值的每一次变化时执行。 
 * @param   {Function}    options.progress   这个方法将会在每次变化属性的时候触发，次数小于或等于step的触发次数。执行次数跟dom集合和变化样式集合多少无关。 
 * @param   {Function}    options.complete   动画执行完后的回掉函数 
 * @param   {Function}    options.done   complete的一个别名，意义相同(符合promise规范) 
 * @param   {Function}    options.fail   当某个动画执行失败时触发（stop方法有可能中断一个动画执行）。
 * @param   {Function}    options.always   不管成功与失败，动画执行完后触发。
 * @return self
 */
/**
 * @description 通过透明度渐变显示所选元素。
 * @function
 * @name baidu().fadeIn()
 * @grammar baidu(args).fadeIn( [duration ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 通过透明度渐变显示所选元素。
 * @function
 * @name baidu().fadeIn()
 * @grammar baidu(args).fadeIn( [duration ] [, easing ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {String}    easing    设置动画的缓动函数，默认为swing
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 通过透明度渐变显示所选元素。
 * @function
 * @name baidu().fadeIn()
 * @grammar baidu(args).fadeIn( options )
 * @param   {Object}    options    配置项
 * @param   {String|Number}    options.duration    动画执行总时间, 默认400ms
 * @param   {String}    options.easing    设置动画的缓动函数，默认为swing
 * @param   {Boolean|String}    options.queue    设置队列名称，如果传入true, 队列名称为fx, 传入false或空，将不以队列形式运行此动画。
 * @param   {Object}    options.specialEasing    设置特定属性的缓动方式。比如{width: 'linner', height: 'swing'}
 * @param   {Function}    options.step   这个方法将会在每个元素的每个属性值的每一次变化时执行。 
 * @param   {Function}    options.progress   这个方法将会在每次变化属性的时候触发，次数小于或等于step的触发次数。执行次数跟dom集合和变化样式集合多少无关。 
 * @param   {Function}    options.complete   动画执行完后的回掉函数 
 * @param   {Function}    options.done   complete的一个别名，意义相同(符合promise规范) 
 * @param   {Function}    options.fail   当某个动画执行失败时触发（stop方法有可能中断一个动画执行）。
 * @param   {Function}    options.always   不管成功与失败，动画执行完后触发。
 * @return self
 */
 /**
 * @description 通过透明度渐变显示或者隐藏所选元素。
 * @function
 * @name baidu().fadeToggle()
 * @grammar baidu(args).fadeToggle( [duration ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 通过透明度渐变显示或者隐藏所选元素。
 * @function
 * @name baidu().fadeToggle()
 * @grammar baidu(args).fadeToggle( [duration ] [, easing ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {String}    easing    设置动画的缓动函数，默认为swing
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 通过透明度渐变显示或者隐藏所选元素。
 * @function
 * @name baidu().fadeToggle()
 * @grammar baidu(args).fadeToggle( options )
 * @param   {Object}    options    配置项
 * @param   {String|Number}    options.duration    动画执行总时间, 默认400ms
 * @param   {String}    options.easing    设置动画的缓动函数，默认为swing
 * @param   {Boolean|String}    options.queue    设置队列名称，如果传入true, 队列名称为fx, 传入false或空，将不以队列形式运行此动画。
 * @param   {Object}    options.specialEasing    设置特定属性的缓动方式。比如{width: 'linner', height: 'swing'}
 * @param   {Function}    options.step   这个方法将会在每个元素的每个属性值的每一次变化时执行。 
 * @param   {Function}    options.progress   这个方法将会在每次变化属性的时候触发，次数小于或等于step的触发次数。执行次数跟dom集合和变化样式集合多少无关。 
 * @param   {Function}    options.complete   动画执行完后的回掉函数 
 * @param   {Function}    options.done   complete的一个别名，意义相同(符合promise规范) 
 * @param   {Function}    options.fail   当某个动画执行失败时触发（stop方法有可能中断一个动画执行）。
 * @param   {Function}    options.always   不管成功与失败，动画执行完后触发。
 * @return self
 */

// Slide
// ---------------------------------------

 /**
 * @description 通过一个上拉的动画隐藏所选元素，原理是高度内外上下边距同时变化到零的一个动画。
 * @function
 * @name baidu().slideUp()
 * @grammar baidu(args).slideUp( [duration ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 通过一个上拉的动画隐藏所选元素，原理是高度内外上下边距同时变化到零的一个动画。
 * @function
 * @name baidu().slideUp()
 * @grammar baidu(args).slideUp( [duration ] [, easing ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {String}    easing    设置动画的缓动函数，默认为swing
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 通过一个上拉的动画隐藏所选元素，原理是高度内外上下边距同时变化到零的一个动画。
 * @function
 * @name baidu().slideUp()
 * @grammar baidu(args).slideUp( options )
 * @param   {Object}    options    配置项
 * @param   {String|Number}    options.duration    动画执行总时间, 默认400ms
 * @param   {String}    options.easing    设置动画的缓动函数，默认为swing
 * @param   {Boolean|String}    options.queue    设置队列名称，如果传入true, 队列名称为fx, 传入false或空，将不以队列形式运行此动画。
 * @param   {Object}    options.specialEasing    设置特定属性的缓动方式。比如{width: 'linner', height: 'swing'}
 * @param   {Function}    options.step   这个方法将会在每个元素的每个属性值的每一次变化时执行。 
 * @param   {Function}    options.progress   这个方法将会在每次变化属性的时候触发，次数小于或等于step的触发次数。执行次数跟dom集合和变化样式集合多少无关。 
 * @param   {Function}    options.complete   动画执行完后的回掉函数 
 * @param   {Function}    options.done   complete的一个别名，意义相同(符合promise规范) 
 * @param   {Function}    options.fail   当某个动画执行失败时触发（stop方法有可能中断一个动画执行）。
 * @param   {Function}    options.always   不管成功与失败，动画执行完后触发。
 * @return self
 */
/**
 * @description 通过一个下拉的动画显示所选元素，原理是高度内外上下边距同时变化到最大的一个动画。
 * @function
 * @name baidu().slideDown()
 * @grammar baidu(args).slideDown( [duration ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 通过一个下拉的动画显示所选元素，原理是高度内外上下边距同时变化到最大的一个动画。
 * @function
 * @name baidu().slideDown()
 * @grammar baidu(args).slideDown( [duration ] [, easing ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {String}    easing    设置动画的缓动函数，默认为swing
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 通过一个下拉的动画显示所选元素，原理是高度内外上下边距同时变化到最大的一个动画。
 * @function
 * @name baidu().slideDown()
 * @grammar baidu(args).slideDown( options )
 * @param   {Object}    options    配置项
 * @param   {String|Number}    options.duration    动画执行总时间, 默认400ms
 * @param   {String}    options.easing    设置动画的缓动函数，默认为swing
 * @param   {Boolean|String}    options.queue    设置队列名称，如果传入true, 队列名称为fx, 传入false或空，将不以队列形式运行此动画。
 * @param   {Object}    options.specialEasing    设置特定属性的缓动方式。比如{width: 'linner', height: 'swing'}
 * @param   {Function}    options.step   这个方法将会在每个元素的每个属性值的每一次变化时执行。 
 * @param   {Function}    options.progress   这个方法将会在每次变化属性的时候触发，次数小于或等于step的触发次数。执行次数跟dom集合和变化样式集合多少无关。 
 * @param   {Function}    options.complete   动画执行完后的回掉函数 
 * @param   {Function}    options.done   complete的一个别名，意义相同(符合promise规范) 
 * @param   {Function}    options.fail   当某个动画执行失败时触发（stop方法有可能中断一个动画执行）。
 * @param   {Function}    options.always   不管成功与失败，动画执行完后触发。
 * @return self
 */
 /**
 * @description 上拉动画slideUp与下拉动画slideDown的切换执行
 * @function
 * @name baidu().slideToggle()
 * @grammar baidu(args).slideToggle( [duration ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 上拉动画slideUp与下拉动画slideDown的切换执行
 * @function
 * @name baidu().slideToggle()
 * @grammar baidu(args).slideToggle( [duration ] [, easing ] [, complete ] )
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {String}    easing    设置动画的缓动函数，默认为swing
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return self
 */
 /**
 * @description 上拉动画slideUp与下拉动画slideDown的切换执行
 * @function
 * @name baidu().slideToggle()
 * @grammar baidu(args).slideToggle( options )
 * @param   {Object}    options    配置项
 * @param   {String|Number}    options.duration    动画执行总时间, 默认400ms
 * @param   {String}    options.easing    设置动画的缓动函数，默认为swing
 * @param   {Boolean|String}    options.queue    设置队列名称，如果传入true, 队列名称为fx, 传入false或空，将不以队列形式运行此动画。
 * @param   {Object}    options.specialEasing    设置特定属性的缓动方式。比如{width: 'linner', height: 'swing'}
 * @param   {Function}    options.step   这个方法将会在每个元素的每个属性值的每一次变化时执行。 
 * @param   {Function}    options.progress   这个方法将会在每次变化属性的时候触发，次数小于或等于step的触发次数。执行次数跟dom集合和变化样式集合多少无关。 
 * @param   {Function}    options.complete   动画执行完后的回掉函数 
 * @param   {Function}    options.done   complete的一个别名，意义相同(符合promise规范) 
 * @param   {Function}    options.fail   当某个动画执行失败时触发（stop方法有可能中断一个动画执行）。
 * @param   {Function}    options.always   不管成功与失败，动画执行完后触发。
 * @return self
 */
(function(){
    var isHidden = baidu._util_.isHidden,
        cssExpand = [ "Top", "Right", "Bottom", "Left" ],
        presets = {};

    // Generate parameters to create a standard animation
    function genFx( type, includeWidth ) {
        var which,
            attrs = { height: type },
            i = 0;

        // if we include width, step value is 1 to do all cssExpand values,
        // if we don't include width, step value is 2 to skip over Left and Right
        includeWidth = includeWidth? 1 : 0;
        for( ; i < 4 ; i += 2 - includeWidth ) {
            which = cssExpand[ i ];
            attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
        }

        if ( includeWidth ) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    // Generate shortcuts for custom animations
    baidu.forEach({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function( props, name ) {
        presets[ name ] = function( speed, easing, callback ) {
            return this.animate( props, speed, easing, callback );
        };
    });

    baidu.forEach([ "toggle", "show", "hide" ], function( name, i ) {
        var cssFn = baidu.dom.fn[ name ];
        presets[ name ] = function( speed, easing, callback ) {
            return speed == null || typeof speed === "boolean" ?
                cssFn ? cssFn.apply( this, arguments ) : this :
                this.animate( genFx( name, true ), speed, easing, callback );
        };
    });

    presets.fadeTo = function( speed, to, easing, callback ) {

        this.filter(function(){
            return isHidden(this);
        }).css( "opacity", 0 ).show();
        return this.animate({ opacity: to }, speed, easing, callback );
    }

    baidu.plugin( "dom", presets );
})();