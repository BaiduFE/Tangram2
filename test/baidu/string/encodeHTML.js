module("baidu.string.encodeHTML测试");

//加载快捷方式
test('prepareTest',function(){
	expect(1);
	stop();

	//加载快捷方式
	ua.importsrc("baidu.short", function(){
		start();
		ok(true,'ok');
	}, "baidu.string.encodeHTML", "baidu.string.encodeHTML");
});

//新接口
test('将字符<>"&转成实体字符', function(){
	var strEncodeHTML="";
	
	strEncodeHTML = baidu.string('<>"&').encodeHTML();
	equals(strEncodeHTML, "&lt;&gt;&quot;&amp;");
	
	strEncodeHTML = baidu.string('<input type="text" value="data"/>').encodeHTML();
	equals(strEncodeHTML, "&lt;input type=&quot;text&quot; value=&quot;data&quot;/&gt;");
	
	strEncodeHTML = baidu.string('&amp;&<<<>>').encodeHTML();
	equals(strEncodeHTML, "&amp;amp;&amp;&lt;&lt;&lt;&gt;&gt;");
	
});

/**
 * transfer entity to html code, "<" for "&lt;" or """ for "&quot;" and so on
 * use two function(baidu.string.decodeHTML() and baidu.decodeHTML())
 */

//老接口
test('baidu.string.filterFormat将字符<>"&转成实体字符', function(){
	var strEncodeHTML="";
	
	strEncodeHTML = baidu.string.encodeHTML('<>"&');
	equals(strEncodeHTML, "&lt;&gt;&quot;&amp;");
	
	strEncodeHTML = baidu.string.encodeHTML('<input type="text" value="data"/>');
	equals(strEncodeHTML, "&lt;input type=&quot;text&quot; value=&quot;data&quot;/&gt;");
	
	strEncodeHTML = baidu.string.encodeHTML('&amp;&<<<>>');
	equals(strEncodeHTML, "&amp;amp;&amp;&lt;&lt;&lt;&gt;&gt;");
	
});

test("快捷方式测试", function(){
	var strEncodeHTML="";
	
	strEncodeHTML = baidu.encodeHTML('<>"&');
	equals(strEncodeHTML, "&lt;&gt;&quot;&amp;");
	
	strEncodeHTML = baidu.encodeHTML('<input type="text" value="data"/>');
	equals(strEncodeHTML, "&lt;input type=&quot;text&quot; value=&quot;data&quot;/&gt;");
	
	strEncodeHTML = baidu.encodeHTML('&amp;&<<<>>');
	equals(strEncodeHTML, "&amp;amp;&amp;&lt;&lt;&lt;&gt;&gt;");
});

//describe('baidu.encodeHTML测试', {
//	'将字符<>"&转成实体字符': function() {
//		value_of(baidu.string.encodeHTML('<>"&')).
//			should_be("&lt;&gt;&quot;&amp;");
//		value_of(baidu.string.encodeHTML('<input type="text" value="data"/>')).
//			should_be('&lt;input type=&quot;text&quot; value=&quot;data&quot;/&gt;');
//		value_of(baidu.string.encodeHTML('&amp;&<<<>>')).
//			should_be('&amp;amp;&amp;&lt;&lt;&lt;&gt;&gt;');
//	},
//
//    '快捷方式测试': function () {
//        value_of(baidu.encodeHTML('<>"&')).
//			should_be("&lt;&gt;&quot;&amp;");
//        value_of(baidu.encodeHTML('<input type="text" value="data"/>')).
//			should_be('&lt;input type=&quot;text&quot; value=&quot;data&quot;/&gt;');
//		value_of(baidu.encodeHTML('&amp;&<<<>>')).
//			should_be('&amp;amp;&amp;&lt;&lt;&lt;&gt;&gt;');
//    }
//});