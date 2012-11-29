///import baidu._util_;
baidu._util_.contains = document.compareDocumentPosition ?
    function(container, contained){
        return !!(container.compareDocumentPosition( contained ) & 16);
    } : document.contains ? function(container, contained){
        return container != contained
            && (container.contains ? container.contains( contained ) : false)
    } : function(container, contained){
        while(contained = contained.parentNode){
            if(contained === container){return true;}
        }
        return false;
    };