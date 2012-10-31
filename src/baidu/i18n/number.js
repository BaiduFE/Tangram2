/// Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */
///import baidu.i18n;
/**
 * number
 * @name baidu.i18n.number
 * @Object
 * @grammar baidu.i18n.number
 */
baidu.i18n.number = baidu.i18n.number || /**@lends baidu.i18n.number.prototype*/{

    /**
     * 将传入的数字或者文字某种语言的格式进行格式化
     * @grammar baidu.i18n.number.format(number, sLocale, tLocale)
     * @param {String|Number} number 需要进行格式化的数字或者文字
     * @param {String} [sLocale] 可选参数，若传入的number格式为字符串，则该参数必须传入
     * @param {String} [tLocale] 目标语言
     * @return {String}
     */
    format: function(number, sLocale, tLocale){
        var me = this,
            sOpt = sLocale && baidu.i18n.cultures[sLocale].number,
            tOpt = baidu.i18n.cultures[tLocale || baidu.i18n.currentLocale].number,
            isNegative = false;

        if(typeof number === 'string'){
            
            if(number.indexOf(sOpt.negative) > -1){
                isNegative = true;
                number = number.replace(sOpt.negative, "");   
            }else if(number.indexOf(sOpt.positive) > -1){
                number = number.replace(sOpt.positive, "");
            }
            number = number.replace(new RegExp(sOpt.group,'g'), "");
        }else{
            if(number < 0){
                isNegative = true;
                number *= -1;       
            }
        }
        number = parseFloat(number);
        if(isNaN(number)){
            return 'NAN'; 
        }
        
        return tOpt._format ? tOpt._format(number, isNegative) : me._format(number, {
            group: tOpt.group || ',',
            decimal: tOpt.decimal || '.',
            groupLength: tOpt.groupLength,
            symbol: isNegative ? tOpt.negative : tOpt.positive
        });
    },

    /**
     * 格式化数字
     * @private
     * @param {Number} number 需要格式化的数字
     * @param {Object} options 格式化数字使用的参数
     * @return {String}
     */
    _format: function(number, options){
        var numberArray = String(number).split(options.decimal),
            preNum = numberArray[0].split('').reverse(),
            aftNum = numberArray[1] || '',
            len = 0,remainder = 0,
            result = '';
        
        len = parseInt(preNum.length / options.groupLength);
        remainder = preNum.length % options.groupLength;
        len = remainder == 0 ? len - 1 : len;

        for(var i = 1; i <= len; i++){
            preNum.splice(options.groupLength * i + (i - 1), 0, options.group);    
        }
        preNum = preNum.reverse();
        result = options.symbol + preNum.join('') + (aftNum.length > 0 ? options.decimal + aftNum : '');

        return result;
    }
};
/// Tangram 1.x Code End