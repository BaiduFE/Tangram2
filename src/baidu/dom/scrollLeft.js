/**
 * @author linlingyu
 */
///import baidu.dom._smartScroll;

baidu.dom.extend({
    scrollLeft: function(){
        var ret = baidu.dom._smartScroll('scrollLeft');
        return function(value){
            return value === undefined ? ret.get(this[0])
                : ret.set(this[0], value) || this;
        }
    }()
});