//Sizzle.isXML
baidu.dom._isXML = function( elem ) {
    // documentElement is verified for cases where it doesn't yet exist
    // (such as loading iframes in IE - #4833)
    var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
    return documentElement ? documentElement.nodeName !== "HTML" : false;
};
