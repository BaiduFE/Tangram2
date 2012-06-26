/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.type;
///import baidu.support;
///import baidu.dom.getWindow;
///import baidu.dom.getDocument;
///import baidu.dom.getCurrentStyle;

baidu.dom.extend({
    offset: function(){
        var offset = {
            getDefaultOffset: function(ele, doc){
                var docElement = doc.documentElement,
                    body = doc.body,
                    defaultView = doc.defaultView,
                    computedStyle = defaultView ? defaultView.getComputedStyle(ele, null) : ele.currentStyle,
                    patrn = /^t(?:able|h|d)/i,
                    offsetParent = ele.offsetParent,
                    l = ele.offsetLeft,
                    t = ele.offsetTop;
                //
                while((ele = ele.parentNode) && ele !== body && ele !== docElement){
                    if(baidu.support.fixedPosition && computedStyle.position === 'fixed'){break;}
                    computedStyle = defaultView ? defaultView.getComputedStyle(ele, null) : ele.currentStyle;
                    l -= ele.scrollLeft;
                    t -= ele.scrollTop;
                    if(ele === offsetParent){
                        l += ele.offsetLeft;
                        t += ele.offsetTop;
                        //当浏览器不会自动包含元素的border运算时
                        if(!baidu.support.hasBorderWidth
                            && !(baidu.support.hasTableCellBorderWidth && patrn.test(ele.nodeName))){
                                l += parseFloat(computedStyle.borderLeftWidth) || 0;
                                t += parseFloat(computedStyle.borderTopWidth) || 0;
                        }
                        offsetParent = ele.offsetParent;
                    }
                }
                if(~'static,relative'.indexOf(computedStyle.position)){
                    l += body.offsetLeft;
                    t += body.offsetTop;
                }
                if(baidu.support.fixedPosition && computedStyle.position === 'fixed'){
                    l += Math.max(docElement.scrollLeft, body.scrollLeft);
                    t += Math.max(docElement.scrollTop, body.scrollTop);
                }
                return {left: l, top: t};
            },
            //
            setOffset: function(ele, options, index){
                var tang = baidu.dom(ele),
                    type = baidu.type(options),
                    currOffset = tang.offset(),
                    currLeft = tang.getCurrentStyle('left'),
                    currTop = tang.getCurrentStyle('top');
                type === 'function' && (options = options.call(ele, index, currOffset));
                // TODO see jquery
                if(options.left === undefined
                    && options.top === undefined){
                    return;
                }
                currLeft = parseFloat(currLeft) || 0;
                currTop = parseFloat(currTop) || 0;
                options.left != undefined && (ele.style.left = options.left - currOffset.left + currLeft + 'px');
                options.top != undefined && (ele.style.top = options.top - currOffset.top + currTop + 'px');
                tang.getCurrentStyle('position') === 'static'
                    && (ele.style.position = 'relative');
            },
            //
            bodyOffset: function(body){
                var tang = baidu.dom(body);
                return {
                    left: body.offsetLeft + parseFloat(tang.getCurrentStyle('marginLeft')) || 0,
                    top: body.offsetTop + parseFloat(tang.getCurrentStyle('marginTop')) || 0
                }
            }
        };
        
        offset.getOffset = 'getBoundingClientRect' in document.documentElement ?
            function(ele, doc){
                //IE6有时会出现找不到方法的奇葩现像
                if(!ele.getBoundingClientRect){return offset.getDefaultOffset(ele, doc);}
                var rect = ele.getBoundingClientRect(),
                    win = baidu.dom(doc).getWindow(),
                    docElement = doc.documentElement,
                    body = doc.body;
                return {
                    left: rect.left + (win.pageXOffset || Math.max(docElement.scrollLeft, body.scrollLeft)) - (docElement.clientLeft || body.clientLeft),
                    top: rect.top + (win.pageYOffset || Math.max(docElement.scrollTop, body.scrollTop)) - (docElement.clientTop || body.clientTop)
                };
            } : offset.getDefaultOffset;
        
        
        
        return function(options){
            if(!options){
                var ele = this[0],
                    doc = baidu.dom(ele).getDocument();
                return offset[ele === doc.body ? 'bodyOffset' : 'getOffset'](ele, doc);
            }else{
                var len = this.length;
                for(var i = 0; i < len; i++){
                    offset.setOffset(this[i], options, i);
                }
                return this;
           }
        }
    }()
});








