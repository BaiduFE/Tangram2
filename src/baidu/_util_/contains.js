///import baidu._util_;
baidu._util_.contains = document.compareDocumentPosition ?
    function(container, contained){
        return !!(container.compareDocumentPosition( contained ) & 16);
    } : function(container, contained){
        if(container === contained){return false;}
        if(container.contains && contained.contains){
            return container.contains(contained);
        }else{
            while(contained = contained.parentNode){
                if(contained === container){return true;}
            }
            return false;
        }
    };