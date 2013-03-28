var frame;
module("baidu.fx.animate", {
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

test("载入js和css", function(){
    stop();
    ua.loadcss(upath+'fx.css', function(){
        ua.importsrc('baidu.dom.appendTo,baidu.dom.append,baidu.dom.children'+
            ',baidu.dom.width,baidu.dom.height,baidu.dom.remove,baidu.dom.css'+
            ',baidu.dom.attr,baidu.dom.eq,baidu.dom.hide,plugin.fx.presets'+
            ',baidu.dom.removeData'+
            ',baidu.each,baidu.dom.find,baidu.dom.css', function(){
            ok(true,'ok');
            start();
        }, "baidu");
    });
});

test("stop()", function() {
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
            $foo.removeData(undefined, true);
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