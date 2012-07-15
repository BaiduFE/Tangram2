/**
 * @author linlingyu
 */
///import baidu.each;
///import baidu.dom.getCurrentStyle;

baidu.dom._getWidthOrHeight = function(){
    var ret = {},
        cssShow = {position: 'absolute', visibility: 'hidden', display: 'block'};
    function swap(ele, options, callback){
        var defaultVal = {},
            result;
        for(var i in options){
            defaultVal[i] = ele.style[i];
            ele.style[i] = options[i];
        }
        result = callback.call(ele);
        for(var i in options){
            ele.style[i] = defaultVal[i];
        }
        return result;
    }
    baidu.each(['Width', 'Height'], function(item){
        var cssExpand = {Width: ['Right', 'Left'], Height: ['Top', 'Bottom']}[item];
        ret['get' + item] = function(ele, extra){
            var tang = baidu.dom(ele),
                rect = ele['offset' + item],
                delString = 'padding|border';
            if(rect === 0){return swap(ele, cssShow, function(){return ret['get' + item](ele, extra)});}
            extra && baidu.each(extra.split('|'), function(val){
                if(!~delString.indexOf(val)){//if val is margin
                    rect += parseFloat(tang.getCurrentStyle(val + cssExpand[0])) || 0;
                    rect += parseFloat(tang.getCurrentStyle(val + cssExpand[1])) || 0;
                }else{//val is border or padding
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
    //
    return function(ele, key, extra){
        return ret[key === 'width' ? 'getWidth' : 'getHeight'](ele, extra);
    }
}();