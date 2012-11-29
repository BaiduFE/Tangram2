///import baidu.base;


/**
 * @description 子类继承父类
 *
 * @author meizz
 * @create 2005.02.28
 *
 * @function
 * @name baidu.base.inherits
 * @grammar baidu.base.inherits(subClass, superClass[, type])
 * @param {Function}    subClass    子类构造器
 * @param {Function}    superClass  父类构造器
 * @param {string}      type        类名标识
 * @return {Function}               子类
  */
baidu.base.inherits = function (subClass, superClass, type) {
    var key, proto, 
        selfProps = subClass.prototype, 
        clazz = new Function();
        
    clazz.prototype = superClass.prototype;
    proto = subClass.prototype = new clazz();

    for (key in selfProps) {
        proto[key] = selfProps[key];
    }
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;

    // 类名标识，兼容Class的toString，基本没用
    typeof type == "string" && (proto._type_ = type);

    subClass.extend = function(json) {
        for (var i in json) proto[i] = json[i];
        return subClass;
    }
    
    return subClass;
};

//  2011.11.22  meizz   为类添加了一个静态方法extend()，方便代码书写