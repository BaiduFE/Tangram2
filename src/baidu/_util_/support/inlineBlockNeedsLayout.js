///import baidu._util_.support;
///import baidu.dom.ready;
(function(support){
    var div = document.createElement("div");

    support.inlineBlockNeedsLayout = false;
    support.shrinkWrapBlocks = false;

    baidu(document).ready(function(){
        var body = document.body,
            container = document.createElement("div");
        container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

        body.appendChild( container ).appendChild( div );

        if ( typeof div.style.zoom !== "undefined" ) {
            div.style.cssText = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;width:1px;padding:1px;display:inline;zoom:1";
            support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

            // Support: IE6
            // Check if elements with layout shrink-wrap their children
            div.style.display = "block";
            div.innerHTML = "<div></div>";
            div.firstChild.style.width = "5px";
            support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );
        }

        body.removeChild( container );
        container = div = body = null;
    });
})(baidu._util_.support);