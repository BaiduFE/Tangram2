///import baidu.plugin;
///import baidu.isFunction;
///import baidu.dom.data;
///import baidu.extend;
///import plugin.fx.animation;
///import plugin.fx.queue;

/**
 * @description 执行一个自定的样式集的动画
 * @function
 * @name    baidu.dom().animate()
 * @grammar baidu.dom().animate( properties [, duration ] [, easing ] [, complete ] )
 * @param   {Object}    properties    动画目标值，可以包含dom样式或者属性
 * @param   {String|Number}    duration    动画执行总时间, 默认400ms
 * @param   {String}    easing    设置动画的缓动函数，默认为swing
 * @param   {Function}    complete    动画执行完后的回掉函数
 * @return {Object} self
 * @example proerties: 是一个包含css属性和值的对象，值必须是数值的才有意义。如果传入{overflow: 'hidden'}将没有任何意义。
 

 duration: 可以是数值，单位为ms, 也可以传入'fast', 'slow'，分别代表200ms, 600ms, 如果传入其他字符将会当做default 400ms。如果扩充了baidu.fx.speeds，加入了baidu.fx.speeds.custom = 900, 这里传入`custom`将会被设置成900ms


 easing: tangram默认只支持linear和swing两种，可以通过扩充baidu.fx.easing来丰富其他easing.

 示例代码：
 baidu('div').animate({width: 100, height: 50}, 'fast', 'linear', function(){
    alert('done');
 });
 */

 /**
 * @description 执行一个自定的样式集动画
 * @function
 * @name baidu.dom().animate()
 * @grammar baidu.dom().animate( properties [, options ] )
 * @param   {Object}    properties    动画目标值，可以包含样式或者属性
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
    var fx = baidu.fx,
        Animation = fx.Animation,
        data = baidu.dom.data,
        speeds = {
            slow: 600,
            fast: 200,
            // Default speed
            _default: 400
        };

    function isEmptyObject( obj ) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    }

    function parseOpt( speed, easing, fn ) {
        var opt = speed && typeof speed === "object" ? baidu.extend( {}, speed ) : {
            complete: fn || !fn && easing ||
                baidu.isFunction( speed ) && speed,
            duration: speed,
            easing: fn && easing || easing && !baidu.isFunction( easing ) && easing
        };

        opt.duration = fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
            opt.duration in speeds ? speeds[ opt.duration ] : speeds._default;

        // normalize opt.queue - true/undefined/null -> "fx"
        if ( opt.queue == null || opt.queue === true ) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function() {
            if ( baidu.isFunction( opt.old ) ) {
                opt.old.call( this );
            }

            if ( opt.queue ) {
                baidu.dequeue( this, opt.queue );
            }
        };

        return opt;
    };

    baidu.plugin('dom', {
        animate: function( prop, speed, easing, callback ) {
            var empty = isEmptyObject( prop ),
                opt = parseOpt( speed, easing, callback ),
                doAnimation = function() {
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation( this, baidu.extend( {}, prop ), opt );
                    doAnimation.finish = function() {
                        anim.stop( true );
                    };
                    // Empty animations, or finishing resolves immediately
                    if ( empty || data( this, "finish" ) ) {
                        anim.stop( true );
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || opt.queue === false ?
                this.each( doAnimation ) :
                this.queue( opt.queue, doAnimation );
        }
    });

    //expose
    baidu.extend(fx, {
        speeds: speeds,
        off: false
    })
})();