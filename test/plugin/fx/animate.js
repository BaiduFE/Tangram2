var frame;
module("baidu.fx.animate", {
    setup: function(){
        if( baidu.dom.appendTo ) {
            frame = baidu('<div id="qunit-fixture">'+
                '<div id="foo">'+
                '<p id="sndp">Everything inside the red border is inside a div with <code>id="foo"</code>.</p>'+
                '<p lang="en" id="en">This is a normal link: <a id="yahoo" href="http://www.yahoo.com/" class="blogTest">Yahoo</a></p>'+
                '<p id="sap">This link has <code><a href="#2" id="anchor2">class="blog"</a></code>: <a href="http://simon.incutio.com/" class="blog link" id="simon">Simon Willison\'s Weblog</a></p>'+
                '</div>'+
                '<table id="table"></table>'+
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
        ua.importsrc('baidu.dom.appendTo,baidu.dom.append,baidu.dom.children'+
            ',baidu.dom.width,baidu.dom.height,baidu.dom.remove,baidu.dom.css'+
            ',baidu.dom.attr,baidu.dom.eq,plugin.fx.presets,plugin.fx.stop'+
            ',baidu.when,baidu.dom.add'+
            ',baidu.each,baidu.dom.find,baidu.dom.css', function(){
            ok(true,'ok');
            start();
        }, "baidu");
    });
});

test("animate(Hash, Object, Function)", function() {
    expect(1);
    stop();
    var hash = {opacity: "show"};
    var hashCopy = baidu.extend({}, hash);
    baidu('#foo').animate(hash, 0, function() {
        equal( hash.opacity, hashCopy.opacity, "Check if animate changed the hash parameter" );
        start();
    });
});

//@todo 等待css设置height的时候支持设置负值的时候再测试
/*test("animate negative height", function() {
    expect(1);
    stop();
    var foo = baidu('<div id="foo">'+
        '<p id="sndp">Everything inside the red border is inside a div with <code>id="foo"</code>.</p>'+
        '<p lang="en" id="en">This is a normal link: <a id="yahoo" href="http://www.yahoo.com/" class="blogTest">Yahoo</a></p>'+
        '<p id="sap">This link has <code><a href="#2" id="anchor2">class="blog"</a></code>: <a href="http://simon.incutio.com/" class="blog link" id="simon">Simon Willison\'s Weblog</a></p>'+
        '</div>').appendTo(frame);

    foo.animate({ height: -100 }, 100, function() {
        equal( this.offsetHeight, 0, "Verify height." );
        debugger;
        start();
    });
});*/

test("animate negative margin", function() {
    expect(1);
    stop();
    baidu("#foo").animate({ "marginTop": -100 }, 100, function() {
        equal( baidu(this).css("marginTop"), "-100px", "Verify margin." );
        start();
    });
});

test("animate negative margin with px", function() {
    expect(1);
    stop();
    baidu("#foo").animate({ marginTop: "-100px" }, 100, function() {
        equal( baidu(this).css("marginTop"), "-100px", "Verify margin." );
        start();
    });
});

test("animate negative padding", function() {
    expect(1);
    stop();
    baidu("#foo").animate({ "paddingBottom": -100 }, 100, function() {
        equal( baidu(this).css("paddingBottom"), "0px", "Verify paddingBottom." );
        start();
    });
});

test("animate block as inline width/height", function() {
    expect(3);

    var span = baidu("<span>").css("display", "inline-block").appendTo("body"),
        expected = span.css("display");

    span.remove();

    if ( expected === "inline-block" ) {
        stop();

        baidu("#foo").css({ display: "inline", width: "", height: "" }).animate({ width: 42, height: 42 }, 100, function() {
            equal( baidu(this).css("display"), "inline-block", "inline-block was set on non-floated inline element when animating width/height" );
            equal( this.offsetWidth, 42, "width was animated" );
            equal( this.offsetHeight, 42, "height was animated" );
            start();
        });

        // Browser doesn't support inline-block
    } else {
        ok( true, "Browser doesn't support inline-block" );
        ok( true, "Browser doesn't support inline-block" );
        ok( true, "Browser doesn't support inline-block" );
    }
});

test("animate native inline width/height", function() {
    expect(3);

    var span = baidu("<span>").css("display", "inline-block").appendTo("body"),
        expected = span.css("display");

    span.remove();

    if ( expected === "inline-block" ) {
        stop();
        baidu("#foo").css({ display: "", width: "", height: "" })
            .append("<span>text</span>")
            .children("span")
            .animate({ width: 42, height: 42 }, 100, function() {
                equal( baidu(this).css("display"), "inline-block", "inline-block was set on non-floated inline element when animating width/height" );
                equal( this.offsetWidth, 42, "width was animated" );
                equal( this.offsetHeight, 42, "height was animated" );
                start();
            });

        // Browser doesn't support inline-block
    } else {
        ok( true, "Browser doesn't support inline-block" );
        ok( true, "Browser doesn't support inline-block" );
        ok( true, "Browser doesn't support inline-block" );
    }
});

test( "animate block width/height", function() {
    expect( 3 );
    stop();

    baidu("<div>").appendTo("#qunit-fixture").css({
        display: "block",
        width: 20,
        height: 20,
        paddingLeft: 60
    }).animate({
            width: 42,
            height: 42
        }, {
            duration: 100,
            step: function() {
                if ( baidu( this ).width() > 42 ) {
                    ok( false, "width was incorrectly augmented during animation" );
                }
            },
            complete: function() {
                equal( baidu( this ).css("display"), "block", "inline-block was not set on block element when animating width/height" );
                equal( baidu( this ).width(), 42, "width was animated" );
                equal( baidu( this ).height(), 42, "height was animated" );
                start();
            }
        });
});

test("animate table width/height", function() {
    expect(1);
    stop();

    var displayMode = baidu("#table").css("display") !== "table" ? "block" : "table";

    baidu("#table").animate({ width: 42, height: 42 }, 100, function() {
        equal( baidu(this).css("display"), displayMode, "display mode is correct" );
        start();
    });
});

test("animate table-row width/height", function() {
    expect(3);
    stop();
    var tr = baidu("#table")
        .attr({ "cellspacing": 0, "cellpadding": 0, "border": 0 })
        .html("<tr style='height:42px;'><td style='padding:0;'><div style='width:20px;height:20px;'></div></td></tr>")
        .find("tr");

    // IE<8 uses "block" instead of the correct display type
    var displayMode = tr.css("display") !== "table-row" ? "block" : "table-row";

    tr.animate({ width: 10, height: 10 }, 100, function() {
        equal( baidu(this).css("display"), displayMode, "display mode is correct" );
        equal( this.offsetWidth, 20, "width animated to shrink wrap point" );
        equal( this.offsetHeight, 20, "height animated to shrink wrap point" );
        start();
    });
});

test("animate table-cell width/height", function() {
    expect(3);
    stop();
    var td = baidu("#table")
        .attr({ "cellspacing": 0, "cellpadding": 0, "border": 0 })
        .html("<tr><td style='width:42px;height:42px;padding:0;'><div style='width:20px;height:20px;'></div></td></tr>")
        .find("td");

    // IE<8 uses "block" instead of the correct display type
    var displayMode = td.css("display") !== "table-cell" ? "block" : "table-cell";

    td.animate({ width: 10, height: 10 }, 100, function() {
        equal( baidu(this).css("display"), displayMode, "display mode is correct" );
        equal( this.offsetWidth, 20, "width animated to shrink wrap point" );
        equal( this.offsetHeight, 20, "height animated to shrink wrap point" );
        start();
    });
});

test("animate percentage(%) on width/height", function() {
    expect( 2 );

    var $div = baidu("<div style='position:absolute;top:-999px;left:-999px;width:60px;height:60px;'><div style='width:50%;height:50%;'></div></div>")
        .appendTo("#qunit-fixture").children("div");

    stop();
    $div.animate({ width: "25%", height: "25%" }, 13, function() {
        var $this = baidu(this);
        equal( $this.css("width"), "15px", "Width was animated to 15px rather than 25px");
        equal( $this.css("height"), "15px", "Height was animated to 15px rather than 25px");
        start();
    });
});

test("animate resets overflow-x and overflow-y when finished", function() {
    expect(2);
    stop();
    baidu("#foo")
        .css({ display: "block", width: 20, height: 20, overflowX: "visible", overflowY: "auto" })
        .animate({ width: 42, height: 42 }, 100, function() {
            equal( this.style.overflowX, "visible", "overflow-x is visible" );
            equal( this.style.overflowY, "auto", "overflow-y is auto" );
            start();
        });
});

/*test("animate option (queue === false)", function () {
    expect(1);
    stop();

    var order = [];

    var $foo = baidu("#foo");
    $foo.animate({width:"100px"}, 3000, function () {
        // should finish after unqueued animation so second
        order.push(2);
        deepEqual( order, [ 1, 2 ], "Animations finished in the correct order" );
        start();
    });
    $foo.animate({fontSize:"2em"}, {queue:false, duration:10, complete:function () {
        // short duration and out of queue so should finish first
        order.push(1);
    }});
});*/

asyncTest( "animate option { queue: false }", function() {
    expect( 2 );
    var foo = baidu( "#foo" );

    foo.animate({
        fontSize: "2em"
    }, {
        queue: false,
        duration: 10,
        complete: function() {
            ok( true, "Animation Completed" );
            start();
        }
    });

    equal( foo.queue().length, 0, "Queue is empty" );
});

asyncTest( "animate option { queue: true }", function() {
    expect( 2 );
    var foo = baidu( "#foo" );

    foo.animate({
        fontSize: "2em"
    }, {
        queue: true,
        duration: 10,
        complete: function() {
            ok( true, "Animation Completed" );
            start();
        }
    });

    notEqual( foo.queue().length, 0, "Default queue is not empty" );
});

asyncTest( "animate option { queue: 'name' }", function() {
    expect( 5 );
    var foo = baidu( "#foo" ),
        origWidth = parseFloat( foo.css("width") ),
        order = [];

    foo.animate( { width: origWidth + 100 }, {
        queue: "name",
        duration: 1,
        complete: function() {

            // second callback function
            order.push( 2 );
            equal( parseFloat( foo.css("width") ), origWidth + 100, "Animation ended" );
            equal( foo.queue("name").length, 1, "Queue length of 'name' queue" );
        }
    }).queue( "name", function( next ) {

            // last callback function
            deepEqual( order, [ 1, 2 ], "Callbacks in expected order" );
            start();
        });

    setTimeout( function() {

        // this is the first callback function that should be called
        order.push( 1 );
        equal( parseFloat( foo.css("width") ), origWidth, "Animation does not start on its own." );
        equal( foo.queue("name").length, 2, "Queue length of 'name' queue" );
        foo.dequeue( "name" );
    }, 100 );

});

test("animate with no properties", function() {
    expect(2);

    var divs = baidu("div"), count = 0;

    divs.animate({}, function(){
        count++;
    });

    equal( divs.length, count, "Make sure that callback is called for each element in the set." );

    stop();

    var foo = baidu("#foo");

    foo.animate({});
    foo.animate({top: 10}, 100, function(){
        ok( true, "Animation was properly dequeued." );
        start();
    });
});

test("animate duration 0", function() {
    expect(2);

    stop();

    /*var $elems = baidu([{ a:0 },{ a:0 }]), counter = 0;

    equal( baidu.fx.timer().length, 0, "Make sure no animation was running from another test" );

    $elems.eq(0).animate( {a:1}, 0, function(){
        ok( true, "Animate a simple property." );
        counter++;
    });

    // Failed until [6115]
    equal( baidu.fx.timer().length, 0, "Make sure synchronic animations are not left on jQuery.timers" );

    equal( counter, 1, "One synchronic animations" );

    $elems.animate( { a:2 }, 0, function(){
        ok( true, "Animate a second simple property." );
        counter++;
    });

    equal( counter, 3, "Multiple synchronic animations" );

    $elems.eq(0).animate( {a:3}, 0, function(){
        ok( true, "Animate a third simple property." );
        counter++;
    });
    $elems.eq(1).animate( {a:3}, 200, function(){
        counter++;
        // Failed until [6115]
        equal( counter, 5, "One synchronic and one asynchronic" );
        start();
    });*/

    var $elem = baidu("<div></div>");
    $elem.animate({width: 100},0, function(){
        ok(true, "Show callback with no duration");
    });
    $elem.animate({width: 0},0, function(){
        ok(true, "Hide callback with no duration");
        start();
    });

    // manually clean up detached elements
    $elem.remove();
});

test("animate hyphenated properties", function() {
    expect(1);
    stop();

    baidu("#foo")
        .css("font-size", 10)
        .animate({"font-size": 20}, 200, function() {
            equal( this.style.fontSize, "20px", "The font-size property was animated." );
            start();
        });
});

//@todo 不支持non-element
/*test("animate non-element", function() {
    expect(1);
    stop();

    var obj = { test: 0 };

    baidu(obj).animate({test: 200}, 200, function(){
        equal( obj.test, 200, "The custom property should be modified." );
        start();
    });
});*/


test("animate with per-property easing", function(){

    expect(5);
    stop();

    var data = baidu('<div></div>'),
        _test1_called = false,
        _test2_called = false,
        _default_test_called = false,
        props = {
            a: [ 100, "_test1" ],
            b: [ 100, "_test2" ],
            c: 100
        };
    baidu.extend(data[0], {
        a: 0,
        b: 0,
        c: 0
    });

    baidu.fx.easing["_test1"] = function(p) {
        _test1_called = true;
        return p;
    };

    baidu.fx.easing["_test2"] = function(p) {
        _test2_called = true;
        return p;
    };

    baidu.fx.easing["_default_test"] = function(p) {
        _default_test_called = true;
        return p;
    };

    data.animate( props, 400, "_default_test", function(){
        start();

        ok( _test1_called, "Easing function (_test1) called" );
        ok( _test2_called, "Easing function (_test2) called" );
        ok( _default_test_called, "Easing function (_default) called" );
        equal( props.a[ 1 ], "_test1", "animate does not change original props (per-property easing would be lost)");
        equal( props.b[ 1 ], "_test2", "animate does not change original props (per-property easing would be lost)");
    });

});

test("animate with CSS shorthand properties", function(){
    expect(11);
    stop();

    var _default_count = 0,
        _special_count = 0,
        propsBasic = { "padding": "10 20 30" },
        propsSpecial = { "padding": [ "1 2 3", "_special" ] };

    baidu.fx.easing._default = function(p) {
        if ( p >= 1 ) {
            _default_count++;
        }
        return p;
    };

    baidu.fx.easing._special = function(p) {
        if ( p >= 1 ) {
            _special_count++;
        }
        return p;
    };

    baidu("#foo")
        .animate( propsBasic, 200, "_default", function() {
            equal( this.style.paddingTop, "10px", "padding-top was animated" );
            equal( this.style.paddingLeft, "20px", "padding-left was animated" );
            equal( this.style.paddingRight, "20px", "padding-right was animated" );
            equal( this.style.paddingBottom, "30px", "padding-bottom was animated" );
            equal( _default_count, 4, "per-animation default easing called for each property" );
            _default_count = 0;
        })
        .animate( propsSpecial, 200, "_default", function() {
            equal( this.style.paddingTop, "1px", "padding-top was animated again" );
            equal( this.style.paddingLeft, "2px", "padding-left was animated again" );
            equal( this.style.paddingRight, "2px", "padding-right was animated again" );
            equal( this.style.paddingBottom, "3px", "padding-bottom was animated again" );
            equal( _default_count, 0, "per-animation default easing not called" );
            equal( _special_count, 4, "special easing called for each property" );

            baidu(this).css("padding", "0");
            delete baidu.fx.easing._default;
            delete baidu.fx.easing._special;
            start();
        });
});

test("hide hidden elements, with animation (bug #7141)", function() {
    expect(2);
    stop();

    var div = baidu("<div style='display:none'></div>").appendTo("#qunit-fixture");
    equal( div.css("display"), "none", "Element is hidden by default" );
    div.hide(1, function () {
        div.show(1, function () {
            equal( div.css("display"), "block", "Show a double-hidden element" );
            start();
        });
    });
});

test("animate unit-less properties (#4966)", 2, function() {
    stop();
    var div = baidu( "<div style='z-index: 0; position: absolute;'></div>" ).appendTo( "#qunit-fixture" );
    equal( div.css( "z-index" ), "0", "z-index is 0" );
    div.animate({ zIndex: 2 }, function() {
        equal( div.css( "z-index" ), "2", "z-index is 2" );
        start();
    });
});

test( "animate properties missing px w/ opacity as last (#9074)", 2, function() {
    expect( 6 );
    stop();
    var div = baidu( "<div style='position: absolute; margin-left: 0; left: 0px;'></div>" )
        .appendTo( "#qunit-fixture" );
    function cssInt( prop ) {
        return parseInt( div.css( prop ), 10 );
    }
    equal( cssInt( "marginLeft" ), 0, "Margin left is 0" );
    equal( cssInt( "left" ), 0, "Left is 0" );
    div.animate({
        left: 200,
        marginLeft: 200,
        opacity: 0
    }, 2000);
    setTimeout(function() {
        var ml = cssInt( "marginLeft" ),
            l = cssInt( "left" );
        notEqual( ml, 0, "Margin left is not 0 after partial animate" );
        notEqual( ml, 200, "Margin left is not 200 after partial animate" );
        notEqual( l, 0, "Left is not 0 after partial animate" );
        notEqual( l, 200, "Left is not 200 after partial animate" );
        div.stop().remove();
        start();
    }, 500);
});

test("callbacks should fire in correct order (#9100)", function() {
    expect( 1 );

    stop();
    var a = 1,
        cb = 0,
        $lis = baidu("<p data-operation='*2'></p><p data-operation='^2'></p>").appendTo("#qunit-fixture")
            // The test will always pass if no properties are animated or if the duration is 0
            .animate({fontSize: 12}, 13, function() {
                a *= baidu(this).data("operation") === "*2" ? 2 : a;
                cb++;
                if ( cb === 2 ) {
                    equal( a, 4, "test value has been *2 and _then_ ^2");
                    start();
                }
            });
});

test("animate will scale margin properties individually", function() {
    expect( 2 );
    stop();

    var foo = baidu( "#foo" ).css({
        "margin": 0,
        "marginLeft": 100
    });

    ok( foo.css( "marginLeft" ) !== foo.css( "marginRight" ), "Sanity Check" );

    foo.animate({
        "margin": 200
    }).stop();

    ok( foo.css( "marginLeft") !== foo.css( "marginRight" ), "The margin properties are different");

    // clean up for next test
    foo.css({
        "marginLeft": "",
        "marginRight": "",
        "marginTop": "",
        "marginBottom": ""
    });
    start();
});

test("Do not append px to 'fill-opacity' #9548", 1, function() {
    var $div = baidu("<div>").appendTo("#qunit-fixture");

    $div.css("fill-opacity", 0).animate({ "fill-opacity": 1.0 }, 0, function () {
        equal( baidu(this).css("fill-opacity"), 1, "Do not append px to 'fill-opacity'");
        $div.remove();
    });
});


asyncTest( "Animate Option: step: function( percent, tween )", 1, function() {
    var counter = {};
    baidu( "#foo" ).animate({
        prop1: 1,
        prop2: 2,
        prop3: 3
    }, {
        duration: 1,
        step: function( value, tween ) {
            var calls = counter[ tween.prop ] = counter[ tween.prop ] || [];
            // in case this is called multiple times for either, lets store it in
            // 0 or 1 in the array
            calls[ value === 0 ? 0 : 1 ] = value;
        }
    }).queue( function( next ) {
            deepEqual( counter, {
                prop1: [0, 1],
                prop2: [0, 2],
                prop3: [0, 3]
            }, "Step function was called once at 0% and once at 100% for each property");
            next();
            start();
        });
});

asyncTest( "Animate callbacks have correct context", 2, function() {
    var foo = baidu( "#foo" );
    foo.animate({
        height: 10
    }, 10, function() {
        equal( foo[ 0 ], this, "Complete callback after stop(true) `this` is element" );
    }).stop( true, true );
    foo.animate({
        height: 100
    }, 10, function() {
        equal( foo[ 0 ], this, "Complete callback `this` is element" );
        start();
    });
});

asyncTest( "User supplied callback called after show when fx off (#8892)", 2, function() {
    var foo = baidu( "#foo" );
    baidu.fx.off = true;
    foo.hide();
    foo.fadeIn( 500, function() {
        ok( baidu( this ).css("display")!=="none", "Element is visible in callback" );
        foo.fadeOut( 500, function() {
            ok( baidu( this ).css("display")=="none", "Element is hidden in callback" );
            baidu.fx.off = false;
            start();
        });
    });
});

/*test( "animate should set display for disconnected nodes", function() {
    expect( 16 );

    var i = 0,
        methods = {
            //toggle: [ 1 ],
            slideToggle: [],
            fadeIn: [],
            fadeTo: [ "fast", 0.5 ],
            slideDown: [ "fast" ],
            show: [ 1 ],
            animate: [{ width: "show" }]
        },
        $divTest = baidu("<div>test</div>"),
    // parentNode = null
        $divEmpty = baidu("<div/>"),
        $divNone = baidu("<div style='display: none;'/>"),
        $divInline = baidu("<div style='display: inline;'/>");

    strictEqual( $divTest.show()[ 0 ].style.display, "block", "set display with show() for element with parentNode = document fragment" );
    strictEqual( $divEmpty.show()[ 0 ].style.display, "block", "set display with show() for element with parentNode = null" );
    strictEqual( $divNone.show()[ 0 ].style.display, "block", "show() should change display if it already set to none" );
    strictEqual( $divInline.show()[ 0 ].style.display, "inline", "show() should not change display if it already set" );

    stop();
    baidu.each( methods, function( name, opt ) {
        baidu.each([

            // parentNode = document fragment
            baidu("<div>test</div>"),

            // parentNode = null
            baidu("<div></div>")

        ], function() {
            var callback = [function () {
                strictEqual( this.style.display, "block", "set display to block with " + name );

                if ( ++i === 12 ) {
                    start();
                }
            }];
            baidu.dom.fn[ name ].apply( this, opt.concat( callback ) );
        });
    });
});*/

asyncTest( "hide called on element within hidden parent should set display to none (#10045)", 3, function() {
    var hidden = baidu("<div class='hidden'></div>").appendTo(frame),
        elems = baidu("<div>hide</div><div>hide0</div><div>hide1</div>");

    hidden.append( elems );

    baidu.when(
            elems.eq( 0 ).hide(),
            elems.eq( 1 ).hide( 0 ),
            elems.eq( 2 ).hide( 1 )
        ).done(function() {
            strictEqual( elems.get( 0 ).style.display, "none", "hide() called on element within hidden parent should set display to none" );
            strictEqual( elems.get( 1 ).style.display, "none", "hide( 0 ) called on element within hidden parent should set display to none" );
            strictEqual( elems.get( 2 ).style.display, "none", "hide( 1 ) called on element within hidden parent should set display to none" );

            elems.remove();
            start();
        });
});

asyncTest( "hide, fadeOut and slideUp called on element width height and width = 0 should set display to none", 5, function() {
    var foo = baidu("#foo"),
        i = 0,
        elems = baidu();

    for ( ; i < 5; i++ ) {
        elems = elems.add("<div style='width:0;height:0;'></div>");
    }

    foo.append( elems );

    baidu.when(
            elems.eq( 0 ).hide(),
            elems.eq( 1 ).hide( jQuery.noop ),
            elems.eq( 2 ).hide( 1 ),
            elems.eq( 3 ).fadeOut(),
            elems.eq( 4 ).slideUp()
        ).done(function() {
            strictEqual( elems.get( 0 ).style.display, "none", "hide() called on element width height and width = 0 should set display to none" );
            strictEqual( elems.get( 1 ).style.display, "none",
                "hide( jQuery.noop ) called on element width height and width = 0 should set display to none" );
            strictEqual( elems.get( 2 ).style.display, "none", "hide( 1 ) called on element width height and width = 0 should set display to none" );
            strictEqual( elems.get( 3 ).style.display, "none", "fadeOut() called on element width height and width = 0 should set display to none" );
            strictEqual( elems.get( 4 ).style.display, "none", "slideUp() called on element width height and width = 0 should set display to none" );

            start();
        });
});

asyncTest( "Handle queue:false promises", 10, function() {
    var foo = baidu( "#foo" ).clone().add(baidu( "#foo" )),
        step = 1;

    foo.animate({
        top: 1
    }, {
        duration: 10,
        queue: false,
        complete: function() {
            ok( step++ <= 2, "Step one or two" );
        }
    }).animate({
            bottom: 1
        }, {
            duration: 10,
            complete: function() {
                ok( step > 2 && step < 5, "Step three or four" );
                step++;
            }
        });

    foo.promise().done( function() {
        equal( step++, 5, "steps 1-5: queue:false then queue:fx done" );
        foo.animate({
            top: 10
        }, {
            duration: 10,
            complete: function() {
                ok( step > 5 && step < 8, "Step six or seven" );
                step++;
            }
        }).animate({
                bottom: 10
            }, {
                duration: 10,
                queue: false,
                complete: function() {
                    ok( step > 7 && step < 10, "Step eight or nine" );
                    step++;
                }
            }).promise().done( function() {
                equal( step++, 10, "steps 6-10: queue:fx then queue:false" );
                start();
            });

    });
});


asyncTest( "multiple unqueued and promise", 4, function() {
    var foo = baidu( "#foo" ),
        step = 1;
    foo.animate({
        marginLeft: 300
    }, {
        duration: 500,
        queue: false,
        complete: function() {
            strictEqual( step++, 2, "Step 2" );
        }
    }).animate({
            top: 100
        }, {
            duration: 1000,
            queue: false,
            complete: function() {
                strictEqual( step++, 3, "Step 3" );
            }
        }).animate({}, {
            duration: 2000,
            queue: false,
            complete: function() {
                // no properties is a non-op and finishes immediately
                strictEqual( step++, 1, "Step 1" );
            }
        }).promise().done( function() {
            strictEqual( step++, 4, "Step 4" );
            start();
        });
});

asyncTest( "animate does not change start value for non-px animation (#7109)", 1, function() {
    var parent = baidu( "<div><div></div></div>" ).css({ width: 284, height: 1 }).appendTo( "#qunit-fixture" ),
        child = parent.children().css({ fontSize: "98.6in", width: "0.01em", height: 1 }),
        actual = parseFloat( child.css( "width" ) ),
        computed = [];

    child.animate({ width: "0%" }, {
        duration: 1,
        step: function() {
            computed.push( parseFloat( child.css( "width" ) ) );
        }
    }).queue( function( next ) {
            var ratio = computed[ 0 ] / actual;
            ok( ratio > 0.9 && ratio < 1.1 , "Starting width was close enough" );
            next();
            parent.remove();
            start();
        });
});

asyncTest( "non-px animation handles non-numeric start (#11971)", 2, function() {
    var foo = baidu("#foo"),
        initial = foo.css("backgroundPositionX");

    if ( !initial ) {
        expect(1);
        ok( true, "Style property not understood" );
        start();
        return;
    }

    foo.animate({ backgroundPositionX: "42%" }, {
        duration: 1,
        progress: function( anim, percent ) {
            if ( percent ) {
                return;
            }

            if ( parseFloat( initial ) ) {
                equal( jQuery.style( this, "backgroundPositionX" ), initial, "Numeric start preserved" );
            } else {
                equal( jQuery.style( this, "backgroundPositionX" ), "0%", "Non-numeric start zeroed" );
            }
        },
        done: function() {
            equal( jQuery.style( this, "backgroundPositionX" ), "42%", "End reached" );
            start();
        }
    });
});

asyncTest("Animation callbacks (#11797)", 15, function() {
    var targets = baidu("#foo").children(),
        done = false,
        expectedProgress = 0;

    targets.eq( 0 ).animate( {}, {
        duration: 1,
        start: function() {
            ok( true, "empty: start" );
        },
        progress: function( anim, percent ) {
            equal( percent, 0, "empty: progress 0" );
        },
        done: function() {
            ok( true, "empty: done" );
        },
        fail: function() {
            ok( false, "empty: fail" );
        },
        always: function() {
            ok( true, "empty: always" );
            done = true;
        }
    });

    ok( done, "empty: done immediately" );

    done = false;
    targets.eq( 1 ).animate({
        opacity: 0
    }, {
        duration: 1,
        start: function() {
            ok( true, "stopped: start" );
        },
        progress: function( anim, percent ) {
            equal( percent, 0, "stopped: progress 0" );
        },
        done: function() {
            ok( false, "stopped: done" );
        },
        fail: function() {
            ok( true, "stopped: fail" );
        },
        always: function() {
            ok( true, "stopped: always" );
            done = true;
        }
    }).stop();

    ok( done, "stopped: stopped immediately" );

    targets.eq( 2 ).animate({
        opacity: 0
    }, {
        duration: 1,
        start: function() {
            ok( true, "async: start" );
        },
        progress: function( anim, percent ) {
            // occasionally the progress handler is called twice in first frame.... *shrug*
            if ( percent === 0 && expectedProgress === 1 ) {
                return;
            }
            equal( percent, expectedProgress, "async: progress " + expectedProgress );
            // once at 0, once at 1
            expectedProgress++;
        },
        done: function() {
            ok( true, "async: done" );
        },
        fail: function() {
            ok( false, "async: fail" );
        },
        always: function() {
            ok( true, "async: always" );
            start();
        }
    });
});


test( "Animate properly sets overflow hidden when animating width/height (#12117)", 8, function() {
    baidu.each( [ "height", "width" ], function( _, prop ) {
        baidu.each( [ 100, 0 ], function( _, value ) {
            var div = baidu("<div>").css( "overflow", "auto" ),
                props = {};
            props[ prop ] = value;
            div.animate( props, 1 );
            equal( div.css( "overflow" ), "hidden",
                "overflow: hidden set when animating " + prop + " to " + value );
            div.stop();
            if ( false && baidu.support.shrinkWrapBlocks ) {
                ok( true, "cannot restore overflow, shrinkWrapBlocks" );
            } else {
                equal( div.css( "overflow" ), "auto",
                    "overflow: auto restored after animating " + prop + " to " + value );
            }
        });
    });
});

test( "Each tick of the timer loop uses a fresh time (#12837)", function() {
    var lastVal, current,
        tmp = baidu('<div></div>');

    baidu.extend(tmp[0], {
        test: 0
    });
    expect( 3 );
    tmp.animate({
        test: 100
    }, {
        step: function( p, fx ) {
            ok( fx.now !== lastVal, "Current value is not the last value: " + lastVal + " - " + fx.now );
            lastVal = fx.now;
        }
    });
    current = (new Date()).getTime();
    // intentionally empty, we want to spin wheels until the time changes.
    while ( current === (new Date()).getTime() ) { }

    // now that we have a new time, run another tick
    baidu.fx.tick();

    current = (new Date()).getTime();
    // intentionally empty, we want to spin wheels until the time changes.
    while ( current === (new Date()).getTime() ) { }

    baidu.fx.tick();
    tmp.stop();
});

test( "Animations with 0 duration don't ease (#12273)", 1, function() {
    baidu.fx.easing.test = function() {
        ok( false, "Called easing" );
    };

    baidu( "#foo" ).animate({
        height: 100
    }, {
        duration: 0,
        easing: "test",
        complete: function() {
            equal( baidu( this ).height(), 100, "Height is 100" );
        }
    });

    delete baidu.fx.easing.test;
});

jQuery.map([ "toggle", "slideToggle", "fadeToggle" ], function ( method ) {
    // this test would look a lot better if we were using something to override
    // the default timers
    var duration = 1500;
    asyncTest( "toggle state tests: " + method + " (#8685)", function() {
        function secondToggle() {
            var stopped = parseFloat( element.css( check ) );
            tested = false;
            element[ method ]({
                duration: duration,
                step: function( p, fx ) {
                    if ( fx.pos > 0.1 && fx.prop === check && !tested ) {
                        tested = true;
                        equal( fx.start, stopped, check + " starts at " + stopped + " where it stopped" );
                        equal( fx.end, original, check + " ending value is " + original );
                        element.stop();
                    }
                },
                always: start
            });
        }

        var tested,
            original,
            check = method === "slideToggle" ? "height" : "opacity",
            element = baidu("#foo").height( 200 );

        expect( 4 );

        element[ method ]({
            duration: duration,
            easing: "linear",
            step: function( p, fx ) {
                if ( fx.pos > 0.1 && fx.prop === check && !tested ) {
                    tested = true;
                    original = fx.start;
                    ok( fx.start !== 0, check + " is starting at " + original + " on first toggle (non-zero)" );
                    equal( fx.end, 0, check + " is ending at 0 on first toggle" );
                    element.stop();
                }
            },
            always: secondToggle
        });
    });
});