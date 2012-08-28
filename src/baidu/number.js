/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
///import baidu.createChain;
///import baidu.each;
/**
 * @description number对象链式语法的链头
 * @name baidu.number()
 * @function
 * @grammar baidu.number(number)
 * @param   {Number} Number对象
 * @return  {TangramNumber}   返回Number对象，该对象被注入链式方法。
 */

baidu.createChain('number', function(number){
    var nan = parseFloat(number),
        val = isNaN(nan) ? nan : number;
        clazz = typeof val === 'number' ? Number : String,
        pro = clazz.prototype;
    val = new clazz(val);
    baidu.each(baidu.number.$Number.prototype, function(value, key){
        pro[key] || (val[key] = value);
    });
    return val;
});