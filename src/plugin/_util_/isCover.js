/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 判断传入的元素是否在当前元素的区域内
 * @function 
 * @name baidu.dom().isCover()
 * @grammar baidu.dom(args).isCover(selector)
 * @param {Selector|TangramDom|htmlElement} selector css选择器字符串、HTML字符串，或者页面Dom元素，只会取得第一个匹配元素
 * @return {Boolean} 如果两元素区域有交集（包括边缘完全对齐），返回true；没有交集，则返回false。
*/

/**
 * @description 判断传入的元素是否在当前元素的区域内
 * @function 
 * @name baidu.dom().isCover()
 * @grammar baidu.dom(args).isCover(selector,strict)
 * @param {Selector|TangramDom|htmlElement} selector css选择器字符串、HTML字符串，或者页面Dom元素，只会取得第一个匹配元素
 * @param {Boolean} strict 是否严格的在当前元素的范围内
 * @return {Boolean} 新传入元素如果在前匹配元素组中的任何一个之内（包括边缘完全对齐），则返回true；没在任何一个内，则返回false。
*/

///import baidu;
///import baidu.dom;
///import baidu.dom.eq;
///import baidu.dom.offset;
///import baidu.dom.css;
///import baidu.dom.width;
///import baidu.dom.height;

baidu.dom.extend({
    isCover : function(selector,strict){
        if(!arguments.length){ 
            return false; 
        };

        //传入的元素，get first
        var me = this,
            ele = baidu.dom(selector).eq(0),
            p = ele.offset(),
            bW = Number(ele.css('border-width').replace('px','')),
            w = ele.width(),
            h = ele.height(),

            //检测算子，传入四个值比较，strict（是否严格）
            check = function(top,right,bottom,left,strict){
                if(strict){

                    //严格模式，一定要在容器内
                    if((p.top>=top)&&((p.top+h+bW+bW)<=bottom)&&(p.left>=left)&&((p.left+w+bW+bW)<=right)){
                        return true;
                    };

                }else{

                    //非严格模式，有碰撞或交集即可
                    if(((p.top+bW+bW+h)>=top)&&(p.top<=bottom)&&((p.left+bW+bW+w)>=left)&&(p.left<=right)){
                        return true;
                    };
                };
            };

        for(var i = 0; i < me.size(); i++ ){
            var _ele = me.eq(i),
                _p = _ele.offset(),
                _bW = Number(ele.css('border-width').replace('px','')),
                _w = _ele.eq(i).width(),
                _h = _ele.eq(i).height();

            if(check(_p.top,_p.left+_w+_bW+_bW,_p.top+_h+_bW+_bW,_p.left,strict)){
                return true;
            };
        };

        return false;
    }
});