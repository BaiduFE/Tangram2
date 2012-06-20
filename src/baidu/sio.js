/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.createChain;

/**
 * sio功能链头
 *
 * @grammer baidu.sio([url])
 * @param   {Url}
 * @return  {tangramSio}          返回 new TangramSio 对象
 */

baidu.createChain("sio",

// 执行方法
function(url){
    switch (typeof url) {
        case "string" :
            return new baidu.$Sio(url);
        break;
        default:
        break;
    };
},

// constructor
function(url){
	this.url = url;
});