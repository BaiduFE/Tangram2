module('baidu.ajax');
var isOpera = !!window.opera;

test("baidu.ajax() - success callbacks", function() {
    expect(3);
    baidu.ajax.setup({ timeout: 0 });
    stop();

    jQuery.ajax({
        url: upath + '/ajax/name.html',
        beforeSend: function(){ ok(true, "beforeSend"); },
        success: function(){ ok(true, "success"); },
        error: function(){ ok(false, "error"); },
        complete: function(){ ok(true, "complete"); start();}
    });
});

test("baidu.ajax() - success callbacks - (url, options) syntax", function() {
    expect(3);
    baidu.ajax.setup({ timeout: 0 });
    stop();
    setTimeout(function(){
        baidu.ajax(upath + '/ajax/name.html', {
            beforeSend: function(){ ok(true, "beforeSend"); },
            success: function(){ ok(true, "success"); },
            error: function(){ ok(false, "error"); },
            complete: function(){ ok(true, "complete"); start();}
        });
    }, 13);
});

test("baidu.ajax() - success callbacks (late binding)", function() {
    expect(3);

    baidu.ajax.setup({ timeout: 0 });

    stop();

    setTimeout(function(){
        jQuery.ajax({
            url: upath + '/ajax/name.html',
            beforeSend: function(){ ok(true, "beforeSend"); }
        })
            .complete(function(){ ok(true, "complete"); start();})
            .success(function(){ ok(true, "success"); })
            .error(function(){ ok(false, "error"); });
    }, 13);
});

test("jQuery.ajax() - success callbacks (oncomplete binding)", function() {
    expect(3);

    baidu.ajax.setup({ timeout: 0 });

    stop();

    setTimeout(function(){

        jQuery.ajax({
            url: upath + '/ajax/name.html',
            beforeSend: function(){ ok(true, "beforeSend"); },
            complete: function(xhr) {
                xhr
                .complete(function(){ ok(true, "complete"); })
                .success(function(){ ok(true, "success"); })
                .error(function(){ ok(false, "error"); })
                .complete(function(){ start(); });
            }
        });
    }, 13);
});

test("jQuery.ajax() - success callbacks (very late binding)", function() {
    expect(3);

    baidu.ajax.setup({ timeout: 0 });

    stop();

    setTimeout(function(){

        baidu.ajax({
            url: upath + '/ajax/name.html',
            beforeSend: function(){ ok(true, "beforeSend"); },
            complete: function(xhr) {
                setTimeout (function() {
                    xhr
                    .complete(function(){ ok(true, "complete"); })
                    .success(function(){ ok(true, "success"); })
                    .error(function(){ ok(false, "error"); })
                    .complete(function(){ start(); });
                },100);
            }
        });
    }, 13);
});

test("jQuery.ajax() - success callbacks (order)", function() {
    expect( 1 );

    baidu.ajax.setup({ timeout: 0 });

    stop();

    var testString = "";

    setTimeout(function(){
        baidu.ajax({
            url: upath + '/ajax/name.html',
            success: function( _1 , _2 , xhr ) {
                xhr.success(function() {
                    xhr.success(function() {
                        testString += "E";
                    });
                    testString += "D";
                });
                testString += "A";
            },
            complete: function() {
                strictEqual(testString, "ABCDE", "Proper order");
                start();
            }
        }).success(function() {
            testString += "B";
        }).success(function() {
            testString += "C";
        });
    }, 13);
});


test("jQuery.ajax() - error callbacks", function() {
    expect(3);
    stop();

    baidu.ajax.setup({ timeout: 500 });

    baidu.ajax({
        url: upath + '/ajax/name.php?wait=5',
        beforeSend: function(){ ok(true, "beforeSend"); },
        success: function(){ ok(false, "success"); },
        error: function(){ ok(true, "error"); },
        complete: function(){ ok(true, "complete"); start();}
    });
});


test( "jQuery.ajax - multiple method signatures introduced in 1.5 ( #8107)", function() {
    expect( 4 );

    stop();

    baidu.when(
        baidu.ajax().success(function() { ok( true, "With no arguments" ); }),
        baidu.ajax(upath + '/ajax/name.html').success(function() { ok( true, "With only string URL argument" ); }),
        baidu.ajax(upath + '/ajax/name.html', {} ).success(function() { ok( true, "With string URL param and map" ); }),
        baidu.ajax({ url: upath + '/ajax/name.html'} ).success(function() { ok( true, "With only map" ); })
    ).always(function() {
        start();
    });

});

