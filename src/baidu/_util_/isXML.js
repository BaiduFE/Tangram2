//Sizzle.isXML
///import baidu._util_;
baidu._util_.isXML = function(ele) {
    var docElem = (ele ? ele.ownerDocument || ele : 0).documentElement;
    return docElem ? docElem.nodeName !== 'HTML' : false;
};
