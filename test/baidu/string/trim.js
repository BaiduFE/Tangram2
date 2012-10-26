module("baidu.trim测试");
//加载快捷方式
test('prepareTest',function(){
	expect(1);
	stop();

	//加载快捷方式
	ua.importsrc("baidu.short", function(){
		start();
		ok(true,'ok');
	}, "baidu.trim", "baidu.string.trim");
});

test("删除字符串两边的空格", function(){
	var sStr = "     半角空格tab键	 ";
	equals(baidu.string(sStr).trim(), "半角空格tab键");
	
	//快捷方式
	sStr = "　　全角空格回车　\n";
	equals(baidu.trim(sStr), "全角空格回车");
	
	//全角与空格
	sStr = "　　	  ";
	equals(baidu.string(sStr).trim(), ""); //空
});

//老接口
test("删除字符串两边的空格", function(){
	var sStr = "     半角空格tab键	 ";
	equals(baidu.string.trim(sStr), "半角空格tab键");
	
	//快捷方式
	sStr = "　　全角空格回车　\n";
	equals(baidu.trim(sStr), "全角空格回车");
	
	//全角与空格
	sStr = "　　	  ";
	equals(baidu.string.trim(sStr), ""); //空
});

//describe('baidu.trim测试', {
//	'删除字符串两边的空格': function() {
//		var sStr = "     半角空格tab键	 ";
//		value_of(baidu.string.trim(sStr)).should_be("半角空格tab键");
//
//		sStr = "　　全角空格回车　\n";
//		//快捷方式
//		value_of(baidu.trim(sStr)).should_be("全角空格回车");
//
//		sStr = "　　	  ";
//		value_of(baidu.string.trim(sStr)).should_be_empty();
//	}
//});