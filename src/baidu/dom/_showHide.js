/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.each;
///import baidu.dom.contains;
///import baidu.dom.getCurrentStyle;
///import baidu.support;
///import baidu.dom.css;

(function(baidu){
    baidu.dom.extend({
        show:function(){
            return showHide( this, true );
        },
        hide:function(){
            return showHide( this );
        }
    });


    // NOTE: To any future maintainer, we've used both window.getComputedStyle
    // and getComputedStyle here to produce a better gzip size
    var curCSS,
        rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        rposition = /^(top|right|bottom|left)$/,
        rmargin = /^margin/;

    if ( window.getComputedStyle ) {
        curCSS = function( elem, name ) {
            var ret, width,
                computed = getComputedStyle( elem, null ),
                style = elem.style;

            if ( computed ) {

                ret = computed[ name ];
                if ( ret === "" && !baidu.dom.contains( elem.ownerDocument.documentElement, elem ) ) {
                    ret = baidu.dom( elem ).getCurrentStyle( name );
                }

                // A tribute to the "awesome hack by Dean Edwards"
                // WebKit uses "computed value (percentage if specified)" instead of "used value" for margins
                // which is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
                if ( !baidu.support.pixelMargin && rmargin.test( name ) && rnumnonpx.test( ret ) ) {
                    width = style.width;
                    style.width = ret;
                    ret = computed.width;
                    style.width = width;
                }
            }

            return ret;
        };
    } else if ( document.documentElement.currentStyle ) {
        curCSS = function( elem, name ) {
            var left, rsLeft,
                ret = elem.currentStyle && elem.currentStyle[ name ],
                style = elem.style;

            // Avoid setting ret to empty string here
            // so we don't default to auto
            if ( ret == null && style && style[ name ] ) {
                ret = style[ name ];
            }

            // From the awesome hack by Dean Edwards
            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels
            // but not position css attributes, as those are proportional to the parent element instead
            // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
            if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

                // Remember the original values
                left = style.left;
                rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

                // Put in the new values to get a computed value out
                if ( rsLeft ) {
                    elem.runtimeStyle.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";

                // Revert the changed values
                style.left = left;
                if ( rsLeft ) {
                    elem.runtimeStyle.left = rsLeft;
                }
            }

            return ret === "" ? "auto" : ret;
        };
    };

    var elemdisplay = {},
        iframeDoc;
    // Try to determine the default display value of an element
    function css_defaultDisplay( nodeName ) {
        if ( elemdisplay[ nodeName ] ) {
            return elemdisplay[ nodeName ];
        }

        var elem = baidu( "<" + nodeName + ">" ).appendTo( document.body ),
            display = elem.css("display");
        elem.remove();

        // If the simple way fails,
        // get element's real default display by attaching it to a temp iframe
        if ( display === "none" || display === "" ) {
            // Use the already-created iframe if possible
            iframe = document.body.appendChild(
                iframe || baidu.extend( document.createElement("iframe"), {
                    frameBorder: 0,
                    width: 0,
                    height: 0
                })
            );

            // Create a cacheable copy of the iframe document on first call.
            // IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
            // document to it; WebKit & Firefox won't allow reusing the iframe document.
            if ( !iframeDoc || !iframe.createElement ) {
                iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
                iframeDoc.write("<!doctype html><html><body>");
                iframeDoc.close();
            }

            elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

            display = curCSS( elem, "display" );
            document.body.removeChild( iframe );
        }

        // Store the correct default display
        elemdisplay[ nodeName ] = display;

        return display;
    };

    function showHide( elements, show ) {
        var elem, display,
            values = [],
            index = 0,
            length = elements.length;

        for ( ; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }
            values[ index ] = jQuery._data( elem, "olddisplay" );
            if ( show ) {
                // Reset the inline display of this element to learn if it is
                // being hidden by cascaded rules or not
                if ( !values[ index ] && elem.style.display === "none" ) {
                    elem.style.display = "";
                }

                // Set elements which have been overridden with display: none
                // in a stylesheet to whatever the default browser style is
                // for such an element
                if ( (elem.style.display === "" && curCSS( elem, "display" ) === "none") ||
                    !baidu.dom.contains( elem.ownerDocument.documentElement, elem ) ) {
                    values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
                }
            } else {
                display = curCSS( elem, "display" );

                if ( !values[ index ] && display !== "none" ) {
                    jQuery._data( elem, "olddisplay", display );
                }
            }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for ( index = 0; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }
            if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
                elem.style.display = show ? values[ index ] || "" : "none";
            }
        }

        return elements;
    };

})(baidu);

