/**
 * @author linlingyu
 */
///import baidu;
///import baidu.dom;
///import baidu.type;
///import baidu.each;
baidu.dom.extend({
    _smartInsertTo: function(target, callback){
        if(!target){return this;}
        var fragment = document.createDocumentFragment(),
            div;
        baidu.each(this, function(item){fragment.appendChild(item)});
        switch(baidu.type(target)){
            case 'string':
                if(target.charAt(0) === '<'
                    && target.charAt(target.length - 1) === '>'
                    && target.length > 2){//string
                    
                    div = document.createElement('div');
                    document.createDocumentFragment().appendChild(div);
                    div.innerHTML = target;
                    while(div.firstChild){
                        callback.call(null, div.firstChild, fragment.cloneNode(true));
                    }
                }else{//selector
                    this._smartInsertTo(baidu.dom(target), callback);
                }
                break;
            case 'HTMLElement':
                callback.call(null, target, fragment);
                break;
            case '$DOM':                baidu.each(target, function(item){
                    callback.call(null, item, fragment.cloneNode(true));
                });
                break;
        }
        return this;
    }
});