/**
 * @author linlingyu
 */
///import baidu._util_;
baidu._util_.support = baidu._util_.support || function(){
    var div = document.createElement('div'),
        baseSupport, a, input, select, opt;
    div.setAttribute('className', 't');
    div.innerHTML = ' <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
    a = div.getElementsByTagName('A')[0];
    a.style.cssText = 'top:1px;float:left;opacity:.5';
    select = document.createElement('select');
    opt = select.appendChild(document.createElement('option'));
    input = div.getElementsByTagName('input')[0];
    input.checked = true;
    
    baseSupport = {
        dom: {
            div: div,
            a: a,
            select: select,
            opt: opt,
            input: input
        }
//        radioValue: only import by baidu._util.attr
//        hrefNormalized: only import by baidu._util.attr
//        style: only import by baidu._util.attr
//        optDisabled: only import by baidu.dom.val
//        checkOn: only import by baidu.dom.val
//        noCloneEvent: only import by baidu.dom.clone
//        noCloneChecked: only import by baidu.dom.clone
//        cssFloat: only import baidu.dom.styleFixer
//        htmlSerialize: only import baidu.dom.html
//        leadingWhitespace: only import baidu.dom.html
    };
    return baseSupport;
}();