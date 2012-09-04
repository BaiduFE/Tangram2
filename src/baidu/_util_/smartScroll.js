/**
 * @author linlingyu
 */
///import baidu._util_;
///import baidu.type;
///import baidu.browser.isStrict;

baidu._util_.smartScroll = function(axis){
    var orie = {scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset'}[axis],
        is = axis === 'scrollLeft',
        ret = {};
    function isDocument(ele){
        return ele && ele.nodeType === 9;
    }
    function getWindow(ele){
        return baidu.isWindow(ele) ? ele
            : isDocument(ele) ? ele.defaultView || ele.parentWindow : false;
    }
    return {
        get: function(ele){
            var win = getWindow(ele);
            return win ? (orie in win) ? win[orie]
                : baidu.browser.isStrict && win.document.documentElement[axis]
                    || win.document.body[axis] : ele[axis];
        },
        
        set: function(ele, val){
            var win = getWindow(ele);
            win ? win.scrollTo(is ? val : this.get(ele), !is ? val : this.get(ele))
                : ele[axis] = val;
        }
    };
};