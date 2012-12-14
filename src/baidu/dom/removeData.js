///import baidu.id;
///import baidu.dom;
///import baidu.forEach;
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
 * @name baidu.dom().removeData()
 * @grammar baidu.dom().removeData(key)
 * @function
 * @param {String} 数据的索引
 * @return {TangramDom} 返回之前的tangramDom对象
 */

baidu.dom.extend({
    removeData : function () {
        var   guid = baidu.key
            , maps = baidu.global("_maps_HTMLElementData");

        return function( key ) {
            baidu.forEach( this, function( dom ) {
                !dom[ guid ] && ( dom[ guid ] = baidu.id() );
            });

            // set all
            baidu.forEach(this, function(dom){
                var map = maps[dom[ guid ]];

                if (typeof key == "string") {
                    map && delete map[ key ];

                } else if (baidu.type( key) == "array") {
                    baidu.forEach( key, function(i) {
                        map && delete map[ i ];
                    });
                }
            });

            return this;
        }
    }()
});
