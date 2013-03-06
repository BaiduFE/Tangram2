//Sizzle.isXML
///import baidu.dom;
baidu.dom._isXML = function(ele) {
    var docElem = (ele ? ele.ownerDocument || ele : 0).documentElement;
    return docElem ? docElem.nodeName !== 'HTML' : false;
};
