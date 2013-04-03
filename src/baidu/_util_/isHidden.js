///import baidu._util_;
///import baidu.dom.getCurrentStyle;
///import baidu._util_.contains;

baidu._util_.isHidden = function(ele){
    return baidu.dom(ele).getCurrentStyle('display') === 'none'
        || !baidu._util_.contains(ele.ownerDocument, ele);
}