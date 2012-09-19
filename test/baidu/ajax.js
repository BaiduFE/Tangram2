module('baidu.ajax');
var isOpera = !!window.opera;

test("baidu.ajax() - success callbacks", function() {
    expect(3);
    baidu.ajax.setup({ timeout: 0 });
    stop();

    baidu.ajax({
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
        baidu.ajax({
            url: upath + '/ajax/name.html',
            beforeSend: function(){ ok(true, "beforeSend"); }
        })
            .complete(function(){ ok(true, "complete"); start();})
            .success(function(){ ok(true, "success"); })
            .error(function(){ ok(false, "error"); });
    }, 13);
});

test("baidu.ajax() - success callbacks (oncomplete binding)", function() {
    expect(3);

    baidu.ajax.setup({ timeout: 0 });

    stop();

    setTimeout(function(){

        baidu.ajax({
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

test("baidu.ajax() - success callbacks (very late binding)", function() {
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

test("baidu.ajax() - success callbacks (order)", function() {
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


test("baidu.ajax() - error callbacks", function() {
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


test( "baidu.ajax - multiple method signatures introduced in 1.5 ( #8107)", function() {
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

test("baidu.ajax() - textStatus and errorThrown values", function() {

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

test("baidu.ajax() - responseText on error", function() {

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


test(".ajax() - retry with baidu.ajax( this )", function() {

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
                ok( true , "Test retrying with baidu.ajax(this) works" );
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
            if ( $.browser.mozilla ) {
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

test(".ajax() - Accept header" , function() {

    expect( 1 );

    stop();

    baidu.ajax(upath + '/ajax/headers.php?keys=accept', {
        headers: {
            Accept: "very wrong accept value"
        },
        beforeSend: function( xhr ) {
            xhr.setRequestHeader( "Accept", "*/*" );
        },
        success: function( data ) {
            strictEqual( data , "accept: */*\n" , "Test Accept header is set to last value provided" );
            start();
        },
        error: function(){ ok(false, "error"); }
    });

});

test(".ajax() - contentType" , function() {

    expect( 2 );

    stop();

    var count = 2;

    function restart() {
        if ( ! --count ) {
            start();
        }
    }

    baidu.ajax(upath + '/ajax/headers.php?keys=content-type', {
        contentType: "test",
        success: function( data ) {
            strictEqual( data , "content-type: test\n" , "Test content-type is sent when options.contentType is set" );
        },
        complete: function() {
            restart();
        }
    });

    baidu.ajax(upath + '/ajax/headers.php?keys=content-type', {
        contentType: false,
        success: function( data ) {
            strictEqual( data , "content-type: \n" , "Test content-type is not sent when options.contentType===false" );
        },
        complete: function() {
            restart();
        }
    });

});












test(".ajax() - protocol-less urls", function() {
    expect(1);
    baidu.ajax({
        url: '//somedomain.com',
        beforeSend: function( xhr, settings ) {
            equal(settings.url, location.protocol + "//somedomain.com", "Make sure that the protocol is added.");
            return false;
        }
    });
});

test(".ajax() - hash", function() {
    expect(3);
    baidu.ajax({
        url: "data/name.html#foo",
        beforeSend: function( xhr, settings ) {
            equal(settings.url, "data/name.html", "Make sure that the URL is trimmed.");
            return false;
        }
    });

    baidu.ajax({
        url: "data/name.html?abc#foo",
        beforeSend: function( xhr, settings ) {
        equal(settings.url, "data/name.html?abc", "Make sure that the URL is trimmed.");
            return false;
        }
    });

    baidu.ajax({
        url: "data/name.html?abc#foo",
        data: { "test": 123 },
        beforeSend: function( xhr, settings ) {
            equal(settings.url, "data/name.html?abc&test=123", "Make sure that the URL is trimmed.");
            return false;
        }
    });
});

test("baidu ajax - cross-domain detection", function() {

    expect( 6 );
    var loc = document.location,
        otherPort = loc.port === 666 ? 667 : 666,
        otherProtocol = loc.protocol === "http:" ? "https:" : "http:";
    baidu.ajax({
        dataType: "jsonp",
        url: otherProtocol + "//" + loc.host,
        beforeSend: function( _ , s ) {
            ok( s.crossDomain , "Test different protocols are detected as cross-domain" );
            return false;
        }
    });

    baidu.ajax({
        dataType: "jsonp",
        url: "app:/path",
        beforeSend: function( _ , s ) {
            ok( s.crossDomain , "Adobe AIR app:/ URL detected as cross-domain" );
            return false;
        }
    });

    baidu.ajax({
        dataType: "jsonp",
        url: loc.protocol + "//somewebsitethatdoesnotexist-656329477541.com:" + ( loc.port || 80 ),
        beforeSend: function( _ , s ) {
            ok( s.crossDomain , "Test different hostnames are detected as cross-domain" );
            return false;
        }
    });

    baidu.ajax({
        dataType: "jsonp",
        url: loc.protocol + "//" + loc.hostname + ":" + otherPort,
        beforeSend: function( _ , s ) {
            ok( s.crossDomain , "Test different ports are detected as cross-domain" );
            return false;
        }
    });

    baidu.ajax({
        dataType: "jsonp",
        url: "about:blank",
        beforeSend: function( _ , s ) {
            ok( s.crossDomain , "Test about:blank is detected as cross-domain" );
            return false;
        }
    });

    baidu.ajax({
        dataType: "jsonp",
        url: loc.protocol + "//" + loc.host,
        crossDomain: true,
        beforeSend: function( _ , s ) {
            ok( s.crossDomain , "Test forced crossDomain is detected as cross-domain" );
            return false;
        }
    });

});

//baidu.load

test("baidu.ajax() - abort", function() {
    expect( 4 );
    stop();

    var xhr = baidu.ajax({
        url: upath + '/ajax/name.php?wait=5',
        beforeSend: function(){ ok(true, "beforeSend"); },
        complete: function(){ ok(true, "complete"); start();}
    });

    equal( xhr.readyState, 1, "XHR readyState indicates successful dispatch" );

    xhr.abort();
    equal( xhr.readyState, 0, "XHR readyState indicates successful abortion" );
});




test("Ajax events with context", function() {
    expect(9);
    stop();
    var div = document.createElement('div');
    document.body.appendChild(div);
    
    ua.importsrc('baidu.dom.add,baidu.dom.unbind', function(){
        var context = document.createElement("div");
    
        function event(e){
            equal( this, context, e.type );
        }
    
        function callback(msg){
            return function(){
                equal( this, context, "context is preserved on callback " + msg );
            };
        }
    
        function nocallback(msg){
            return function(){
                equal( typeof this.url, "string", "context is settings on callback " + msg );
            };
        }
        baidu.ajax({
            url: upath + '/ajax/name.html',
            beforeSend: callback("beforeSend"),
            success: callback("success"),
            error: callback("error"),
            complete:function(){
                callback("complete").call(this);
    
                baidu.ajax({
                    url: upath + '/ajax/404.html',
                    context: context,
                    beforeSend: callback("beforeSend"),
                    error: callback("error"),
                    complete: function(){
                        callback("complete").call(this);
    
                        baidu.dom(div).add(context).unbind();
    
                        baidu.ajax({
                            url: upath + '/ajax/404.html',
                            beforeSend: nocallback("beforeSend"),
                            error: nocallback("error"),
                            complete: function(){
                                nocallback("complete").call(this);
                                document.body.removeChild(div);
                                div = null;
                                start();
                            }
                        });
                    }
                });
            },
            context:context
        });
    }, 'baidu.dom.unbind', 'baidu.ajax');
});

test("baidu.ajax context modification", function() {
    expect(1);

    stop();

    var obj = {};

    baidu.ajax({
        url: upath + '/java/name.html',
        context: obj,
        beforeSend: function(){
            this.test = "foo";
        },
        complete: function() {
            start();
        }
    });

    equal( obj.test, "foo", "Make sure the original object is maintained." );
});

test("baidu.ajax context modification through ajaxSetup", function() {
    expect(4);

    stop();

    var obj = {};
    
    baidu.ajax.setup({context: obj});

    strictEqual( baidu.ajax.settings.context, obj, "Make sure the context is properly set in ajaxSettings." );

    baidu.ajax({
        url: upath + '/ajax/name.html',
        complete: function() {
            strictEqual( this, obj, "Make sure the original object is maintained." );
            baidu.ajax({
                url: upath + '/ajax/name.html',
                context: {},
                complete: function() {
                    ok( this !== obj, "Make sure overidding context is possible." );
                    baidu.ajax.setup({context: false});
                    baidu.ajax({
                        url: upath + '/ajax/name.html',
                        beforeSend: function(){
                            this.test = "foo2";
                        },
                        complete: function() {
                            ok( this !== obj, "Make sure unsetting context is possible." );
                            start();
                        }
                    });
                }
            });
        }
    });
});

test("baidu.ajax() - disabled globals", function() {
    expect( 3 );
    stop();

    baidu.ajax({
        global: false,
        url: upath + '/ajax/name.html',
        beforeSend: function(){ ok(true, "beforeSend"); },
        success: function(){ ok(true, "success"); },
        error: function(){ ok(false, "error"); },
        complete: function(){
          ok(true, "complete");
          setTimeout(function(){ start(); }, 13);
        }
    });
});

test("baidu.ajax - xml: non-namespace elements inside namespaced elements", function() {
    expect(3);
    stop();
    baidu.ajax({
      url: upath + '/ajax/with_fries.xml',
      dataType: "xml",
      success: function(resp) {
        equal( $("properties", resp).length, 1, "properties in responseXML" );
        equal( $("jsconf", resp).length, 1, "jsconf in responseXML" );
        equal( $("thing", resp).length, 2, "things in responseXML" );
        start();
      }
    });
});

test("baidu.ajax - xml: non-namespace elements inside namespaced elements (over JSONP)", function() {
    expect(3);
    stop();
    baidu.ajax({
      url: upath + '/ajax/with_fries_over_jsonp.php',
      dataType: "jsonp xml",
      success: function(resp) {
        equal( $("properties", resp).length, 1, "properties in responseXML" );
        equal( $("jsconf", resp).length, 1, "jsconf in responseXML" );
        equal( $("thing", resp).length, 2, "things in responseXML" );
        start();
      },
      error: function(_1,_2,error) {
        ok( false, error );
        start();
      }
    });
});

test("baidu.ajax - HEAD requests", function() {
    expect(2);

    stop();
    baidu.ajax({
        url: upath + "/ajax/name.html",
        type: "HEAD",
        success: function(data, status, xhr){
            var h = xhr.getAllResponseHeaders();
//            ok( /Date/i.test(h), "No Date in HEAD response" );
            ok(/Content-Type/i.test(h), 'No content-type in HEAD response');

            baidu.ajax({
                url: upath + "/ajax/name.html",
                data: { whip_it: "good" },
                type: "HEAD",
                success: function(data, status, xhr){
                    var h = xhr.getAllResponseHeaders();
                    ok( /Date/i.test(h), "No Date in HEAD response with data" );
                    start();
                }
            });
        }
    });
});

test("baidu.ajax - beforeSend", function() {
    expect(1);
    stop();

    var check = false;

    baidu.ajax.setup({ timeout: 0 });

    baidu.ajax({
        url: upath + '/ajax/name.html',
        beforeSend: function(xml) {
            check = true;
        },
        success: function(data) {
            ok( check, "check beforeSend was executed" );
            start();
        }
    });
});

test("baidu.ajax - beforeSend, cancel request (#2688)", function() {
    expect(2);
    baidu.ajax({
        url: upath + "/ajax/name.html",
        beforeSend: function() {
            ok( true, "beforeSend got called, canceling" );
            return false;
        },
        success: function() {
            ok( false, "request didn't get canceled" );
        },
        complete: function() {
            ok( false, "request didn't get canceled" );
        },
        error: function() {
            ok( false, "request didn't get canceled" );
        }
    }).fail(function( _, reason ) {
        strictEqual( reason, "canceled", "canceled request must fail with 'canceled' status text" );
    });
});

test("baidu.ajax - beforeSend, cancel request manually", function() {
    expect(2);
    baidu.ajax({
        url: upath + "/ajax/name.html",
        beforeSend: function(xhr) {
            ok( true, "beforeSend got called, canceling" );
            xhr.abort();
        },
        success: function() {
            ok( false, "request didn't get canceled" );
        },
        complete: function() {
            ok( false, "request didn't get canceled" );
        },
        error: function() {
            ok( false, "request didn't get canceled" );
        }
    }).fail(function( _, reason ) {
        strictEqual( reason, "canceled", "manually canceled request must fail with 'canceled' status text" );
    });
});

window.foobar = null;
window.testFoo = undefined;

test("baidu.ajax - dataType html", function() {
    var div = document.createElement('div');
        document.body.appendChild(div);
        div.innerHTML = '<div id="ap"></div><div id="foo"></div>';
    expect(5);
    stop();

    var verifyEvaluation = function() {
        equal( testFoo, "foo", "Check if script was evaluated for datatype html" );
        equal( foobar, "bar", "Check if script src was evaluated for datatype html" );
        document.body.removeChild(div);
        div = null;
        start();
    };

    baidu.ajax({
      dataType: "html",
      url: upath + "/ajax/test.html",
      success: function(data) {
        $("#ap").html(data);
        ok( data.match(/^html text/), "Check content for datatype html" );
        setTimeout(verifyEvaluation, 600);
      }
    });
});

test("baidu.ajax.param() Constructed prop values", function() {
    expect( 4 );

    function Record() {
        this.prop = "val";
    }

    var params = { "test": new String("foo") };
    equal( baidu.ajax.param( params, false ), "test=foo", "Do not mistake new String() for a plain object" );

    params = { "test": new Number(5) };
    equal( baidu.ajax.param( params, false ), "test=5", "Do not mistake new Number() for a plain object" );

    params = { "test": new Date() };
    ok( baidu.ajax.param( params, false ), "(Non empty string returned) Do not mistake new Date() for a plain object" );

    // should allow non-native constructed objects
    params = { "test": new Record() };
    equal( baidu.ajax.param( params, false ), baidu.ajax.param({ "test": { prop: "val" } }), "Allow non-native constructed objects" );
});

test("synchronous request", function() {
    expect(1);
    ok( /^{ "data"/.test( baidu.ajax({url: upath + "/ajax/json_obj.js", dataType: "text", async: false}).responseText ), "check returned text" );
});

test("synchronous request with callbacks", function() {
    expect(2);
    var result;
    baidu.ajax({url: upath + "/ajax/json_obj.js", async: false, dataType: "text", success: function(data) { ok(true, "sucess callback executed"); result = data; } });
    ok( /^{ "data"/.test( result ), "check returned text" );
});

test("ajax cache", function () {
    var div = document.createElement('div');
        document.body.appendChild(div);
    expect(18);

    stop();

    var count = 0;

    function invoke(data, statusText, xhr) {
        var re = /_=(.*?)(&|$)/g;
        var oldOne = null;
        for (var i = 0; i < 6; i++) {
            var ret = re.exec(xhr.options.url);
            if (!ret) {
                break;
            }
            oldOne = ret[1];
        }
        equal(i, 1, "Test to make sure only one 'no-cache' parameter is there");
        ok(oldOne != "tobereplaced555", "Test to be sure parameter (if it was there) was replaced");
        if(++count == 6)
            start();
    }
    ok( baidu.ajax({url: upath + "/ajax/text.php", cache:false, success: invoke}), "test with no parameters" );
    ok( baidu.ajax({url: upath + "/ajax/text.php?pizza=true", cache:false, success: invoke}), "test with 1 parameter" );
    ok( baidu.ajax({url: upath + "/ajax/text.php?_=tobereplaced555", cache:false, success: invoke}), "test with _= parameter" );
    ok( baidu.ajax({url: upath + "/ajax/text.php?pizza=true&_=tobereplaced555", cache:false, success: invoke}), "test with 1 parameter plus _= one" );
    ok( baidu.ajax({url: upath + "/ajax/text.php?_=tobereplaced555&tv=false", cache:false, success: invoke}), "test with 1 parameter plus _= one before it" );
    ok( baidu.ajax({url: upath + "/ajax/text.php?name=David&_=tobereplaced555&washere=true", cache:false, success: invoke}), "test with 2 parameters surrounding _= one" );
});

$.each( [ "Same Domain", "Cross Domain" ] , function( crossDomain , label ) {

    test("baidu.ajax() - JSONP, " + label, function() {
        expect(23);

        var count = 0;
        function plus(){ if ( ++count == 20 ) start(); }

        stop();

        baidu.ajax({
            url: upath + "/ajax/jsonp.php",
            dataType: "jsonp",
            crossDomain: crossDomain,
            success: function(data){
                ok( data.data, "JSON results returned (GET, no callback)" );
                plus();
            },
            error: function(data){
                ok( false, "Ajax error JSON (GET, no callback)" );
                plus();
            }
        });

        baidu.ajax({
            url: upath + "/ajax/jsonp.php",
            dataType: "jsonp",
            crossDomain: crossDomain,
            success: function(data){
                ok( data.data, ( this.alreadyDone ? "this re-used" : "first request" ) + ": JSON results returned (GET, no callback)" );
                if ( !this.alreadyDone ) {
                    this.alreadyDone = true;
                    baidu.ajax( this );
                } else {
                    plus();
                }
            },
            error: function(data){
                ok( false, "Ajax error JSON (GET, no callback)" );
                plus();
            }
        });

        baidu.ajax({
            url: upath + "/ajax/jsonp.php?callback=?",
            dataType: "jsonp",
            crossDomain: crossDomain,
            success: function(data){
                ok( data.data, "JSON results returned (GET, url callback)" );
                plus();
            },
            error: function(data){
                ok( false, "Ajax error JSON (GET, url callback)" );
                plus();
            }
        });

        baidu.ajax({
            url: upath + "/ajax/jsonp.php",
            dataType: "jsonp",
            crossDomain: crossDomain,
            data: "callback=?",
            success: function(data){
                ok( data.data, "JSON results returned (GET, data callback)" );
                plus();
            },
            error: function(data){
                ok( false, "Ajax error JSON (GET, data callback)" );
                plus();
            }
        });

//        baidu.ajax({
//            url: upath + "/ajax/jsonp.php?callback=??",
//            dataType: "jsonp",
//            crossDomain: crossDomain,
//            success: function(data){
//                ok( data.data, "JSON results returned (GET, url context-free callback)" );
//                plus();
//            },
//            error: function(data){
//                ok( false, "Ajax error JSON (GET, url context-free callback)" );
//                plus();
//            }
//        });

//        baidu.ajax({
//            url: upath + "/ajax/jsonp.php",
//            dataType: "jsonp",
//            crossDomain: crossDomain,
//            data: "callback=??",
//            success: function(data){
//                ok( data.data, "JSON results returned (GET, data context-free callback)" );
//                plus();
//            },
//            error: function(data){
//                ok( false, "Ajax error JSON (GET, data context-free callback)" );
//                plus();
//            }
//        });

//        baidu.ajax({
//            url: upath + "/ajax/jsonp.php/??",
//            dataType: "jsonp",
//            crossDomain: crossDomain,
//            success: function(data){
//                ok( data.data, "JSON results returned (GET, REST-like)" );
//                plus();
//            },
//            error: function(data){
//                ok( false, "Ajax error JSON (GET, REST-like)" );
//                plus();
//            }
//        });
//
//        baidu.ajax({
//            url: upath + "/ajax/jsonp.php/???json=1",
//            dataType: "jsonp",
//            crossDomain: crossDomain,
//            success: function(data){
//                strictEqual( $.type(data), "array", "JSON results returned (GET, REST-like with param)" );
//                plus();
//            },
//            error: function(data){
//                ok( false, "Ajax error JSON (GET, REST-like with param)" );
//                plus();
//            }
//        });

        baidu.ajax({
            url: upath + "/ajax/jsonp.php",
            dataType: "jsonp",
            crossDomain: crossDomain,
            jsonp: "callback",
            success: function(data){
                ok( data.data, "JSON results returned (GET, data obj callback)" );
                plus();
            },
            error: function(data){
                ok( false, "Ajax error JSON (GET, data obj callback)" );
                plus();
            }
        });

        window.jsonpResults = function(data) {
            ok( data.data, "JSON results returned (GET, custom callback function)" );
            window.jsonpResults = undefined;
            plus();
        };

        baidu.ajax({
            url: upath + "/ajax/jsonp.php",
            dataType: "jsonp",
            crossDomain: crossDomain,
            jsonpCallback: "jsonpResults",
            success: function(data){
                ok( data.data, "JSON results returned (GET, custom callback name)" );
                plus();
            },
            error: function(data){
                ok( false, "Ajax error JSON (GET, custom callback name)" );
                plus();
            }
        });

        baidu.ajax({
            url: upath + "/ajax/jsonp.php",
            dataType: "jsonp",
            crossDomain: crossDomain,
            jsonpCallback: "functionToCleanUp",
            success: function(data){
                ok( data.data, "JSON results returned (GET, custom callback name to be cleaned up)" );
                strictEqual( window.functionToCleanUp, undefined, "Callback was removed (GET, custom callback name to be cleaned up)" );
                plus();
                var xhr;
                baidu.ajax({
                    url: upath + "/ajax/jsonp.php",
                    dataType: "jsonp",
                    crossDomain: crossDomain,
                    jsonpCallback: "functionToCleanUp",
                    beforeSend: function( jqXHR ) {
                        xhr = jqXHR;
                        return false;
                    }
                });
                xhr.error(function() {
                    ok( true, "Ajax error JSON (GET, custom callback name to be cleaned up)" );
                    strictEqual( window.functionToCleanUp, undefined, "Callback was removed after early abort (GET, custom callback name to be cleaned up)" );
                    plus();
                });
            },
            error: function(data){
                ok( false, "Ajax error JSON (GET, custom callback name to be cleaned up)" );
                plus();
            }
        });

        baidu.ajax({
            type: "POST",
            url: upath + "/ajax/jsonp.php",
            dataType: "jsonp",
            crossDomain: crossDomain,
            success: function(data){
                ok( data.data, "JSON results returned (POST, no callback)" );
                plus();
            },
            error: function(data){
                ok( false, "Ajax error JSON (GET, data obj callback)" );
                plus();
            }
        });

        baidu.ajax({
            type: "POST",
            url: upath + "/ajax/jsonp.php",
            data: "callback=?",
            dataType: "jsonp",
            crossDomain: crossDomain,
            success: function(data){
                ok( data.data, "JSON results returned (POST, data callback)" );
                plus();
            },
            error: function(data){
                ok( false, "Ajax error JSON (POST, data callback)" );
                plus();
            }
        });

        baidu.ajax({
            type: "POST",
            url: upath + "/ajax/jsonp.php",
            jsonp: "callback",
            dataType: "jsonp",
            crossDomain: crossDomain,
            success: function(data){
                ok( data.data, "JSON results returned (POST, data obj callback)" );
                plus();
            },
            error: function(data){
                ok( false, "Ajax error JSON (POST, data obj callback)" );
                plus();
            }
        });

        //#7578
        baidu.ajax({
            url: upath + "/ajax/jsonp.php",
            dataType: "jsonp",
            crossDomain: crossDomain,
            beforeSend: function(){
                strictEqual( this.cache, false, "cache must be false on JSON request" );
                plus();
                return false;
            }
        });

        baidu.ajax({
            url: upath + "/ajax/jsonp.php?callback=XXX",
            dataType: "jsonp",
            jsonp: false,
            jsonpCallback: "XXX",
            crossDomain: crossDomain,
            beforeSend: function() {
//                ok( /^data\/jsonp.php\?callback=XXX&_=\d+$/.test( this.url ) ,
//                    "The URL wasn't messed with (GET, custom callback name with no url manipulation)" );
                plus();
            },
            success: function(data){
                ok( data.data, "JSON results returned (GET, custom callback name with no url manipulation)" );
                plus();
            },
            error: function(data){
                ok( false, "Ajax error JSON (GET, custom callback name with no url manipulation)" );
                plus();
            }
        });

        //#8205
        baidu.ajax({
            url: upath + "/ajax/jsonp.php",
            dataType: "jsonp",
            crossDomain: crossDomain,
            beforeSend: function() {
                this.callback = this.jsonpCallback;
            }
        }).pipe(function() {
            var previous = this;
            strictEqual( previous.jsonpCallback, undefined, "jsonpCallback option is set back to default in callbacks" );
            baidu.ajax({
                url: upath + "/ajax/jsonp.php",
                dataType: "jsonp",
                crossDomain: crossDomain,
                beforeSend: function() {
                    strictEqual( this.jsonpCallback, previous.callback, "JSONP callback name is re-used" );
                    return false;
                }
            });
        }).always( plus );

    });
});























test("baidu.ajax() - script, Remote", function() {
    expect(2);

    stop();

    baidu.ajax({
        url: upath + "/ajax/test.js",
        dataType: "script",
        success: function(data){
            ok( foobar, "Script results returned (GET, no callback)" );
            start();
        }
    });
});

test("baidu.ajax() - script, Remote with POST", function() {
    expect(3);

    stop();

    baidu.ajax({
        url: upath + "/ajax/test.js",
        type: "POST",
        dataType: "script",
        success: function(data, status){
            ok( foobar, "Script results returned (POST, no callback)" );
            equal( status, "success", "Script results returned (POST, no callback)" );
            start();
        },
        error: function(xhr) {
            ok( false, "ajax error, status code: " + xhr.status );
            start();
        }
    });
});

test("baidu.ajax() - script, Remote with scheme-less URL", function() {
    expect(2);

    stop();

    baidu.ajax({
        url: upath + "/ajax/test.js",
        dataType: "script",
        success: function(data){
            ok( foobar, "Script results returned (GET, no callback)" );
            start();
        }
    });
});

test("baidu.ajax() - malformed JSON", function() {
    expect(2);

    stop();
    
    baidu.ajax({
        url: upath + "/ajax/badjson.js",
        dataType: "json",
        success: function(){
            ok( false, "Success." );
            start();
        },
        error: function(xhr, msg, detailedMsg) {
            equal( "parsererror", msg, "A parse error occurred." );
            ok( /(invalid|error|exception)/i.test(detailedMsg), "Detailed parsererror message provided" );
            start();
        }
    });
});


test("baidu.ajax() - script by content-type", function() {
    expect(2);

    stop();

    $.when(

        baidu.ajax({
            url: upath + "/ajax/script.php",
            data: { header: "script" }
        }),

        baidu.ajax({
            url: upath + "/ajax/script.php",
            data: { header: "ecma" }
        })

    ).always(function() {
        start();
    });
});

test("baidu.ajax() - json by content-type", function() {
    expect(5);

    stop();

    baidu.ajax({
        url: upath + "/ajax/json.php",
        data: { header: "json", json: "array" },
        success: function( json ) {
            ok( json.length >= 2, "Check length");
            equal( json[0].name, "John", "Check JSON: first, name" );
            equal( json[0].age, 21, "Check JSON: first, age" );
            equal( json[1].name, "Peter", "Check JSON: second, name" );
            equal( json[1].age, 25, "Check JSON: second, age" );
            start();
        }
    });
});

test("baidu.ajax() - json by content-type disabled with options", function() {
    expect(6);

    stop();

    baidu.ajax({
        url: upath + "/ajax/json.php",
        data: { header: "json", json: "array" },
        contents: {
            json: false
        },
        success: function( text ) {
            equal( typeof text , "string" , "json wasn't auto-determined" );
            var json = $.parseJSON( text );
            ok( json.length >= 2, "Check length");
            equal( json[0].name, "John", "Check JSON: first, name" );
            equal( json[0].age, 21, "Check JSON: first, age" );
            equal( json[1].name, "Peter", "Check JSON: second, name" );
            equal( json[1].age, 25, "Check JSON: second, age" );
            start();
        }
    });
});

test("baidu.ajax.setup({timeout: Number}) - with global timeout", function() {
    stop();

    baidu.ajax.setup({timeout: 1000});

    var pass = function() {
        ok( true, "Check local and global callbacks after timeout" );
        start();
    };

    var fail = function(a,b,c) {
        ok( false, "Check for timeout failed " + a + " " + b );
        start();
    };

    baidu.ajax({
      type: "GET",
      url: upath + "/ajax/name.php?wait=5",
      error: pass,
      success: fail
    });

    // reset timeout
    baidu.ajax.setup({timeout: 0});
});

test("baidu.ajax.setup({timeout: Number}) with localtimeout", function() {
    stop();
    baidu.ajax.setup({timeout: 50});

    baidu.ajax({
      type: "GET",
      timeout: 15000,
      url: upath + "/ajax/name.php?wait=1",
      error: function() {
           ok( false, "Check for local timeout failed" );
           start();
      },
      success: function() {
        ok( true, "Check for local timeout" );
        start();
      }
    });

    // reset timeout
    baidu.ajax.setup({timeout: 0});
});

test("baidu.ajax - simple get", function() {
    expect(1);
    stop();
    baidu.ajax({
      type: "GET",
      url: upath + "/ajax/name.php?name=foo",
      success: function(msg){
        equal( msg, "bar", "Check for GET" );
        start();
      }
    });
});

test("baidu.ajax - simple post", function() {
    expect(1);
    stop();
    baidu.ajax({
      type: "POST",
      url: upath + "/ajax/name.php",
      data: "name=peter",
      success: function(msg){
        equal( msg, "pan", "Check for POST" );
        start();
      }
    });
});

test("ajaxSetup()", function() {
    expect(1);
    stop();
    baidu.ajax.setup({
        url: upath + "/ajax/name.php?name=foo",
        success: function(msg){
            equal( msg, "bar", "Check for GET" );
            baidu.ajax.setup({
                success: function(){}
            });
            start();
        }
    });
    baidu.ajax();
});

test("data option: evaluate function values (#2806)", function() {
    stop();
    baidu.ajax({
        url: upath + "/ajax/echoQuery.php",
        data: {
            key: function() {
                return "value";
            }
        },
        success: function(result) {
            equal( result, "key=value" );
            start();
        }
    });
});

test("data option: empty bodies for non-GET requests", function() {
    stop();
    baidu.ajax({
        url: upath + "/ajax/echoData.php",
        data: undefined,
        type: "post",
        success: function(result) {
            equal( result, "" );
            start();
        }
    });
});

var ifModifiedNow = new Date();

$.each( { " (cache)": true, " (no cache)": false }, function( label, cache ) {

    test("baidu.ajax - If-Modified-Since support" + label, function() {
        expect( 3 );

        stop();

        var url = upath + "/ajax/if_modified_since.php?ts=" + ifModifiedNow++;

        baidu.ajax({
            url: url,
            ifModified: true,
            cache: cache,
            success: function(data, status) {
                equal(status, "success" );

                baidu.ajax({
                    url: url,
                    ifModified: true,
                    cache: cache,
                    success: function(data, status) {
                        if ( data === "FAIL" ) {
                            ok($.browser.opera, "Opera is incapable of doing .setRequestHeader('If-Modified-Since').");
                            ok($.browser.opera, "Opera is incapable of doing .setRequestHeader('If-Modified-Since').");
                        } else {
                            equal(status, "notmodified");
                            ok(data == null, "response body should be empty");
                        }
                        start();
                    },
                    error: function() {
                        // Do this because opera simply refuses to implement 304 handling :(
                        // A feature-driven way of detecting this would be appreciated
                        // See: http://gist.github.com/599419
                        ok($.browser.opera, "error");
                        ok($.browser.opera, "error");
                        start();
                    }
                });
            },
            error: function() {
                equal(false, "error");
                // Do this because opera simply refuses to implement 304 handling :(
                // A feature-driven way of detecting this would be appreciated
                // See: http://gist.github.com/599419
                ok($.browser.opera, "error");
                start();
            }
        });
    });

    test("baidu.ajax - Etag support" + label, function() {
        expect( 3 );

        stop();

        var url = upath + "/ajax/etag.php?ts=" + ifModifiedNow++;

        baidu.ajax({
            url: url,
            ifModified: true,
            cache: cache,
            success: function(data, status) {
                equal(status, "success" );

                baidu.ajax({
                    url: url,
                    ifModified: true,
                    cache: cache,
                    success: function(data, status) {
                        if ( data === "FAIL" ) {
                            ok($.browser.opera, "Opera is incapable of doing .setRequestHeader('If-None-Match').");
                            ok($.browser.opera, "Opera is incapable of doing .setRequestHeader('If-None-Match').");
                        } else {
                            equal(status, "notmodified");
                            ok(data == null, "response body should be empty");
                        }
                        start();
                    },
                    error: function() {
                        // Do this because opera simply refuses to implement 304 handling :(
                        // A feature-driven way of detecting this would be appreciated
                        // See: http://gist.github.com/599419
                        ok($.browser.opera, "error");
                        ok($.browser.opera, "error");
                        start();
                    }
                });
            },
            error: function() {
                // Do this because opera simply refuses to implement 304 handling :(
                // A feature-driven way of detecting this would be appreciated
                // See: http://gist.github.com/599419
                ok($.browser.opera, "error");
                start();
            }
        });
    });
});

test("baidu ajax - failing cross-domain", function() {

    expect( 2 );

    stop();

    var i = 2;

    baidu.ajax({
        url: "http://somewebsitethatdoesnotexist-67864863574657654.com",
        success: function(){ ok( false , "success" ); },
        error: function(xhr,_,e){ ok( true , "file not found: " + xhr.status + " => " + e ); },
        complete: function() { if ( ! --i ) start(); }
    });

    baidu.ajax({
        url: "http://www.google.com",
        success: function(){ ok( false , "success" ); },
        error: function(xhr,_,e){ ok( true , "access denied: " + xhr.status + " => " + e ); },
        complete: function() { if ( ! --i ) start(); }
    });

});

test("baidu ajax - atom+xml", function() {

    stop();

    baidu.ajax({
        url: upath + "/ajax/atom+xml.php",
        success: function(){ ok( true , "success" ); },
        error: function(){ ok( false , "error" ); },
        complete: function() { start(); }
    });

});

test( "baidu.ajax - Location object as url (#7531)", 1, function () {
    var success = false;
    try {
        var xhr = baidu.ajax({ url: window.location });
        success = true;
        xhr.abort();
    } catch (e) {}

    ok( success, "document.location did not generate exception" );
});

test( "baidu.ajax - Context with circular references (#9887)", 2, function () {
    var success = false,
        context = {};
    context.field = context;
    try {
        baidu.ajax( "non-existing", {
            context: context,
            beforeSend: function() {
                ok( this === context, "context was not deep extended" );
                return false;
            }
        });
        success = true;
    } catch (e) { console.log( e ); }
    ok( success, "context with circular reference did not generate an exception" );
});

test( "baidu.ajax - statusText" , 3, function() {
    stop();
    baidu.ajax( upath + "/ajax/statusText.php?status=200&text=Hello" ).done(function( _, statusText, jqXHR ) {
        strictEqual( statusText, "success", "callback status text ok for success" );
        ok( jqXHR.statusText === "Hello" || $.browser.safari && jqXHR.statusText === "OK", "jqXHR status text ok for success (" + jqXHR.statusText + ")" );
        baidu.ajax( upath + "/ajax/statusText.php?status=404&text=World" ).fail(function( jqXHR, statusText ) {
            strictEqual( statusText, "error", "callback status text ok for error" );
            // ok( jqXHR.statusText === "World" || jQuery.browser.safari && jqXHR.statusText === "Not Found", "jqXHR status text ok for error (" + jqXHR.statusText + ")" );
            start();
        });
    });
});

test( "baidu.ajax - statusCode" , function() {

    var count = 12;

    expect( 20 );
    stop();

    function countComplete() {
        if ( ! --count ) {
            start();
        }
    }

    function createStatusCodes( name , isSuccess ) {
        name = "Test " + name + " " + ( isSuccess ? "success" : "error" );
        return {
            200: function() {
                ok( isSuccess , name );
            },
            404: function() {
                ok( ! isSuccess , name );
            }
        };
    }

    $.each( {
        "/ajax/name.html": true,
        "/ajax/someFileThatDoesNotExist.html": false
    } , function( uri , isSuccess ) {
        baidu.ajax( upath + uri , {
            statusCode: createStatusCodes( "in options" , isSuccess ),
            complete: countComplete
        });

        baidu.ajax( upath + uri , {
            complete: countComplete
        }).statusCode( createStatusCodes( "immediately with method" , isSuccess ) );

        baidu.ajax( upath + uri , {
            complete: function(jqXHR) {
                jqXHR.statusCode( createStatusCodes( "on complete" , isSuccess ) );
                countComplete();
            }
        });

        baidu.ajax( upath + uri , {
            complete: function(jqXHR) {
                setTimeout(function() {
                    jqXHR.statusCode( createStatusCodes( "very late binding" , isSuccess ) );
                    countComplete();
                } , 100 );
            }
        });

        baidu.ajax( upath + uri , {
            statusCode: createStatusCodes( "all (options)" , isSuccess ),
            complete: function(jqXHR) {
                jqXHR.statusCode( createStatusCodes( "all (on complete)" , isSuccess ) );
                setTimeout(function() {
                    jqXHR.statusCode( createStatusCodes( "all (very late binding)" , isSuccess ) );
                    countComplete();
                } , 100 );
            }
        }).statusCode( createStatusCodes( "all (immediately with method)" , isSuccess ) );

        var testString = "";

        baidu.ajax( upath + uri, {
            success: function( a , b , jqXHR ) {
                ok( isSuccess , "success" );
                var statusCode = {};
                statusCode[ jqXHR.status ] = function() {
                    testString += "B";
                };
                jqXHR.statusCode( statusCode );
                testString += "A";
            },
            error: function( jqXHR ) {
                ok( ! isSuccess , "error" );
                var statusCode = {};
                statusCode[ jqXHR.status ] = function() {
                    testString += "B";
                };
                jqXHR.statusCode( statusCode );
                testString += "A";
            },
            complete: function() {
                strictEqual( testString , "AB" , "Test statusCode callbacks are ordered like " +
                        ( isSuccess ? "success" :  "error" ) + " callbacks" );
                countComplete();
            }
        } );

    });
});

test("baidu.ajax - transitive conversions", function() {

    expect( 8 );

    stop();

    $.when(

        baidu.ajax( upath + "/ajax/json.php", {
            converters: {
                "json myJson": function( data ) {
                    ok( true , "converter called" );
                    return data;
                }
            },
            dataType: "myJson",
            success: function() {
                ok( true , "Transitive conversion worked" );
                strictEqual( this.dataTypes[0] , "text" , "response was retrieved as text" );
                strictEqual( this.dataTypes[1] , "myjson" , "request expected myjson dataType" );
            }
        }),

        baidu.ajax( upath + "/ajax/json.php", {
            converters: {
                "json myJson": function( data ) {
                    ok( true , "converter called (*)" );
                    return data;
                }
            },
            contents: false, /* headers are wrong so we ignore them */
            dataType: "* myJson",
            success: function() {
                ok( true , "Transitive conversion worked (*)" );
                strictEqual( this.dataTypes[0] , "text" , "response was retrieved as text (*)" );
                strictEqual( this.dataTypes[1] , "myjson" , "request expected myjson dataType (*)" );
            }
        })

    ).always(function() {
        start();
    });

});

test("baidu.ajax - overrideMimeType", function() {

    expect( 2 );

    stop();

    $.when(

        baidu.ajax( upath + "/ajax/json.php", {
            beforeSend: function( xhr ) {
                xhr.overrideMimeType( "application/json" );
            },
            success: function( json ) {
                ok( json.data , "Mimetype overriden using beforeSend" );
            }
        }),

        baidu.ajax( upath + "/ajax/json.php", {
            mimeType: "application/json",
            success: function( json ) {
                ok( json.data , "Mimetype overriden using mimeType option" );
            }
        })

    ).always(function() {
        start();
    });

});


test( "baidu.ajax - loading binary data shouldn't throw an exception in IE (#11426)", 1, function() {
    stop();
    baidu.ajax( upath + "/ajax/1x1.jpg", {
        success: function( data ) {
            ok( data === undefined || /JFIF/.test( data ) , "success callback reached" );
            start();
        },
        error: function( _, __, error ) {
            ok( false, "exception thrown: '" + error + "'" );
            start();
        }
    });
});
