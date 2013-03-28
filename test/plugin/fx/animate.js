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
            ',baidu.dom.attr,baidu.dom.eq'+
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

