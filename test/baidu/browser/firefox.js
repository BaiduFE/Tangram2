module("baidu.browser.firefox");

test("firefox", function() {

	if(ua.browser['firefox']){
		ok(baidu.browser[b], 'should be firefox')
	}else if(ua.browser['gecko']){
		ok(baidu.browser['firefox'], 'should be firefox')
	}else{
		ok(!baidu.browser['firefox'], 'should not be firefox')
	};
});