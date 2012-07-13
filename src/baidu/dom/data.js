///import baidu.id;
///import baidu.dom;
///import baidu.each;
///import baidu.type;

/**
 * @fileoverview
 * @name baidu.dom.data
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
    data : function () {
        var global = window[ baidu.guid ]
            , guid = baidu.id.key
            , maps = global._HTMLElementDataMaps = global._HTMLElementDataMaps || {};

        return function( key, value ) {
            baidu.each( this, function( dom ) {
                !dom[ guid ] && ( dom[ guid ] = baidu.id() );
            });

            if ( baidu.type(key) == "string" ) {

                // get first
                if ( typeof value == "undefined" ) {
                    var data;
                    return this[0] && (data = maps[ this[0][guid] ]) && data[ key ];
                }

                // set all
                baidu.each(this, function(dom){
                    var data = maps[ dom[ guid ] ] = maps[ dom[ guid ] ] || {};
                    data[ key ] = value;
                });
            
            // jsonp
            } else if ( baidu.type(key) == "object") {

                // set all
                baidu.each(this, function(dom){
                    var data = maps[ dom[ guid ] ] = maps[ dom[ guid ] ] || {};

                    baidu.each( key , function(item) {
                        data[ item ] = key[ item ];
                    });
                });
            }

            return this;
        }
    }()
});
