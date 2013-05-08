/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */
///import baidu.i18n.cultures;
///import baidu.object.extend;

baidu.i18n.cultures['zh-CN'] = baidu.object.extend(baidu.i18n.cultures['zh-CN'] || {}, function(){
    var numArray = '%u4E00,%u4E8C,%u4E09,%u56DB,%u4E94,%u516D,%u4E03,%u516B,%u4E5D,%u5341'.split(',');
    //
    return {
        calendar: {
            dateFormat: 'yyyy-MM-dd',
            titleNames: '#{yyyy}'+ unescape('%u5E74') +'&nbsp;#{MM}' + unescape('%u6708'),
            monthNamesShort: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            monthNames: function(){
                var len = numArray.length, ret = [];
                for(var i = 0; i < 12; i++){
                    ret.push(unescape(numArray[i] || numArray[len - 1] + numArray[i - len]));
                }
                return ret;
            }(),
            dayNames: function(){
                var key = {mon: 0, tue: 1, wed: 2, thu: 3, fri: 4, sat: 5, sun: '%u65E5'};
                for(var i in key){
                    key[i] = unescape(numArray[key[i]] || key[i]);
                }
                return key;
            }()
        },
        timeZone: 8,
        whitespace: new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"),
        number: {
            group: ',',
            groupLength: 3,
            decimal: ".",
            positive: '',
            negative: '-',
    
            _format: function(number, isNegative){
                return baidu.i18n.number._format(number, {
                    group: this.group,
                    groupLength: this.groupLength,
                    decimal: this.decimal,
                    symbol: isNegative ? this.negative : this.positive 
                });
            }
        },
    
        currency: {
            symbol: unescape('%uFFE5')
        },
    
        language: function(){
            var ret = {ok: '%u786E%u5B9A', cancel: '%u53D6%u6D88', signin: '%u6CE8%u518C', signup: '%u767B%u5F55'};
            for(var i in ret){
                ret[i] = unescape(ret[i]);
            }
            return ret;
        }()
    };
}());
baidu.i18n.currentLocale = 'zh-CN';