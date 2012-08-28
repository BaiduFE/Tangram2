/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.createChain;
///import baidu.each;
///import baidu.type;

/**
 * @description string对象链式语法的链头，操作字符串
 * @function 
 * @name baidu.string()
 * @grammar baidu.string(str)
 * @param {String} str 一个需要处理的字符串
 * @return {TangramString} 返回一个TangramString对象
 */

baidu.createChain('string',
    // 执行方法
    function(string){
        var type = baidu.type(string),
            str = new String(~'string|number'.indexOf(type) ? string : type),
            pro = String.prototype;
        baidu.each(baidu.string.$String.prototype, function(fn, key) {
            pro[key] || (str[key] = fn);
        });
        return str;
    }
);