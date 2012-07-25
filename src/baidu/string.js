/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
///import baidu;
///import baidu.createChain;
///import baidu.each;
///import baidu.type;
/**
 * string对象链式语法的链头,操作字符串的方法
 *
 * @grammer baidu.string(string)
 * @param   {String}         String对象
 * @return  {TangramString}          返回 string 对象，该对象被注入链式方法。
 */

baidu.createChain("string",
    // 执行方法
    function(string){
        var type = baidu.type(string),
            str = new String(~'string|number'.indexOf(type) ? string : type),
            pro = String.prototype;
        baidu.each(baidu.$String.prototype, function(fn, key) {
            pro[key] || (str[key] = fn);
        });
        return str;
    }
);