///import baidu.id;
///import baidu.dom;
///import baidu.each;
///import baidu.type;
///import baidu.global;

/**
 * @fileoverview
 * @name baidu.dom.removeData
 * @create 2012-07-13
 * @author meizz
 * @modify
 */

/**
 * 在 DOM 对象上存储数据
 * @grammer TangramDom.data([key[, value]])
 * @param
 * @return
 */
baidu.dom.extend({
    removeData : function () {
        var   guid = baidu.id.key
            , maps = baidu.global("_maps_HTMLElementData");

        return function( key ) {
            baidu.each( this, function( dom ) {
                !dom[ guid ] && ( dom[ guid ] = baidu.id() );
            });

            // set all
            baidu.each(this, function(dom){
                var map = maps[dom[ guid ]];

                if (typeof key == "string") {
                    map && delete map[ key ];

                } else if (baidu.type( key) == "array") {
                    baidu.each( key, function(i) {
                        map && delete map[ i ];
                    });
                }
            });

            return this;
        }
    }()
});
