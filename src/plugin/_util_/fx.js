///import baidu.dom.css;
///import baidu.dom.contains;
///import baidu.forEach;
///import baidu.global;
///import baidu.dom.data;
///import baidu._util_.cssNumber;
///import plugin._util_;

void function () {
    var css = baidu.dom.css,
        cssNumber = baidu._util_.cssNumber;

    baidu.extend(baidu.plugin._util_.fx = {}, {
        cssUnit: function (prop) {
            return cssNumber[prop] ? "" : "px";
        },

        getCss: function (elem, key) {
            var val = css(elem, key),
                num = parseFloat(val);

            return !isNaN(num) && isFinite(num) ? num || 0 : val;
        },

        propExpand: (function () {
            var hooks = {},
                cssExpand = [ "Top", "Right", "Bottom", "Left" ];

            baidu.forEach({
                margin: "",
                padding: "",
                border: "Width"
            }, function (suffix, prefix) {
                hooks[ prefix + suffix ] = {
                    expand: function (value) {
                        var i = 0,
                            expanded = {},

                        // assumes a single number if not a string
                            parts = typeof value === "string" ? value.split(" ") : [ value ];

                        for (; i < 4; i++) {
                            expanded[ prefix + cssExpand[ i ] + suffix ] =
                                parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
                        }

                        return expanded;
                    }
                };
            });

            return function (prop, value) {
                var hook = hooks[ prop ];
                return hook ? hook.expand(value) : null;
            }
        })(),

        getAllData: (function () {
            var guid = baidu.key
                , maps = baidu.global("_maps_HTMLElementData");

            return function (elem) {
                var key = elem[guid];
                return key && maps[key] || [];
            }
        })()
    });


}();