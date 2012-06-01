/**
 * @author linlingyu
 */

///import baidu;
///import baidu.dom;
///import baidu.type;
///import baidu.each;

baidu.dom.extend({
    _smartInsert: function(args, callback){
        if(args.length <= 0){return this;}
        var len = args.length,
            fragment = document.createDocumentFragment(),
            div = document.createElement('div');
        document.createDocumentFragment().appendChild(div);
        for(var i = 0; i < len; i++){
            switch(baidu.type(args[i])){
                case 'string':
                    div.innerHTML = args[i];
                    while(div.firstChild){
                        fragment.appendChild(div.firstChild);
                    }
                    break;
                case 'HTMLElement':
                    fragment.appendChild(args[i]);
                    break;
                case '$DOM':
                case 'array':
                    baidu.each(args[i], function(item){
                        fragment.appendChild(item);
                    });
                    break;
                case 'function':
                    baidu.each(this, function(item, index){
                        baidu.dom(item)._smartInsert([args[i].call(item, index, item.innerHTML)], callback);
                    });
                    break;
            }
        }
        //
        baidu.each(this, function(item){callback.call(null, item, fragment.cloneNode(true));});
        return this;
    }
});