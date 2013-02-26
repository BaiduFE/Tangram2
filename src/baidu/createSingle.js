///import baidu.extend;
///import baidu.isString;
///import baidu.base.Class;

/**
 * @description 创建一个baidu.base.Class的单例实例，主要用于创建 EventCenter DataCenter等全局唯一对象
 * @author meizz
 * @create 2010-05-13
 * @name baidu.createSingle
 * @function
 * @grammar baidu.createSingle(methods[, type])
 * @param {Object} methods 直接挂载到这个单例里的预定属性/方法
 * @param {String} type [可选]指定实例类名
 * @return {Object} 一个实例
 */
baidu.createSingle = function (methods, type) {
    var me = new baidu.base.Class();
    baidu.isString(type) && ( me._type_ = type );
    return baidu.extend(me, methods);
};