var frame;
module("baidu.fx.stop", {
    setup: function(){
        if (baidu.dom.appendTo) {
            frame = baidu('<div id="qunit-fixture">' +
                '<div id="foo">' +
                '<p id="sndp">Everything inside the red border is inside a div with <code>id="foo"</code>.</p>' +
                '<p lang="en" id="en">This is a normal link: <a id="yahoo" href="http://www.yahoo.com/" class="blogTest">Yahoo</a></p>' +
                '<p id="sap">This link has <code><a href="#2" id="anchor2">class="blog"</a></code>: <a href="http://simon.incutio.com/" class="blog link" id="simon">Simon Willison\'s Weblog</a></p>' +
                '</div>' +
                '<table id="table"></table>' +
                '<div id="fx-test-group" style="position: absolute; width: 1px; height: 1px; overflow: hidden;">' +
                '<div id="fx-queue" name="test">' +
                '<div id="fadein" class=\'chain-test\' name=\'div\'>fadeIn<div>fadeIn</div></div>' +
                '<div id="fadeout" class=\'chain-test chain-test-out\'>fadeOut<div>fadeOut</div></div>' +

                '           <div id="show" class="chain-test">show<div>show</div></div>' +
                '           <div id="hide" class="chain-test chain-test-out">hide<div>hide</div></div>' +
                '           <div id="easehide" class="chain-test chain-test-out">hide<div>hide</div></div>' +

                '           <div id="togglein" class="chain-test">togglein<div>togglein</div></div>' +
                '           <div id="toggleout" class="chain-test chain-test-out">toggleout<div>toggleout</div></div>' +
                '           <div id="easetoggleout" class="chain-test chain-test-out">toggleout<div>toggleout</div></div>' +

                '           <div id="slideup" class="chain-test">slideUp<div>slideUp</div></div>' +
                '           <div id="slidedown" class="chain-test chain-test-out">slideDown<div>slideDown</div></div>' +
                '           <div id="easeslideup" class="chain-test">slideUp<div>slideUp</div></div>' +

                '           <div id="slidetogglein" class="chain-test">slideToggleIn<div>slideToggleIn</div></div>' +
                '           <div id="slidetoggleout" class="chain-test chain-test-out">slideToggleOut<div>slideToggleOut</div></div>' +

                '           <div id="fadetogglein" class="chain-test">fadeToggleIn<div>fadeToggleIn</div></div>' +
                '           <div id="fadetoggleout" class="chain-test chain-test-out">fadeToggleOut<div>fadeToggleOut</div></div>' +

                '           <div id="fadeto" class="chain-test">fadeTo<div>fadeTo</div></div>' +
                '       </div>' +

                '   <div id="fx-tests"></div>' +
                '   <span id="display"></span>' +
                    '</div>' +
                '</div>').appendTo(document.body);
        }
    },
    teardown: function(){
        baidu('#qunit-fixture').remove();
    }
});

test("plugin接口：载入js和css", function(){
    stop();
    ua.loadcss(upath+'fx.css', function(){
        ua.importsrc('baidu.dom.appendTo,baidu.dom.append,baidu.dom.children'+
            ',baidu.dom.width,baidu.dom.height,baidu.dom.remove,baidu.dom.css'+
            ',baidu.dom.attr,baidu.dom.eq,baidu.dom.hide,plugin.fx.presets'+
            ',baidu.dom.removeData,baidu.dom.add,plugin.fx.promise,plugin.fx.delay,plugin.fx.clearQueue'+
            ',baidu.each,baidu.dom.find,baidu.dom.css', function(){
            ok(true,'ok');
            start();
        }, "baidu.dom.remove");
    });
});

test("plugin接口：stop()", function() {
    expect( 4 );
    stop();

    var $foo = baidu("#foo"),
        tests = 2,
        w = 0;

    $foo.hide().css( "width", 200 )
        .animate( { "width": "show" }, 1500 );

    setTimeout(function() {
        var nw = $foo.css("width");
        notEqual( parseFloat( nw ), w, "An animation occurred " + nw + " " + w + "px" );
        $foo.stop();

        nw = $foo.css("width");
        notEqual( parseFloat( nw ), w, "Stop didn't reset the animation " + nw + " " + w + "px" );
        setTimeout(function() {
            $foo.removeData();
            equal( nw, $foo.css("width"), "The animation didn't continue" );
            if ( --tests === 0 ) {
                start();
            }
        }, 100);
    }, 100);

    var $one = baidu("#fadein");
    var $two = baidu("#show");
    $one.fadeTo(100, 0, function() {
        $one.stop();
    });
    setTimeout(function() {
        $two.fadeTo(100, 0, function() {
            equal( $two.css("opacity"), "0", "Stop does not interfere with animations on other elements (#6641)" );
            // Reset styles
            $one.add( $two ).css("opacity", "");
            if ( --tests === 0 ) {
                start();
            }
        });
    }, 50);
});


