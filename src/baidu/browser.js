///import baidu.extend;

/*
 * @fileoverview
 * @name baidu.browser
 * @author gucong
 * @create 2013-09-17
 * @modify
 */

/**
 * @description 判断浏览器类型和特性的属性
 * @namespace
 * @name baidu.browser
 * @grammar baidu.browser.ie
 * @grammar baidu.browser.chrome
 * @grammar baidu.browser.firefox
 * @grammar baidu.browser.opera
 * @grammar baidu.browser.safari
 * @grammar baidu.browser.isGecko
 * @grammar baidu.browser.isStrict
 * @grammar baidu.browser.isWebkit
 * @grammar baidu.browser.gecko
 * @grammar baidu.browser.webkit
 * @grammar baidu.browser.sogou
 * @grammar baidu.browser.liebao
 * @grammar baidu.browser.maxthon
 * @grammar baidu.browser.theworld
 * @grammar baidu.browser.taoBrowser
 * @grammar baidu.browser.coolnovo
 */

baidu.browser = baidu.browser || function(){
	var win = window,
		ext = win.external || {},
 		doc = win.document,
		ie = doc.documentMode,
		strict = doc.compatMode,
		nav = win.navigator,
		ua = nav.userAgent,
		result = {
			isStrict : (strict && strict !== "BackCompat")
			,isWebkit: false
			,isGecko: false
	};

	function getver(name, split) {
		return new RegExp("\\b" + name + (split || "/") + "([\\w.]+)\\b").test(ua) ? RegExp['\x241'] : true;
	}

	if( ie || !doc.querySelector ){
		result.ie = ie || (result.isStrict ? "XMLHttpRequest" in win ? 7 : 6 : 5);
	} else if ( win.opera && opera.version ) {
		//老版本Opera(<=12)，>=15以后采用Chrome内核
		result.opera = opera.version();
	} else if ( win.netscape ) {
		result.isGecko = true;
		result.gecko = getver("rv", ":");
		result.firefox = getver("Firefox");
	} else {
		ua = nav.appVersion;

		result.webkit = getver("\\w*WebKit");
		result.isWebkit = true;

		if( win.chrome ){
			//判定为Chrome
			result.chrome = getver("Chrome");
		} else if ( /^Apple/.test(nav.vendor) ){
			//判定为Safari
			result.safari = getver("Version");
		}

		function setver(name, split){
			var ver = getver(name, split);
			if(ver !== true){
				return result[name.toLowerCase()] = ver;
			}
		}

		//搜狗浏览器
		(ext.SEVersion && (result.sogou = ext.SEVersion() || true)) ||

		//猎豹
		(ext.LiebaoGetVersion && (result.liebao = ext.LiebaoGetVersion() || true)) ||
		
		//傲游
		( "max_version" in ext && setver("Maxthon") ) ||
		
		//TheWorld
		setver("TheWorld", "\\s") ||

		//淘宝浏览器
		setver("TaoBrowser") ||

		//枫树浏览器
		( "coolnovo" in ext && setver("CoolNovo") );
		
		//QQ浏览器,360急速,360安全3款浏览器无探测方法
	}

	baidu.extend(baidu, result);

	return result;
}();
