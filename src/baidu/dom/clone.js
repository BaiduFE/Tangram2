/**
 * @author linlingyu
 */

///import baidu.dom.map;
///import baidu.support;
///import baidu.id;
///import baidu.dom._eventBase;

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
            if(dest[baidu.id.key]){
                delete dest[baidu.id.key];//?
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