test("plugin接口：stop() - several in queue", function() {
    expect( 5 );

    var nw, time,
        $foo = baidu( "#foo" ),
        w = 0;

    // default duration is 400ms, so 800px ensures we aren't 0 or 1 after 1ms
    $foo.hide().css( "width", 800 );

    $foo.animate({ "width": "show" }, 400, "linear");
    $foo.animate({ "width": "hide" });
    $foo.animate({ "width": "show" });

    // could be replaced by something nicer using sinon.
    time = (new Date()).getTime();
    while( time === (new Date()).getTime() ) {}

    baidu.fx.tick();
    equal( $foo.queue().length, 3, "3 in the queue" );

    nw = $foo.css( "width" );

    notEqual( parseFloat( nw ), 1, "An animation occurred " + nw );
    $foo.stop();

    equal( $foo.queue().length, 2, "2 in the queue" );
    nw = $foo.css( "width" );
    notEqual( parseFloat( nw ), 1, "Stop didn't reset the animation " + nw );

    $foo.stop( true );

    equal( $foo.queue().length, 0, "0 in the queue" );
});

test("plugin接口：stop(clearQueue)", function() {
    expect(4);
    stop();

    var $foo = baidu("#foo");
    var w = 0;
    $foo.hide().css( "width", 200 ).css("width");

    $foo.animate({ "width": "show" }, 1000);
    $foo.animate({ "width": "hide" }, 1000);
    $foo.animate({ "width": "show" }, 1000);
    setTimeout(function(){
        var nw = $foo.css("width");
        ok( parseFloat( nw ) != w, "An animation occurred " + nw + " " + w + "px");
        $foo.stop(true);

        nw = $foo.css("width");
        ok( parseFloat( nw ) != w, "Stop didn't reset the animation " + nw + " " + w + "px");

        equal( $foo.queue().length, 0, "The animation queue was cleared" );
        setTimeout(function(){
            equal( nw, $foo.css("width"), "The animation didn't continue" );
            start();
        }, 100);
    }, 100);
});

test("plugin接口：stop(clearQueue, gotoEnd)", function() {
    expect(1);
    stop();

    var $foo = baidu("#foo");
    var w = 0;
    $foo.hide().css( "width", 200 ).css("width");

    $foo.animate({ width: "show" }, 1000);
    $foo.animate({ width: "hide" }, 1000);
    $foo.animate({ width: "show" }, 1000);
    $foo.animate({ width: "hide" }, 1000);
    setTimeout(function(){
        var nw = $foo.css("width");
        ok( parseFloat( nw ) != w, "An animation occurred " + nw + " " + w + "px");
        $foo.stop(false, true);

        nw = $foo.css("width");
        // Disabled, being flaky
        //equal( nw, 1, "Stop() reset the animation" );

        setTimeout(function(){
            // Disabled, being flaky
            //equal( $foo.queue().length, 2, "The next animation continued" );
            $foo.stop(true);
            start();
        }, 100);
    }, 100);
});

asyncTest( "stop( queue, ..., ... ) - Stop single queues", function() {
    expect( 3 );
    var saved,
        foo = baidu("#foo").css({ width: 200, height: 200 });

    foo.animate({
        width: 400
    },{
        duration: 500,
        complete: function() {
            equal( parseFloat( foo.css("width") ), 400, "Animation completed for standard queue" );
            equal( parseFloat( foo.css("height") ), saved, "Height was not changed after the second stop");
            start();
        }
    });

    foo.animate({
        height: 400
    },{
        duration: 1000,
        queue: "height"
    }).dequeue("height").stop( "height", false, true );

    equal( parseFloat( foo.css("height") ), 400, "Height was stopped with gotoEnd" );

    foo.animate({
        height: 200
    },{
        duration: 1000,
        queue: "height"
    }).dequeue( "height" ).stop( "height", false, false );
    saved = parseFloat( foo.css("height") );
});