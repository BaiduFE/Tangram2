/**
 * @author linlingyu
 */
///import baidu.dom.filter;
///import baidu.id;
///import baidu.dom._eventBase;

baidu.dom.extend({
    remove: function(){
        function cleanData(array){
            var tangId;
            for(var i = 0, ele; ele = array[i]; i++){
                tangId = baidu.id(ele, 'get');
                if(!tangId){continue;}
                baidu.dom._eventBase.removeAll(ele);
                baidu.id(ele, 'remove');
            }
        }
        //
        return function(selector, keepData){
            var array = selector ? this.filter(selector) : this,
                elements;
            for(var i = 0, ele; ele = array[i]; i++){
                if(!keepData){
                    cleanData(ele.getElementsByTagName('*'));
                    cleanData([ele]);
                }
                ele.parentNode && ele.parentNode.removeChild(ele);
            }
            return this;
        }
    }()
});