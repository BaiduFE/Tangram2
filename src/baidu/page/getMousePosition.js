/// support magic - Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 获得页面里的目前鼠标所在的坐标
 * @name baidu.page.getMousePosition
 * @function
 * @grammar baidu.page.getMousePosition()
 * @version 1.2
 *             
 * @return {object} 鼠标坐标值{x:[Number], y:[Number]}
 */


///import baidu.event.on;
///import baidu.page.getScrollTop;
///import baidu.page.getScrollLeft;
/*
 * 取得当前页面里的目前鼠标所在的坐标（x y）
 * @return  {JSON}  当前鼠标的坐标值({x, y})
 */
(function(){

 baidu.page.getMousePosition = function(){
	 return {
		x : baidu.page.getScrollLeft() + xy.x,
		y : baidu.page.getScrollTop() + xy.y
	 };
 };

 var xy = {x:0, y:0};

 // 监听当前网页的 mousemove 事件以获得鼠标的实时坐标
 baidu.event.on(document, "onmousemove", function(e){
    e = window.event || e;
    xy.x = e.clientX;
    xy.y = e.clientY;
 });

})();
/// support magic - Tangram 1.x Code End