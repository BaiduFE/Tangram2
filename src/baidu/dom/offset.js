/**
 * @author linlingyu
 */

///import baidu.type;
///import baidu.dom.getWindow;
///import baidu.dom.getDocument;
///import baidu.dom.getCurrentStyle;
///import baidu.dom.position;

/**
 * @description 取得第一个匹配元素或是设置多个匹配元素相对于文档的偏移量
 * @function 
 * @name baidu.dom().offset()
 * @grammar baidu.dom(args).offset()
 * @return {Object} 返回一个包含left和top键名的json来标示元素的偏移量
 * @example 
 
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素相对于文档的偏移量
 * @function 
 * @name baidu.dom().offset()
 * @grammar baidu.dom(args).offset([coordinates])
 * @param {Object} coordinates 参数格式形式是{left: val, top: val}，(val可以是一个整型或是字符串型的数值)通过一个json来设置第一个匹配元素相对于文档的偏移量，同时该匹配元素的position属性将被更改为relative
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素相对于文档的偏移量
 * @function 
 * @name baidu.dom().offset()
 * @grammar baidu.dom(args).offset([fn(index, coordinates)])
 * @param {function} fn 接收两个参数，index参数表示匹配元素在集合中的索引，coordinates表示匹配元素的坐标，fn最终需要返回一个格式为{left: val, top: val}的json
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

baidu.dom.extend({
    offset: function(){
        var offset = {
            setOffset: function(ele, options, index){
                var tang = tang = baidu.dom(ele),
                    position = tang.getCurrentStyle('position');
                position === 'static' && (ele.style.position = 'relative');
                var currOffset = tang.offset(),
                    currLeft = tang.getCurrentStyle('left'),
                    currTop = tang.getCurrentStyle('top'),
                    calculatePosition = (~'absolute|fixed'.indexOf(position)) && ~('' + currLeft + currTop).indexOf('auto'),
                    curPosition = calculatePosition && tang.position();
                currLeft = curPosition && curPosition.left || parseFloat(currLeft) || 0;
                currTop = curPosition && curPosition.top || parseFloat(currTop) || 0;
                baidu.type('options') === 'function' && (options = options.call(ele, index, currOffset));
                options.left != undefined && (ele.style.left = options.left - currOffset.left + currLeft + 'px');
                options.top != undefined && (ele.style.top = options.top - currOffset.top + currTop + 'px');
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
        
        return function(options){
            if(!options){
                var ele = this[0],
                    doc = this.getDocument(),
                    box = {left: 0, top: 0},
                    win, docElement, body;
                if(ele === doc.body){return offset.bodyOffset(ele, doc);}
                if (typeof ele.getBoundingClientRect !== 'undefined'){
                    box = ele.getBoundingClientRect();
                }
                win = this.getWindow();
                docElement = doc.documentElement;
                body = doc.body;
                return {
                    left: box.left + (win.pageXOffset || Math.max(docElement.scrollLeft, body.scrollLeft)) - (docElement.clientLeft || body.clientLeft),
                    top: box.top + (win.pageYOffset || Math.max(docElement.scrollTop, body.scrollTop)) - (docElement.clientTop || body.clientTop)
                };
            }else{
                baidu.check('^(?:object|function)$', 'baidu.dom.offset');
                for(var i = 0, item; item = this[i]; i++){
                    offset.setOffset(item, options, i);
                }
                return this;
           }
        }
    }()
});