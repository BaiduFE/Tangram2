/**
 * @author linlingyu
 */
///import baidu;
///import baidu.dom;
///import baidu.type;
///import baidu.each;
 
baidu.dom.extend({
    appendTo: function(target){
        if(!target){return this;}
        var type = baidu.type(target),
            fragment = document.createDocumentFragment(),
            div;
        baidu.each(this, function(item){
            fragment.appendChild(item);
        });
        //
        switch(type){
            case 'string':
                if(target.charAt(0) === '<'
                    && target.charAt(target.length - 1) === '>'
                    && target.length > 2){//string
                    div = document.createElement('div');
                    document.createDocumentFragment().appendChild(div);
                    div.innerHTML = target;
                    baidu.each(div.childNodes, function(item){
                        item.appendChild(fragment.cloneNode(true));
                    });
                }else{//selector
                    this.appendTo(baidu.dom(target));
                }
                break;
            case 'HTMLElement':
                target.appendChild(fragment);
                break;
            case '$DOM':
                baidu.each(target, function(item){
                    item.appendChild(fragment.cloneNode(true));
                });
            break;
        }
        return this;
    }
});