/**
 * @author linlingyu
 */
///import baidu.each;
///import baidu.dom;
///import baidu.browser.isStrict;

baidu.dom._getWindowOrDocumentWidthOrHeight = baidu.dom._getWindowOrDocumentWidthOrHeight || (function(){
    var ret = {'window': {}, 'document': {}};
    baidu.each(['Width', 'Height'], function(item){
        var clientProp = 'client' + item,
            offsetProp = 'offset' + item,
            scrollProp = 'scroll' + item;
        ret['window']['get' + item] = function(ele){
            var doc = ele.document,
                rectValue = doc.documentElement[clientProp];
            return baidu.browser.isStrict && rectValue
                || doc.body && doc.body[clientProp] || rectValue;
        };
        ret['document']['get' + item] = function(ele){
            var doc = ele.documentElement;
            return doc[clientProp] >= doc[scrollProp] ? doc[clientProp]
                : Math.max(ele.body[scrollProp], doc[scrollProp], ele.body[offsetProp], doc[offsetProp]);
        }
    });
    return function(ele, type, key){
        return ret[type][key === 'width' ? 'getWidth' : 'getHeight'](ele);
    }
})();