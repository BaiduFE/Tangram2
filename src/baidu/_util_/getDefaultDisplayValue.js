///import baidu._util_;
///import baidu.dom.getCurrentStyle;
baidu._util_.getDefaultDisplayValue = function(){
    var valMap = {};
    return function(tagName){
        if(valMap[tagName]){return valMap[tagName];}
        var ele = document.createElement(tagName),
            val, frame, ownDoc;
        document.body.appendChild(ele);
        val = baidu.dom(ele).getCurrentStyle('display');
        document.body.removeChild(ele);
        if(val === '' || val === 'none'){
            frame = document.body.appendChild(document.createElement('iframe'));
            frame.frameBorder =
            frame.width =
            frame.height = 0;
            ownDoc = (frame.contentWindow || frame.contentDocument).document;
            ownDoc.writeln('<!DOCTYPE html><html><body>');
            ownDoc.close();
            ele = ownDoc.appendChild(ownDoc.createElement(tagName));
            val = baidu.dom(ele).getCurrentStyle('display');
            document.body.removeChild(frame);
            frame = null;
        }
        ele = null;
        return valMap[tagName] = val;
    }
};