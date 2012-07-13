module("baidu.browser");

test("Internet Explorer", function(){
    var b = "ie";

    ua.browser[b] ? ok( baidu[b], "ie") : ok(!baidu[b], "ie");

    if ( ua.browser[b] ) {
        equal(1, 1, "Version : "+ baidu[b]);
    }
});

test("Chrome", function(){
    var b = "chrome";

    ua.browser[b] ? ok( baidu[b], "Chrome") : ok(!baidu[b], "Chrome");

    if ( ua.browser[b] ) {
        equal(1, 1, "Version : "+ baidu[b]);
    }
});

test("Firefox", function(){
    var b = "firefox";

    ua.browser[b] ? ok( baidu[b], "Firefox") : ok(!baidu[b], "Firefox");

    if ( ua.browser[b] ) {
        equal(1, 1, "Version : "+ baidu[b]);
    }
});

test("Safari", function(){
	expect(1);
    
    if (baidu.safari) {
		var browser = navigator.userAgent;
        if ((/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(browser) && !/chrome/i.test(browser))) {
			ok(true, "this browser is safari");
		}
	} else {
        if (!(/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(browser) && !/chrome/i.test(browser)))
			ok(true, "this browser is not safari");
	}
});


test("Opera", function(){
    var b = "firefox";

    ua.browser[b] ? ok( baidu[b], "Opera") : ok(!baidu[b], "Opera");

    if ( ua.browser[b] ) {
        equal(1, 1, "Version : "+ baidu[b]);
    }
});

test('isStrict', function() {
    equal(baidu.isStrict, document.compatMode == "CSS1Compat", "当前网页盒模型是Strict");
});

test('isGecko', function() {
	var b = 'Gecko';
	ua.browser[b.toLowerCase()] ? ok(baidu['is' + b], 'should be ' + b)
			: ok(!baidu['is' + b], 'should not be ' + b);
});

test('isWebkit', function() {
	var b = 'Webkit';
	ua.browser[b.toLowerCase()] ? ok(baidu['is' + b], 'should be ' + b)
			: ok(!baidu['is' + b], 'should not be ' + b);
});