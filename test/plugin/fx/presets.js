var frame;
module("baidu.fx.presets", {
    setup: function(){
        if( baidu.dom.appendTo ) {
            frame = baidu('<div id="qunit-fixture">' +
                '<div id="foo">' +
                '<p id="sndp">Everything inside the red border is inside a div with <code>id="foo"</code>.</p>' +
                '<p lang="en" id="en">This is a normal link: <a id="yahoo" href="http://www.yahoo.com/" class="blogTest">Yahoo</a></p>' +
                '<p id="sap">This link has <code><a href="#2" id="anchor2">class="blog"</a></code>: <a href="http://simon.incutio.com/" class="blog link" id="simon">Simon Willison\'s Weblog</a></p>' +
                '</div>' +
                '</div>').appendTo(document.body);
        }
    },
    teardown: function(){
        baidu('#qunit-fixture').remove();
    }
});

test("载入js和css", function(){
    stop();
    ua.loadcss(upath+'fx.css', function(){
        ua.importsrc('baidu.dom.appendTo,baidu.dom.append,baidu.dom.remove,' +
            'baidu.dom.css,baidu.dom.is' +
            ',baidu.each,baidu.dom.find,baidu.dom.css', function(){
            ok(true,'ok');
            start();
        }, "baidu");
    });
});

test("show() basic", function() {
    var div,
        hiddendiv = baidu("<div class=\"hidden\"></div>").appendTo(frame);

    hiddendiv.hide().show();

    equal( hiddendiv.css("display"), "block", "Make sure a pre-hidden div is visible." );

    div = baidu("<div>").hide().appendTo(frame).show();

    equal( div.css("display"), "block", "Make sure pre-hidden divs show" );
});

test("show()", 26, function (undefined) {
    var div,
        css = baidu.dom.css,
        hiddendiv = baidu("<div class=\"hidden\"></div>").appendTo(frame);

    equal(css( hiddendiv[0], "display"), "none", "hiddendiv is display: none");

    hiddendiv.css("display", "block");
    equal(css( hiddendiv[0], "display"), "block", "hiddendiv is display: block");

    hiddendiv.show();
    equal(css( hiddendiv[0], "display"), "block", "hiddendiv is display: block");

    hiddendiv.css("display","");

    div = baidu("<div>fjdkalfjdkalfejkfda</div><div>fjajfekljkfdla</div><div>div3fjfdalf dja</div>").appendTo(frame);
    div.show().each(function() {
        notEqual(this.style.display, "none", "don't change any <div> with display block");
    });

    var speeds = {
        "null speed": null,
        "undefined speed": undefined,
        "false speed": false
    };

    baidu.each(speeds, function(name, speed) {
        var pass = true;
        div.hide().show(speed).each(function() {
            if ( this.style.display == "none" ) {
                pass = false;
            }
        });
        ok( pass, "Show with " + name);
    });

    baidu.each(speeds, function(name, speed) {
        var pass = true;
        div.hide().show(speed, function() {
            pass = false;
        });
        ok( pass, "Show with " + name + " does not call animate callback" );
    });

    // Tolerate data from show()/hide()
    //QUnit.expectJqData(div, "olddisplay");


    // #show-tests * is set display: none in CSS
    baidu("#qunit-fixture").append("<div id='show-tests'><div><p><a href='#'></a></p><code></code><pre></pre><span></span></div><table><thead><tr><th></th></tr></thead><tbody><tr><td></td></tr></tbody></table><ul><li></li></ul></div><table id='test-table'></table>");

    var old = baidu("#test-table").show().css("display") !== "table";
    baidu("#test-table").remove();

    var test = {
        "div"      : "block",
        "p"        : "block",
        "a"        : "inline",
        "code"     : "inline",
        "pre"      : "block",
        "span"     : "inline",
        "table"    : old ? "block" : "table",
        "thead"    : old ? "block" : "table-header-group",
        "tbody"    : old ? "block" : "table-row-group",
        "tr"       : old ? "block" : "table-row",
        "th"       : old ? "block" : "table-cell",
        "td"       : old ? "block" : "table-cell",
        "ul"       : "block",
        "li"       : old ? "block" : "list-item"
    };

    baidu.each(test, function(selector, expected) {
        var elem = jQuery(selector, "#show-tests").show();
        equal( elem.css("display"), expected, "Show using correct display type for " + selector );
    });

    baidu("#show-tests").remove();

    // Make sure that showing or hiding a text node doesn't cause an error
    baidu("<div>test</div> text <span>test</span>").show().remove();
    baidu("<div>test</div> text <span>test</span>").hide().remove();
});

test("show(Number) - other displays", function() {
    expect(15);
    stop();

    // #show-tests * is set display: none in CSS
    baidu("#qunit-fixture").append("<div id='show-tests'><div><p><a href='#'></a></p><code></code><pre></pre><span></span></div><table><thead><tr><th></th></tr></thead><tbody><tr><td></td></tr></tbody></table><ul><li></li></ul></div><table id='test-table'></table>");

    var old = baidu("#test-table").show().css("display") !== "table",
        num = 0;
    baidu("#test-table").remove();

    var test = {
        "div"      : "block",
        "p"        : "block",
        "a"        : "inline",
        "code"     : "inline",
        "pre"      : "block",
        "span"     : "inline",
        "table"    : old ? "block" : "table",
        "thead"    : old ? "block" : "table-header-group",
        "tbody"    : old ? "block" : "table-row-group",
        "tr"       : old ? "block" : "table-row",
        "th"       : old ? "block" : "table-cell",
        "td"       : old ? "block" : "table-cell",
        "ul"       : "block",
        "li"       : old ? "block" : "list-item"
    };

    baidu.each(test, function(selector, expected) {
        var elem = baidu("#show-tests").find(selector).show(1000, function() {
            equal( elem.css("display"), expected, "Show using correct display type for " + selector );
            if ( ++num === 15 ) {
                start();
            }
        });
    });

    baidu("#show-tests").remove();
});


// Supports #7397
test("Persist correct display value", function() {
    expect(3);
    stop();

    // #show-tests * is set display: none in CSS
    baidu("#qunit-fixture").append("<div id='show-tests'><span style='position:absolute;'>foo</span></div>");

    var $span = baidu("#show-tests span"),
        displayNone = $span.css("display"),
        display = "", num = 0;

    $span.show();

    display = $span.css("display");

    $span.hide();

    $span.fadeIn(100, function() {
        equal($span.css("display"), display, "Expecting display: " + display);
        $span.fadeOut(100, function () {
            equal($span.css("display"), displayNone, "Expecting display: " + displayNone);
            $span.fadeIn(100, function() {
                equal($span.css("display"), display, "Expecting display: " + display);
                start();
            });
        });
    });

});
