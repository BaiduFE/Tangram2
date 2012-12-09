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
});