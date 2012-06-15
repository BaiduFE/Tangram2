/**
 * @author linlingyu
 */
///import baidu.each;
///import baidu.dom.getCurrentStyle;

baidu.dom._getWidthOrHeight = baidu.dom._getWidthOrHeight || (function(){
    var ret = {};
    baidu.each(['Width', 'Height'], function(item){
        var cssExpand = {Width: ['Right', 'Left'], Height: ['Top', 'Bottom']}[item];
        ret['get' + item] = function(ele, extra){
            var tang = baidu.dom(ele),
                rect = ele['offset' + item],
                delString = 'padding|border';
            extra && baidu.each(extra.split('|'), function(val){
                if(!~delString.indexOf(val)){
                    rect += parseFloat(tang.getCurrentStyle(val + cssExpand[0])) || 0;
                    rect += parseFloat(tang.getCurrentStyle(val + cssExpand[1])) || 0;
                }else{
                    delString = delString.replace(new RegExp('\\|?' + item + '\\|?'), '');
                }
            });
            delString && baidu.each(delString.split('|'), function(val){
                rect -= parseFloat(tang.getCurrentStyle(val + cssExpand[0] + (val === 'border' ? 'Width' : ''))) || 0;
                rect -= parseFloat(tang.getCurrentStyle(val + cssExpand[1] + (val === 'border' ? 'Width' : ''))) || 0;
            });
            return rect;
        }
    });
    return function(ele, key, extra){
        return ret[key === 'width' ? 'getWidth' : 'getHeight'](ele, extra);
    }
})();