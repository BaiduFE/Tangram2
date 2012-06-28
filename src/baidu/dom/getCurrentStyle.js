/**
 * @author linlingyu
 */
///import baidu.dom.getComputedStyle;
baidu.dom.extend({
    getCurrentStyle: function(){
        var css = document.documentElement.currentStyle ?
            function(key){return this[0].currentStyle ? this[0].currentStyle[key] : this[0].style[key];}
                : function(key){return this.getComputedStyle(key);}
        return function(key){
            return css.call(this, key);
        }
    }()
});