(function(){
    var offset = {
        getDefaultOffset: function(ele, doc){
            var docElement = doc.documentElement,
                body = doc.body,
                defaultView = doc.defaultView,
                computedStyle = defaultView ? defaultView.getComputedStyle(ele, null) : ele.currentStyle,
                patrn = /^t(?:able|h|d)/i,
                offsetParent = ele.offsetParent,
                l = ele.offsetLeft,
                t = ele.offsetTop;
            //
            while((ele = ele.parentNode) && ele !== body && ele !== docElement){
                if(baidu.support.fixedPosition && computedStyle.position === 'fixed'){break;}
                computedStyle = defaultView ? defaultView.getComputedStyle(ele, null) : ele.currentStyle;
                l -= ele.scrollLeft;
                t -= ele.scrollTop;
                if(ele === offsetParent){
                    l += ele.offsetLeft;
                    t += ele.offsetTop;
                    //当浏览器不会自动包含元素的border运算时
                    if(!baidu.support.hasBorderWidth
                        && !(baidu.support.hasTableCellBorderWidth && patrn.test(ele.nodeName))){
                            l += parseFloat(computedStyle.borderLeftWidth) || 0;
                            t += parseFloat(computedStyle.borderTopWidth) || 0;
                    }
                    offsetParent = ele.offsetParent;
                }
            }
            if(~'static,relative'.indexOf(computedStyle.position)){
                l += body.offsetLeft;
                t += body.offsetTop;
            }
            if(baidu.support.fixedPosition && computedStyle.position === 'fixed'){
                l += Math.max(docElement.scrollLeft, body.scrollLeft);
                t += Math.max(docElement.scrollTop, body.scrollTop);
            }
            return {left: l, top: t};
        },
        setOffset: function(ele, options, index){
            var tang = baidu.dom(ele),
                type = baidu.type(options),
                currOffset = tang.offset(),
                currLeft = tang.getCurrentStyle('left'),
                currTop = tang.getCurrentStyle('top');
            type === 'function' && (options = options.call(ele, index, currOffset));
            // TODO see jquery
            if(options.left === undefined
                && options.top === undefined){
                return;
            }
            currLeft = parseFloat(currLeft) || 0;
            currTop = parseFloat(currTop) || 0;
            options.left != undefined && (ele.style.left = options.left - currOffset.left + currLeft + 'px');
            options.top != undefined && (ele.style.top = options.top - currOffset.top + currTop + 'px');
            tang.getCurrentStyle('position') === 'static'
                && (ele.style.position = 'relative');
        },
        bodyOffset: function(body){
            var tang = baidu.dom(body);
            return {
                left: body.offsetLeft + parseFloat(tang.getCurrentStyle('marginLeft')) || 0,
                top: body.offsetTop + parseFloat(tang.getCurrentStyle('marginTop')) || 0
            }
        }
    };
    
    offset.getOffset = 'getBoundingClientRect' in document.documentElement ?
        function(ele, doc){
            //IE6有时会出现找不到方法的奇葩现像
            if(!ele.getBoundingClientRect){return offset.getDefaultOffset(ele, doc);}
            var rect = ele.getBoundingClientRect(),
                win = baidu.dom(doc).getWindow(),
                docElement = doc.documentElement,
                body = doc.body;
            return {
                left: rect.left + (win.pageXOffset || Math.max(docElement.scrollLeft, body.scrollLeft)) - (docElement.clientLeft || body.clientLeft),
                top: rect.top + (win.pageYOffset || Math.max(docElement.scrollTop, body.scrollTop)) - (docElement.clientTop || body.clientTop)
            };
        } : offset.getDefaultOffset;
    //
    baidu.dom.extend({
        offset: function(options){
            if(!options){
                var ele = this[0],
                    doc = baidu.dom(ele).getDocument();
                return offset[ele === doc.body ? 'bodyOffset' : 'getOffset'](ele, doc);
            }else{
                var len = this.length;
                for(var i = 0; i < len; i++){
                    offset.setOffset(this[i], options, i);
                }
                return this;
           }
        }
    });
})();