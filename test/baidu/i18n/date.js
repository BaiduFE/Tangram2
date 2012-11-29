module("baidu.i18n.date");

test('getDaysInMonth', function(){
	stop();
	ua.importsrc('baidu.i18n.cultures.en-US,baidu.i18n.cultures.zh-CN', function(){
		equals(baidu.i18n.date.getDaysInMonth(2011, 0), 31, '2011.1');
		equals(baidu.i18n.date.getDaysInMonth(2011, 1), 28, '2011.2');
		equals(baidu.i18n.date.getDaysInMonth(2011, 2), 31, '2011.3');
		equals(baidu.i18n.date.getDaysInMonth(2011, 3), 30, '2011.4');
		equals(baidu.i18n.date.getDaysInMonth(2011, 4), 31, '2011.5');
		equals(baidu.i18n.date.getDaysInMonth(2011, 5), 30, '2011.6');
		equals(baidu.i18n.date.getDaysInMonth(2011, 6), 31, '2011.7');
		equals(baidu.i18n.date.getDaysInMonth(2011, 7), 31, '2011.8');
		equals(baidu.i18n.date.getDaysInMonth(2011, 8), 30, '2011.9');
		equals(baidu.i18n.date.getDaysInMonth(2011, 9), 31, '2011.10');
		equals(baidu.i18n.date.getDaysInMonth(2011, 10), 30, '2011.11');
		equals(baidu.i18n.date.getDaysInMonth(2011, 11), 31, '2011.12');
		equals(baidu.i18n.date.getDaysInMonth(2012, 0), 31, '2012.1');
		equals(baidu.i18n.date.getDaysInMonth(1, 0), 31, '1.1');
		equals(baidu.i18n.date.getDaysInMonth(2011, 12), undefined, '2011.13');
		equals(baidu.i18n.date.getDaysInMonth(2000, 1), 29, '2000.2');
		start();
	}, 'baidu.i18n.cultures.en-US','baidu.i18n.date');
});

test('isLeapYear', function(){
	ok(baidu.i18n.date.isLeapYear(2000), '2000');
	ok(baidu.i18n.date.isLeapYear(2004), '2004');
	ok(!baidu.i18n.date.isLeapYear(1900), '1900');
	ok(!baidu.i18n.date.isLeapYear(2010), '2010');
});

test('toLocaleDate', function(){
	var date = new Date();
	localTime = date.getTime();
	localOffset=date.getTimezoneOffset()*60000; //获得当地时间偏移的毫秒数
	utc = localTime + localOffset; //utc即GMT时间
	offset = -5; //-5区 美国时间
	us = utc + (3600000*offset);
	date_5 = new Date(us);
	baidu.i18n.currentLocale = 'zh-CN';
	var newtoen = baidu.i18n.date.toLocaleDate(date, undefined, 'en-US');
	equals(newtoen.toString() ,date_5.toString(), 'Convert to en-US time');
	var newtozh = baidu.i18n.date.toLocaleDate(date);
	equals(newtozh.toString(), date.toString(), 'Convert to zh-CN time');
	var newzhtoen = baidu.i18n.date.toLocaleDate(date, 'zh-CN', 'en-US');
	equals(newzhtoen.toString() ,date_5.toString(), 'Convert to en-US time');
	var newzhtozh = baidu.i18n.date.toLocaleDate(date, 'zh-CN', 'zh-CN');
	equals(newzhtozh.toString(), date.toString(), 'Convert to zh-CN time');
	var newentoen = baidu.i18n.date.toLocaleDate(date_5, 'en-US', 'en-US');
	equals(newentoen.toString() ,date_5.toString(), 'Convert to en-US time');
	var newentozh= baidu.i18n.date.toLocaleDate(date_5, 'en-US', 'zh-CN');
	equals(newentozh.toString(), date.toString(), 'Convert to zh-CN time');
});

test('custom language', function(){
	var date = new Date();
	localTime = date.getTime();
	localOffset=date.getTimezoneOffset()*60000; //获得当地时间偏移的毫秒数
	utc = localTime + localOffset; //utc即GMT时间
	offset = -4; //-4区 加拿大时间
	ca = utc + (3600000*offset);
	date_4 = new Date(ca); 
	var newentozh= baidu.i18n.date.toLocaleDate(date_4, 'en-CA', 'zh-CN');
	equals(newentozh.toString(), date.toString(), 'Convert to zh-CN time');
	var newzhtoen = baidu.i18n.date.toLocaleDate(date, 'zh-CN', 'en-CA');
	equals(newzhtoen.toString() ,date_4.toString(), 'Convert to en-US time');
});
