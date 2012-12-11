define(function(require, exports) {

    /**
     * 编码HTML
     */
    exports.encodeHTML = function(source) {
        return String(source)
                    .replace(/&/g,'&amp;')
                    .replace(/</g,'&lt;')
                    .replace(/>/g,'&gt;')
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;");
    };

    /**
     * 格式化字符串
     */
    exports.sformat = function(source, opt){
        return source.replace(/#\{(.+?)\}/g, function(match, key){
            var replacer = opt[key];

            return ('undefined' == typeof replacer ? '' : replacer);
        });
    };

    /**
     * 对目标数字进行0补齐处理
     */
    var pad = function (number) {
        var source = number;
        var pre = "",
            string = String(Math.abs(source));
     
        if (string.length < 2) {
            pre = '0';
        }
     
        return pre + string;
    };

    /**
     * 格式化日期
     */
    exports.dformat = function(date, pattern){
        if(!date){
            var date = new Date();
        }

        if ('string' != typeof pattern) {
            var pattern = 'HH:mm:ss';
        }
     
        function replacer(patternPart, result) {
            pattern = pattern.replace(patternPart, result);
        }
         
        var year    = date.getFullYear(),
            hours   = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
     
        replacer(/HH/g, pad(hours, 2));
        replacer(/mm/g, pad(minutes, 2));
        replacer(/ss/g, pad(seconds, 2));
     
        return pattern;
    };
});