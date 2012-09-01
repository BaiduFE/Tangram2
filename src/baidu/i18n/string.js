/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */
///import baidu.i18n;
/**
 * string
 * @name baidu.i18n.string
 * @Object
 * @grammar baidu.i18n.string
 */
baidu.i18n.string = baidu.i18n.string || /**@lends baidu.i18n.string.prototype*/{
    
    /**
     * 按照某种语言的格式去掉字符串两边的空白字符
     * @grammar baidu.i18n.string.trim(source, locale)
     * @param {String} source 需要格式化的语言
     * @param {String} [locale] 目标语言
     * @return {String}
     */
    trim: function(source, locale){
        var pat = baidu.i18n.cultures[locale || baidu.i18n.currentLocale].whitespace;
        return String(source).replace(pat,"");
    },

    /**
     * 将传入的字符串翻译成目标语言
     * @grammar baidu.i18n.string.translation(source, locale)
     * @param {String} source 需要进行翻译的字符串
     * @param {String} [locale] 目标语言
     * @return {String}
     */
    translation: function(source, locale){
        var tOpt = baidu.i18n.cultures[locale || baidu.i18n.currentLocale].language;

        return tOpt[source] || '';
    }

};
