///import baidu.id;
///import baidu.dom;
///import baidu.forEach;
///import baidu.type;
///import baidu.global;

/**
 * @fileoverview
 * @name baidu.dom.data
 * @create 2012-07-13
 * @author meizz
 * @modify
 */

/**
 * @description 设置 DOM 对象上存储数据
 * @function
 * @name baidu.dom().data()
 * @grammar baidu.dom().data(key, value)
 * @param {String} key 数据的键值
 * @param {String|Number} value 数据的值 
 * @return
 */

/**
 * @description 取出在 DOM 对象上存储数据，也可以取出以“data-”开头的自定义属性
 * @function
 * @name baidu.dom().data()
 * @grammar baidu.dom().data(key)
 * @param {String} key 数据的键值
 * @return {String|Object} 取出的数据
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
                    if(typeof result != 'undefined'){
                        return result;
                    }else{

                        //取得自定义属性
                        var attr = this[0].getAttribute('data-'+key);
                        return !~String(attr).indexOf('{') ? attr:Function("return "+attr)();
                    }
                }

                // set all
                baidu.forEach(this, function(dom){
                    var data = maps[ dom[ guid ] ] = maps[ dom[ guid ] ] || {};
                    data[ key ] = value;
                });
            
            // json
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
