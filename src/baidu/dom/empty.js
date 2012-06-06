/**
 * @author linlingyu
 */
///import baidu.dom;
baidu.dom.extend({
    empty: function(){
        var len = this.length,
            item;
        for(var i = 0; i < len; i++){
            //TODO clean data
            item = this[i];
            while(item.firstChild){
                item.removeChild(item.firstChild);
            }
        }
        return this;
    }
});