var frame;
module("baidu.fx.finish", {
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
            'baidu.dom.css,baidu.dom.is,plugin.fx.animate,plugin.fx.promise,plugin.fx.delay,plugin.fx.clearQueue' +
            ',baidu.each,baidu.dom.find,baidu.dom.css', function(){
            ok(true,'ok');
            start();
        }, "baidu.dom.remove");
    });
});


test( ".finish() completes all queued animations", function() {
    var animations = {
            top: 100,
            left: 100,
            height: 100,
            width: 100
        },
        div = baidu("<div></div>");

    expect( 10 );

    baidu.each( animations, function( prop, value ) {
        var anim = {};
        anim[ prop ] = value;
        // the delay shouldn't matter at all!
        div.css( prop, 1 ).animate( anim, function() {
            ok( true, "Called animation callback for " + prop );
        }).delay( 100 );
    });
    equal( div.queue().length, 8, "8 animations in the queue" );
    div.finish();
    baidu.each( animations, function( prop, value ) {
        equal( parseFloat( div.css( prop ) ), value, prop + " finished at correct value" );
    });
    equal( div.queue().length, 0, "empty queue when done" );
    //equal( div.is(":animated"), false, ":animated doesn't match" );

    // cleanup
    div.remove();
    // leaves a "shadow timer" which does nothing around, need to force a tick
    baidu.fx.tick();
});

test( ".finish( false ) - unqueued animations", function() {
    var animations = {
            top: 100,
            left: 100,
            height: 100,
            width: 100
        },
        div = baidu("<div></div>");

    expect( 9 );

    baidu.each( animations, function( prop, value ) {
        var anim = {};
        anim[ prop ] = value;
        div.css( prop, 1 ).animate( anim, {
            queue: false,
            complete: function() {
                ok( true, "Called animation callback for " + prop );
            }
        });
    });
    equal( div.queue().length, 0, "0 animations in the queue" );
    div.finish( false );
    baidu.each( animations, function( prop, value ) {
        equal( parseFloat( div.css( prop ) ), value, prop + " finished at correct value" );
    });
    //equal( div.is(":animated"), false, ":animated doesn't match" );

    // cleanup
    div.remove();
    // leaves a "shadow timer" which does nothing around, need to force a tick
    baidu.fx.tick();
});

test( ".finish( \"custom\" ) - custom queue animations", function() {
    var animations = {
            top: 100,
            left: 100,
            height: 100,
            width: 100
        },
        div = baidu("<div></div>");

    expect( 9 );

    baidu.each( animations, function( prop, value ) {
        var anim = {};
        anim[ prop ] = value;
        div.css( prop, 1 ).animate( anim, {
            queue: "custom",
            complete: function() {
                ok( true, "Called animation callback for " + prop );
            }
        });
    });
    equal( div.queue( "custom" ).length, 4, "4 animations in the queue" );
    // start the first animation
    div.dequeue( "custom" );
    //equal( div.is(":animated"), true, ":animated matches" );
    div.finish( "custom" );
    baidu.each( animations, function( prop, value ) {
        equal( parseFloat( div.css( prop ) ), value, prop + " finished at correct value" );
    });
    //equal( div.is(":animated"), false, ":animated doesn't match" );

    // cleanup
    div.remove();
    // leaves a "shadow timer" which does nothing around, need to force a tick
    baidu.fx.tick();
});

test( ".finish() calls finish of custom queue functions", function() {
    function queueTester( next ) {

    }
    var div = baidu( "<div></div>" );

    expect( 3 );
    queueTester.finish = function() {
        ok( true, "Finish called on custom queue function" );
    };

    div.queue( queueTester ).queue( queueTester ).queue( queueTester ).finish();

    div.remove();
});