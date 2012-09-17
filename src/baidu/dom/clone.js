/**
 * @author linlingyu
 */

///import baidu.dom.map;
///import baidu.support;
///import baidu.id;
///import baidu._util_.eventBase;
///import baidu._util_.isXML;
/**
 * @description 对匹配元素进行深度克隆
 * @function 
 * @name baidu.dom().clone()
 * @grammar baidu.dom(args).clone([withDataAndEvents[,deepWithDataAndEvents]])
 * @param {Boolean} withDataAndEvents 一个可选的布尔值参数，当参数为true时，表示当次克隆需要将该匹配元素的数据和事件也做克隆
 * @param {Boolean} deepWithDataAndEvents 一个可选的布尔值参数，当参数为true时，表示当次克隆需要将该匹配元素的所有子元素的数据和事件也做克隆
 * @return {TangramDom} 接口最终返回一个TangramDom对象，该对象包装了克隆的节点
 * @example
 .clone()方法深度复制所有匹配的元素，包括所有匹配元素、匹配元素的下级元素、文字节点。
 当和插入方法联合使用时，.clone()对于复制页面上的元素很方便。
 
 注意：如果也要克隆事件，需要传入参数。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>
 <h2>footer</h2>

 //通常我们将页面上一个元素插入到DOM里另立个地方，它会被从老地方移走：
 baidu('h2').appendTo(baidu('#body'));

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
   <h2>footer</h2>
 </div>

 //但是我们如果需要的是复制而不是移除，我们可以像下面这样写代码：
 baidu('h2').clone().appendTo(baidu('#body'));

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
   <h2>footer</h2>
 </div>
 <h2>footer</h2>

 //仅克隆当前节点的事件
 baidu('h2').clone(true);

 //克隆当前节点及所有子节点的全部事件
 baidu('h2').clone(true,true);

 */

baidu.dom.extend({
    clone: function(){
        var event = baidu._util_.eventBase;
        //
        function getAll(ele){
            return ele.getElementsByTagName ? ele.getElementsByTagName('*')
                : (ele.querySelectorAll ? ele.querySelectorAll('*') : []);
        }
        //
        function cloneFixAttributes(src, dest){
            dest.clearAttributes && dest.clearAttributes();
            dest.mergeAttributes && dest.mergeAttributes(src);
            switch(dest.nodeName.toLowerCase()){
                case 'object':
                    dest.outerHTML = src.outerHTML;
                    break;
                case 'textarea':
                case 'input':
                    if(~'checked|radio'.indexOf(src.type)){
                        src.checked && (dest.defaultChecked = dest.checked = src.checked);
                        dest.value !== src.value && (dest.value = src.value);
                    }
                    dest.defaultValue = src.defaultValue;
                    break;
                case 'options':
                    dest.selected = src.defaultSelected;
                    break;
                case 'script':
                    dest.text !== src.text && (dest.text = src.text);
                    break;
            }
            dest[baidu.key] && dest.removeAttribute(baidu.key);
        }
        //
        function cloneCopyEvent(src, dest){
        	if(dest.nodeType !== 1 || !baidu.id(src, 'get')){return;}
        	var defaultEvents = event.get(src);
        	for(var i in defaultEvents){
        	    for(var j = 0, handler; handler = defaultEvents[i][j]; j++){
        	        event.add(dest, i, handler);
        	    }
        	}
        }
        //
        function clone(ele, dataAndEvents, deepDataAndEvents){
            var cloneNode = ele.cloneNode(true),
                srcElements, destElements, len;
            //IE
            if((!baidu.support.noCloneEvent || !baidu.support.noCloneChecked)
                && (ele.nodeType === 1 || ele.nodeType === 11) && !baidu._util_.isXML(ele)){
                    cloneFixAttributes(ele, cloneNode);
                    srcElements = getAll( ele );
                    destElements = getAll( cloneNode );
                    len = srcElements.length;
                    for(var i = 0; i < len; i++){
                        destElements[i] && cloneFixAttributes(srcElements[i], destElements[i]);
                    }
            }
            if(dataAndEvents){
                cloneCopyEvent(ele, cloneNode);
                if(deepDataAndEvents){
                    srcElements = getAll( ele );
                    destElements = getAll( cloneNode );
                    len = srcElements.length;
                    for(var i = 0; i < len; i++){
                    	cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                }
            }
            return cloneNode;
        }
        //
        return function(dataAndEvents, deepDataAndEvents){
            dataAndEvents = !!dataAndEvents;
            deepDataAndEvents = !!deepDataAndEvents;
            return this.map(function(){
                return clone(this, dataAndEvents, deepDataAndEvents);
            });
        }
    }()
});
