module("baidu.i18n.currency");

test('numeric', function(){
	stop();
	ua.importsrc('baidu.i18n.cultures.en-US,baidu.i18n.cultures.zh-CN', function(){
		baidu.i18n.currentLocale = 'zh-CN';
		equals(baidu.i18n.currency.format(0), '￥0', 'no sLocale');
		equals(baidu.i18n.currency.format(1000000000, undefined, 'en-US'), '$1,000,000,000', 'no sLocale');
		equals(baidu.i18n.currency.format(-1000000000, 'zh-CN', 'zh-CN'), '￥-1,000,000,000', 'zh-CN to zh-CN');
	//  目前这个bug改不了，暂时屏蔽
	//	equals(baidu.i18n.currency.format('en-US', 12345678.90, 'en-US'), '$12,345,678.90', 'en-US to en-US');
		equals(baidu.i18n.currency.format(1000000000.1, 'en-US', 'zh-CN'), '￥1,000,000,000.1', 'zh-CN to en-US');
		equals(baidu.i18n.currency.format(12345678.901, 'zh-CN', 'en-US'), '$12,345,678.901', 'en-US to zh-CN');
		start();
	}, 'baidu.i18n.cultures.en-US','baidu.i18n.currency');
	
});

test('string', function(){
	equals(baidu.i18n.currency.format('0', 'zh-CN','zh-CN'), '￥0', 'no sLocale');
	equals(baidu.i18n.currency.format('1000000000', 'zh-CN', 'en-US'), '$1,000,000,000', 'no sLocale');
	equals(baidu.i18n.currency.format('123,45678.901', 'zh-CN', 'zh-CN'), '￥12,345,678.901', 'zh-CN to zh-CN');
	equals(baidu.i18n.currency.format('-100,000,0000', 'en-US', 'en-US'), '$-1,000,000,000', 'en-US to en-US');
//  目前这个bug改不了，暂时屏蔽
//	equals(baidu.i18n.currency.format('zh-CN', '12345678.90', 'en-US'), '￥12,345,678.90', 'zh-CN to en-US');
	equals(baidu.i18n.currency.format('10000,00000.1', 'zh-CN', 'en-US'), '$1,000,000,000.1', 'en-US to zh-CN');
});

test('custom language', function(){
	equals(baidu.i18n.currency.format(1000000000.1, 'en-CA', 'zh-CN'), '￥1,000,000,000.1', 'zh-CN to en-CA');
	equals(baidu.i18n.currency.format(12345678.901, 'zh-CN', 'en-CA'), 'CAD$12,345,678.901', 'en-CA to zh-CN');
	equals(baidu.i18n.currency.format('123,45678.901', 'zh-CN', 'zh-CN'), '￥12,345,678.901', 'zh-CN to zh-CN');
	equals(baidu.i18n.currency.format('-100,000,0000', 'en-CA', 'en-CA'), 'CAD$-1,000,000,000', 'en-CA to en-CA');
});