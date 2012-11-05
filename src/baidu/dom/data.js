///import baidu.id;
///import baidu.dom;
///import baidu.forEach;
///import baidu.type;
///import baidu.global;
///import baidu.dom.attr;

/**
 * @fileoverview
 * @name baidu.dom.data
 * @create 2012-07-13
 * @author meizz
 * @modify
 */

/**
 * 在 DOM 对象上存储数据
 * @grammar TangramDom.data([key[, value]])
 * @param
 * @return
 */
baidu.dom.extend({
    data : function () {
        var   guid = baidu.key
            , maps = baidu.global("_maps_HTMLElementData");

        return function( key, value ) {
            baidu.forEach( this, function( dom ) {
                !dom[ guid ] && ( dom[ guid ] = baidu.id() );
            });

            if ( baidu.isString(key) ) {

                // get first
                if ( typeof value == "undefined" ) {
                    var data,result;
                    result = this[0] && (data = maps[ this[0][guid] ]) && data[ key ];
                    return result?result:this[0].getAttribute('data-'+key);
                }

                // set all
                baidu.forEach(this, function(dom){
                    var data = maps[ dom[ guid ] ] = maps[ dom[ guid ] ] || {};
                    data[ key ] = value;
                });
            
            // jsonp
            } else if ( baidu.type(key) == "object") {

                // set all
                baidu.forEach(this, function(dom){
                    var data = maps[ dom[ guid ] ] = maps[ dom[ guid ] ] || {};

                    baidu.forEach( key , function(item) {
                        data[ item ] = key[ item ];
                    });
                });
            }

            return this;
        }
    }()
});
