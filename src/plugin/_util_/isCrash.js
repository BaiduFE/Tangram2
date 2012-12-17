/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 判断传入的元素是否和当前元素的区域有交集
 * @function 
 * @name baidu.dom().isCrash()
 * @grammar baidu.dom(args).isCrash(selector)
 * @param {Selector|TangramDom|htmlElement} selector css选择器字符串、HTML字符串，或者页面Dom元素，只会取得第一个匹配元素
 * @return {Boolean} 如果两元素区域有交集（包括边缘完全对齐），返回true；没有交集，则返回false。
*/

/**
 * @description 判断传入的元素是否严格的在当前任意一个匹配的元素内
 * @function 
 * @name baidu.dom().isCrash()
 * @grammar baidu.dom(args).isCrash(selector,strict)
 * @param {Selector|TangramDom|htmlElement} selector css选择器字符串、HTML字符串，或者页面Dom元素，只会取得第一个匹配元素
 * @param {Boolean} strict 是否严格的在当前元素的范围内
 * @return {Boolean} 新传入元素如果在前匹配元素组中的任何一个之内（包括边缘完全对齐），则返回true；没在任何一个内，则返回false。
*/

///import baidu.dom.eq;
///import baidu.dom.offset;
///import baidu.dom.outerWidth;
///import baidu.dom.outerHeight;

baidu.dom.extend({
    isCrash : function(selector,strict){
        if(!arguments.length){ 
            return false; 
        };

        //传入的元素，get first
        var me = this,
            ele = baidu.dom(selector).eq(0),
            o = ele.offset(),
            w = ele.outerWidth(),
            h = ele.outerHeight(),
            num = me.size(),

            //检测算子，传入四个值比较，strict（是否严格）
            check = function(top,right,bottom,left,strict){
                if(strict){

                    //严格模式，一定要在容器内
                    if((o.top>=top)&&((o.top+h)<=bottom)&&(o.left>=left)&&((o.left+w)<=right)){
                        return true;
                    };

                }else{

                    //非严格模式，有碰撞或交集即可
                    if(((o.top+h)>=top)&&(o.top<=bottom)&&((o.left+w)>=left)&&(o.left<=right)){
                        return true;
                    };
                };
            };

        for(var i = 0; i < num; i++ ){
            var _ele = me.eq(i),
                _o = _ele.offset(),
                _w = _ele.eq(i).outerWidth(),
                _h = _ele.eq(i).outerHeight();

            if(check(_o.top,_o.left+_w,_o.top+_h,_o.left,strict)){
                return true;
            };
        };

        return false;
    }
});

// //检测两区域是否碰撞
// check(a1,a2){
//     if(a1.top>a2.bottom||a1.bottom<a2.top||a1.left>a2.right||a1.right<a2.left){
//         return false;
//     }else{
//         return true;
//     };
// };
