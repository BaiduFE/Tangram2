/**
 * @author linlingyu
 */

///import baidu.dom.map;
///import baidu.support;
///import baidu.id;
///import baidu.dom._eventBase;
/**
 * @description 对匹配元素进行深度克隆
 * @function 
 * @name baidu.dom().clone()
 * @grammar baidu.dom(args).clone([withDataAndEvents][,deepWithDataAndEvents])
 * @param {Boolean} withDataAndEvents 一个可选的布尔值参数，当参数为true时，表示当次克隆需要将该匹配元素的数据和事件也做克隆
 * @param {Boolean} deepWithDataAndEvents 一个可选的布尔值参数，当参数为true时，表示当次克隆需要将该匹配元素的所有子元素的数据和事件也做克隆
 * @return {TangramDom} 接口最终返回一个TangramDom对象，该对象包装了克隆的节点
 */
baidu.dom.extend({
    clone: function(){
        var event = baidu.dom._eventBase;
        //
        function getAll(ele){
            var query = ele.getElementsByTagName || ele.querySelectorAll;
            return query ? query('*') : [];
        }
        //
        function isXMLDoc(ele){
            var docElement = (ele ? ele.ownerDocument || ele : 0).documentElement;
            return docElement ? docElement.nodeName !== 'HTML' : false;
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
            if(dest[baidu.key]){
                delete dest[baidu.key];//?
            }
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
                && (ele.nodeType === 1 || ele.nodeType === 11) && !isXMLDoc(ele)){
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
                	srcElements = getAll( elem );
                    destElements = getAll( clone );
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