test("jQuery.ajax() - textStatus and errorThrown values", function() {

    var nb = 2;

    expect( 2 * nb );
    stop();

    function startN() {
        if ( !( --nb ) ) {
            start();
        }
    }

    /*
    Safari 3.x returns "OK" instead of "Not Found"
    Safari 4.x doesn't have this issue so the test should be re-instated once
    we drop support for 3.x

    jQuery.ajax({
        url: url("data/nonExistingURL"),
        error: function( _ , textStatus , errorThrown ){
            strictEqual( textStatus, "error", "textStatus is 'error' for 404" );
            strictEqual( errorThrown, "Not Found", "errorThrown is 'Not Found' for 404");
            startN();
        }
    });
    */

    baidu.ajax({
        url: upath + '/ajax/name.php?wait=5',
        error: function( _ , textStatus , errorThrown ){
            strictEqual( textStatus, "abort", "textStatus is 'abort' for abort" );
            strictEqual( errorThrown, "abort", "errorThrown is 'abort' for abort");
            startN();
        }
    }).abort();

    baidu.ajax({
        url: upath + '/ajax/name.php?wait=5',
        error: function( _ , textStatus , errorThrown ){
            strictEqual( textStatus, "mystatus", "textStatus is 'mystatus' for abort('mystatus')" );
            strictEqual( errorThrown, "mystatus", "errorThrown is 'mystatus' for abort('mystatus')");
            startN();
        }
    }).abort( "mystatus" );
});

test("jQuery.ajax() - responseText on error", function() {

    expect( 1 );

    stop();

    baidu.ajax({
        url: upath + '/ajax/errorWithText.php',
        error: function(xhr) {
            strictEqual( xhr.responseText , "plain text message" , "Test jqXHR.responseText is filled for HTTP errors" );
        },
        complete: function() {
            start();
        }
    });
});


test(".ajax() - retry with jQuery.ajax( this )", function() {

    expect( 2 );

    stop();

    var firstTime = true,
        previousUrl;

    baidu.ajax({
        url: upath + '/ajax/errorWithText.php',
        error: function() {
            if ( firstTime ) {
                firstTime = false;
                baidu.ajax( this );
            } else {
                ok( true , "Test retrying with jQuery.ajax(this) works" );
                baidu.ajax({
                    url: upath + '/ajax/errorWithText.php',
                    data: { x: 1 },
                    beforeSend: function() {
                        if ( !previousUrl ) {
                            previousUrl = this.url;
                        } else {
                            strictEqual( this.url , previousUrl, "url parameters are not re-appended" );
                            start();
                            return false;
                        }
                    },
                    error: function() {
                        baidu.ajax( this );
                    }
                });
            }
        }
    });
});

test(".ajax() - headers" , function() {

    expect( 4 );

    stop();
    
    var div  = document.createElement('div');
    document.body.appendChild(div);

//    jQuery(div).ajaxSend(function( evt, xhr ) {
//        xhr.setRequestHeader( "ajax-send", "test" );
//    });

    var requestHeaders = {
            siMPle: "value",
            "SometHing-elsE": "other value",
            OthEr: "something else"
        },
        list = [],
        i;

    for( i in requestHeaders ) {
        list.push( i );
    }
    list.push( "ajax-send" );
    $.ajax(upath + '/ajax/headers.php?keys=' + list.join( "_" ), {

        headers: requestHeaders,
        beforeSend: function(xhr, settings){
            xhr.setRequestHeader( "ajax-send", "test" );
        },
        success: function( data , _ , xhr ) {
            var tmp = [];
            for ( i in requestHeaders ) {
                tmp.push( i , ": " , requestHeaders[ i ] , "\n" );
            }
            tmp.push(  "ajax-send: test\n" );
            tmp = tmp.join( "" );

            strictEqual( data , tmp , "Headers were sent" );
            strictEqual( xhr.getResponseHeader( "Sample-Header" ) , "Hello World" , "Sample header received" );
            if ( jQuery.browser.mozilla ) {
                ok( true, "Firefox doesn't support empty headers" );
            } else {
                strictEqual( xhr.getResponseHeader( "Empty-Header" ) , "" , "Empty header received" );
            }
            strictEqual( xhr.getResponseHeader( "Sample-Header2" ) , "Hello World 2" , "Second sample header received" );
        },
        error: function(){ ok(false, "error"); }

    }).always(function() {
        start();
    });

});
