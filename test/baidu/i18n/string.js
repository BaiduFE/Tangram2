module("baidu.i18n.string");

test('trim', function(){
	stop();
	ua.importsrc('baidu.i18n.cultures.en-US,baidu.i18n.cultures.zh-CN', function(){
		equals(baidu.i18n.string.trim('', 'zh-CN'), '', 'check ""');
		equals(baidu.i18n.string.trim(' ', 'zh-CN'), '', 'check " "');
		equals(baidu.i18n.string.trim('    1fsdgs   ', 'zh-CN'), '1fsdgs', 'check "1fsdgs"');
		equals(baidu.i18n.string.trim('1fsdgs ', 'zh-CN'), '1fsdgs', 'check "1fsdgs"');
		equals(baidu.i18n.string.trim(' 1fsdgs','zh-CN'), '1fsdgs', 'check "1fsdgs"');
		equals(baidu.i18n.string.trim('', 'en-US'), '', 'check ""');
		equals(baidu.i18n.string.trim(' ', 'en-US'), '', 'check " "');
		equals(baidu.i18n.string.trim('   1fsdgs   ', 'en-US'), '1fsdgs', 'check "1fsdgs"');
		equals(baidu.i18n.string.trim('1fsdgs ', 'en-US'), '1fsdgs', 'check "1fsdgs"');
		equals(baidu.i18n.string.trim(' 1fsdgs', 'en-US'), '1fsdgs', 'check "1fsdgs"');
		start();
	}, 'baidu.i18n.cultures.en-US','baidu.i18n.string');
});

test('translation', function(){
	equals(baidu.i18n.string.translation('ok', 'zh-CN'), '确定', 'en-US to zh-CN');
	equals(baidu.i18n.string.translation('cancel', 'zh-CN'), '取消', 'en-US to zh-CN');
	equals(baidu.i18n.string.translation('signin', 'zh-CN'), '注册', 'en-US to zh-CN');
	equals(baidu.i18n.string.translation('signup', 'zh-CN'), '登录', 'en-US to zh-CN');
	equals(baidu.i18n.string.translation('ok', 'en-US'), 'ok', 'en-US to en-US');
	equals(baidu.i18n.string.translation('cancel', 'en-US'), 'cancel', 'en-US to en-US');
	equals(baidu.i18n.string.translation('signin', 'en-US'), 'signin', 'en-US to en-US');
	equals(baidu.i18n.string.translation('signup', 'en-US'), 'signup', 'en-US to en-US');
});

test('custom language', function(){
	baidu.i18n.currentLocale = 'en-CA';
	equals(baidu.i18n.string.trim(''), '', 'check ""');
	equals(baidu.i18n.string.trim(' '), '', 'check " "');
	equals(baidu.i18n.string.trim('   1fsdgs   '), '1fsdgs', 'check "1fsdgs"');
	equals(baidu.i18n.string.trim('1fsdgs '), '1fsdgs', 'check "1fsdgs"');
	equals(baidu.i18n.string.trim(' 1fsdgs'), '1fsdgs', 'check "1fsdgs"');
	equals(baidu.i18n.string.translation('ok'), 'ok', 'en-CA to en-CA');
	equals(baidu.i18n.string.translation('cancel'), 'cancel', 'en-CA to en-CA');
	equals(baidu.i18n.string.translation('signin'), 'signin', 'en-CA to en-CA');
	equals(baidu.i18n.string.translation('signup'), 'signup', 'en-CA to en-CA');
});