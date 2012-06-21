/**
 * @author linlingyu
 */

///import baidu.dom.map;

baidu.dom.extend({
    clone: function(){
        function clone(ele, dataAndEvents, deepDataAndEvents){
            // TODO
            var cloneNode = ele.cloneNode(true);
            
            
            return cloneNode;
        }
        function isXMLDoc(ele){
            
        }
        
        
        
        
        
        return function(dataAndEvents, deepDataAndEvents){
            dataAndEvents = !!dataAndEvents;
            deepDataAndEvents = !!deepDataAndEvents;
            return this.map(function(){
                return clone(this, dataAndEvents, deepDataAndEvents);
            });
        }
    }()
});